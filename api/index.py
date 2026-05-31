import os
import sys
import requests
from bs4 import BeautifulSoup
from flask import jsonify
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

# Path handling rules
basedir = os.path.abspath(os.path.dirname(__file__))
rootdir = os.path.abspath(os.path.join(basedir, os.path.pardir))
if rootdir not in sys.path:
    sys.path.insert(0, rootdir)

load_dotenv(os.path.join(rootdir, '.env'))
load_dotenv(os.path.join(basedir, '.env'))

app = Flask(__name__)

# 🛡️ CORS LOCKDOWN: Only allow authorized endpoints to speak to this backend
CORS(app, origins=[
    "http://localhost:5173",
    "https://www.luxandtaurus.com",
    "https://luxandtaurus.com"
])

# 🛡️ STRICT ENVIRONMENTAL CONFIGURATION (No hardcoded backups)
database_url = os.getenv('SQLALCHEMY_DATABASE_URI') or os.getenv('DATABASE_URL')
admin_key = os.getenv('ADMIN_SECRET_KEY')

if not database_url:
    raise RuntimeError("CRITICAL_CONFIGURATION_FAILURE: DATABASE_URL is missing from environment variables.")

if not admin_key:
    raise RuntimeError("CRITICAL_CONFIGURATION_FAILURE: ADMIN_SECRET_KEY is missing from environment variables.")

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['ADMIN_SECRET_KEY'] = admin_key

# Native mail client setup configuration parameters
app.config['SMTP_SERVER'] = os.getenv('SMTP_SERVER')
app.config['SMTP_PORT'] = int(os.getenv('SMTP_PORT', 465))
app.config['SMTP_USER'] = os.getenv('SMTP_USER')
app.config['SMTP_PASS'] = os.getenv('SMTP_PASS')
app.config['RECEIVER_EMAIL'] = os.getenv('RECEIVER_EMAIL')

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Extract database entities from your schema file
from api.model import db, Lead, Project

db.init_app(app)

# Create tables if they do not exist inside Neon
with app.app_context():
    db.create_all()


@app.route('/api/scrape-leads', methods=['GET'])
def scrape_leads():
    # We are completely skipping the web scraper for a moment.
    # Instead, we are just handing Activepieces exactly what it wants to see.
    
    leads = [
        {
            "company_name": "Test Agency LLC",
            "website": "apple.com"
        }
    ]

    return jsonify({"leads": leads}), 200


@app.route("/api/contact", methods=["POST"])
def contact():
    try:
        data = request.json or {}
        
        name = data.get("name", "Unknown")
        email = data.get("email", "No Email")
        phone = data.get("phone", "Not Provided")
        project_type = data.get("projectType", "General Inquiry")
        message = data.get("message", "")

        new_lead = Lead(
            name=name,
            email=email,
            phone=phone,
            project_type=project_type,
            message=message
        )
        db.session.add(new_lead)
        db.session.commit()

        try:
            user = app.config['SMTP_USER']
            password = app.config['SMTP_PASS']
            receiver = app.config['RECEIVER_EMAIL']

            if not all([user, password, receiver]):
                raise ValueError("SMTP variables are unconfigured.")

            msg = MIMEMultipart()
            msg['From'] = user
            msg['To'] = receiver
            msg['Subject'] = f"MISSION_INTAKE: {project_type} from {name}"
            msg.add_header('reply-to', email)

            body = (
                f"--- LUX & TAURUS MISSION BRIEF ---\n\n"
                f"Name: {name}\n"
                f"Email: {email}\n"
                f"Phone: {phone}\n"
                f"Project: {project_type}\n\n"
                f"Message Details:\n{message}\n\n"
                f"Lead ID: {new_lead.id}\n"
                f"----------------------------------"
            )
            msg.attach(MIMEText(body, 'plain'))

            with smtplib.SMTP_SSL(app.config['SMTP_SERVER'], app.config['SMTP_PORT'], timeout=15) as server:
                server.login(user, password)
                server.sendmail(user, receiver, msg.as_string())
            
            return jsonify({"status": "success", "message": "Mission brief logged and transmitted."}), 200

        except Exception as mail_err:
            print(f"!!! DATABASE SAVED, BUT EMAIL FAILED: {str(mail_err)}")
            return jsonify({
                "status": "success", 
                "message": "Mission logged successfully. Our team will reach out."
            }), 200

    except Exception as e:
        db.session.rollback()
        print(f"!!! CRITICAL DATABASE ERROR: {str(e)}")
        return jsonify({"status": "error", "message": "System error encountered."}), 500
    
