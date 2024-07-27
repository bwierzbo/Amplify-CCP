// components/OrchardGrid.tsx
'use client';

import { useState } from 'react';
import { Tree } from '@/app/lib/definitions';

export default function OrchardGrid({
  trees,
  onAddTree,
  onEditTree,
  onDeleteTree,
}: {
  trees: Tree[];
  onAddTree: (newTree: Omit<Tree, 'id'>) => void;
  onEditTree: (treeId: string, updatedTree: Omit<Tree, 'id'>) => void;
  onDeleteTree: (treeId: string) => void;
}) {
  const [newTree, setNewTree] = useState<Omit<Tree, 'id'>>({
    name: '',
    yearPlanted: '',
    rootstock: '',
    scionwood: '',
  });

  const [editTree, setEditTree] = useState<Tree | null>(null);

  const handleAddTree = () => {
    onAddTree(newTree);
    setNewTree({ name: '', yearPlanted: '', rootstock: '', scionwood: '' });
  };

  const handleEditTree = () => {
    if (editTree) {
      onEditTree(editTree.id, {
        name: editTree.name,
        yearPlanted: editTree.yearPlanted,
        rootstock: editTree.rootstock,
        scionwood: editTree.scionwood,
      });
      setEditTree(null);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl">Trees</h2>
      <div className="grid grid-cols-4 gap-4">
        {trees.map((tree) => (
          <div key={tree.id} className="p-2 border">
            <h3>{tree.name}</h3>
            <p>Year Planted: {tree.yearPlanted}</p>
            <p>Rootstock: {tree.rootstock}</p>
            <p>Scionwood: {tree.scionwood}</p>
            <button
              onClick={() => {
                setEditTree(tree);
              }}
            >
              Edit
            </button>
            <button onClick={() => onDeleteTree(tree.id)}>Delete</button>
          </div>
        ))}
      </div>
      {editTree && (
        <div>
          <input
            type="text"
            value={editTree.name}
            onChange={(e) => setEditTree({ ...editTree, name: e.target.value })}
            placeholder="Edit Tree Name"
          />
          <input
            type="text"
            value={editTree.yearPlanted}
            onChange={(e) => setEditTree({ ...editTree, yearPlanted: e.target.value })}
            placeholder="Edit Year Planted"
          />
          <input
            type="text"
            value={editTree.rootstock}
            onChange={(e) => setEditTree({ ...editTree, rootstock: e.target.value })}
            placeholder="Edit Rootstock"
          />
          <input
            type="text"
            value={editTree.scionwood}
            onChange={(e) => setEditTree({ ...editTree, scionwood: e.target.value })}
            placeholder="Edit Scionwood"
          />
          <button onClick={handleEditTree}>Save</button>
        </div>
      )}
      <div className="mt-4">
        <h3>Add New Tree</h3>
        <input
          type="text"
          value={newTree.name}
          onChange={(e) => setNewTree({ ...newTree, name: e.target.value })}
          placeholder="Tree Name"
        />
        <input
          type="text"
          value={newTree.yearPlanted}
          onChange={(e) => setNewTree({ ...newTree, yearPlanted: e.target.value })}
          placeholder="Year Planted"
        />
        <input
          type="text"
          value={newTree.rootstock}
          onChange={(e) => setNewTree({ ...newTree, rootstock: e.target.value })}
          placeholder="Rootstock"
        />
        <input
          type="text"
          value={newTree.scionwood}
          onChange={(e) => setNewTree({ ...newTree, scionwood: e.target.value })}
          placeholder="Scionwood"
        />
        <button onClick={handleAddTree}>Add Tree</button>
      </div>
    </div>
  );
}
