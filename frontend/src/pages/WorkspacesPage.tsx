import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AgentChat } from '@/components/AgentChat';
import { listWorkspaces, createWorkspace, Workspace } from '@/lib/api/scrapybara-workspace-service';
import { CreateWorkspaceModal } from '@/components/workspaces/CreateWorkspaceModal';

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    async function fetchWorkspaces() {
      const data = await listWorkspaces();
      setWorkspaces(data);
    }
    fetchWorkspaces();
  }, []);

  const handleCreateWorkspace = async (name: string) => {
    await createWorkspace(name);
    const data = await listWorkspaces();
    setWorkspaces(data);
  };

  return (
    <MainLayout title="Scrapybara Workspaces">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Your Workspaces</h2>
            <Button onClick={() => setShowCreateModal(true)}>Create Workspace</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workspaces.map(ws => (
              <div key={ws.id} className="relative rounded-xl border bg-card text-card-foreground shadow p-4">
                <div className="font-bold">{ws.name}</div>
                <div className="text-xs text-muted-foreground">{ws.status}</div>
                <div className="mt-2 flex gap-2">
                  <button className="btn btn-sm btn-outline">Open</button>
                  <button className="btn btn-sm btn-destructive">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Collapsible Chat */}
        <div className="w-full md:w-96">
          <AgentChat />
        </div>
      </div>

      {/* Create Workspace Modal */}
      <CreateWorkspaceModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateWorkspace}
      />
    </MainLayout>
  );
}
