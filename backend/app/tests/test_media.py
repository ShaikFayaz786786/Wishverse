import io
from app.services.storage import storage_service


def test_upload_valid_media(client, auth_user_a):
    # Create wish
    create_res = client.post(
        "/api/wishes",
        json={
            "title": "Photo Wish",
            "recipient_name": "Mom",
            "sender_name": "Child",
            "message": "Happy Mother's Day!",
            "occasion": "Mother's Day"
        },
        headers=auth_user_a["headers"]
    )
    wish_id = create_res.json()["id"]

    # Upload mock image
    fake_image_bytes = b"\xFF\xD8\xFF\xE0\x00\x10JFIF\x00\x01\x01\x01\x00`\x00`\x00\x00\xFF\xDB\x00C\x00"
    files = {"file": ("test_photo.jpg", io.BytesIO(fake_image_bytes), "image/jpeg")}
    
    upload_res = client.post(
        f"/api/wishes/{wish_id}/media",
        files=files,
        headers=auth_user_a["headers"]
    )
    assert upload_res.status_code == 201
    media = upload_res.json()
    assert media["media_type"] == "IMAGE"
    assert media["mime_type"] == "image/jpeg"
    assert media["wish_id"] == wish_id
    assert "url" in media
    media_id = media["id"]
    stored_path = storage_service.upload_dir / media["url"].removeprefix("/uploads/")
    assert stored_path.is_file()

    # Verify wish now contains this media
    wish_res = client.get(f"/api/wishes/{wish_id}", headers=auth_user_a["headers"])
    assert wish_res.status_code == 200
    assert len(wish_res.json()["media"]) == 1

    # Delete media
    del_res = client.delete(f"/api/wishes/media/{media_id}", headers=auth_user_a["headers"])
    assert del_res.status_code == 200
    assert not stored_path.exists()

    # Verify media is removed from wish
    wish_res2 = client.get(f"/api/wishes/{wish_id}", headers=auth_user_a["headers"])
    assert len(wish_res2.json()["media"]) == 0


def test_upload_unsupported_file_type(client, auth_user_a):
    create_res = client.post(
        "/api/wishes",
        json={
            "title": "Wish",
            "recipient_name": "Friend",
            "sender_name": "Me",
            "message": "Hello",
            "occasion": "General"
        },
        headers=auth_user_a["headers"]
    )
    wish_id = create_res.json()["id"]

    files = {"file": ("malicious.exe", io.BytesIO(b"binary-content"), "application/x-msdownload")}
    upload_res = client.post(
        f"/api/wishes/{wish_id}/media",
        files=files,
        headers=auth_user_a["headers"]
    )
    assert upload_res.status_code == 400
    assert "Unsupported file format" in upload_res.json()["detail"]
