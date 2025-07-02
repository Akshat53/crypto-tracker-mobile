// src/components/home/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="px-6 py-4 bg-gray-50">
      <div className="relative">
        {/* Search Icon */}
        <div 
          className="absolute flex items-center justify-center"
          style={{ 
            left: '16px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px'
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20" color="#9ca3af">
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
          className="w-full rounded-2xl bg-white shadow transition"
          style={{
            paddingLeft: '48px',
            paddingRight: '48px',
            paddingTop: '12px',
            paddingBottom: '12px',
            border: '0',
            fontSize: '1rem',
            color: '#111827'
          }}
          onFocus={(e) => {
            e.target.style.outline = 'none';
            e.target.style.boxShadow = '0 0 0 2px #3b82f6';
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
          }}
        />
        
        {/* Filter Icon */}
        <button 
          className="absolute transition"
          style={{ 
            right: '16px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#9ca3af'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#4b5563';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#9ca3af';
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>
      
      {/* Search Results Info */}
      {searchTerm && (
        <div className="mt-3 flex items-center" style={{ gap: '8px' }}>
          <span className="text-sm text-gray-600">Searching for:</span>
          <span 
            className="px-2 py-1 rounded-lg text-sm font-medium"
            style={{ 
              backgroundColor: '#dbeafe', 
              color: '#1e40af' 
            }}
          >
            {searchTerm}
          </span>
          <button 
            onClick={() => setSearchTerm('')}
            className="text-sm transition"
            style={{ 
              color: '#9ca3af',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#4b5563';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9ca3af';
            }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;