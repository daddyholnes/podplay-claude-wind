"""
Podplay Sanctuary Backend Bootstrap
- Initializes Flask, SQLAlchemy, SocketIO
- Loads config from .env and mama_bear_config_setup.py
- Registers Taskmaster-AI, Mem0, Scrapybara, Agent blueprints
- Health check endpoint
"""
import os
from flask import Flask, jsonify
from flask_socketio import SocketIO
from taskmaster_ai import init_app as init_taskmaster_ai
from mama_bear_config_setup import load_config
# Placeholder imports for Mem0 and Scrapybara integration
# from mem0_integration import init_mem0
# from scrapybara_integration import init_scrapybara

import asyncio
from mama_bear_complete_system import create_mama_bear_app, CompleteMamaBearSystem

async def create_enhanced_app():
    print("🐻 Initializing Mama Bear Development Sanctuary...")
    config = load_config()
    app = await create_mama_bear_app(config)
    init_taskmaster_ai(app)
    try:
        from mem0_integration import persist_to_mem0
        app.persist_to_mem0 = persist_to_mem0
    except ImportError:
        print("[INFO] Mem0 integration using enhanced system")
    try:
        from scrapybara_integration import bp as scrapybara_bp
        app.register_blueprint(scrapybara_bp, url_prefix='/api')
    except ImportError:
        print("[INFO] Scrapybara integration using enhanced system")
    print("🎉 Mama Bear Sanctuary is ready!")
    return app

def run_app():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        app = loop.run_until_complete(create_enhanced_app())
        system = app.mama_bear_system
        system.run(host="0.0.0.0", port=5000)
    except Exception as e:
        print(f"[ERROR] Failed to start Mama Bear system: {e}")

if __name__ == "__main__":
    run_app()
