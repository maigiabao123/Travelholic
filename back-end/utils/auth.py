# back-end/utils/auth.py
from functools import wraps

from flask import request, jsonify, current_app, g
import jwt


def token_required(f):
    """Middleware kiểm tra JWT cho các API mobile."""

    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")

        if not auth_header.startswith("Bearer "):
            return jsonify({
                "message": "No token",
                "code": "TOKEN_MISSING"
            }), 401

        token = auth_header.split(" ", 1)[1].strip()

        if not token:
            return jsonify({
                "message": "No token",
                "code": "TOKEN_MISSING"
            }), 401

        try:
            data = jwt.decode(
                token,
                current_app.config["SECRET_KEY"],
                algorithms=["HS256"],
            )

        except jwt.ExpiredSignatureError:
            return jsonify({
                "message": "Token đã hết hạn",
                "code": "TOKEN_EXPIRED"
            }), 401

        except jwt.InvalidTokenError:
            return jsonify({
                "message": "Token không hợp lệ",
                "code": "TOKEN_INVALID"
            }), 401

        except Exception:
            return jsonify({
                "message": "Token không hợp lệ",
                "code": "TOKEN_INVALID"
            }), 401

        user_id = data.get("user_id")

        if user_id is None:
            return jsonify({
                "message": "Token không chứa user_id",
                "code": "USER_ID_MISSING"
            }), 401

        # Giữ tương thích với các route đang dùng request.user_id
        request.user_id = user_id

        # Đồng thời lưu theo cách khuyến nghị của Flask
        g.user_id = user_id

        return f(*args, **kwargs)

    return decorated