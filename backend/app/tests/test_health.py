def test_health_check(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["app"] == "Wishverse API"
    assert "version" in data


def test_api_root(client):
    response = client.get("/api")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert data["health_check"] == "/api/health"
