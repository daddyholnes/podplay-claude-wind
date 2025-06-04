"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  CircleAlert,
  CircleDotDashed,
  CircleX,
  FileText,
  ListTodo,
  BarChart3,
  Calendar,
  Clock,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Type definitions
interface LogEntry {
  id: string;
  timestamp: Date;
  message: string;
  level: "info" | "warning" | "error" | "success";
  source: string;
}

interface Subtask {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  tools?: string[]; // Optional array of MCP server tools
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  level: number;
  dependencies: string[];
  subtasks: Subtask[];
}

interface PlanItem {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: Date;
  tags: string[];
  progress: number;
}

interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
}

interface MCPDashboardProps {
  logs?: LogEntry[];
  tasks?: Task[];
  plans?: PlanItem[];
}

// Initial data
const initialLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    message: "Started podcast planning session",
    level: "info",
    source: "system",
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
    message: "Analyzing podcast topic trends",
    level: "info",
    source: "analysis-agent",
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    message: "Failed to connect to external API",
    level: "error",
    source: "api-connector",
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    message: "Draft plan created",
    level: "success",
    source: "planner",
  },
];

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Research podcast topics",
    description: "Analyze trending topics and select the best one.",
    status: "in_progress",
    priority: "high",
    level: 1,
    dependencies: [],
    subtasks: [
      {
        id: "1-1",
        title: "Collect data",
        description: "Scrape data from podcast platforms.",
        status: "done",
        priority: "medium",
      },
      {
        id: "1-2",
        title: "Analyze trends",
        description: "Use AI to analyze topic popularity.",
        status: "in_progress",
        priority: "high",
      },
    ],
  },
  {
    id: "2",
    title: "Draft episode outline",
    description: "Create a detailed outline for the episode.",
    status: "pending",
    priority: "medium",
    level: 1,
    dependencies: ["1"],
    subtasks: [],
  },
];

const initialPlans: PlanItem[] = [
  {
    id: "1",
    title: "Launch new podcast series",
    description: "Plan and launch a new series focused on AI and creativity.",
    status: "active",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    tags: ["AI", "Creativity"],
    progress: 40,
  },
  {
    id: "2",
    title: "Episode 1: The Future of AI",
    description: "Outline and record the first episode.",
    status: "pending",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    tags: ["Episode", "Recording"],
    progress: 0,
  },
];

export const MCPDashboard: React.FC<MCPDashboardProps> = ({ logs = initialLogs, tasks = initialTasks, plans = initialPlans }) => {
  const [tab, setTab] = useState("logs");
  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="flex space-x-2 mb-6">
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
        </TabsList>
        <TabsContent value="logs">
          <div className="space-y-2">
            {logs.map((log) => (
              <Card key={log.id} className="flex items-center space-x-4 p-4">
                <div>
                  {log.level === "info" && <Circle className="text-blue-400" />}
                  {log.level === "warning" && <CircleAlert className="text-yellow-400" />}
                  {log.level === "error" && <CircleX className="text-red-500" />}
                  {log.level === "success" && <CheckCircle2 className="text-green-500" />}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{log.message}</div>
                  <div className="text-xs text-muted-foreground">
                    {log.timestamp.toLocaleString()} &mdash; {log.source}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="tasks">
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id} className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <ListTodo className="text-purple-400" />
                  <div className="font-bold text-lg">{task.title}</div>
                  <Badge variant="secondary" className="ml-2">
                    {task.priority}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {task.description}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {task.subtasks.map((sub) => (
                    <Badge key={sub.id} variant="outline">
                      {sub.title} ({sub.status})
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2 text-xs text-gray-400">
                  <span>Status: {task.status}</span>
                  <span>Level: {task.level}</span>
                  <span>Dependencies: {task.dependencies.join(", ") || "None"}</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="plans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <Card className="p-4 flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="text-indigo-400" />
                    <div className="font-bold text-lg">{plan.title}</div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {plan.description}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{plan.status}</Badge>
                    <div className="flex flex-wrap gap-1">
                      {plan.tags.map((tag, idx) => (
                        <span
           key={idx}
                          className="text-xs px-2 py-1 bg-secondary rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>
                        Due {plan.dueDate.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default function MCPDashboardDemo() {
  return <MCPDashboard />;
}
