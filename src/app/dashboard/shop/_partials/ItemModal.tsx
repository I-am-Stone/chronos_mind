import React, { useState } from 'react';
import { MarketItem } from './marketItems';
import QuantitySelector from './QuantitySElector';
import CurrencyDisplay from './CurrencyDisplay';

interface ItemModalProps {
  item: MarketItem;
  onClose: () => void;
  onPurchase: (item: MarketItem, quantity: number) => void;
  userBalance: { gems: number; gold: number };
  ownedCount: number;
}

const ItemModal: React.FC<ItemModalProps> = ({ 
  item, 
  onClose, 
  onPurchase,
  userBalance,
  ownedCount
}) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < item.available) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyNow = () => {
    onPurchase(item, quantity);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full text-gray-800 relative">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        
        <div className="flex flex-col items-center mb-6 pt-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-yellow-400 rounded-full"></div>
          </div>
          
          <div className="text-xs text-gray-500 mb-4">Owned: {ownedCount}</div>
          
          <h2 className="text-xl font-bold mb-2">{item.name}</h2>
          
          <p className="text-center text-sm mb-4">{item.description}</p>
          
          <div className="flex items-center justify-center mb-6">
            <CurrencyDisplay value={item.price} currency="gems" size="md" />
          </div>
          
          <div className="w-full mb-6">
            <p className="text-sm text-center mb-3">How many would you like to purchase?</p>
            <QuantitySelector
              quantity={quantity}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              maxQuantity={item.available}
            />
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="mr-2">Total:</div>
            <CurrencyDisplay value={item.price * quantity} currency="gems" size="md" />
          </div>
          
          <button 
            onClick={handleBuyNow}
            disabled={userBalance.gems < item.price * quantity}
            className={`bg-purple-600 text-white py-2 px-8 rounded hover:bg-purple-700 transition ${
              userBalance.gems < item.price * quantity ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Buy Now
          </button>
        </div>
        
        <div className="text-center text-sm border-t pt-4">
          <CurrencyDisplay 
            gems={userBalance.gems} 
            gold={userBalance.gold} 
            label="Your balance:" 
          />
        </div>
      </div>
    </div>
  );
};

export default ItemModal;