from app import create_app
from taskmaster_ai.models import db

app, _ = create_app()
with app.app_context():
    db.create_all()
    print("Database tables created successfully.")
