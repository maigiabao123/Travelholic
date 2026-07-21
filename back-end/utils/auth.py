# back-end/utils/auth.py
from functools import wraps
from flask import request, jsonify, current_app
import jwt

def token_required(f):
    """Middleware kiểm tra JWT cho các API mobile."""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.headers.get("Authorization")
        if not auth or not auth.startswith("Bearer "):
            return jsonify({"message": "No token"}), 401

        token = auth.split(" ")[1]

        try:
            data = jwt.decode(
                token,
                current_app.config["SECRET_KEY"],
                algorithms=["HS256"],
            )
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token đã hết hạn"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Token không hợp lệ"}), 401
        except Exception:
            return jsonify({"message": "Token không hợp lệ"}), 401

        request.user_id = data.get("user_id")
        if request.user_id is None:
            return jsonify({"message": "Token không chứa user_id"}), 401

        return f(*args, **kwargs)
    return decorated