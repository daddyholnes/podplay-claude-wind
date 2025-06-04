"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SettingsMenu } from "@/components/ui/SettingsMenu";
import {
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  FileText,
  ListTodo,
  Calendar,
  BarChart3,
  Settings,
  PlusCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "../../../../shared-components/src/components/effects/BackgroundGradientAnimation";
import { SplashCursor } from "../../../../shared-components/src/components/effects/SplashCursor";

// Dynamically import AuroraBackground to avoid SSR issues
const AuroraBackground = React.lazy(() => import("../../../../shared-components/src/components/effects/AuroraBackground"));

// Types
type Task = {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'planned';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  assignee: {
    name: string;
    avatar?: string;
  };
};

type LogEntry = {
  id: string;
  action: string;
  timestamp: string;
  user: {
    name: string;
    avatar?: string;
  };
  details?: string;
};

type PlanItem = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  progress: number;
  owner: {
    name: string;
    avatar?: string;
  };
};

type ContextSnapshot = {
  id: string;
  timestamp: string;
  summary: string;
  agent: string;
};

type MetricCard = {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
};

type EffectSettings = {
  backgroundGradient: boolean;
  splashCursor: boolean;
  aurora: boolean;
};

const metrics: MetricCard[] = [
  { title: 'Total Episodes', value: '42', change: 5, trend: 'up' },
  { title: 'Avg. Listeners', value: '15.2K', change: 12, trend: 'up' },
  { title: 'Completion Rate', value: '68%', change: -3, trend: 'down' },
  { title: 'Revenue', value: '$24.5K', change: 8, trend: 'up' },
];

function formatDateTime(dt: string) {
  const d = new Date(dt);
  return d.toLocaleString();
}

const themePresets: Record<string, EffectSettings> = {
  "Purple Delight": { backgroundGradient: true, splashCursor: false, aurora: false },
  "Daydream in the Clouds": { backgroundGradient: false, splashCursor: false, aurora: true },
  "Focus Mode": { backgroundGradient: false, splashCursor: false, aurora: false },
  "Liquid Energy": { backgroundGradient: true, splashCursor: true, aurora: false },
};

