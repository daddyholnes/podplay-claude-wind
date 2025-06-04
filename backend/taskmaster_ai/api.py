"""
API endpoints for Podplay Planning & Logging System
- Logs, Tasks, Plans, ContextSnapshots
"""
from flask import Blueprint, request, jsonify
from .models import db, Log, Task, Plan, ContextSnapshot

bp = Blueprint('podplay_planning', __name__)

@bp.route('/podplay_logs', methods=['POST'])
def create_log():
    data = request.json
    log = Log(level=data.get('level', 'INFO'), message=data['message'], context=data.get('context', ''))
    db.session.add(log)
    db.session.commit()
    return jsonify({'id': log.id}), 201

@bp.route('/podplay_logs', methods=['GET'])
def get_logs():
    logs = Log.query.order_by(Log.timestamp.desc()).limit(100).all()
    return jsonify([{'id': l.id, 'timestamp': l.timestamp.isoformat(), 'level': l.level, 'message': l.message, 'context': l.context} for l in logs])

@bp.route('/podplay_tasks', methods=['POST'])
def create_task():
    data = request.json
    task = Task(title=data['title'], status=data.get('status', 'pending'), details=data.get('details', ''))
    db.session.add(task)
    db.session.commit()
    return jsonify({'id': task.id}), 201

@bp.route('/podplay_tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.order_by(Task.created_at.desc()).limit(100).all()
    return jsonify([{'id': t.id, 'created_at': t.created_at.isoformat(), 'updated_at': t.updated_at.isoformat(), 'title': t.title, 'status': t.status, 'details': t.details} for t in tasks])

@bp.route('/podplay_plans', methods=['POST'])
def create_plan():
    data = request.json
    plan = Plan(description=data['description'], steps=data.get('steps', ''))
    db.session.add(plan)
    db.session.commit()
    return jsonify({'id': plan.id}), 201

@bp.route('/podplay_plans', methods=['GET'])
def get_plans():
    plans = Plan.query.order_by(Plan.created_at.desc()).limit(100).all()
    return jsonify([{'id': p.id, 'created_at': p.created_at.isoformat(), 'description': p.description, 'steps': p.steps} for p in plans])

@bp.route('/podplay_context_snapshots', methods=['POST'])
def create_context_snapshot():
    data = request.json
    snap = ContextSnapshot(snapshot=data['snapshot'])
    db.session.add(snap)
    db.session.commit()
    return jsonify({'id': snap.id}), 201

@bp.route('/podplay_context_snapshots', methods=['GET'])
def get_context_snapshots():
    snaps = ContextSnapshot.query.order_by(ContextSnapshot.timestamp.desc()).limit(100).all()
    return jsonify([{'id': s.id, 'timestamp': s.timestamp.isoformat(), 'snapshot': s.snapshot} for s in snaps])
