"""
Quota and Usage Tracking for Mama Bear Agents
- Tracks API/model usage, VM quotas, and alerts
"""
class QuotaManager:
    def __init__(self, config, log_func):
        self.config = config
        self.log = log_func
        self.usage = {}
        self.log('QuotaManager initialized', level='INFO')
    def record_usage(self, key, amount):
        self.usage[key] = self.usage.get(key, 0) + amount
        self.log(f"Usage recorded: {key} += {amount}", level='DEBUG')
    def get_status(self):
        return dict(self.usage)
    def check_quota(self, key):
        limit = self.config.get('quota', {}).get(key)
        used = self.usage.get(key, 0)
        if limit is not None and used >= limit:
            self.log(f"Quota exceeded for {key}", level='WARNING')
            return False
        return True
