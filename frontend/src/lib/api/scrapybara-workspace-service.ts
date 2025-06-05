export type Workspace = {
  id: string;
  name: string;
  status: 'Running' | 'Stopped' | 'Starting' | 'Error';
  createdAt: string;
};

let MOCK_WORKSPACES: Workspace[] = [
  { id: 'ws1', name: 'Python Dev', status: "Running", createdAt: new Date().toISOString() },
  { id: 'ws2', name: 'Node.js Sandbox', status: "Stopped", createdAt: new Date().toISOString() },
];

export async function listWorkspaces(): Promise<Workspace[]> {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_WORKSPACES;
}

export async function createWorkspace(name: string): Promise<Workspace> {
  const newWs = {
    id: `ws${MOCK_WORKSPACES.length + 1}`,
    name,
    status: 'Starting',
    createdAt: new Date().toISOString(),
  };
  MOCK_WORKSPACES = [newWs, ...MOCK_WORKSPACES];
  return newWs;
}
