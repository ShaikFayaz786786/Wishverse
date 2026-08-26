from pydantic import BaseModel


class HealthCheck(BaseModel):
    status: str
    app: str
    version: str


# Alias for backward compatibility
HealthStatus = HealthCheck
