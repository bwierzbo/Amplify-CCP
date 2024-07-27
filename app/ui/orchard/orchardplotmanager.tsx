// app/ui/orchard/OrchardPlotManager.tsx
'use client';

import { useState } from 'react';

export default function OrchardPlotManager() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [plots, setPlots] = useState([
    { id: 1, name: 'Plot 1', trees: [] },
    { id: 2, name: 'Plot 2', trees: [] },
    // Add more plots as needed
  ]);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  const handleAddPlot = () => {
    const newPlot = {
      id: plots.length + 1,
      name: `Plot ${plots.length + 1}`,
      trees: [],
    };
    setPlots([...plots, newPlot]);
  };

  const handleEditPlot = (index: number, newName: string) => {
    const updatedPlots = plots.map((plot, i) =>
      i === index ? { ...plot, name: newName } : plot,
    );
    setPlots(updatedPlots);
  };

  const handleDeletePlot = (index: number) => {
    const updatedPlots = plots.filter((_, i) => i !== index);
    setPlots(updatedPlots);
  };

  return (
    <div className="w-full">
      {/* Orchard Plots Tabs */}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {plots.map((plot, index) => (
          <button
            key={plot.id}
            className={`px-4 py-2 ${selectedTab === index ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => handleTabClick(index)}
          >
            {plot.name}
          </button>
        ))}
        <button className="px-4 py-2 bg-green-500 text-white" onClick={handleAddPlot}>
          Add Plot
        </button>
      </div>

      {/* Orchard Plot Content */}
      <div className="mt-4 bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-bold">{plots[selectedTab]?.name}</h2>
        {/* Add more content here such as grid layout, tree management, etc. */}
      </div>
    </div>
  );
}
