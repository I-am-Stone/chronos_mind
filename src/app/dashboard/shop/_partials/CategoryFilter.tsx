export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category}>
              <button
                className={`w-full text-left px-3 py-2 rounded-md transition ${
                  activeCategory === category 
                    ? 'bg-purple-100 text-purple-700 font-medium' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  