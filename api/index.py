import os
import sys
import requests
from bs4 import BeautifulSoup
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

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Connection": "keep-alive",
}

# ---------------------------------------------------------
# ROUTE 1: CLUTCH.CO (Marketing Agencies)
# ---------------------------------------------------------
@app.route('/api/scrape-clutch', methods=['GET'])
def scrape_clutch():
    target_urls = [
        "https://clutch.co/agencies/digital-marketing?page=1",
        "https://clutch.co/agencies/digital-marketing?page=2"
    ]
    leads = []

    try:
        for url in target_urls:
            response = requests.get(url, headers=HEADERS, timeout=15)
            if response.status_code != 200:
                continue
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            for listing in soup.find_all('li', class_='provider-row'):
                name_element = listing.find('h3', class_='company_info')
                website_element = listing.find('a', class_='website-link__item')

                if name_element and website_element and website_element.has_attr('href'):
                    # Force Python to treat the href as a string to satisfy Pylance
                    website_url = str(website_element['href'])
                        
                    if website_url.startswith('http') and "clutch.co" not in website_url:
                        leads.append({
                            "company_name": name_element.text.strip(),
                            "website": website_url
                        })

        return jsonify({"leads": leads}), 200
    except Exception as e:
        return jsonify({"error": str(e), "leads": []}), 500


# ---------------------------------------------------------
# ROUTE 2: Y COMBINATOR (Tech Startups)
# ---------------------------------------------------------
@app.route('/api/scrape-ycombinator', methods=['GET'])
def scrape_ycombinator():
    target_url = "https://www.ycombinator.com/companies?batch=W24"
    leads = []

    try:
        response = requests.get(target_url, headers=HEADERS, timeout=15)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        for listing in soup.find_all('a', class_='_company_'):
            name_element = listing.find('span', class_='_coName_')
            
            website_element = None
            for link in listing.find_all('a', href=True):
                if "http" in link.get_text():
                    website_element = link
                    break

            if name_element and website_element and website_element.has_attr('href'):
                leads.append({
                    "company_name": name_element.text.strip(),
                    "website": str(website_element['href'])
                })

        return jsonify({"leads": leads}), 200
    except Exception as e:
        return jsonify({"error": str(e), "leads": []}), 500


# ---------------------------------------------------------
# ROUTE 3: WE WORK REMOTELY (High-Intent Tech Buyers)
# ---------------------------------------------------------
@app.route('/api/scrape-directory', methods=['GET'])
def scrape_directory():
    target_url = "https://weworkremotely.com/categories/remote-full-stack-programming-jobs"
    leads = []

    try:
        response = requests.get(target_url, headers=HEADERS, timeout=15)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # STEP 1: Find the job cards using your exact inspected container class
        # We look for "new-listing-container" to capture all matching containers safely
        for listing in soup.find_all('div', class_='new-listing-container'):
            name_element = listing.find('h2', class_='new-listing__header__title__text')
            job_link_element = listing.find('a', class_='listing-link--unlocked')

            if name_element and job_link_element and job_link_element.has_attr('href'):
                company_name = name_element.text.strip()
                job_url_path = str(job_link_element['href'])
                
                # Check if it's an internal WeWorkRemotely path
                if job_url_path.startswith('/'):
                    # Build the full absolute URL so Python can make the request
                    full_job_url = f"https://weworkremotely.com{job_url_path}"
                    
                    # STEP 2: Navigate inside the specific job post to find the real corporate site
                    try:
                        job_response = requests.get(full_job_url, headers=HEADERS, timeout=10)
                        job_soup = BeautifulSoup(job_response.text, 'html.parser')
                        
                        real_website_url = None
                        
                        # Loop through all links on the single post page
                        for link in job_soup.find_all('a', href=True):
                            current_link = str(link['href'])
                            
                            # Grab the first external link that isn't a job board or social profile
                            if current_link.startswith('http') and "weworkremotely.com" not in current_link:
                                if "twitter.com" not in current_link and "linkedin.com" not in current_link:
                                    real_website_url = current_link
                                    break # Core company URL found, exit internal loop

                        if real_website_url:
                            leads.append({
                                "company_name": company_name,
                                "website": real_website_url
                            })
                            
                    except Exception as inner_e:
                        print(f"Failed to scrape internal page for {company_name}: {inner_e}")
                        continue 

        return jsonify({"leads": leads}), 200
    except Exception as e:
        return jsonify({"error": str(e), "leads": []}), 500


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