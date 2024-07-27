// components/OrchardTabs.tsx
'use client';

import { useState } from 'react';
import { OrchardPlot } from '@/app/lib/definitions';

export default function OrchardTabs({
  orchardPlots,
  activePlot,
  setActivePlot,
  onAddPlot,
  onEditPlot,
  onDeletePlot,
}: {
  orchardPlots: OrchardPlot[];
  activePlot: string;
  setActivePlot: (plotId: string) => void;
  onAddPlot: (plotName: string) => void;
  onEditPlot: (plotId: string, newName: string) => void;
  onDeletePlot: (plotId: string) => void;
}) {
  const [newPlotName, setNewPlotName] = useState('');
  const [editPlotName, setEditPlotName] = useState('');
  const [editPlotId, setEditPlotId] = useState('');

  const handleAddPlot = () => {
    onAddPlot(newPlotName);
    setNewPlotName('');
  };

  const handleEditPlot = () => {
    onEditPlot(editPlotId, editPlotName);
    setEditPlotId('');
    setEditPlotName('');
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Orchard Plots</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={newPlotName}
            onChange={(e) => setNewPlotName(e.target.value)}
            placeholder="New Plot Name"
            className="mr-2 p-1"
          />
          <button onClick={handleAddPlot} className="p-1 bg-blue-600 text-white">
            Add Plot
          </button>
        </div>
      </div>
      <div className="flex">
        {orchardPlots.map((plot) => (
          <div
            key={plot.id}
            className={`mr-2 p-2 cursor-pointer ${activePlot === plot.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActivePlot(plot.id)}
          >
            {plot.name}
            <button
              onClick={() => {
                setEditPlotId(plot.id);
                setEditPlotName(plot.name);
              }}
            >
              Edit
            </button>
            <button onClick={() => onDeletePlot(plot.id)}>Delete</button>
          </div>
        ))}
      </div>
      {editPlotId && (
        <div>
          <input
            type="text"
            value={editPlotName}
            onChange={(e) => setEditPlotName(e.target.value)}
            placeholder="Edit Plot Name"
          />
          <button onClick={handleEditPlot}>Save</button>
        </div>
      )}
    </div>
  );
}
