#!/usr/bin/env python3
import argparse
import base64
import json
import os
import posixpath
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parent
STYLE_DIR = ROOT / "style_assets"
STYLE_DIR.mkdir(parents=True, exist_ok=True)


def _safe_style_key(value: str) -> str:
    cleaned = re.sub(r"[^a-zA-Z0-9_-]+", "_", (value or "").strip())
    return cleaned or "style"


def _parse_data_url(data_url: str):
    # data:image/png;base64,xxxx
    match = re.match(r"^data:(image/(png|jpeg|jpg|webp));base64,(.+)$", data_url or "", re.I | re.S)
    if not match:
        return None, None
    mime = match.group(1).lower()
    ext = {
        "image/png": ".png",
        "image/jpeg": ".jpg",
        "image/jpg": ".jpg",
        "image/webp": ".webp",
    }.get(mime, ".jpg")
    payload = match.group(3)
    return ext, payload


class Handler(SimpleHTTPRequestHandler):
    def _send_json(self, status: int, payload: dict):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        if self.path == "/api/style-asset":
            self._handle_style_asset_upload()
            return
        if self.path == "/api/style-asset-delete":
            self._handle_style_asset_delete()
            return
        self._send_json(404, {"ok": False, "message": "Not found"})

    def _read_json(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            raw = self.rfile.read(length) if length > 0 else b"{}"
            return json.loads(raw.decode("utf-8"))
        except Exception:
            return None

    def _handle_style_asset_upload(self):
        payload = self._read_json()
        if not isinstance(payload, dict):
            self._send_json(400, {"ok": False, "message": "Invalid JSON"})
            return

        style_key = _safe_style_key(str(payload.get("styleKey", "")))
        data_url = str(payload.get("dataUrl", ""))
        ext, b64 = _parse_data_url(data_url)
        if not ext or not b64:
            self._send_json(400, {"ok": False, "message": "Invalid image data URL"})
            return

        try:
            image_bytes = base64.b64decode(b64, validate=True)
        except Exception:
            self._send_json(400, {"ok": False, "message": "Invalid base64 image payload"})
            return

        file_name = f"{style_key}{ext}"
        file_path = STYLE_DIR / file_name
        with open(file_path, "wb") as f:
            f.write(image_bytes)

        self._send_json(200, {"ok": True, "url": f"/style_assets/{file_name}"})

    def _handle_style_asset_delete(self):
        payload = self._read_json()
        if not isinstance(payload, dict):
            self._send_json(400, {"ok": False, "message": "Invalid JSON"})
            return

        url = str(payload.get("url", ""))
        if not url.startswith("/style_assets/"):
            self._send_json(200, {"ok": True, "deleted": False})
            return

        rel = posixpath.basename(url)
        target = STYLE_DIR / rel
        if target.exists():
            try:
                target.unlink()
                self._send_json(200, {"ok": True, "deleted": True})
                return
            except Exception as e:
                self._send_json(500, {"ok": False, "message": str(e)})
                return
        self._send_json(200, {"ok": True, "deleted": False})

    def log_message(self, fmt, *args):
        # Keep console cleaner.
        pass


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8080)
    args = parser.parse_args()

    os.chdir(ROOT)
    server = ThreadingHTTPServer(("0.0.0.0", args.port), Handler)
    print(f"[sora-json-prompt-app] server running at http://localhost:{args.port}")
    print(f"[sora-json-prompt-app] style assets dir: {STYLE_DIR}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()

