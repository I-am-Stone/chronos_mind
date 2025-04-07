'user client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
interface InventoryItem {
  name: string;
  image: string;
}

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const savedInventory = JSON.parse(localStorage.getItem('gameInventory') || '[]') as InventoryItem[];
    setInventory(savedInventory);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Inventory</h1>
      
      {inventory.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Your inventory is empty. Visit the shop to buy items!
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {inventory.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow"
            >
              <Image src={item.image} alt={item.name} className="w-16 h-16 mx-auto mb-2" />
              <h3 className="text-lg font-semibold">{item.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
