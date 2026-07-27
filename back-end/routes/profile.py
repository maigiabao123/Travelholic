from flask import Blueprint, jsonify, request, current_app
import jwt

from db import get_profile_by_user_id


profile_bp = Blueprint(
    "profile",
    __name__,
    url_prefix="/api"
)


@profile_bp.route("/profile", methods=["GET"])
def get_profile():
    auth_header = request.headers.get("Authorization", "")

    if not auth_header.startswith("Bearer "):
        return jsonify({
            "message": "Thiếu access token"
        }), 401

    token = auth_header.split(" ", 1)[1]

    try:
        payload = jwt.decode(
            token,
            current_app.config["SECRET_KEY"],
            algorithms=["HS256"]
        )

        user_id = payload.get("user_id")

        if not user_id:
            return jsonify({
                "message": "Token không hợp lệ"
            }), 401

    except jwt.ExpiredSignatureError:
        return jsonify({
            "message": "Token đã hết hạn"
        }), 401

    except jwt.InvalidTokenError:
        return jsonify({
            "message": "Token không hợp lệ"
        }), 401

    profile = get_profile_by_user_id(user_id)

    if not profile:
        return jsonify({
            "message": "Không tìm thấy người dùng"
        }), 404

    return jsonify(profile), 200