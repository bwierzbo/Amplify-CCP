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
  console.log('Trees:', trees);
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [updatedStatus, setUpdatedStatus] = useState<'healthy' | 'diseased' | 'treated' | 'removed'>('healthy');
  const [colorMode, setColorMode] = useState<'variety' | 'status'>('variety');

  const treeColorMap: { [key: string]: string } = {
    'Cox Orange Pippin': 'bg-orange-500',
    'Virginia Hewes Crab': 'bg-red-500',
    'Northern Spy': 'bg-yellow-500',
    'Muscat de Bernay': 'bg-pink-500',
    'Chisel Jersey': 'bg-blue-500',
    'Yarlington Mill': 'bg-green-500',
    'Arkansas Black': 'bg-purple-500',
    'Oxford Black': 'bg-indigo-500',
    'Golden Russet': 'bg-amber-500',
    'Unknown': 'bg-gray-500',
    'Baeburn': 'bg-lime-500',
    'Whitney Crab': 'bg-cyan-500',
    'Amere de Berthcourt': 'bg-fuchsia-500',
    'Harry Masters Jersey': 'bg-rose-500',
    "Ashmead's Kernel": 'bg-teal-500',
    'Cineterre': 'bg-emerald-500',
    'Mishelin': 'bg-sky-500',
    "Tremlett's Bitter": 'bg-violet-500',
    'Sweet Coppin': 'bg-orange-400',
    "Tompkins King": 'bg-red-400',
    'Lambrook Pippin': 'bg-yellow-400',
    'Belle de Jardin': 'bg-pink-400',
    'Champlain': 'bg-blue-400',
    'Nehou': 'bg-green-400',
    'Red Vein Crab': 'bg-purple-400',
    'Redfield': 'bg-indigo-400',
    'Isle of Wight': 'bg-amber-400',
    'Stoke Red': 'bg-lime-400',
    'Harrison': 'bg-cyan-400',
    'Dabinette': 'bg-fuchsia-400',
    'Kingston Black': 'bg-rose-400',
    'Brown Snout': 'bg-teal-400',
    'Pudget Spice': 'bg-emerald-400',
    'Antonovka': 'bg-sky-400',
    'default': 'bg-gray-500',
  };

  const statusColorMap: { [key: string]: string } = {
    'Healthy': 'bg-green-500',
    'Diseased': 'bg-red-500',
    'Treated': 'bg-yellow-500',
    'Removed': 'bg-gray-500',
    'default': 'bg-blue-500',
  };

  const getTreeColor = (tree: Tree) => {
    if (colorMode === 'variety') {
      return treeColorMap[tree.variety] || treeColorMap['default'];
    } else {
      return statusColorMap[tree.status || 'default'];
    }
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

  const toggleColorMode = () => {
    setColorMode(prevMode => prevMode === 'variety' ? 'status' : 'variety');
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
                className={`absolute w-2 h-2 rounded-full hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getTreeColor(tree)}`}
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
      <div 
        className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-md max-h-96 overflow-y-auto cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={toggleColorMode}
      >
        <h3 className="text-sm font-semibold mb-2">
          {colorMode === 'variety' ? 'Tree Varieties' : 'Tree Statuses'}
        </h3>
        {colorMode === 'variety' ? (
          Object.entries(treeColorMap).map(([variety, color]) => (
            variety !== 'default' && (
              <div key={variety} className="flex items-center mb-1">
                <div className={`w-3 h-3 ${color} rounded-full mr-2`}></div>
                <span className="text-xs">{variety}</span>
              </div>
            )
          ))
        ) : (
          Object.entries(statusColorMap).map(([status, color]) => (
            status !== 'default' && (
              <div key={status} className="flex items-center mb-1">
                <div className={`w-3 h-3 ${color} rounded-full mr-2`}></div>
                <span className="text-xs">{status}</span>
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
}