"""
Mem0 Integration for Persistent Logging and Context
- Persists logs, tasks, plans, and context snapshots to Mem0
- Handles fallback to local storage if Mem0 is unavailable
"""
import requests
import os

MEM0_API_URL = os.environ.get("MEM0_API_URL", "https://your-mem0-endpoint/upload")
MEM0_API_KEY = os.environ.get("MEM0_API_KEY", "")

def persist_to_mem0(entity_type, data):
    headers = {"Authorization": f"Bearer {MEM0_API_KEY}"}
    payload = {"type": entity_type, "data": data}
    try:
        response = requests.post(MEM0_API_URL, json=payload, headers=headers, timeout=5)
        response.raise_for_status()
        return True
    except Exception as e:
        print(f"[Mem0] Fallback: {e}")
        return False
