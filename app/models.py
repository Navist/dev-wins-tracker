from sqlalchemy import Column, Integer, String, ForeignKey, Text, TIMESTAMP, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import datetime
from app.database import Base  # Import the Base class from the database setup

class DevWin(Base):
    __tablename__ = "dev_wins"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="wins")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(25), unique=True, nullable=False)
    email = Column(String(254), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)  # Hash will be stored here
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
    subscription = Column(String(50), default="free")  # Subscription tier

    oauth_accounts = relationship("OAuthAccount", back_populates="user")
    wins = relationship("Win", back_populates="user")
    custom_categories = relationship("CustomCategory", back_populates="user")
    subscribers = relationship("Subscriber", back_populates="user")

class OAuthAccount(Base):
    __tablename__ = "oauth_accounts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    provider = Column(String(255), nullable=False)
    access_token = Column(String(255), nullable=False)
    refresh_token = Column(String(255))
    expires_at = Column(DateTime, nullable=False)


    user = relationship("User", back_populates="oauth_accounts")

class Win(Base):
    __tablename__ = "wins"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    description = Column(Text, default="Fill me!", nullable=False)
    category = Column(Text, nullable=False)
    custom_category_id = Column(Integer, ForeignKey("custom_categories.id"), nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)

    user = relationship("User", back_populates="wins")
    custom_category = relationship("CustomCategory", back_populates="wins")

class CustomCategory(Base):
    __tablename__ = "custom_categories"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(50), nullable=False)

    user = relationship("User", back_populates="custom_categories")
    wins = relationship("Win", back_populates="custom_category")

class Subscriber(Base):
    __tablename__ = "subscribers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    subscription = Column(String(50), nullable=False)  # "free", "premium", "enterprise"
    expires_at = Column(TIMESTAMP(timezone=True), nullable=False)

    user = relationship("User", back_populates="subscribers")
