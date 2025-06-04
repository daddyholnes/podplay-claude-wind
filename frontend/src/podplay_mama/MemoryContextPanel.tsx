import React from "react";
import { useAgentMemory } from "../hooks/useAgentMemory";

export const MemoryContextPanel: React.FC<{ agentId?: string }> = ({ agentId }) => {
  const { memory, loading, error } = useAgentMemory(agentId);

  return (
    <div style={{
      padding: 24,
      background: "rgba(139,92,246,0.08)",
      borderRadius: 18,
      minWidth: 320,
      minHeight: 180,
      boxShadow: "0 2px 10px #8b5cf622",
      margin: 12,
      fontFamily: "inherit"
    }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
        Agent Memory & Context
      </h2>
      {loading && <div style={{ color: "#8b5cf6" }}>Loading memory...</div>}
      {error && <div style={{ color: "#f55" }}>Error: {error}</div>}
      {memory && memory.length > 0 ? (
        <ul style={{ paddingLeft: 16 }}>
          {memory.map((item: any, idx: number) => (
            <li key={idx} style={{ marginBottom: 8, fontSize: 15 }}>
              <span style={{ fontWeight: 600 }}>{item.label}:</span> {item.value}
            </li>
          ))}
        </ul>
      ) : (
        !loading && <div style={{ color: "#aaa" }}>No memory/context found for this agent.</div>
      )}
    </div>
  );
};

export default MemoryContextPanel;
