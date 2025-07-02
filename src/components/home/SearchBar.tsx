// src/components/home/SearchBar.tsx - ULTRA COMPACT VERSION
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
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          {/* Search Icon */}
          <div 
            className="absolute flex items-center justify-center pointer-events-none"
            style={{ 
              left: '12px', // Reduced from 16px
              top: '50%', 
              transform: 'translateY(-50%)',
              width: '16px', // Reduced from 20px
              height: '16px'
            }}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              width="14" // Reduced from 18px
              height="14" 
              style={{ color: isFocused ? '#3b82f6' : '#9ca3af' }}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search cryptos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="search-input"
            style={{
              paddingRight: searchTerm ? '36px' : '36px' // Reduced from 48px
            }}
          />
          
          {/* Clear Button or Filter Icon */}
          {searchTerm ? (
            <button 
              type="button"
              onClick={handleClear}
              className="absolute transition-all duration-200"
              style={{ 
                right: '12px', // Reduced from 16px
                top: '50%', 
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6b7280',
                padding: '2px' // Reduced from 4px
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#374151';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          ) : (
            <button 
              type="button"
              className="absolute transition-all duration-200"
              style={{ 
                right: '12px', // Reduced from 16px
                top: '50%', 
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#9ca3af',
                padding: '2px' // Reduced from 4px
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6b7280';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9ca3af';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
              onClick={() => {
                console.log('Filter clicked');
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </button>
          )}
        </div>
      </form>
      
      {/* Compact Search Results Info */}
      {searchTerm && (
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center" style={{ gap: '4px' }}>
            <span className="text-xs text-gray-600">For:</span>
            <span 
              className="px-1 py-0.5 rounded text-xs font-medium"
              style={{ 
                backgroundColor: '#dbeafe', 
                color: '#1e40af' 
              }}
            >
              {searchTerm}
            </span>
          </div>
          <button 
            onClick={handleClear}
            className="text-xs transition-colors duration-200"
            style={{ 
              color: '#6b7280',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            Clear
          </button>
        </div>
      )}
      
      {/* Compact Quick Search Suggestions */}
      {!searchTerm && (
        <div className="mt-2">
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            <span className="text-xs text-gray-500 whitespace-nowrap">Quick:</span>
            {['BTC', 'ETH', 'BNB', 'SOL'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setSearchTerm(suggestion)}
                className="px-2 py-0.5 bg-white rounded text-xs font-medium text-gray-600 border transition-all duration-200 whitespace-nowrap"
                style={{ borderColor: '#e5e7eb' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;