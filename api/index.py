import os
import sys
import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from urllib.parse import urlparse
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



# ---------------------------------------------------------
# ROUTE 1: CLUTCH.CO (Marketing Agencies)
# ---------------------------------------------------------
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def extract_clean_domain(url_string):
    """
    Strips protocols, www, sub-paths, and query strings down to a 
    clean domain so Hunter.io never suffers an API failure.
    """
    if not url_string:
        return ""
    try:
        url_string = url_string.strip()
        if not url_string.startswith(('http://', 'https://')):
            url_string = 'https://' + url_string
        parsed = urlparse(url_string)
        domain = parsed.netloc
        if domain.startswith('www.'):
            domain = domain[4:]
        return domain
    except Exception:
        return ""

# ---------------------------------------------------------
# ROUTE 1: CLUTCH (Dynamic Multi-Page Dev Agency Targeter)
# ---------------------------------------------------------
@app.route('/api/scrape-clutch', methods=['GET'])
def scrape_clutch():
    # Target actual software/web development agencies instead of marketing
    categories = ['web-development', 'software-development', 'mobile-app-development']
    leads = []
    
    try:
        # Loop over categories and look 3 pages deep for each
        for category in categories:
            for page in range(1, 4):
                url = f"https://clutch.co/agencies/{category}?page={page}"
                print(f"Scraping Clutch: {url}")
                
                response = requests.get(url, headers=HEADERS, timeout=15)
                if response.status_code != 200:
                    continue
                
                soup = BeautifulSoup(response.text, 'html.parser')
                for listing in soup.find_all('li', class_='provider-row'):
                    name_element = listing.find('h3', class_='company_info')
                    website_element = listing.find('a', class_='website-link__item')

                    if name_element and website_element and website_element.has_attr('href'):
                        website_url = str(website_element['href'])
                        if website_url.startswith('http') and "clutch.co" not in website_url:
                            leads.append({
                                "company_name": name_element.text.strip(),
                                "website": extract_clean_domain(website_url)
                            })
                            
        return jsonify({"leads": leads}), 200
    except Exception as e:
        return jsonify({"error": str(e), "leads": []}), 500


# ---------------------------------------------------------
# ROUTE 2: Y COMBINATOR (Historical Cohort Scraper)
# ---------------------------------------------------------
@app.route('/api/scrape-ycombinator', methods=['GET'])
def scrape_ycombinator():
    # Target multiple heavily funded startup batches from recent years
    batches = ["w26", "s25", "w25", "s24", "w24"]
    leads = []

    try:
        for batch in batches:
            target_url = f"https://www.ycombinator.com/companies?batch={batch}"
            response = requests.get(target_url, headers=HEADERS, timeout=15)
            if response.status_code != 200:
                continue
                
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
                        "website": extract_clean_domain(str(website_element['href']))
                    })

        return jsonify({"leads": leads}), 200
    except Exception as e:
        return jsonify({"error": str(e), "leads": []}), 500


