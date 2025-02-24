from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(override=True)

# postgresql://postgres:password@localhost:port/dev_wins_tracker
# Database :// username : password @ host : port / project_table


DATABASE = os.getenv('DATABASE')
USERNAME = os.getenv('USERNAME')
PASSWORD = os.getenv('PASSWORD')
HOST = os.getenv('HOST')
PORT = os.getenv('PORT')
DB_TABLE = os.getenv('DB_TABLE')

DATABASE_URL = f"{DATABASE}://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DB_TABLE}"

# print(DATABASE_URL)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()