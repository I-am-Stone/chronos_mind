'use client';
import React from 'react';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  description: string;
  imageURI: string;
  category: string;
}

interface InventoryProps {
  inventory: InventoryItem[];
  onItemClick?: (item: InventoryItem) => void;
}

const categoryColors = {
  armor: 'bg-gray-200 border-gray-300',
  weapons: 'bg-green-100 border-green-300',
  wearables: 'bg-blue-100 border-blue-300',
  epic: 'bg-purple-100 border-purple-300',
  legendary: 'bg-yellow-100 border-yellow-300'
};

const Inventory: React.FC<InventoryProps> = ({ inventory = [], onItemClick }) => {
  // Ensure inventory is an array
  const items = Array.isArray(inventory) ? inventory : [];

  return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-yellow-600">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
          Inventory
          <span className="ml-auto text-sm font-normal bg-gray-100 px-3 py-1 rounded-full">
          {items.length} items
        </span>
        </h2>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {items.length > 0 ? (
              items.map(item => (
                  <div
                      key={item.id}
                      onClick={() => onItemClick && onItemClick(item)}
                      className={`relative group cursor-pointer p-1 rounded-lg border-2 ${item.category ? categoryColors[item.category.toLowerCase()] || 'bg-gray-100 border-gray-200' : 'bg-gray-100 border-gray-200'} hover:scale-105 transition-transform`}
                  >
                    <div className="aspect-square bg-white rounded-md overflow-hidden flex items-center justify-center">
                      {item.imageURI ? (
                          <img
                              src={item.imageURI}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Item';
                              }}
                          />
                      ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            </svg>
                          </div>
                      )}
                    </div>

                    {item.quantity > 1 && (
                        <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {item.quantity}
                        </div>
                    )}

                    <div className="absolute z-10 hidden group-hover:block bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max max-w-xs px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg">
                      <div className="font-bold text-yellow-400">{item.name}</div>
                      {item.category && (
                          <div className={`text-xs capitalize ${getCategoryTextColor(item.category)}`}>
                            {item.category}
                          </div>
                      )}
                      <div className="mt-1 text-gray-300">{item.description}</div>
                    </div>
                  </div>
              ))
          ) : (
              <div className="col-span-full text-center py-6 text-gray-500">
                No items in inventory
              </div>
          )}
        </div>
      </div>
  );
};

function getCategoryTextColor(category: string): string {
  const lowerCategory = category.toLowerCase();
  switch(lowerCategory) {
    case 'armor': return 'text-gray-300';
    case 'weapons': return 'text-green-300';
    case 'wearables': return 'text-blue-300';
    case 'epic': return 'text-purple-300';
    case 'legendary': return 'text-yellow-300';
    default: return 'text-gray-300';
  }
}

export default Inventory;