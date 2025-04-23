import React, { useState } from 'react';
import { MarketItem } from './marketItems';
import QuantitySelector from "@/app/dashboard/shop/_partials/QuantitySelector";
import CurrencyDisplay from './CurrencyDisplay';
import { OrderItem } from "@/api/shop/orderItems";

interface ItemModalProps {
  item: MarketItem;
  onClose: () => void;
  onPurchase: (item: MarketItem, quantity: number) => void;
  userBalance: { points: number; };
  ownedCount: number;
}

interface OrderData {
  quantity: number;
  inventory: number;
}

const ItemModal: React.FC<ItemModalProps> = ({
                                               item,
                                               onClose,
                                               onPurchase,
                                               userBalance,
                                               ownedCount
                                             }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const increaseQuantity = () => {
    if (quantity < item.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyNow = async () => {
    if (userBalance.points < item.price * quantity) {
      setError("Insufficient balance to complete this purchase");
      return;
    }

    if (quantity > item.quantity) {
      setError("Requested quantity exceeds available stock");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const orderData: OrderData = {
        quantity: quantity,
        inventory: Number(item.id) // Convert string to number
      };

      await OrderItem(orderData);
      onPurchase(item, quantity);
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error
          ? err.message
          : "Failed to complete purchase. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full text-gray-800 relative">
          <button
              onClick={onClose}
              disabled={isLoading}
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
              <CurrencyDisplay value={item.price} currency="points" size="md" />
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 w-full text-center">
                  <p className="text-sm">{error}</p>
                  <button
                      onClick={clearError}
                      className="text-xs underline mt-1 text-red-600"
                  >
                    Dismiss
                  </button>
                </div>
            )}

            <div className="w-full mb-6">
              <p className="text-sm text-center mb-3">How many would you like to purchase?</p>
              <QuantitySelector
                  quantity={quantity}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  maxQuantity={item.quantity}
                  // Removed the disabled prop since it doesn't exist in QuantitySelectorProps
              />
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="mr-2">Total:</div>
              <CurrencyDisplay value={item.price * quantity} currency="points" size="md" />
            </div>

            <button
                onClick={handleBuyNow}
                disabled={isLoading || userBalance.points < item.price * quantity}
                className={`bg-purple-600 text-white py-2 px-8 rounded hover:bg-purple-700 transition ${
                    isLoading || userBalance.points < item.price * quantity ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {isLoading ? 'Processing...' : 'Buy Now'}
            </button>
          </div>

          <div className="text-center text-sm border-t pt-4">
            <CurrencyDisplay
                points={userBalance.points}
                label="Your balance:"
            />
          </div>
        </div>
      </div>
  );
};

export default ItemModal;