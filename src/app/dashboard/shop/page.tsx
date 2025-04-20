'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import ItemCategorySection from './_partials/ItemCategorySection';
import ItemModal from './_partials/ItemModal';
import { mockUserBalance, MarketItem } from './_partials/marketItems';
import SidebarLayout from '@/components/shared/sidebar/layout';
import { getShopItems } from "@/api/shop/getShopItems";
import {motion} from "framer-motion";

const Marketplace = () => {
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userBalance, setUserBalance] = useState(mockUserBalance);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [shopItems, setShopItems] = useState<MarketItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        setIsLoading(true);
        const response = await getShopItems();
        if (response.success && response.data) {
          setShopItems(response.data);
        } else {
          setError("Failed to load shop items");
        }
      } catch (err) {
        setError("An error occurred while fetching shop items");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopItems().catch(err => {
      setError("An error occurred while fetching shop items");
      console.error(err);
    });
  }, []);

  // Group items by category with proper type annotation
  const itemsByCategory = shopItems.reduce((acc: Record<string, MarketItem[]>, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleItemClick = (item: MarketItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handlePurchase = (item: MarketItem, quantity: number) => {
    const totalCost = item.price * quantity;

    if (userBalance.gems >= totalCost) {
      setUserBalance(prev => ({
        ...prev,
        gems: prev.gems - totalCost
      }));

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

  if (isLoading) {
    return (
        <SidebarLayout>
          <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
            <p className="text-lg">Loading marketplace items...</p>
          </div>
        </SidebarLayout>
    );
  }

  if (error) {
    return (
        <SidebarLayout>
          <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        </SidebarLayout>
    );
  }

  return (
      <SidebarLayout>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Market Place
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Market Place for Collecting Artefact
              </p>
            </motion.div>
          </div>
        </div>
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12">
          <main className="container mx-auto py-6 px-4">
            <div className="mb-6 flex justify-end">
              <div className="bg-white p-3 rounded-md shadow">
                <span className="font-medium">Your Gems:</span> {userBalance.gems}
              </div>
            </div>

            {itemsByCategory['Equipment'] && itemsByCategory['Equipment'].length > 0 && (
                <ItemCategorySection
                    title="Equipment"
                    items={itemsByCategory['Equipment']}
                    layout="grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
                    onItemClick={handleItemClick}
                    showAll={false}
                    inventory={inventory}
                />
            )}

            <div className="border-b my-6"></div>

            {itemsByCategory['Basic'] && itemsByCategory['Basic'].length > 0 && (
                <ItemCategorySection
                    title="Basic"
                    items={itemsByCategory['Basic']}
                    layout="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    onItemClick={handleItemClick}
                    inventory={inventory}
                />
            )}

            {Object.keys(itemsByCategory)
                .filter(category => !['Equipment', 'Basic'].includes(category))
                .map(category => (
                    <ItemCategorySection
                        key={category}
                        title={category}
                        items={itemsByCategory[category]}
                        layout="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                        onItemClick={handleItemClick}
                        inventory={inventory}
                    />
                ))}

            {shopItems.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No items available in the marketplace</p>
                </div>
            )}
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