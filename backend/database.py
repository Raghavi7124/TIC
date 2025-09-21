import sqlite3
import csv
import os

# Define the path for the database file in the backend folder
DATABASE_PATH = os.path.join(os.path.dirname(__file__), 'thunai_resources.db')

def init_db():
    """Initialize the database with the schema from schema.sql"""
    # Deletes the existing database file to start fresh
    if os.path.exists(DATABASE_PATH):
        os.remove(DATABASE_PATH)
        print("Existing database removed.")

    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()

    # Define the path for the schema file
    schema_path = os.path.join(os.path.dirname(__file__), 'schema.sql')

    with open(schema_path, 'r') as f:
        schema_sql = f.read()
        cursor.executescript(schema_sql)

    conn.commit()
    conn.close()
    print("Database initialized successfully.")

def populate_db():
    """Populate the database from the resources.csv file"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()

    # Check if data already exists
    cursor.execute("SELECT COUNT(*) FROM resources")
    count = cursor.fetchone()[0]

    if count > 0:
        print("Database already populated.")
        conn.close()
        return

    # Define the path for the CSV file
    csv_path = os.path.join(os.path.dirname(__file__), 'resources.csv')

    # Read data from the CSV file and insert it into the database
    try:
        with open(csv_path, 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            next(reader)  # Skip the header row
            for row in reader:
                cursor.execute("""
                    INSERT INTO resources (id, name, city, type, language, service_mode, operating_hours, contact, description)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, row)
        conn.commit()
        print(f"Database populated with {cursor.rowcount} records from CSV.")
    except FileNotFoundError:
        print(f"Error: '{csv_path}' not found. Please make sure your CSV file is in the backend folder.")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        conn.close()

def get_best_resource(triage_params):
    """
    Get the best matching resource based on triage parameters.
    Example triage_params = {'city': 'Chennai', 'language': 'Tamil'}
    """
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()

    # Build the query dynamically based on provided parameters
    query = "SELECT * FROM resources WHERE 1=1"
    params = []

    if triage_params.get('city'):
        query += " AND city LIKE ?"
        params.append(f"%{triage_params['city']}%")
    
    if triage_params.get('language'):
        query += " AND language LIKE ?"
        params.append(f"%{triage_params['language']}%")

    # Prioritize 24/7 services and then by ID
    query += " ORDER BY CASE WHEN operating_hours = '24/7' THEN 1 ELSE 2 END, id LIMIT 1"

    cursor.execute(query, params)
    result = cursor.fetchone()
    conn.close()

    if result:
        # Convert the tuple result into a dictionary
        return {
            'id': result[0],
            'name': result[1],
            'city': result[2],
            'type': result[3],
            'language': result[4],
            'service_mode': result[5],
            'operating_hours': result[6],
            'contact': result[7],
            'description': result[8]
        }
    return None

def get_all_resources():
    """Get all resources from the database"""
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row  # This allows accessing columns by name
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM resources")
    results = cursor.fetchall()
    conn.close()

    # Convert row objects to a list of dictionaries
    return [dict(row) for row in results]

# --- Main execution block ---
# This allows you to run this file directly to set up the database
if __name__ == '__main__':
    print("Setting up the database...")
    init_db()
    populate_db()
    print("\nVerifying by fetching all resources:")
    all_resources = get_all_resources()
    if all_resources:
        # Print the first resource as a sample
        print(all_resources[0])
    print("\nDatabase setup complete.")