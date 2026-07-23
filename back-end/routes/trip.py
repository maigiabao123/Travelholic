from datetime import date, datetime
from decimal import Decimal

from flask import Blueprint, request, jsonify

from db import (
    insert_trip,
    get_trips_by_user_id,
    get_trip_by_id,
    get_upcoming_trip_by_user_id,
)
from utils.auth import token_required


trip_bp = Blueprint(
    "trip",
    __name__,
    url_prefix="/api/trips"
)


def format_date(value):
    """
    Chuyển date/datetime hoặc chuỗi ngày thành định dạng hiển thị.
    """
    if not value:
        return None

    if isinstance(value, (date, datetime)):
        return value.strftime("%d %b %Y")

    return str(value)


def calculate_status(start_date, end_date):
    """
    Tự động xác định trạng thái trip.
    """
    today = date.today()

    def to_date(value):
        if isinstance(value, datetime):
            return value.date()

        if isinstance(value, date):
            return value

        if isinstance(value, str):
            return datetime.strptime(value[:10], "%Y-%m-%d").date()

        return None

    start = to_date(start_date)
    end = to_date(end_date)

    if not start or not end:
        return "Upcoming"

    if today < start:
        return "Upcoming"

    if start <= today <= end:
        return "Ongoing"

    return "Completed"


def serialize_trip(trip):
    """
    Chuyển dữ liệu MySQL sang đúng format mà TripCard cần.
    """

    destination = trip.get("destination") or ""
    country = trip.get("country") or ""

    location = destination
    if country:
        location = f"{destination}, {country}"

    budget = trip.get("budget") or 0

    if isinstance(budget, Decimal):
        budget = float(budget)

    return {
        "id": trip.get("id"),
        "image": trip.get("cover_image_url"),
        "title": trip.get("name"),
        "location": location,
        "dateRange": (
            f"{format_date(trip.get('start_date'))} – "
            f"{format_date(trip.get('end_date'))}"
        ),
        "price": budget,
        "status": calculate_status(
            trip.get("start_date"),
            trip.get("end_date")
        ),
    }


@trip_bp.route("", methods=["GET"])
@token_required
def get_my_trips():
    """
    Lấy danh sách trip của người dùng đang đăng nhập.
    """
    user_id = request.user_id

    trips = get_trips_by_user_id(user_id)

    return jsonify({
        "trips": [serialize_trip(trip) for trip in trips]
    }), 200


@trip_bp.route("/<int:trip_id>", methods=["GET"])
@token_required
def get_trip_detail(trip_id):
    """
    Lấy chi tiết một trip.
    """
    user_id = request.user_id
    trip = get_trip_by_id(trip_id)

    if not trip:
        return jsonify({
            "message": "Không tìm thấy trip"
        }), 404

    # Không cho người dùng xem trip của người khác
    if trip.get("user_id") != user_id:
        return jsonify({
            "message": "Bạn không có quyền xem trip này"
        }), 403

    return jsonify({
        "trip": serialize_trip(trip)
    }), 200


@trip_bp.route("", methods=["POST"])
@token_required
def create_trip_endpoint():
    user_id = request.user_id
    data = request.get_json() or {}

    name = data.get("name")
    destination = data.get("destination")
    country = data.get("country")
    start_date = data.get("start_date")
    end_date = data.get("end_date")

    if not all([name, destination, country, start_date, end_date]):
        return jsonify({
            "message": "Vui lòng nhập đầy đủ thông tin bắt buộc"
        }), 400

    trip_id = insert_trip(
        user_id=user_id,
        name=name,
        destination=destination,
        country=country,
        start_date=start_date,
        end_date=end_date,
        budget=data.get("budget"),
        currency_code=data.get("currency_code"),
        description=data.get("description"),
        travel_type=data.get("travel_type"),
        transportation_type=data.get("transportation_type"),
        hotel_name=data.get("hotel_name"),
        cover_image_url=data.get("cover_image_url"),
    )

    return jsonify({
        "message": "Tạo trip thành công",
        "trip_id": trip_id
    }), 201

@trip_bp.route("/upcoming", methods=["GET"])
@token_required
def get_upcoming_trip():
    user_id = request.user_id

    trip = get_upcoming_trip_by_user_id(user_id)

    if not trip:
        return jsonify({
            "trip": None,
            "message": "Bạn chưa có chuyến đi sắp tới"
        }), 200

    return jsonify({
        "trip": serialize_trip(trip)
    }), 200