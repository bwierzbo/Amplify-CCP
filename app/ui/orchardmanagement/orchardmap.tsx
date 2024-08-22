"use client";

import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Tree } from '@/app/lib/definitions';
import Image from 'next/image';
import { updateTreeStatus } from '@/app/lib/actions';

interface OrchardMapProps {
  satelliteImageUrl: string;
  trees: Tree[];
}

export default function OrchardMap({ satelliteImageUrl, trees }: OrchardMapProps) {
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [updatedStatus, setUpdatedStatus] = useState<'healthy' | 'diseased' | 'treated' | 'removed'>('healthy');

  const treeColorMap: { [key: string]: string } = {
    'Cox Orange Pippin': 'bg-orange-500',
    'Northern Spy': 'bg-red-500',
    'Gala': 'bg-yellow-500',
    'Fuji': 'bg-pink-500',
    'Honeycrisp': 'bg-blue-500',
    'Granny Smith': 'bg-green-500',
    'Braeburn': 'bg-purple-500',
    'Golden Delicious': 'bg-orange-500',
    'Red Delicious': 'bg-red-500',
    'Pink Lady': 'bg-pink-500',
    // Add more varieties and colors as needed
    'default': 'bg-green-500', // Default color for unknown varieties
  };

  const handleTreeClick = (tree: Tree) => {
    setSelectedTree(tree);
    setUpdatedStatus(tree.status || 'healthy');
  };

  const handleCloseInfo = () => {
    setSelectedTree(null);
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as 'healthy' | 'diseased' | 'treated' | 'removed';
    setUpdatedStatus(newStatus);

    if (selectedTree && newStatus !== selectedTree.status) {
      const result = await updateTreeStatus(selectedTree.id, newStatus);
      if (result.message === 'Tree status updated successfully.') {
        setSelectedTree({ ...selectedTree, status: newStatus });
      } else {
        console.error(result.message);
        // Optionally, you can add some user feedback here, like a toast notification
      }
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden flex justify-center">
      <TransformWrapper
        initialScale={0.75}
        minScale={1}
        maxScale={10}
        centerOnInit={true}
      >
        <TransformComponent wrapperClass="w-full h-full flex justify-center items-center">
          <div className="relative">
            <Image
              src={satelliteImageUrl}
              alt="Orchard Satellite View"
              width={2000}
              height={2000}
              className="max-w-full h-auto"
            />
            {trees.map((tree) => (
              <button
                key={tree.id}
                className={`absolute w-2 h-2 rounded-full hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 ${treeColorMap[tree.variety] || treeColorMap['default']}`}
                style={{
                  left: `${41 + (tree.column / 15) * 13.6}%`,
                  top: `${29.4 + (tree.row / 32) * 36.5}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => handleTreeClick(tree)}
              />
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
      {selectedTree && (
        <div className="absolute bottom-8 left-80 bg-white p-6 rounded-lg shadow-lg z-10" style={{ minWidth: '300px', maxWidth: '400px' }}>
          <button
            onClick={handleCloseInfo}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <div className={`w-4 h-4 ${treeColorMap[selectedTree.variety] || treeColorMap['default']} rounded-full mr-2`}></div>
            {selectedTree.variety}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <p><span className="font-semibold">Status:</span>
              <select
                value={selectedTree.status || 'healthy'}
                onChange={handleStatusChange}
                className="ml-2 p-1 border rounded"
              >
                <option value="healthy">Healthy</option>
                <option value="diseased">Diseased</option>
                <option value="treated">Treated</option>
                <option value="removed">Removed</option>
              </select>
            </p>
            <p><span className="font-semibold">Year Planted:</span> {selectedTree.yearPlanted}</p>
            <p><span className="font-semibold">Rootstock:</span> {selectedTree.rootstock}</p>
            <p><span className="font-semibold">Last Pruned:</span> {selectedTree.lastPruned ? new Date(selectedTree.lastPruned).toLocaleDateString() : 'N/A'}</p>
            <p><span className="font-semibold">Last Fertilized:</span> {selectedTree.lastFertilized ? new Date(selectedTree.lastFertilized).toLocaleDateString() : 'N/A'}</p>
            <p><span className="font-semibold">Last Pesticide:</span> {selectedTree.lastPesticide ? new Date(selectedTree.lastPesticide).toLocaleDateString() : 'N/A'}</p>
          </div>
          {selectedTree.notes && (
            <div className="mt-4">
              <p className="font-semibold">Notes:</p>
              <p className="mt-1">{selectedTree.notes}</p>
            </div>
          )}
        </div>
      )}
      <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md">
        <h3 className="text-sm font-semibold mb-2">Tree Varieties</h3>
        {Object.entries(treeColorMap).map(([variety, color]) => (
          <div key={variety} className="flex items-center mb-1">
            <div className={`w-3 h-3 ${color} rounded-full mr-2`}></div>
            <span className="text-xs">{variety}</span>
          </div>
        ))}
      </div>
    </div>
  );
}