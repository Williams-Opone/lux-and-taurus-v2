import os
from api.index import app, db
from api.model import Project

# Manually paste your local project data dictionary entries here
PORTFOLIO_ASSETS = [
    {
        "title": "Our Story Our Voice",
        "description": "A comprehensive NGO platform dedicated to celebrating Canadian ethno-cultural communities through storytelling and community engagement.",
        "tech_stack": "Next.js, Flask, PostgreSQL, Tailwind",
        "live_link": "https://ourstoryourvoice.org",
        "image_url": "https://res.cloudinary.com/dotcy7lhz/image/upload/v1778950931/osovlp_lbge0g.webp" # Replace with your real image URL later
    },
    {
        "title": "Adaka Global Inc",
        "description": "Multi-sector corporate infrastructure covering logistics, construction, and oil field services with a focus on operational efficiency.",
        "tech_stack": "React, TypeScript, Framer Motion, Vite",
        "live_link": "https://www.adakaglobalinc.com/",
        "image_url": "https://res.cloudinary.com/dotcy7lhz/image/upload/v1778951351/screencapture-adakaglobalinc-2026-05-16-18_05_06_twnzea.webp"
    },
    {
        "title": "Retroverse",
        "description": "A premium, high-octane e-commerce platform engineered for a contemporary streetwear brand. Built with a focus on immersive visuals and conversion architecture, Retroverse bridges the gap between nostalgic aesthetics and modern digital commerce. The platform features an ultra-clean user experience, dynamic product discovery layers, and optimized checkout pathways designed to capture high-intent traffic and maximize average order value.",
        "tech_stack": "HTML, CSS, JavaScript, Python, Bootstrap",
        "live_link": "#",
        "image_url": "https://res.cloudinary.com/dotcy7lhz/image/upload/v1779011855/retro_meq5oz.webp"
    }
]

def migrate_to_neon():
    with app.app_context():
        print("// Accessing Neon database cluster...")
        
        # Verify the table exists in Neon
        db.create_all()
        
        # Double check if projects are already inside to prevent duplicates
        if Project.query.count() == 0:
            print("// Seeding records to Neon projects structure...")
            for asset in PORTFOLIO_ASSETS:
                project = Project(
                    title=asset["title"],
                    description=asset["description"],
                    tech_stack=asset["tech_stack"],
                    image_url=asset["image_url"],
                    live_link=asset["live_link"]
                )
                db.session.add(project)
            db.session.commit()
            print("// Success: Vault items successfully pushed to Neon node.")
        else:
            print("// Notice: Projects table already contains data nodes.")

if __name__ == "__main__":
    migrate_to_neon()