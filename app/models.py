from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


# Defining our user table model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, nullable=False, default=func.now())
    subscription_tier = Column(String, default='free')

    user_oauth_accounts = relationship("OAuthAccount", back_populates="user", cascade="all, delete")
    user_dev_wins = relationship("DevWin", back_populates="user", cascade="all, delete")
    user_subscription = relationship("Subscriber", back_populates="user", cascade="all, delete")
    user_custom_categories = relationship("CustomCategory", back_populates="user", cascade="all, delete")
    user_wins = relationship("Win", back_populates="user", cascade="all, delete")


class Subscriber(Base):
    __tablename__ = "subscribers"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    subscription_tier = Column(String, nullable=True, default='free')
    expires_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="user_subscription")


class OAuthAccount(Base):
    __tablename__ = "oauth_accounts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    provider = Column(String, nullable=False)
    access_token = Column(String, nullable=False)
    refresh_token = Column(String)
    expires_at = Column(DateTime)

    user = relationship("User", back_populates="user_oauth_accounts")

class DevWin(Base):
    __tablename__ = 'dev_wins'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    created_at = Column(DateTime, nullable=False, default=func.now())

    user = relationship("User", back_populates="user_dev_wins")


class CustomCategory(Base):
    __tablename__ = "custom_categories"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(50), nullable=False)
    user = relationship("User", back_populates="user_custom_categories")
    category_wins = relationship("Win", back_populates="win_category")


class Win(Base):
    __tablename__ = "wins"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(Text, nullable=False)
    custom_category_id = Column(Integer, ForeignKey("custom_categories.id", ondelete="CASCADE"), nullable=False)

    user = relationship("User", back_populates="user_wins")
    win_category = relationship("CustomCategory", back_populates="category_wins")