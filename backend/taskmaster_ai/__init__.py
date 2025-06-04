"""
Taskmaster-AI backend module bootstrap
"""
from .models import db
from .api import bp

def init_app(app):
    app.register_blueprint(bp, url_prefix='/podplay-planning')
    db.init_app(app)
