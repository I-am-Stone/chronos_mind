'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  image?: string;
};

type ProductCategory = 'eggs' | 'potions' | 'equipment';

export default function ShopPage() {
  const [quantity, setQuantity] = useState<number>(1);
  const [balance, setBalance] = useState<number>(22.49);
  const [activeTab, setActiveTab] = useState<ProductCategory>('eggs');
  const [sortBy, setSortBy] = useState<string>('type');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Record<ProductCategory, Product[]>>({
    eggs: [],
    potions: [],
    equipment: []
  });

  // Simulate fetching products from backend
  useEffect(() => {
    // In a real app, you would fetch this from your API
    const mockProducts = {
      eggs: [
        { 
          id: 1, 
          name: 'Flying Pig Egg', 
          description: 'Find a hatching potion to pour on this egg, and it will hatch into a whimsical Flying Pig.', 
          price: 3.00,
          category: 'eggs',
          quantity: 10,
          image: '/images/flying-pig-egg.png'
        },
        { 
          id: 2, 
          name: 'Dragon Egg', 
          description: 'A rare egg that hatches into a mighty dragon when combined with the right potion.', 
          price: 5.00,
          category: 'eggs',
          quantity: 5,
          image: '/images/dragon-egg.png'
        },
      ],
      potions: [
        { 
          id: 3, 
          name: 'Rainbow Potion', 
          description: 'A colorful potion that can hatch any egg into a vibrant creature.', 
          price: 4.50,
          category: 'potions',
          quantity: 8,
          image: '/images/rainbow-potion.png'
        },
      ],
      equipment: [
        { 
          id: 4, 
          name: 'Golden Saddle', 
          description: 'Enhances your mount speed and provides extra comfort.', 
          price: 7.00,
          category: 'equipment',
          quantity: 3,
          image: '/images/golden-saddle.png'
        },
      ]
    };
    setProducts(mockProducts);
  }, []);

  const handlePurchase = () => {
    if (!selectedProduct) return;
    
    const total = quantity * selectedProduct.price;
    if (balance >= total) {
      setBalance(balance - total);
      alert(`Purchased ${quantity} ${selectedProduct.name}(s)!`);
      
      // Update product quantity (in a real app, this would be an API call)
      setProducts(prev => ({
        ...prev,
        [selectedProduct.category]: prev[selectedProduct.category as ProductCategory].map(p => 
          p.id === selectedProduct.id ? {...p, quantity: p.quantity - quantity} : p
        )
      }));
    } else {
      alert('Not enough balance!');
    }
  };

  const sortedProducts = [...(products[activeTab] || [])].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return a.category.localeCompare(b.category); // default sort by type
  });

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product display - Main content */}
        <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-lg border border-purple-100">
          {selectedProduct ? (
            <>
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="md:w-1/3 bg-indigo-50 rounded-lg p-4 flex items-center justify-center">
                  {selectedProduct.image ? (
                    <Image 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      width={200}
                      height={200}
                      className="object-contain h-48 w-48"
                    />
                  ) : (
                    <div className="h-48 w-48 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-lg flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <div className="md:w-2/3">
                  <h1 className="text-3xl font-bold mb-2 text-indigo-800">{selectedProduct.name}</h1>
                  <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                  <div className="text-2xl font-bold text-purple-600 mb-4">
                    ${selectedProduct.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    Available: {selectedProduct.quantity}
                  </div>
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                <label className="block mb-2 font-medium text-indigo-700">Quantity</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="number" 
                    min="1" 
                    max={selectedProduct.quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(selectedProduct.quantity, parseInt(e.target.value) || 1)))}
                    className="border border-purple-300 p-2 w-20 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <div className="font-bold text-lg">
                    Total: <span className="text-purple-600">${(quantity * selectedProduct.price).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={handlePurchase}
                  disabled={selectedProduct.quantity <= 0}
                  className={`py-3 px-6 rounded-lg font-bold ${selectedProduct.quantity <= 0 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all'
                  }`}
                >
                  {selectedProduct.quantity <= 0 ? 'Out of Stock' : 'Buy Now'}
                </button>
                
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="py-3 px-6 rounded-lg font-bold border border-purple-600 text-purple-600 hover:bg-purple-50 transition-colors"
                >
                  Back to Products
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-6 text-indigo-800">Shop {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.map(product => (
                  <div 
                    key={product.id} 
                    onClick={() => setSelectedProduct(product)}
                    className="p-4 border border-purple-100 rounded-xl hover:shadow-md hover:border-purple-200 cursor-pointer transition-all bg-white"
                  >
                    <div className="h-40 bg-indigo-50 rounded-lg mb-3 flex items-center justify-center">
                      {product.image ? (
                        <Image 
                          src={product.image} 
                          alt={product.name}
                          width={120}
                          height={120}
                          className="object-contain h-full"
                        />
                      ) : (
                        <div className="text-gray-400">No Image</div>
                      )}
                    </div>
                    <h3 className="font-bold text-indigo-700">{product.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-purple-600">${product.price.toFixed(2)}</span>
                      <span className="text-sm text-gray-500">Qty: {product.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
              {sortedProducts.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  No {activeTab} available at the moment.
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="md:w-1/3 space-y-6">
          {/* Balance card */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
            <h2 className="text-lg font-medium mb-1">Your Balance</h2>
            <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
            <div className="mt-3 pt-3 border-t border-indigo-400">
              <button className="text-sm bg-white text-indigo-600 py-1 px-3 rounded-full font-medium hover:bg-indigo-100 transition-colors">
                Add Funds
              </button>
            </div>
          </div>
          
          {/* Inventory navigation */}
          <div className="bg-white p-5 rounded-xl shadow-lg border border-purple-100">
            <h2 className="text-xl font-bold mb-4 text-indigo-800">Inventory</h2>
            
            <div className="flex overflow-x-auto pb-2 mb-4 scrollbar-hide">
              {['equipment', 'eggs', 'potions'].map(tab => (
                <button
                  key={tab}
                  className={`px-4 py-2 whitespace-nowrap rounded-lg mr-2 transition-colors ${activeTab === tab 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                  onClick={() => setActiveTab(tab as ProductCategory)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-indigo-700">Class: <span className="font-normal text-gray-600">Warrior</span></h3>
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="sort" className="font-medium text-indigo-700">Sort By</label>
                <select 
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-purple-300 p-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="type">Type</option>
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Recently viewed (placeholder) */}
          <div className="bg-white p-5 rounded-xl shadow-lg border border-purple-100">
            <h2 className="text-xl font-bold mb-4 text-indigo-800">Recently Viewed</h2>
            <div className="space-y-3">
              {sortedProducts.slice(0, 2).map(product => (
                <div 
                  key={`recent-${product.id}`} 
                  onClick={() => setSelectedProduct(product)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors"
                >
                  <div className="w-12 h-12 bg-indigo-50 rounded flex items-center justify-center">
                    {product.image ? (
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        width={40}
                        height={40}
                        className="object-contain h-full"
                      />
                    ) : (
                      <div className="text-gray-400 text-xs">No Image</div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-700">{product.name}</h4>
                    <p className="text-sm text-purple-600">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}