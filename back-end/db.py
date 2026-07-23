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
#============================================================
# 2. THÔNG TIN NGƯỜI DÙNG
#============================================================
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

def get_user_by_id(user_id):
    """
    Lấy user theo user_id, trả về dict hoặc None.
    """
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)
    sql = "SELECT * FROM users WHERE user_id = %s"
    cur.execute(sql, (user_id,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    return row

def get_user_by_name(name):
    """
    Lấy user theo name (dùng làm tên đăng nhập), trả về dict hoặc None.
    """
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)
    sql = "SELECT * FROM users WHERE name = %s"
    cur.execute(sql, (name,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    return row

#============================================================
# 3. LẤY THÔNG TIN CỦA CÁC TRIP
#============================================================

def get_trips_by_user_id(user_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    sql = """
    SELECT
        id,
        user_id,
        name,
        destination,
        country,
        start_date,
        end_date,
        budget,
        currency_code,
        description,
        travel_type,
        transportation_type,
        hotel_name,
        cover_image_url,
        created_at,
        updated_at
    FROM trips
    WHERE user_id = %s
    ORDER BY created_at DESC
    """

    cursor.execute(sql, (user_id,))
    trips = cursor.fetchall()

    cursor.close()
    conn.close()

    return trips

def get_trip_by_id(trip_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM trips
        WHERE id = %s
    """, (trip_id,))

    trip = cursor.fetchone()

    cursor.close()
    conn.close()

    return trip

def insert_trip(user_id, name, destination, country, start_date, end_date,
                budget, currency_code, description, travel_type,
                transportation_type, hotel_name, cover_image_url):

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO trips
        (user_id, name, destination, country, start_date, end_date,
         budget, currency_code, description, travel_type,
         transportation_type, hotel_name, cover_image_url)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (user_id, name, destination, country, start_date, end_date,
          budget, currency_code, description, travel_type,
          transportation_type, hotel_name, cover_image_url))

    conn.commit()
    trip_id = cursor.lastrowid

    cursor.close()
    conn.close()

    return trip_id

def get_upcoming_trip_by_user_id(user_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM trips
        WHERE user_id = %s
          AND start_date >= CURDATE()
        ORDER BY start_date ASC
        LIMIT 1
    """, (user_id,))

    trip = cursor.fetchone()

    cursor.close()
    conn.close()

    return trip