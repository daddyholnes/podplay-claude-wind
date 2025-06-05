import React, { useState } from 'react';

type CreateWorkspaceModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
};

export function CreateWorkspaceModal({ open, onClose, onCreate }: CreateWorkspaceModalProps) {
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (name.trim()) {
      onCreate(name.trim());
      setName('');
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-md mx-2">
        <h2 className="text-lg font-semibold mb-4">Create New Workspace</h2>
        <input
          className="border p-2 w-full mb-4 rounded"
          placeholder="Workspace Name"
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={handleCreate}
            disabled={!name.trim()}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
