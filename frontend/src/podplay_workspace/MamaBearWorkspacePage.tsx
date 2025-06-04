import React, { useState } from "react";
import { SanctuaryWorkspaceCard } from "../../shared-components/src/components/sanctuary/SanctuaryWorkspaceCard";
import { AgentPlan } from "../../shared-components/src/components/ui/AgentPlan";
import { useLivePlans } from "../hooks/useLivePlans";
import { useAgentPlanActions } from "../hooks/useAgentPlanActions";

interface Workspace {
  id: string;
  name: string;
  status: "idle" | "provisioning" | "active" | "error";
  planId?: string;
  agent?: string;
}

const initialWorkspaces: Workspace[] = [
  { id: "1", name: "Design VM", status: "idle", agent: "Gemini" },
  { id: "2", name: "Planning VM", status: "idle", agent: "Claude" },
];

export const MamaBearWorkspacePage: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [provisioning, setProvisioning] = useState(false);
  const { plans } = useLivePlans();
  const { runSubtask, pauseSubtask, reassignSubtask } = useAgentPlanActions();

  const handleProvision = (wsId: string) => {
    setProvisioning(true);
    setTimeout(() => {
      setWorkspaces((prev) =>
        prev.map((ws) =>
          ws.id === wsId ? { ...ws, status: "active", planId: "plan1" } : ws
        )
      );
      setProvisioning(false);
    }, 1200);
  };

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>Mama Bear Workspaces</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>
        Spin up collaborative VMs for design, planning, and agentic teamwork. Each workspace can run its own plan, agents, and chat.
      </p>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {workspaces.map((ws) => (
          <SanctuaryWorkspaceCard
            key={ws.id}
            name={ws.name}
            status={ws.status}
            agent={ws.agent}
            theme={ws.id === "1" ? "sanctuary" : "cyber"}
            stats={
              ws.status === "active"
                ? [
                    { label: "Subtasks", value: String((plans.find((p) => p.id === ws.planId)?.subtasks.length || 0) ) },
                    { label: "Agent", value: ws.agent || "-" },
                  ]
                : []
            }
          >
            {ws.status === "idle" && (
              <button
                onClick={() => handleProvision(ws.id)}
                disabled={provisioning}
                style={{
                  marginTop: 18,
                  padding: "10px 22px",
                  background: provisioning ? "#aaa" : "#8b5cf6",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: provisioning ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                }}
              >
                {provisioning ? "Provisioning..." : "Spin Up Workspace"}
              </button>
            )}
            {ws.status === "active" && ws.planId && (
              <div style={{ marginTop: 16 }}>
                <AgentPlan
                  plan={plans.find((p) => p.id === ws.planId) || { id: ws.planId, title: "Sample Plan", subtasks: [] }}
                  onRunStep={runSubtask}
                  onPauseStep={pauseSubtask}
                  onReassignStep={reassignSubtask}
                  compact
                />
              </div>
            )}
            {ws.status === "error" && (
              <div style={{ color: "#f55" }}>Error provisioning workspace. Try again.</div>
            )}
          </SanctuaryWorkspaceCard>
        ))}
      </div>
    </div>
  );
};

export default MamaBearWorkspacePage;
