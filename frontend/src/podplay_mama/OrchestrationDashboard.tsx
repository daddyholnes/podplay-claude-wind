import React from "react";
import { useLivePlans } from "../hooks/useLivePlans";
import { SanctuaryWorkspaceCard } from "../../shared-components/src/components/sanctuary/SanctuaryWorkspaceCard";
import { AgentPlan } from "../../shared-components/src/components/ui/AgentPlan";

export const OrchestrationDashboard: React.FC = () => {
  const { plans, error } = useLivePlans();

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>Orchestration Dashboard</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>
        Live agent status, plan/task boards, and system health for your Sanctuary.
      </p>
      {error && <div style={{ color: "#f55" }}>Error: {error}</div>}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {plans && plans.length > 0 ? (
          plans.map((plan) => (
            <SanctuaryWorkspaceCard
              key={plan.id}
              name={plan.title || plan.id}
              status={plan.status === "in_progress" ? "active" : plan.status === "pending" ? "idle" : plan.status === "completed" ? "active" : "error"}
              theme={plan.status === "in_progress" ? "cyber" : "sanctuary"}
              agent={plan.agent || "AI"}
              stats={plan.subtasks ? [
                { label: "Subtasks", value: String(plan.subtasks.length) },
                { label: "Status", value: plan.status },
              ] : []}
            >
              <AgentPlan plan={plan} compact />
            </SanctuaryWorkspaceCard>
          ))
        ) : (
          <div style={{ color: "#aaa", fontSize: 18 }}>No active plans. Start a new workflow to see orchestration in action.</div>
        )}
      </div>
    </div>
  );
};

export default OrchestrationDashboard;
