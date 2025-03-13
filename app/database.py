from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(override=True)

# postgresql://postgres:password@localhost:port/dev_wins_tracker
# Database :// username : password @ host : port / project_table

sub_tiers = {"free": 10,
             "premium": 30,
             "enterprise": 999}

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


## Async rewrite
async_engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=async_engine, class_=AsyncSession)