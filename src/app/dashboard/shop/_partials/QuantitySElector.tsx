import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  maxQuantity: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  maxQuantity
}) => {
  return (
    <div className="flex items-center justify-center">
      <button 
        onClick={onDecrease}
        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
        disabled={quantity <= 1}
      >
        -
      </button>
      <div className="mx-4 w-8 text-center">{quantity}</div>
      <button 
        onClick={onIncrease}
        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
        disabled={quantity >= maxQuantity}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;