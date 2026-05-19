from api.index import app, db

with app.app_context():
    print("Dropping all tables...")
    db.drop_all()
    print("Creating all tables with new schema...")
    db.create_all()
    print("Database sync complete. 'status' column is now active.")