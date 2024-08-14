"use client";

import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Tree } from '@/app/lib/definitions';
import Image from 'next/image';

interface OrchardMapProps {
  satelliteImageUrl: string;
}

export default function OrchardMap({ satelliteImageUrl }: OrchardMapProps) {
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);

  const handleTreeClick = (tree: Tree) => {
    setSelectedTree(tree);
  };

  const generateTrees = () => {
    const trees: Tree[] = [];
    for (let row = 0; row < 32; row++) {
      for (let col = 0; col < 15; col++) {
        trees.push({
          id: `tree-${row}-${col}`,
          plotId: 'plot1',
          name: `Tree ${row}-${col}`,
          variety: 'Unknown',
          rootstock: 'Unknown',
          scionwood: 'Unknown',
          yearPlanted: 2023,
          row: row,
          column: col,
          status: 'healthy',
          lastPruned: null,
          lastFertilized: null,
          lastPesticide: null,
          notes: null,
          yield: null,
          lastHarvestDate: null,
          appleVarietyId: null,
          lat: null,
          lng: null,
        });
      }
    }
    return trees;
  };

  const trees = generateTrees();

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
                className="absolute w-2 h-2 bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                style={{
                  left: `${42 + (tree.column / 15) * 13.5}%`,
                  top: `${30.5 + (tree.row / 32) * 36.5}%`,
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
          <h3 className="text-xl font-bold mb-4">{selectedTree.name}</h3>
          <div className="grid grid-cols-2 gap-4">
            <p><span className="font-semibold">Variety:</span> {selectedTree.variety}</p>
            <p><span className="font-semibold">Status:</span> {selectedTree.status}</p>
            <p><span className="font-semibold">Year Planted:</span> {selectedTree.yearPlanted}</p>
            <p><span className="font-semibold">Rootstock:</span> {selectedTree.rootstock}</p>
            <p><span className="font-semibold">Scionwood:</span> {selectedTree.scionwood}</p>
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
    </div>
  );
}