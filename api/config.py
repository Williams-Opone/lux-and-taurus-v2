import os
from dotenv import load_dotenv

# Ensure .env is loaded
load_dotenv()

class Config:
    ADMIN_SECRET_KEY = os.environ.get("ADMIN_SECRET_KEY")
    # SMTP Settings
    SMTP_SERVER = "mail.privateemail.com"
    SMTP_PORT = 465
    # Use 'or ""' to satisfy Pylance type-checking
    SMTP_USER = os.getenv("SMTP_USER") or ""
    SMTP_PASS = os.getenv("SMTP_PASS") or ""
    RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL") or ""
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or os.environ.get("POSTGRES_URL")
    if SQLALCHEMY_DATABASE_URI and SQLALCHEMY_DATABASE_URI.startswith("postgres://"):
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace("postgres://", "postgresql://", 1)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Flask Settings
    DEBUG = False
    TESTING = False