# ---------------------------------------------------------
# ROUTE 3: WE WORK REMOTELY (Multi-Category Pipeline)
# ---------------------------------------------------------
@app.route('/api/scrape-directory', methods=['GET'])
def scrape_directory():
    # Expand to track all engineering frameworks that hire freelancers/agencies
    categories = [
        "remote-full-stack-programming-jobs",
        "remote-back-end-programming-jobs",
        "remote-front-end-programming-jobs",
        "remote-devops-sysadmin-jobs"
    ]
    leads = []
    ignored_domains = ["weworkremotely.com", "twitter.com", "linkedin.com", "instagram.com", "facebook.com", "youtube.com", "tiktok.com", "apple.com", "google.com"]

    try:
        print("\n--- STARTING WEWORKREMOTELY AGGREGATION ---")
        for category in categories:
            target_url = f"https://weworkremotely.com/categories/{category}"
            response = requests.get(target_url, headers=HEADERS, timeout=15)
            if response.status_code != 200:
                continue

            soup = BeautifulSoup(response.text, 'html.parser')
            job_cards = soup.find_all(['li', 'div'], class_=['feature', 'new-listing-container'])

            for listing in job_cards:
                name_element = listing.find(['span', 'h2'], class_=['company', 'new-listing__header__title__text'])
                job_links = listing.find_all('a', href=True)
                job_link_element = job_links[1] if len(job_links) > 1 else None

                if name_element and job_link_element:
                    company_name = name_element.text.strip()
                    job_url_path = str(job_link_element['href'])
                    
                    if job_url_path.startswith('/'):
                        full_job_url = f"https://weworkremotely.com{job_url_path}"
                        
                        try:
                            job_response = requests.get(full_job_url, headers=HEADERS, timeout=10)
                            job_soup = BeautifulSoup(job_response.text, 'html.parser')
                            real_website_url = None
                            
                            for link in job_soup.find_all('a', href=True):
                                current_link = str(link['href'])
                                if current_link.startswith('http'):
                                    if not any(domain in current_link for domain in ignored_domains):
                                        real_website_url = current_link
                                        break 

                            if real_website_url:
                                leads.append({
                                    "company_name": company_name,
                                    "website": extract_clean_domain(real_website_url)
                                })
                        except Exception:
                            continue 

        return jsonify({"leads": leads}), 200
    except Exception as e:
        return jsonify({"error": str(e), "leads": []}), 500


# ---------------------------------------------------------
# ROUTE 4: REMOTE OK API (High-Volume Native JSON Stream)
# ---------------------------------------------------------
@app.route('/api/scrape-remoteok', methods=['GET'])
def scrape_remoteok():
    leads = []
    # Remote OK provides a direct data endpoint
    url = "https://remoteok.com/api"
    
    try:
        # Remote OK strictly blocks basic python-requests, headers are mandatory
        response = requests.get(url, headers=HEADERS, timeout=15)
        if response.status_code != 200:
            return jsonify({"error": "Failed fetching data stream", "leads": []}), response.status_code
            
        data = response.json()
        
        # Element [0] is legal/metadata text infrastructure; we skip it and loop the actual payload
        for item in data[1:]:
            if isinstance(item, dict) and "company" in item and "url" in item:
                company_name = item.get("company", "").strip()
                company_job_url = item.get("url", "")
                
                # RemoteOK links point internally, but we extract the clean name as fallback website
                # or pass the profile route to parse out later. 
                # Hunter.io can discover emails using the root company domain name string as fallback.
                raw_company_slug = item.get("company", "").lower().replace(" ", "").replace(",", "") + ".com"
                
                leads.append({
                    "company_name": company_name,
                    "website": extract_clean_domain(raw_company_slug)
                })
                
        return jsonify({"leads": list({v['website']:v for v in leads}.values())}), 200 # Instant deduplication
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
            # ✨ FIXED: Safe conditional check checks if timestamp exists before running .isoformat()
            "created_at": l.created_at.isoformat() if l.created_at is not None else dayjs_fallback_placeholder()
        } for l in leads]), 200
    except Exception as e:
        print(f"!!! ADMIN LEADS FETCH CRASH: {str(e)}")
        return jsonify({"error": f"Internal transmission failure: {str(e)}"}), 500

# Simple helper function to provide a fallback string if columns are blank
def dayjs_fallback_placeholder():
    from datetime import datetime
    return datetime.utcnow().isoformat()


# 2. BRAND NEW DELETE ROUTE 
@app.route("/api/admin/leads/<int:lead_id>", methods=["DELETE"])
def delete_lead(lead_id):
    auth_header = request.headers.get('Authorization')
    if auth_header != f"Bearer {app.config.get('ADMIN_SECRET_KEY')}":
        return jsonify({"error": "Unauthorized"}), 401
        
    try:
        lead_to_terminate = Lead.query.get_or_404(lead_id)
        db.session.delete(lead_to_terminate)
        db.session.commit()
        return jsonify({"status": "success", "message": f"Lead {lead_id} purged from engine."}), 200
    except Exception as e:
        db.session.rollback()
        print(f"!!! ADMIN PURGE ERROR: {str(e)}")
        return jsonify({"error": "Purge sequence interrupted."}), 500
    
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