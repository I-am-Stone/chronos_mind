import React from 'react';

import { MarketItem } from './marketItems';
interface ItemCardProps {
  item: MarketItem;
  onClick: () => void;
  ownedCount: number;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick, ownedCount }) => {
  // Determine styling based on category
  const getCategoryStyle = () => {
    switch (item.category) {
      case 'Equipment':
        return 'flex-col items-center';
      default:
        return 'items-center border rounded-md p-3 bg-white';
    }
  };

  // Determine color based on category
  const getCategoryColor = () => {
    switch (item.category) {
      case 'Equipment': return 'text-yellow-500';
      case 'Basic': return 'text-green-500';
      case 'Mythical': return 'text-purple-500';
      case 'Limited Edition': return 'text-red-500';
      case 'Functional Cosmetics': return 'text-blue-500';
      case 'Crafting': return 'text-gray-500';
      default: return 'text-teal-500';
    }
  };

  return (
    <div 
      className={`flex ${getCategoryStyle()} cursor-pointer hover:shadow-md transition-shadow`}
      onClick={onClick}
    >
      <div className={`${item.category === 'Equipment' ? 
        'w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2' : 
        'w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4'}`}
      >
        <div className={`${item.category === 'Equipment' ? 'w-6 h-6' : 'w-5 h-5'} flex items-center justify-center`}>
          {/* In a real app, you would use the actual icon */}
          <div className={`${item.category === 'Equipment' ? 'w-6 h-6' : 'w-5 h-5'} ${getCategoryColor().replace('text', 'bg')} rounded-full`}></div>
        </div>
      </div>
      
      {item.category !== 'Equipment' && (
        <div className="flex-grow">
          <div className="text-xs text-gray-500">${item.price}</div>
        </div>
      )}
      
      <div className={`text-xs font-medium ${getCategoryColor()}`}>
        {ownedCount}/{item.available}
      </div>
      
      {item.category === 'Equipment' && (
        <div className="text-center text-sm">${item.price}</div>
      )}
    </div>
  );
};

export default ItemCard;