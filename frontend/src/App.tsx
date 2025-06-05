import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import MagicMCPDashboard from "@/podplay_planning/MagicMCPDashboard";
const MamaBearChatPage = React.lazy(() => import("@/podplay_mama/MamaBearChatPage"));
const OrchestrationDashboard = React.lazy(() => import("@/podplay_mama/OrchestrationDashboard"));
const MamaBearWorkspacePage = React.lazy(() => import("@/podplay_workspace/MamaBearWorkspacePage"));

function MainNav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-gradient-to-b from-purple-900/80 to-transparent shadow-lg flex items-center px-8 py-3 gap-6">
      <Link to="/" className="font-bold text-xl text-white tracking-wide hover:text-purple-200 transition">Sanctuary</Link>
      <Link to="/dashboard" className="text-white hover:text-purple-200 transition">Dashboard</Link>
      <Link to="/mama-bear" className="text-white hover:text-pink-200 transition">Mama Bear</Link>
      <Link to="/orchestration" className="text-white hover:text-blue-200 transition">Orchestration</Link>
      <Link to="/workspaces" className="text-white hover:text-green-200 transition">Workspaces</Link>
    </nav>
  );
}

const App: React.FC = () => {
  return (
    <Router>
      <MainNav />
      <div className="pt-20 min-h-screen bg-black/90">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<MagicMCPDashboard />} />
          <Route path="/mama-bear" element={
            <Suspense fallback={<div className="text-center text-white pt-32">Loading Mama Bear...</div>}>
              <MamaBearChatPage />
            </Suspense>
          } />
          <Route path="/orchestration" element={
            <Suspense fallback={<div className="text-center text-white pt-32">Loading Orchestration...</div>}>
              <OrchestrationDashboard />
            </Suspense>
          } />
          <Route path="/workspaces" element={
            <Suspense fallback={<div className="text-center text-white pt-32">Loading Workspaces...</div>}>
              <MamaBearWorkspacePage />
            </Suspense>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
