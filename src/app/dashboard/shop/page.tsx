"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ShopHeader from '@/components/ShopHeader';
import CategoryFilter from '@/components/CategoryFilter';
import ProductGrid from '@/components/ProductGrid';
import ShoppingCart from '@/components/ShoppingCart';
import { mockInventoryData } from '@/data/mockData';

export default function ShopPage() {
  const [products, setProducts] = useState(mockInventoryData);
  const [filteredProducts, setFilteredProducts] = useState(mockInventoryData);
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Get unique categories from products
  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  // Filter products when category changes
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === activeCategory));
    }
  }, [activeCategory, products]);
  
  // Handle adding products to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  // Handle removing products from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };
  
  // Handle updating product quantity in cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };
  
  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return (
    <main className="min-h-screen bg-gray-50">
      <ShopHeader 
        cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <CategoryFilter 
              categories={categories} 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
          
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold mb-2">Shop</h1>
            <p className="text-gray-600 mb-6">Browse our collection of products</p>
            
            <ProductGrid 
              products={filteredProducts} 
              onAddToCart={addToCart} 
            />
          </div>
        </div>
      </div>
      
      <ShoppingCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        totalPrice={totalPrice}
      />
    </main>
  );
}