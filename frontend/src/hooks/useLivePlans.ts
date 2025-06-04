import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

export interface AgentSubtask {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  tools?: string[];
  agent?: string;
  context?: string;
}

export interface AgentPlan {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  level: number;
  dependencies: string[];
  subtasks: AgentSubtask[];
  agent?: string;
  context?: string;
}

export function useLivePlans(userId: string) {
  const [plans, setPlans] = useState<AgentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:5000", { transports: ["websocket"] });
    socketRef.current = socket;
    setLoading(true);

    socket.emit("get_agent_plans", { user_id: userId });

    socket.on("agent_plans_update", (data: { plans: AgentPlan[] }) => {
      setPlans(data.plans);
      setLoading(false);
    });
    socket.on("connect_error", err => {
      setError("WebSocket connection failed");
      setLoading(false);
    });
    socket.on("disconnect", () => {
      setError("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return { plans, loading, error };
}