@app.route("/api/admin/leads", methods=["GET"])
def get_leads():
    auth_header = request.headers.get('Authorization')

    # 🛡️ REMOVED EXPOSITORY PLAIN-TEXT SECURITY TELEMETRY PRINTS
    if auth_header != f"Bearer {app.config.get('ADMIN_SECRET_KEY')}":
        return jsonify({"error": "Unauthorized"}), 401
    
    try:
        leads = Lead.query.order_by(Lead.created_at.desc()).all()
        return jsonify([{
            "id": l.id,
            "name": l.name,
            "email": l.email,
            "phone": l.phone,
            "project_type": l.project_type,
            "message": l.message,
            "status": l.status,
            "created_at": l.created_at.isoformat()
        } for l in leads]), 200
    except Exception as e:
        return jsonify({"error": "Internal transmission failure."}), 500
    
@app.route("/api/projects", methods=["GET"])
def get_projects():
    try:
        projects = Project.query.order_by(Project.created_at.desc()).all()
        return jsonify([{
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "tech_stack": p.tech_stack,
            "live_link": p.live_link,
            "image_url": p.image_url
        } for p in projects]), 200
    except Exception as e:
        return jsonify({"status": "error", "message": "Failed to stream portfolio assets."}), 500

@app.route("/api/admin/projects", methods=["POST"])
def add_project():
    auth_header = request.headers.get('Authorization')
    if auth_header != f"Bearer {app.config.get('ADMIN_SECRET_KEY')}":
        return jsonify({"error": "Unauthorized"}), 401

    try:
        data = request.json or {}
        new_project = Project(
            title=data.get('title'),
            description=data.get('description'),
            tech_stack=data.get('tech_stack'),
            image_url=data.get('image_url'),
            live_link=data.get('live_link')
        )
        db.session.add(new_project)
        db.session.commit()
        return jsonify({"status": "success", "message": "Project deployed to database node."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": "Failed to write database record."}), 500

@app.route("/api/admin/projects/<int:project_id>", methods=["PUT"])
def update_project(project_id):
    auth_header = request.headers.get('Authorization')
    if auth_header != f"Bearer {app.config.get('ADMIN_SECRET_KEY')}":
        return jsonify({"error": "Unauthorized"}), 401

    try:
        project = Project.query.get_or_404(project_id)
        data = request.json or {}
        
        project.title = data.get('title', project.title)
        project.description = data.get('description', project.description)
        project.tech_stack = data.get('tech_stack', project.tech_stack)
        project.image_url = data.get('image_url', project.image_url)
        project.live_link = data.get('live_link', project.live_link)
        
        db.session.commit()
        return jsonify({"status": "success", "message": "Project configurations updated."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": "Modification transaction aborted."}), 500

@app.route("/api/admin/projects/<int:project_id>", methods=["DELETE"])
def delete_project(project_id):
    auth_header = request.headers.get('Authorization')
    if auth_header != f"Bearer {app.config.get('ADMIN_SECRET_KEY')}":
        return jsonify({"error": "Unauthorized"}), 401

    try:
        project = Project.query.get_or_404(project_id)
        db.session.delete(project)
        db.session.commit()
        return jsonify({"status": "success", "message": "Project permanently purged from Vault."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": "Purge transaction aborted."}), 500
    
if __name__ == "__main__":
    app.run(debug=True, port=5000)