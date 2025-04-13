'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import ItemCategorySection from './_partials/ItemCategorySection';
import ItemModal from './_partials/ItemModal';
import { marketItems, mockUserBalance, MarketItem } from './_partials/marketItems';
import SidebarLayout from '@/components/shared/sidebar/layout';

const Marketplace = () => {
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userBalance, setUserBalance] = useState(mockUserBalance);
  const [inventory, setInventory] = useState<Record<string, number>>({});

  // Group items by category
  const itemsByCategory = marketItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MarketItem[]>);

  const handleItemClick = (item: MarketItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handlePurchase = (item: MarketItem, quantity: number) => {
    // Mock purchase logic
    const totalCost = item.price * quantity;
    
    if (userBalance.gems >= totalCost) {
      // Update balance
      setUserBalance(prev => ({
        ...prev,
        gems: prev.gems - totalCost
      }));
      
      // Update inventory
      setInventory(prev => ({
        ...prev,
        [item.id]: (prev[item.id] || 0) + quantity
      }));
      
      alert(`Successfully purchased ${quantity} ${item.name}(s)!`);
      setIsModalOpen(false);
    } else {
      alert("Not enough gems to complete this purchase!");
    }
  };

  return (
    <SidebarLayout>
    <div className="min-h-screen bg-gray-50 p-20">
      <Head>
        <title>Marketplace</title>
        <meta name="description" content="Game marketplace" />
      </Head>

      
      <main className="container mx-auto py-6 px-4">
        {/* Special Equipment Section */}
        <ItemCategorySection 
          title="Equipment"
          items={itemsByCategory['Equipment'] || []}
          layout="grid-cols-8"
          onItemClick={handleItemClick}
          showAll={false}
          inventory={inventory}
        />

        <div className="border-b my-6"></div>

        {/* Basic Items Section */}
        <ItemCategorySection 
          title="Basic"
          items={itemsByCategory['Basic'] || []}
          layout="grid-cols-4"
          onItemClick={handleItemClick}
          inventory={inventory}
        />

        {/* Other Categories */}
        {Object.keys(itemsByCategory)
          .filter(category => !['Equipment', 'Basic'].includes(category))
          .map(category => (
            <ItemCategorySection
              key={category}
              title={category}
              items={itemsByCategory[category]}
              layout="grid-cols-4"
              onItemClick={handleItemClick}
              inventory={inventory}
            />
          ))}
      </main>

      {isModalOpen && selectedItem && (
        <ItemModal 
          item={selectedItem}
          onClose={() => setIsModalOpen(false)}
          onPurchase={handlePurchase}
          userBalance={userBalance}
          ownedCount={inventory[selectedItem.id] || 0}
        />
      )}
    </div>
    </SidebarLayout>
  );
};

export default Marketplace;