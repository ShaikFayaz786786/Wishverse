def test_public_wish_view_published(client, auth_user_a):
    # Create wish
    create_res = client.post(
        "/api/wishes",
        json={
            "title": "Congratulations on Graduation!",
            "recipient_name": "Marcus",
            "sender_name": "Aunt Clara",
            "message": "We are so proud of all your hard work!",
            "occasion": "Graduation",
            "theme": "golden-elegance",
            "animation_preset": "confetti-cascade"
        },
        headers=auth_user_a["headers"]
    )
    wish_data = create_res.json()
    wish_id = wish_data["id"]
    slug = wish_data["public_slug"]

    # When DRAFT: public access should fail with 404
    draft_res = client.get(f"/api/public/wishes/{slug}")
    assert draft_res.status_code == 404

    # Publish the wish
    pub_res = client.post(f"/api/wishes/{wish_id}/publish", headers=auth_user_a["headers"])
    assert pub_res.status_code == 200

    # Now public access without ANY auth headers should succeed!
    public_res = client.get(f"/api/public/wishes/{slug}")
    assert public_res.status_code == 200
    data = public_res.json()
    assert data["public_slug"] == slug
    assert data["recipient_name"] == "Marcus"
    assert data["sender_name"] == "Aunt Clara"
    assert data["theme"] == "golden-elegance"
    assert data["animation_preset"] == "confetti-cascade"
    assert data["message"] == "We are so proud of all your hard work!"


def test_public_wish_invalid_slug(client):
    response = client.get("/api/public/wishes/non-existent-slug-12345")
    assert response.status_code == 404
    assert "Wish not found" in response.json()["detail"]
