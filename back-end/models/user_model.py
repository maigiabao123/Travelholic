from werkzeug.security import generate_password_hash
from db import execute_query, fetch_one  # tuỳ bạn implement db.py

def create_user(email: str, username: str, password: str) -> int:
    """Tạo user mới và trả về user_id."""
    hashed_password = generate_password_hash(password)
    sql = """
        INSERT INTO users (email, username, password)
        VALUES (?, ?, ?)
    """
    user_id = execute_query(sql, (email, username, hashed_password))
    return user_id

def get_user_by_username(username: str):
    """Lấy user theo username."""
    sql = "SELECT user_id, email, username, password FROM users WHERE username = ?"
    row = fetch_one(sql, (username,))
    if not row:
        return None
    return {
        "user_id": row["user_id"],
        "email": row["email"],
        "username": row["username"],
        "password": row["password"],
    }