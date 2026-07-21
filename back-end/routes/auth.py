from flask import Blueprint, jsonify, request, current_app
from werkzeug.security import check_password_hash
import jwt
import datetime

from db import create_user, get_user_by_name

auth_bp = Blueprint("auth", __name__, url_prefix="/api")


@auth_bp.route("/signup", methods=["POST"])
def api_signup():
    data = request.get_json() or {}

    email = data.get("email")
    name = data.get("name")
    password = data.get("password")

    if not all([email, name, password]):
        return jsonify({"message": "Vui lòng nhập đầy đủ thông tin"}), 400

    if get_user_by_name(name):
        return jsonify({"message": "Tên đăng nhập đã tồn tại"}), 409

    user_id = create_user(email, name, password)

    return jsonify({"message": "Đăng ký thành công", "user_id": user_id}), 201


@auth_bp.route("/login", methods=["POST"])
def api_login():
    """Đăng nhập mobile, trả về JWT token."""
    data = request.get_json() or {}

    name = data.get("name")
    password = data.get("password")

    if not all([name, password]):
        return jsonify({"message": "Vui lòng nhập đầy đủ thông tin"}), 400

    user = get_user_by_name(name)
    if not user or not check_password_hash(user["password_hash"], password):
        return jsonify({"message": "Sai tài khoản hoặc mật khẩu"}), 401

    # Dùng cột 'id' trong bảng users làm user_id
    user_id = user["id"]

    token = jwt.encode(
        {
            "user_id": user_id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2),
        },
        current_app.config["SECRET_KEY"],
        algorithm="HS256",
    )

    return jsonify(
        {
            "message": "Đăng nhập thành công",
            "token": token,
            "user": {
                "user_id": user_id,
                "name": user["name"],
                "email": user["email"],
            },
        }
    ), 200