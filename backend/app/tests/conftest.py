import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.core.database import Base, get_db

# Use in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db_session():
    """Creates a fresh database schema for each test."""
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db_session):
    """FastAPI TestClient with overridden database session dependency."""
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture(scope="function")
def auth_user_a(client):
    """Creates user A and returns auth header + user info."""
    payload = {
        "email": "user.a@wishverse.test",
        "password": "Password123!",
        "full_name": "Alice Wonderland"
    }
    response = client.post("/api/auth/signup", json=payload)
    data = response.json()
    token = data["access_token"]
    return {
        "headers": {"Authorization": f"Bearer {token}"},
        "user": data["user"],
        "token": token
    }


@pytest.fixture(scope="function")
def auth_user_b(client):
    """Creates user B and returns auth header + user info."""
    payload = {
        "email": "user.b@wishverse.test",
        "password": "Password123!",
        "full_name": "Bob Builder"
    }
    response = client.post("/api/auth/signup", json=payload)
    data = response.json()
    token = data["access_token"]
    return {
        "headers": {"Authorization": f"Bearer {token}"},
        "user": data["user"],
        "token": token
    }
