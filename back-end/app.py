from flask import Flask
from flask_cors import CORS

from config import Config

from routes.auth import auth_bp
from routes.trip import trip_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(trip_bp)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=app.config.get("DEBUG", True))