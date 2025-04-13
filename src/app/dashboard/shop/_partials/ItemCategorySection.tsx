import React from 'react';
import ItemCard from './ItemCard';
import { MarketItem } from './marketItems';

interface ItemCategorySectionProps {
  title: string;
  items: MarketItem[];
  layout: string;
  onItemClick: (item: MarketItem) => void;
  showAll?: boolean;
  inventory: Record<string, number>;
}

const ItemCategorySection: React.FC<ItemCategorySectionProps> = ({
  title,
  items,
  layout,
  onItemClick,
  showAll = true,
  inventory
}) => {
  if (items.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">{title}</h2>
        {showAll && (
          <button className="text-sm text-gray-500 hover:text-gray-700">
            See All
          </button>
        )}
      </div>
      <div className={`grid ${layout} gap-4`}>
        {items.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            onClick={() => onItemClick(item)}
            ownedCount={inventory[item.id] || 0}
          />
        ))}
      </div>
    </section>
  );
};

export default ItemCategorySection;