import logging
import time
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import settings

logger = logging.getLogger("wishverse.db")

db_url = settings.DATABASE_URL
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

connect_args = {}
if db_url.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    db_url,
    connect_args=connect_args,
    pool_pre_ping=True,
    echo=False
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

_db_initialized = False


def ensure_tables():
    global _db_initialized
    if not _db_initialized:
        try:
            Base.metadata.create_all(bind=engine)
            _db_initialized = True
            logger.info("Database tables verified / created successfully.")
        except Exception as e:
            logger.warning(f"Database table verification deferred (DB may still be initializing): {e}")


def get_db():
    ensure_tables()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db(max_retries: int = 15, retry_delay: float = 3.0):
    global _db_initialized
    for attempt in range(1, max_retries + 1):
        try:
            Base.metadata.create_all(bind=engine)
            _db_initialized = True
            logger.info("Database initialized and connected successfully.")
            return
        except Exception as e:
            logger.warning(
                f"Database connection attempt {attempt}/{max_retries} failed: {e}. "
                f"Retrying in {retry_delay}s..."
            )
            time.sleep(retry_delay)

    # If initial retries fail during server startup, do not crash FastAPI lifespan.
    # The server will remain online to answer health checks, and ensure_tables()
    # will connect as soon as the database DNS/service becomes available.
    logger.error(
        f"Database not reachable during startup after {max_retries} attempts. "
        "Server will remain online; database connection will be retried on incoming requests."
    )
