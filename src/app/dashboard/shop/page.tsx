'use client';

import { useState } from 'react';
import { shopItems } from './_partials/item';
import Image from 'next/image';
import SidebarLayout from '@/components/shared/sidebar/layout';

interface ShopItem {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

export default function Shop() {
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [inventory, setInventory] = useState<ShopItem[]>([]);

  const handleBuy = (item: ShopItem) => {
    setInventory([...inventory, item]);
    setSelectedItem(null);
    alert(`You bought ${item.name}!`);
  };

  return (
    <SidebarLayout>
    
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Game Shop</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {shopItems.map((item: ShopItem) => (
          <div 
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedItem(item)}
          >
            <Image src={item.image} alt={item.name} className="w-24 h-24 mx-auto object-contain mb-3" />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-yellow-600 font-medium">{item.price} gold</p>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl font-bold"
            >
              &times;
            </button>
            <Image 
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-32 h-32 object-contain mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-center mb-2">{selectedItem.name}</h2>
            <p className="text-gray-700 text-center mb-3">{selectedItem.description}</p>
            <p className="text-center text-yellow-600 font-semibold text-lg mb-4">{selectedItem.price} gold</p>
            <button
              onClick={() => handleBuy(selectedItem)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
    </SidebarLayout>
  );
}
