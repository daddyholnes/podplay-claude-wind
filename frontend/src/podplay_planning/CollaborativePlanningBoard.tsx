import React, { useState } from "react";
import { SanctuaryWorkspaceCard } from "../../shared-components/src/components/sanctuary/SanctuaryWorkspaceCard";
import { AgentPlan } from "../../shared-components/src/components/ui/AgentPlan";
import { useLivePlans } from "../hooks/useLivePlans";

interface DraggableSubtask {
  id: string;
  title: string;
  status: string;
  agent?: string;
}

export const CollaborativePlanningBoard: React.FC = () => {
  const { plans } = useLivePlans();
  const [dragged, setDragged] = useState<string | null>(null);

  // Simple drag-and-drop for demonstration
  const handleDragStart = (subtaskId: string) => setDragged(subtaskId);
  const handleDrop = (planId: string, targetStatus: string) => {
    // TODO: Integrate with backend plan actions for real drag-and-drop
    setDragged(null);
  };

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>Collaborative Planning Board</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>
        Drag and drop subtasks, assign agents, and collaborate in real time.
      </p>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {plans.map((plan) => (
          <SanctuaryWorkspaceCard
            key={plan.id}
            name={plan.title || plan.id}
            status={plan.status === "in_progress" ? "active" : plan.status === "pending" ? "idle" : plan.status === "completed" ? "active" : "error"}
            agent={plan.agent || "AI"}
            theme={plan.status === "in_progress" ? "cyber" : "sanctuary"}
            stats={plan.subtasks ? [
              { label: "Subtasks", value: String(plan.subtasks.length) },
              { label: "Status", value: plan.status },
            ] : []}
          >
            <div style={{ display: "flex", gap: 18, marginTop: 10 }}>
              {['pending', 'in_progress', 'completed'].map((status) => (
                <div key={status} style={{ minWidth: 120 }}>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>{status.replace('_', ' ').toUpperCase()}</div>
                  <div style={{ minHeight: 48, background: '#f3f4f6', borderRadius: 8, padding: 6 }}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDrop(plan.id, status)}
                  >
                    {plan.subtasks
                      .filter((s: DraggableSubtask) => s.status === status)
                      .map((subtask: DraggableSubtask) => (
                        <div
                          key={subtask.id}
                          draggable
                          onDragStart={() => handleDragStart(subtask.id)}
                          style={{
                            padding: '8px 12px',
                            margin: '4px 0',
                            background: '#fff',
                            borderRadius: 6,
                            border: '1px solid #e5e7eb',
                            boxShadow: dragged === subtask.id ? '0 2px 8px #8b5cf633' : undefined,
                            cursor: 'grab',
                            fontWeight: 500,
                            color: '#23272f',
                          }}
                        >
                          {subtask.title} {subtask.agent && (
                            <span style={{ color: '#8b5cf6', marginLeft: 8, fontWeight: 600 }}>
                              @{subtask.agent}
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </SanctuaryWorkspaceCard>
        ))}
      </div>
    </div>
  );
};

export default CollaborativePlanningBoard;
