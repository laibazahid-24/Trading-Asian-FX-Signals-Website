import sys
import os
from sqlalchemy import create_engine, text

# Add parent directory to sys.path so we can import model if needed
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Hardcoded DB URL from .env for quick fix
DATABASE_URL = "postgresql://postgres:giligili0698@localhost:5432/asian_fx"

def run_migration():
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as connection:
        print("Connecting to database...")
        try:
            # Add missing 'price' column to signals table
            sql = text("ALTER TABLE signals ADD COLUMN IF NOT EXISTS price DOUBLE PRECISION DEFAULT 0.0;")
            connection.execute(sql)
            connection.commit()
            print("Successfully added 'price' column to 'signals' table.")
        except Exception as e:
            print(f"Error during migration: {e}")
            connection.rollback()

if __name__ == "__main__":
    run_migration()
