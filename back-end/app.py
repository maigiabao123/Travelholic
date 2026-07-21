from flask import Flask
from flask_cors import CORS

from config import Config

from routes.auth import auth_bp
from routes.trip import trip_bp
from routes.booking import booking_bp
from routes.checklist import checklist_bp
from routes.dashboard import dashboard_bp
from routes.expense import expense_bp
from routes.map import map_bp
from routes.profile import profile_bp
from routes.weather import weather_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(trip_bp)
    app.register_blueprint(booking_bp)
    app.register_blueprint(checklist_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(expense_bp)
    app.register_blueprint(map_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(weather_bp)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=app.config.get("DEBUG", True))