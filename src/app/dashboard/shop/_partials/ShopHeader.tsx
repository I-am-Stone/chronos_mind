import { ShoppingCart } from 'lucide-react';

export default function ShopHeader({ cartItemCount, onCartClick }) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-purple-700">MyShop</h1>
            <nav className="ml-10 hidden md:block">
              <ul className="flex space-x-8">
                <li><a href="#" className="text-gray-800 hover:text-purple-600">Home</a></li>
                <li><a href="#" className="text-purple-600 font-medium">Shop</a></li>
                <li><a href="#" className="text-gray-800 hover:text-purple-600">About</a></li>
                <li><a href="#" className="text-gray-800 hover:text-purple-600">Contact</a></li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={onCartClick}
                className="p-2 rounded-full hover:bg-gray-100 transition relative"
              >
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
            <button className="hidden md:block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
