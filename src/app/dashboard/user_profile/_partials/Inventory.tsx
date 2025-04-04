'use client';
import React from 'react';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
}

interface InventoryProps {
  inventory: InventoryItem[];
}

const Inventory: React.FC<InventoryProps> = ({ inventory }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-yellow-600">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
        Inventory
      </h2>
      <div className="space-y-3">
        {inventory.map(item => (
          <div key={item.id} className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-100">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
              </div>
              <span className="font-medium text-gray-800">{item.name}</span>
            </div>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-full font-bold">
              x{item.quantity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory; 