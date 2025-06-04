import { useCallback } from "react";
import { io, Socket } from "socket.io-client";

export function useAgentPlanActions(userId: string) {
  // Use a singleton socket for all actions
  let socket: Socket | null = null;
  if (typeof window !== "undefined") {
    // Only create socket on client
    if (!(window as any)._agentPlanSocket) {
      (window as any)._agentPlanSocket = io("http://localhost:5000", { transports: ["websocket"] });
    }
    socket = (window as any)._agentPlanSocket;
  }

  const runStep = useCallback((planId: string, subtaskId: string) => {
    socket?.emit("agent_plan_action", {
      user_id: userId,
      plan_id: planId,
      subtask_id: subtaskId,
      action: "run"
    });
  }, [userId, socket]);

  const pauseStep = useCallback((planId: string, subtaskId: string) => {
    socket?.emit("agent_plan_action", {
      user_id: userId,
      plan_id: planId,
      subtask_id: subtaskId,
      action: "pause"
    });
  }, [userId, socket]);

  const reassignStep = useCallback((planId: string, subtaskId: string, newAgent: string) => {
    socket?.emit("agent_plan_action", {
      user_id: userId,
      plan_id: planId,
      subtask_id: subtaskId,
      action: "reassign",
      new_agent: newAgent
    });
  }, [userId, socket]);

  return { runStep, pauseStep, reassignStep };
}
