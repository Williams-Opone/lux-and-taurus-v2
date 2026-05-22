import os
import sys
from flask import Flask, jsonify, request
from dotenv import load_dotenv

# Path handling rules
basedir = os.path.abspath(os.path.dirname(__file__))
rootdir = os.path.abspath(os.path.join(basedir, os.path.pardir))
if rootdir not in sys.path:
    sys.path.insert(0, rootdir)

load_dotenv(os.path.join(rootdir, '.env'))
load_dotenv(os.path.join(basedir, '.env'))

app = Flask(__name__)

# --- BULLETPROOF DIRECT INJECTION FALLBACK ---
# If os.getenv comes back completely empty, we manually supply your Neon token directly
database_url = os.getenv('SQLALCHEMY_DATABASE_URI') or os.getenv('DATABASE_URL')

if not database_url:
    # ⚠️ REPLACE THE STRING BELOW WITH YOUR ACTUAL NEON CONNECTION STRING FROM YOUR NEON DASHBOARD
    database_url = "postgresql+psycopg2://neondb_owner:npg_mIX9T6YHNqpB@ep-still-dream-alk0cnqs-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    print("\n⚠️ NOTICE: Using hardcoded database string backup.")
else:
    print(f"\n✅ CONNECTION_STREAM_SECURE: Environment mapping verified.")

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Hardcoded Method B fallback so your frontend login handshake balances securely
app.config['ADMIN_SECRET_KEY'] = os.getenv('ADMIN_SECRET_KEY') or "Fendyboii1jec00%"

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Extract full database entities from your schema file
from api.model import db, Lead, Project

db.init_app(app)

# ... rest of your active backend routing endpoints ...

# Create tables if they don't exist
with app.app_context():
    db.create_all()  # Verifies or builds the structural tables in Neon
    
    if Project.query.count() == 0:
        print("// System_Seed: Initializing vault configuration nodes...")
        sample_projects = [
            Project(
                title="Our Story Our Voice", 
                description="Storytelling and donation platform dedicated to celebrating Canadian ethno-cultural communities.", 
                tech_stack="Next.js, Flask, PostgreSQL", 
                live_link="https://ourstoryourvoice.org", 
                image_url="https://placehold.co/600x400/000000/10b981?text=Our+Story+Our+Voice"
            ),
            Project(
                title="Adaka Global", 
                description="Industrial inventory management and global corporate asset tracking infrastructure.", 
                tech_stack="React, TypeScript, Tailwind", 
                live_link="#", 
                image_url="https://placehold.co/600x400/000000/10b981?text=Adaka+Global"
            )
        ]
        db.session.bulk_save_objects(sample_projects)
        db.session.commit()
        print("// System_Seed: Portfolio entities loaded successfully into Neon.")
    else:
        print("// System_Monitor: Project records located. Skipping database seed.")

@app.route("/api/contact", methods=["POST"])
def contact():
    try:
        data = request.json or {}
        
        # 1. CAPTURE DATA
        name = data.get("name", "Unknown")
        email = data.get("email", "No Email")
        phone = data.get("phone", "Not Provided")
        project_type = data.get("projectType", "General Inquiry")
        message = data.get("message", "")

        # 2. SAVE TO POSTGRES (The Most Important Step)
        new_lead = Lead(
            name=name,
            email=email,
            phone=phone,
            project_type=project_type,
            message=message
        )
        db.session.add(new_lead)
        db.session.commit()

        # 3. ATTEMPT EMAIL NOTIFICATION
        # Separate try block: don't let a slow email break a successful DB save
        try:
            user = app.config['SMTP_USER']
            password = app.config['SMTP_PASS']
            receiver = app.config['RECEIVER_EMAIL']

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

            # Increased timeout to 15 seconds due to local latency
            with smtplib.SMTP_SSL(app.config['SMTP_SERVER'], app.config['SMTP_PORT'], timeout=15) as server:
                server.login(user, password)
                server.sendmail(user, receiver, msg.as_string())
            
            return jsonify({"status": "success", "message": "Mission brief logged and transmitted."}), 200

        except Exception as mail_err:
            # If mail fails, we STILL return success because the data is safe in Postgres
            print(f"!!! DATABASE SAVED, BUT EMAIL FAILED: {str(mail_err)}")
            return jsonify({
                "status": "success", 
                "message": "Mission logged successfully. Our team will reach out."
            }), 200

    except Exception as e:
        db.session.rollback()
        print(f"!!! CRITICAL DATABASE ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"status": "error", "message": "System error. Please try again later."}), 500
    
@app.route("/api/admin/leads", methods=["GET"])
def get_leads():
    # Simple check for your Admin Secret Key
    auth_header = request.headers.get('Authorization')
    # 🧪 TEMPORARY DEBUG LOGS (Check your console terminal output when you run this)
    print(f"--- SECURITY PROTOCOL DEBUG ---")
    print(f"FRONTEND_SENT: {auth_header}")
    print(f"BACKEND_EXPECTED: Bearer {app.config.get('ADMIN_SECRET_KEY')}")
    print(f"--------------------------------")

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
        return jsonify({"error": str(e)}), 500
    
# --- PUBLIC: GET ALL PROJECTS (For your homepage portfolio) ---
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
        return jsonify({"status": "error", "message": str(e)}), 500

# --- ADMIN: CREATE NEW PROJECT ---
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
        return jsonify({"status": "error", "message": str(e)}), 500

# --- ADMIN: UPDATE EXISTING PROJECT ---
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
        return jsonify({"status": "error", "message": str(e)}), 500

# --- ADMIN: DELETE PROJECT ---
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
        return jsonify({"status": "error", "message": str(e)}), 500
    
if __name__ == "__main__":
    app.run(debug=True, port=5000)