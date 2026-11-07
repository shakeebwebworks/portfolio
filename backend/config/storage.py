import os
from urllib.parse import urlparse
from uuid import uuid4

import cloudinary
import cloudinary.uploader
from django.core.files.storage import Storage
from django.utils.deconstruct import deconstructible

IMAGE_EXT = {"jpg", "jpeg", "png", "gif", "webp", "avif"}


def _configure():
    raw = os.getenv("CLOUDINARY_URL", "").strip().strip('"').strip("'").strip()
    if raw.upper().startswith("CLOUDINARY_URL="):
        raw = raw.split("=", 1)[1].strip().strip('"').strip("'")
    u = urlparse(raw)
    if u.scheme != "cloudinary" or not u.username or not u.password or "@" not in u.netloc:
        raise ValueError(
            "CLOUDINARY_URL is not valid. It must look like cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
        )
    cloudinary.config(
        cloud_name=u.netloc.rsplit("@", 1)[-1],
        api_key=u.username,
        api_secret=u.password,
        secure=True,
    )


def _ext(name):
    return name.rsplit(".", 1)[-1].lower() if "." in name else ""


@deconstructible
class CloudinaryStorage(Storage):
    """Stores uploaded files on Cloudinary. Needs the CLOUDINARY_URL env variable."""

    def _save(self, name, content):
        _configure()
        content.seek(0)
        stem, _, ext = name.rpartition(".")
        if not stem:
            stem, ext = name, ""
        pid = f"{stem}-{uuid4().hex[:8]}"
        if _ext(name) in IMAGE_EXT:
            res = cloudinary.uploader.upload(content, public_id=pid, resource_type="image")
            return f"{res['public_id']}.{res['format']}"
        res = cloudinary.uploader.upload(content, public_id=f"{pid}.{ext}", resource_type="raw")
        return res["public_id"]

    def exists(self, name):
        return False

    def url(self, name):
        _configure()
        cloud = cloudinary.config().cloud_name
        if _ext(name) in IMAGE_EXT:
            return f"https://res.cloudinary.com/{cloud}/image/upload/q_auto,w_1800,c_limit/{name}"
        return f"https://res.cloudinary.com/{cloud}/raw/upload/{name}"

    def delete(self, name):
        try:
            _configure()
            if _ext(name) in IMAGE_EXT:
                cloudinary.uploader.destroy(name.rsplit(".", 1)[0], resource_type="image")
            else:
                cloudinary.uploader.destroy(name, resource_type="raw")
        except Exception:
            pass

    def size(self, name):
        return 0

    def _open(self, name, mode="rb"):
        raise NotImplementedError("Files are stored on Cloudinary and are not opened from the server.")
