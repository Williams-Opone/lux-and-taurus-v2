import os
import ssl
from dotenv import load_dotenv
from flask import Flask
from .model import db, Lead

load_dotenv()

# 1. Spin up a temporary, independent Flask context wrapper
migrate_app = Flask(__name__)
migrate_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 2. Extract local records using your existing Model structures
print("Step 1: Reading records from your local pgAdmin database...")
migrate_app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql+pg8000://postgres:Fendyboii100%@localhost:5432/lux_taurus_db" # Replace with your real local password
db.init_app(migrate_app)

local_leads = []
with migrate_app.app_context():
    try:
        local_leads = Lead.query.all()
        print(f"✓ Found {len(local_leads)} records in your local environment.")
    except Exception as e:
        print(f"❌ Could not read from local database: {e}")
        exit(1)

if not local_leads:
    print("No leads found locally to migrate.")
    exit(0)

# 3. Re-initialize the app context to target your Serverless Neon Cloud node
print("\nStep 2: Connecting to your Serverless Neon Cloud node...")
cloud_app = Flask(__name__)
cloud_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# REMOVED '?sslmode=require' from the string to prevent driver crashes
cloud_app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql+pg8000://neondb_owner:npg_mIX9T6YHNqpB@ep-still-dream-alk0cnqs-pooler.c-3.eu-central-1.aws.neon.tech/neondb"

# Create a secure SSL context explicitly for pg8000 to accept the connection safely
ssl_context = ssl.create_default_context()

# Pass the connection parameters clean and raw using connect_args
cloud_app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    "connect_args": {
        "ssl_context": ssl_context
    }
}

# Re-bind the db instance to the new cloud app target
db.init_app(cloud_app)

with cloud_app.app_context():
    print("Step 3: Creating your database schema tables on Neon...")
    try:
        db.create_all() # This natively builds the 'leads' table safely on Neon
        print("✓ Database structure verified on Neon.")
    except Exception as e:
        print(f"❌ Could not establish table on Neon: {e}")
        exit(1)
        
    print(f"Step 4: Streaming your {len(local_leads)} leads to the cloud...")
    success_count = 0
    
    for lead in local_leads:
        try:
            # Create a brand new instance clone for the cloud database
            cloud_lead = Lead(
                name=lead.name,
                email=lead.email,
                phone=lead.phone,
                project_type=lead.project_type,
                message=lead.message
            )
            db.session.add(cloud_lead)
            success_count += 1
        except Exception as e:
            print(f"Skipping a corrupted lead entry row: {e}")
            
    try:
        db.session.commit()
        print("---")
        print(f"⚡ Success! All {success_count} leads are officially serverless and live on Neon!")
    except Exception as commit_err:
        db.session.rollback()
        print(f"❌ Failed to save entries to Neon: {commit_err}")