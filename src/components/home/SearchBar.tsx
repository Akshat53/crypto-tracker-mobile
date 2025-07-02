// src/components/home/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchTerm('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-100 shadow-sm">
      <div className="max-w-md lg:max-w-7xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="relative max-w-md lg:max-w-lg mx-auto lg:mx-0">
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg 
              className={`w-5 h-5 transition-colors duration-200 ${
                isFocused ? 'text-blue-500' : 'text-gray-400'
              }`}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full pl-12 pr-12 py-3 bg-gray-50 border-2 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:bg-white ${
              isFocused 
                ? 'border-blue-500 shadow-lg ring-4 ring-blue-100' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          />
          
          {/* Clear Button or Filter Icon */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {searchTerm ? (
              <button 
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 active:scale-95 p-1 rounded-full hover:bg-gray-100"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            ) : (
              <button 
                type="button"
                className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 active:scale-95 p-1 rounded-full hover:bg-gray-100"
                onClick={() => console.log('Filter clicked')}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
              </button>
            )}
          </div>
        </div>
      </form>
      
      {/* Search Results Info */}
      {searchTerm && (
        <div className="mt-3 max-w-md lg:max-w-lg mx-auto lg:mx-0">
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-600 font-medium">Searching for:</span>
              <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-md">
                {searchTerm}
              </span>
            </div>
            <button 
              onClick={handleClear}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 underline decoration-dotted hover:decoration-solid"
            >
              Clear
            </button>
          </div>
        </div>
      )}
      
      {/* Quick Search Suggestions */}
      {!searchTerm && (
        <div className="mt-3 max-w-md lg:max-w-lg mx-auto lg:mx-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Popular:</span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { symbol: 'BTC', name: 'Bitcoin', color: 'orange' },
                { symbol: 'ETH', name: 'Ethereum', color: 'blue' },
                { symbol: 'BNB', name: 'Binance', color: 'yellow' },
                { symbol: 'SOL', name: 'Solana', color: 'purple' }
              ].map((suggestion) => (
                <button
                  key={suggestion.symbol}
                  onClick={() => setSearchTerm(suggestion.symbol)}
                  className={`flex items-center gap-1 px-3 py-1.5 bg-white border rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 whitespace-nowrap ${
                    suggestion.color === 'orange' ? 'text-orange-600 border-orange-200 hover:bg-orange-50' :
                    suggestion.color === 'blue' ? 'text-blue-600 border-blue-200 hover:bg-blue-50' :
                    suggestion.color === 'yellow' ? 'text-yellow-600 border-yellow-200 hover:bg-yellow-50' :
                    'text-purple-600 border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    suggestion.color === 'orange' ? 'bg-orange-400' :
                    suggestion.color === 'blue' ? 'bg-blue-400' :
                    suggestion.color === 'yellow' ? 'bg-yellow-400' :
                    'bg-purple-400'
                  }`}></div>
                  {suggestion.symbol}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Search Tips */}
      {isFocused && !searchTerm && (
        <div className="mt-3 max-w-md lg:max-w-lg mx-auto lg:mx-0">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <div>
                <p className="text-xs font-semibold text-blue-700 mb-1">Search Tips:</p>
                <ul className="text-xs text-blue-600 space-y-0.5">
                  <li>• Type coin name (Bitcoin) or symbol (BTC)</li>
                  <li>• Search is case insensitive</li>
                  <li>• Results update as you type</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default SearchBar;