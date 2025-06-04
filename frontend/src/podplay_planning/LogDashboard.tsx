// LogDashboard: Persistent log/task/plan viewer for Podplay Planning
// To be implemented using Magic MCP components
import React from 'react';
import MagicMCPDashboard from './MagicMCPDashboard';

const LogDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Podplay Logs & Plans</h1>
      <div className="mt-6"><MagicMCPDashboard /></div>
    </div>
  );
};

export default LogDashboard;