const MagicMCPDashboard: React.FC = () => {
  // Visual effect settings and theme
  const [theme, setTheme] = useState<string>('Purple Delight');
  const [effectSettings, setEffectSettings] = useState<EffectSettings>(themePresets['Purple Delight']);

  React.useEffect(() => {
    setEffectSettings(themePresets[theme] || themePresets['Purple Delight']);
  }, [theme]);

  // Logs
  const [logs, setLogs] = React.useState<LogEntry[] | null>(null);
  const [logsLoading, setLogsLoading] = React.useState(false);
  const [logsError, setLogsError] = React.useState<string | null>(null);
  const [logFilter, setLogFilter] = React.useState('');

  // Tasks
  const [tasks, setTasks] = React.useState<Task[] | null>(null);
  const [tasksLoading, setTasksLoading] = React.useState(false);
  const [tasksError, setTasksError] = React.useState<string | null>(null);
  const [taskFilter, setTaskFilter] = React.useState('');
  const [showAddTask, setShowAddTask] = React.useState(false);
  const [newTaskTitle, setNewTaskTitle] = React.useState('');

  // Plans
  const [plans, setPlans] = React.useState<PlanItem[] | null>(null);
  const [plansLoading, setPlansLoading] = React.useState(false);
  const [plansError, setPlansError] = React.useState<string | null>(null);
  const [planFilter, setPlanFilter] = React.useState('');
  const [showAddPlan, setShowAddPlan] = React.useState(false);
  const [newPlanTitle, setNewPlanTitle] = React.useState('');

  // Context Snapshots
  const [snapshots, setSnapshots] = React.useState<ContextSnapshot[] | null>(null);
  const [snapshotsLoading, setSnapshotsLoading] = React.useState(false);
  const [snapshotsError, setSnapshotsError] = React.useState<string | null>(null);

  // Agent State (placeholder)
  const [agentState] = React.useState({
    mamaBear: 'Idle',
    scout: 'Ready',
  });

  // Fetch logs
  React.useEffect(() => {
    setLogsLoading(true);
    fetch("/podplay_logs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch logs");
        return res.json();
      })
      .then((data) => {
        const mappedLogs = data.map((log: any) => ({
          id: log.id,
          action: log.level || 'Log',
          timestamp: log.timestamp,
          user: { name: log.context || 'System', avatar: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=' + log.id },
          details: log.message,
        }));
        setLogs(mappedLogs);
        setLogsLoading(false);
      })
      .catch((err) => {
        setLogsError(err.message);
        setLogsLoading(false);
      });
  }, []);

  // Fetch tasks
  React.useEffect(() => {
    setTasksLoading(true);
    fetch("/podplay_tasks")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then((data) => {
        const mappedTasks = data.map((task: any) => ({
          id: task.id,
          title: task.title,
          status: task.status,
          priority: task.priority,
          dueDate: task.due_date,
          assignee: {
            name: task.assignee || 'Unassigned',
            avatar: task.avatar || 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=' + task.id,
          },
        }));
        setTasks(mappedTasks);
        setTasksLoading(false);
      })
      .catch((err) => {
        setTasksError(err.message);
        setTasksLoading(false);
      });
  }, []);

  // Fetch plans
  React.useEffect(() => {
    setPlansLoading(true);
    fetch("/podplay_plans")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch plans");
        return res.json();
      })
      .then((data) => {
        const mappedPlans = data.map((plan: any) => ({
          id: plan.id,
          title: plan.title,
          startDate: plan.start_date,
          endDate: plan.end_date,
          progress: plan.progress,
          owner: {
            name: plan.owner || 'System',
            avatar: plan.avatar || 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=' + plan.id,
          },
        }));
        setPlans(mappedPlans);
        setPlansLoading(false);
      })
      .catch((err) => {
        setPlansError(err.message);
        setPlansLoading(false);
      });
  }, []);

  // Fetch context snapshots
  React.useEffect(() => {
    setSnapshotsLoading(true);
    fetch("/podplay_context_snapshots")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch context snapshots");
        return res.json();
      })
      .then((data) => {
        const mapped = data.map((snap: any) => ({
          id: snap.id,
          timestamp: snap.timestamp,
          summary: snap.summary,
          agent: snap.agent,
        }));
        setSnapshots(mapped);
        setSnapshotsLoading(false);
      })
      .catch((err) => {
        setSnapshotsError(err.message);
        setSnapshotsLoading(false);
      });
  }, []);

  // Add Task (POST)
  function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasksLoading(true);
    fetch('/podplay_tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTaskTitle }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add task');
        return res.json();
      })
      .then(() => {
        setNewTaskTitle('');
        setShowAddTask(false);
        // Refresh tasks
        return fetch('/podplay_tasks');
      })
      .then(res => res.json())
      .then((data) => {
        const mappedTasks = data.map((task: any) => ({
          id: task.id,
          title: task.title,
          status: task.status,
          priority: task.priority,
          dueDate: task.due_date,
          assignee: {
            name: task.assignee || 'Unassigned',
            avatar: task.avatar || 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=' + task.id,
          },
        }));
        setTasks(mappedTasks);
        setTasksLoading(false);
      })
      .catch((err) => {
        setTasksError(err.message);
        setTasksLoading(false);
      });
  }

  // Add Plan (POST)
  function handleAddPlan(e: React.FormEvent) {
    e.preventDefault();
    if (!newPlanTitle.trim()) return;
    setPlansLoading(true);
    fetch('/podplay_plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newPlanTitle }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add plan');
        return res.json();
      })
      .then(() => {
        setNewPlanTitle('');
        setShowAddPlan(false);
        // Refresh plans
        return fetch('/podplay_plans');
      })
      .then(res => res.json())
      .then((data) => {
        const mappedPlans = data.map((plan: any) => ({
          id: plan.id,
          title: plan.title,
          startDate: plan.start_date,
          endDate: plan.end_date,
          progress: plan.progress,
          owner: {
            name: plan.owner || 'System',
            avatar: plan.avatar || 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=' + plan.id,
          },
        }));
        setPlans(mappedPlans);
        setPlansLoading(false);
      })
      .catch((err) => {
        setPlansError(err.message);
        setPlansLoading(false);
      });
  }

  // Filter helpers
  const filteredLogs = logs?.filter(l =>
    logFilter === '' ||
    l.action.toLowerCase().includes(logFilter.toLowerCase()) ||
    l.details?.toLowerCase().includes(logFilter.toLowerCase()) ||
    l.user.name.toLowerCase().includes(logFilter.toLowerCase())
  );
  const filteredTasks = tasks?.filter(t =>
    taskFilter === '' ||
    t.title.toLowerCase().includes(taskFilter.toLowerCase()) ||
    t.assignee.name.toLowerCase().includes(taskFilter.toLowerCase())
  );
  const filteredPlans = plans?.filter(p =>
    planFilter === '' ||
    p.title.toLowerCase().includes(planFilter.toLowerCase()) ||
    p.owner.name.toLowerCase().includes(planFilter.toLowerCase())
  );

  // --- EFFECTS RENDERING ---
  return (
    <>
      {/* Visual Effects (backgrounds) */}
      {effectSettings.backgroundGradient && (
        <BackgroundGradientAnimation interactive={theme === 'Liquid Energy'} />
      )}
      {effectSettings.splashCursor && <SplashCursor />}
      {effectSettings.aurora && (
        <React.Suspense fallback={null}>
          <AuroraBackground />
        </React.Suspense>
      )}
      {/* Settings menu */}
      <SettingsMenu
        settings={effectSettings}
        setSettings={setEffectSettings}
        theme={theme}
        setTheme={setTheme}
      />
      {/* Main dashboard UI */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 flex flex-wrap gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="snapshots">Context Snapshots</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="activity">Activity Feed</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="text-green-500 w-5 h-5" />
                    ) : (
                      <ArrowDownRight className="text-red-500 w-5 h-5" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className={cn("text-xs", metric.trend === 'up' ? 'text-green-500' : 'text-red-500')}>{metric.change > 0 ? '+' : ''}{metric.change}% from last month</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Logs */}
        <TabsContent value="logs">
          <div className="mb-3 flex items-center gap-2">
            <input className="input input-sm w-full max-w-xs rounded border px-2 py-1" placeholder="Filter logs..." value={logFilter} onChange={e => setLogFilter(e.target.value)} />
          </div>
          <div className="space-y-4">
            {logsLoading ? (
              <div className="text-center text-muted-foreground py-8">Loading logs...</div>
            ) : logsError ? (
              <div className="text-center text-red-500 py-8">Error loading logs: {logsError}</div>
            ) : filteredLogs && filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={log.user.avatar} />
                          <AvatarFallback>{log.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">
                              <span>{log.user.name}</span>
                              <span className="text-muted-foreground font-normal"> {log.action.toLowerCase()}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">{formatDateTime(log.timestamp)}</p>
                          </div>
                          {log.details && (
                            <p className="text-sm mt-1">{log.details}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">No logs found.</div>
            )}
          </div>
        </TabsContent>

        {/* Tasks */}
        <TabsContent value="tasks">
          <div className="mb-3 flex items-center gap-2">
            <input className="input input-sm w-full max-w-xs rounded border px-2 py-1" placeholder="Filter tasks..." value={taskFilter} onChange={e => setTaskFilter(e.target.value)} />
            <button className="btn btn-sm btn-primary ml-2" onClick={() => setShowAddTask(true)}>+ Add Task</button>
          </div>
          {showAddTask && (
            <form className="mb-4 flex gap-2" onSubmit={handleAddTask}>
              <input className="input input-sm rounded border px-2 py-1" placeholder="New task title" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} />
              <button className="btn btn-sm btn-success" type="submit">Add</button>
              <button className="btn btn-sm btn-ghost" type="button" onClick={() => setShowAddTask(false)}>Cancel</button>
            </form>
          )}
          <div className="space-y-4">
            {tasksLoading ? (
              <div className="text-center text-muted-foreground py-8">Loading tasks...</div>
            ) : tasksError ? (
              <div className="text-center text-red-500 py-8">Error loading tasks: {tasksError}</div>
            ) : filteredTasks && filteredTasks.length > 0 ? (
              filteredTasks.map((task, idx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">
                            {task.title}
                            <span className="ml-2 text-xs px-2 py-1 rounded bg-muted-foreground text-white">
                              {task.status}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                        </div>
                        <p className="text-sm mt-1 text-muted-foreground">Priority: {task.priority}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">No tasks found.</div>
            )}
          </div>
        </TabsContent>

        {/* Plans */}
        <TabsContent value="plans">
          <div className="mb-3 flex items-center gap-2">
            <input className="input input-sm w-full max-w-xs rounded border px-2 py-1" placeholder="Filter plans..." value={planFilter} onChange={e => setPlanFilter(e.target.value)} />
            <button className="btn btn-sm btn-primary ml-2" onClick={() => setShowAddPlan(true)}>+ Add Plan</button>
          </div>
          {showAddPlan && (
            <form className="mb-4 flex gap-2" onSubmit={handleAddPlan}>
              <input className="input input-sm rounded border px-2 py-1" placeholder="New plan title" value={newPlanTitle} onChange={e => setNewPlanTitle(e.target.value)} />
              <button className="btn btn-sm btn-success" type="submit">Add</button>
              <button className="btn btn-sm btn-ghost" type="button" onClick={() => setShowAddPlan(false)}>Cancel</button>
            </form>
          )}
          <div className="space-y-4">
            {plansLoading ? (
              <div className="text-center text-muted-foreground py-8">Loading plans...</div>
            ) : plansError ? (
              <div className="text-center text-red-500 py-8">Error loading plans: {plansError}</div>
            ) : filteredPlans && filteredPlans.length > 0 ? (
              filteredPlans.map((plan, idx) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={plan.owner.avatar} />
                        <AvatarFallback>{plan.owner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">
                            {plan.title}
                            <span className="ml-2 text-xs px-2 py-1 rounded bg-muted-foreground text-white">
                              {plan.progress}%
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground">{plan.startDate} - {plan.endDate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            ) : (
              <div className="text-center text-muted-foreground py-8">No plans found.</div>
            )}
          </div>
        </TabsContent>

        {/* Context Snapshots */}
        <TabsContent value="snapshots">
          <div className="space-y-4">
            {snapshotsLoading ? (
              <div className="text-center text-muted-foreground py-8">Loading context snapshots...</div>
            ) : snapshotsError ? (
              <div className="text-center text-red-500 py-8">Error loading snapshots: {snapshotsError}</div>
            ) : snapshots && snapshots.length > 0 ? (
              snapshots.map((snap, idx) => (
                <motion.div
                  key={snap.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{snap.agent}</div>
                          <div className="text-xs text-muted-foreground">{formatDateTime(snap.timestamp)}</div>
                        </div>
                        <div className="text-sm ml-4">{snap.summary}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            ) : (
              <div className="text-center text-muted-foreground py-8">No context snapshots found.</div>
            )}
          </div>
        </TabsContent>

        {/* Agent State Preview */}
        <TabsContent value="agents">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="font-bold mb-2">Mama Bear Agent State</div>
                <div>Status: <span className="badge bg-green-200 text-green-800 ml-2">{agentState.mamaBear}</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="font-bold mb-2">Scout Agent State</div>
                <div>Status: <span className="badge bg-blue-200 text-blue-800 ml-2">{agentState.scout}</span></div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Developer Activity Feed */}
        <TabsContent value="activity">
          <div className="space-y-4">
            <div className="font-bold mb-2">Recent Activity</div>
            {logsLoading ? (
              <div className="text-center text-muted-foreground py-8">Loading activity...</div>
            ) : logsError ? (
              <div className="text-center text-red-500 py-8">Error loading activity: {logsError}</div>
            ) : logs && logs.length > 0 ? (
              logs.slice(0, 10).map((log, idx) => (
                <div key={log.id} className="border-b py-2 text-sm">
                  <span className="font-medium">{log.user.name}</span> {log.action.toLowerCase()} <span className="text-muted-foreground">{log.details}</span> <span className="text-xs text-muted-foreground">({formatDateTime(log.timestamp)})</span>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">No activity found.</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default MagicMCPDashboard;
