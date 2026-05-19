from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# We initialize the DB here but bind it to the app in index.py
db = SQLAlchemy()

class Lead(db.Model):
    __tablename__ = 'leads'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(25), nullable=True)
    project_type = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default="NEW")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, name, email, phone, project_type, message):
        self.name = name
        self.email = email
        self.phone = phone
        self.project_type = project_type
        self.message = message

class Project(db.Model):
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    tech_stack = db.Column(db.String(200)) # e.g., "React, Flask, Postgres"
    live_link = db.Column(db.String(255))
    image_url = db.Column(db.String(550)) # Link to hosted image
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, title, description, tech_stack, live_link, image_url):
        self.title = title
        self.description = description
        self.tech_stack = tech_stack
        self.live_link = live_link
        self.image_url = image_url