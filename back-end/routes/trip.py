from flask import Blueprint, request, jsonify, current_app
import jwt

from db import insert_trip

trip_bp = Blueprint("trip", __name__, url_prefix="/api/trips")


def decode_token(token: str):
    try:
        data = jwt.decode(
            token,
            current_app.config["SECRET_KEY"],
            algorithms=["HS256"],
        )
        return data
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


@trip_bp.route("", methods=["POST"])
def create_trip_endpoint():
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return jsonify({"message": "Thiếu hoặc sai Authorization header"}), 401

    token = auth_header.split(" ", 1)[1]
    decoded = decode_token(token)
    if not decoded:
        return jsonify({"message": "Token không hợp lệ hoặc đã hết hạn"}), 401

    user_id = decoded.get("user_id")
    if not user_id:
        return jsonify({"message": "Token không chứa user_id"}), 401

    data = request.get_json() or {}

    name = data.get("name")
    destination = data.get("destination")
    country = data.get("country")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    budget = data.get("budget")
    currency_code = data.get("currency_code")
    description = data.get("description")
    travel_type = data.get("travel_type")
    transportation_type = data.get("transportation_type")
    hotel_name = data.get("hotel_name")
    cover_image_url = data.get("cover_image_url")

    if not all([name, destination, country, start_date, end_date]):
        return jsonify({"message": "Vui lòng nhập đầy đủ thông tin bắt buộc"}), 400

    trip_id = insert_trip(
        user_id=user_id,
        name=name,
        destination=destination,
        country=country,
        start_date=start_date,
        end_date=end_date,
        budget=budget,
        currency_code=currency_code,
        description=description,
        travel_type=travel_type,
        transportation_type=transportation_type,
        hotel_name=hotel_name,
        cover_image_url=cover_image_url,
    )

    return jsonify({"message": "Tạo trip thành công", "trip_id": trip_id}), 201