import sys
import os

# Add the current directory to sys.path so Python can find config and model
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.append(current_dir)

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# ABSOLUTE IMPORTS (No dots)
try:
    from config import Config
    from model import db, Lead,Project
except ImportError:
    # This backup helps Vercel's specific pathing
    from api.config import Config
    from api.model import db, Lead,Project

load_dotenv() # This loads the variables from .env into os.environ
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Initialize Database with App
db.init_app(app)

# Create tables if they don't exist
with app.app_context():
    db.create_all()


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