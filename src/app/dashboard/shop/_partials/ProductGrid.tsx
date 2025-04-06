import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

export default function ProductGrid({ products, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
          <div className="relative h-60 bg-gray-200">
            {product.image ? (
              <Image 
                src={product.image} 
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            {product.quantity < 10 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                Low Stock: {product.quantity} left
              </span>
            )}
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <span className="font-bold text-purple-600">${product.price}</span>
            </div>
            
            <p className="text-gray-600 text-sm mt-2 mb-4 line-clamp-2">{product.description}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Category: {product.category}</span>
              <button 
                onClick={() => onAddToCart(product)}
                className="flex items-center space-x-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-md text-sm transition"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

