import mysql.connector

def connect_to_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="manager",
        database="finance-app-db"
    )

def execute_query(query):
    db = connect_to_db()
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    db.close()
    return records
