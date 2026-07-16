import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

# =========================================================
# 1. KẾT NỐI CƠ SỞ DỮ LIỆU
# =========================================================
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="maigiabao2208",
        database="travelholic"
    )

def create_user(email, name, password):
    """
    Tạo user mới, password được hash.
    """
    conn = get_db_connection()
    cur = conn.cursor()

    sql = """
        INSERT INTO users (email, name, password_hash)
        VALUES (%s, %s, %s)
    """

    cur.execute(sql, (
        email,
        name,
        generate_password_hash(password)
    ))

    conn.commit()
    user_id = cur.lastrowid

    cur.close()
    conn.close()

    return user_id