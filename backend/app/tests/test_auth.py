def test_signup_success(client):
    response = client.post(
        "/api/auth/signup",
        json={
            "email": "creator@wishverse.test",
            "password": "SecretPassword123!",
            "full_name": "Wish Creator"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["email"] == "creator@wishverse.test"
    assert data["user"]["full_name"] == "Wish Creator"


def test_signup_duplicate_email(client):
    payload = {
        "email": "duplicate@wishverse.test",
        "password": "Password123!",
        "full_name": "Original User"
    }
    r1 = client.post("/api/auth/signup", json=payload)
    assert r1.status_code == 201

    r2 = client.post("/api/auth/signup", json=payload)
    assert r2.status_code == 400
    assert "already exists" in r2.json()["detail"]


def test_login_success(client):
    # Register first
    client.post(
        "/api/auth/signup",
        json={
            "email": "login.test@wishverse.test",
            "password": "MyPassword123!",
            "full_name": "Test User"
        }
    )

    # Login
    response = client.post(
        "/api/auth/login",
        json={
            "email": "login.test@wishverse.test",
            "password": "MyPassword123!"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["email"] == "login.test@wishverse.test"


def test_login_invalid_password(client):
    client.post(
        "/api/auth/signup",
        json={
            "email": "wrongpwd@wishverse.test",
            "password": "CorrectPassword123!",
            "full_name": "Test User"
        }
    )

    response = client.post(
        "/api/auth/login",
        json={
            "email": "wrongpwd@wishverse.test",
            "password": "WrongPassword!"
        }
    )
    assert response.status_code == 401
    assert "Invalid email or password" in response.json()["detail"]


def test_get_me_authenticated(client, auth_user_a):
    response = client.get("/api/auth/me", headers=auth_user_a["headers"])
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == auth_user_a["user"]["email"]
    assert data["id"] == auth_user_a["user"]["id"]


def test_get_me_unauthorized(client):
    response = client.get("/api/auth/me")
    assert response.status_code == 401
