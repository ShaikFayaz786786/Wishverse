def test_create_and_get_wish(client, auth_user_a):
    payload = {
        "title": "Happy 25th Birthday Sarah!",
        "recipient_name": "Sarah",
        "sender_name": "Alice",
        "message": "Wishing you the happiest of days filled with love and magic!",
        "occasion": "Birthday",
        "theme": "magical-starlight",
        "animation_preset": "floating-sparkles"
    }
    response = client.post("/api/wishes", json=payload, headers=auth_user_a["headers"])
    assert response.status_code == 201
    wish = response.json()
    assert wish["title"] == payload["title"]
    assert wish["status"] == "DRAFT"
    assert "public_slug" in wish
    assert len(wish["public_slug"]) >= 8

    # List user's wishes
    list_res = client.get("/api/wishes", headers=auth_user_a["headers"])
    assert list_res.status_code == 200
    wishes = list_res.json()
    assert len(wishes) == 1
    assert wishes[0]["id"] == wish["id"]


def test_update_wish(client, auth_user_a):
    create_res = client.post(
        "/api/wishes",
        json={
            "title": "Initial Title",
            "recipient_name": "Bob",
            "sender_name": "Alice",
            "message": "Hello!",
            "occasion": "Birthday",
            "theme": "magical-starlight",
            "animation_preset": "floating-sparkles"
        },
        headers=auth_user_a["headers"]
    )
    wish_id = create_res.json()["id"]

    update_res = client.put(
        f"/api/wishes/{wish_id}",
        json={"title": "Updated Title", "theme": "sunset-glow"},
        headers=auth_user_a["headers"]
    )
    assert update_res.status_code == 200
    updated = update_res.json()
    assert updated["title"] == "Updated Title"
    assert updated["theme"] == "sunset-glow"
    assert updated["recipient_name"] == "Bob"


def test_publish_and_unpublish_wish(client, auth_user_a):
    create_res = client.post(
        "/api/wishes",
        json={
            "title": "Anniversary Wish",
            "recipient_name": "Emma",
            "sender_name": "David",
            "message": "Happy 5 years together!",
            "occasion": "Anniversary",
            "theme": "romantic-blossom",
            "animation_preset": "gentle-hearts"
        },
        headers=auth_user_a["headers"]
    )
    wish_id = create_res.json()["id"]
    assert create_res.json()["status"] == "DRAFT"

    # Publish
    pub_res = client.post(f"/api/wishes/{wish_id}/publish", headers=auth_user_a["headers"])
    assert pub_res.status_code == 200
    assert pub_res.json()["status"] == "PUBLISHED"
    assert pub_res.json()["published_at"] is not None

    # Unpublish
    unpub_res = client.post(f"/api/wishes/{wish_id}/unpublish", headers=auth_user_a["headers"])
    assert unpub_res.status_code == 200
    assert unpub_res.json()["status"] == "DRAFT"


def test_ownership_protection(client, auth_user_a, auth_user_b):
    # User A creates a wish
    create_res = client.post(
        "/api/wishes",
        json={
            "title": "Alice's Secret Wish",
            "recipient_name": "Friend",
            "sender_name": "Alice",
            "message": "Secret message!",
            "occasion": "Birthday"
        },
        headers=auth_user_a["headers"]
    )
    wish_id = create_res.json()["id"]

    # User B attempts to access User A's wish -> 404/denied
    get_res = client.get(f"/api/wishes/{wish_id}", headers=auth_user_b["headers"])
    assert get_res.status_code == 404

    # User B attempts to update User A's wish -> 404/denied
    update_res = client.put(
        f"/api/wishes/{wish_id}",
        json={"title": "Hacked Title"},
        headers=auth_user_b["headers"]
    )
    assert update_res.status_code == 404

    # User B attempts to delete User A's wish -> 404/denied
    del_res = client.delete(f"/api/wishes/{wish_id}", headers=auth_user_b["headers"])
    assert del_res.status_code == 404

    # User A can delete their own wish
    own_del = client.delete(f"/api/wishes/{wish_id}", headers=auth_user_a["headers"])
    assert own_del.status_code == 200
