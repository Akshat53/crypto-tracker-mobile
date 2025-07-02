// src/components/home/HomePage.tsx - OPTIMIZED VERSION
import React from 'react';
import { CryptoData } from '../../types/crypto';
import AppHeader from './AppHeader';
import SearchBar from './SearchBar';
import CryptoCard from './CryptoCard';
import { formatCompactNumber } from '../../utils/formatters';

interface HomePageProps {
  cryptos: CryptoData[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const LoadingCard: React.FC = () => (
  <div className="crypto-card">
    <div className="flex items-center" style={{ gap: '12px' }}>
      <div 
        className="rounded-full shimmer"
        style={{ width: '36px', height: '36px' }} // Reduced size
      ></div>
      <div className="flex-1">
        <div 
          className="h-3 rounded mb-2 shimmer" // Reduced height
          style={{ width: '70px' }}
        ></div>
        <div 
          className="h-2 rounded shimmer" // Reduced height
          style={{ width: '45px' }}
        ></div>
      </div>
      <div className="text-right">
        <div 
          className="h-3 rounded mb-2 shimmer" // Reduced height
          style={{ width: '60px' }}
        ></div>
        <div 
          className="h-2 rounded shimmer" // Reduced height
          style={{ width: '40px' }}
        ></div>
      </div>
    </div>
  </div>
);

const ErrorState: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center p-6 text-center">
    <div 
      className="rounded-full flex items-center justify-center mx-auto mb-4"
      style={{
        width: '48px',
        height: '48px',
        backgroundColor: '#fef2f2'
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="24" height="24" color="#ef4444">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
      </svg>
    </div>
    
    <h3 className="text-lg font-bold text-gray-900 mb-2">Connection Error</h3>
    <p className="text-gray-600 mb-4 text-sm" style={{ maxWidth: '240px', lineHeight: '1.4' }}>
      {error}
    </p>
    
    <button onClick={onRetry} className="btn btn-primary">
      Try Again
    </button>
    
    <div className="text-xs text-gray-500 mt-4 space-y-1">
      <p>• Check your internet connection</p>
      <p>• Try refreshing the page</p>
    </div>
  </div>
);

const EmptySearchState: React.FC<{ searchTerm: string; onClear: () => void }> = ({ searchTerm, onClear }) => (
  <div className="flex flex-col items-center justify-center py-8 px-6 text-center">
    <div 
      className="rounded-full flex items-center justify-center mx-auto mb-4"
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: '#f3f4f6'
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20" color="#9ca3af">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    </div>
    
    <h3 className="text-base font-semibold text-gray-900 mb-2">No Results Found</h3>
    <p className="text-gray-500 mb-3 text-sm">
      No cryptocurrencies found for "{searchTerm}"
    </p>
    
    <button
      onClick={onClear}
      className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium transition hover:bg-blue-600"
    >
      Clear Search
    </button>
    
    <div 
      className="rounded-lg p-3 mt-3"
      style={{ 
        backgroundColor: '#eff6ff',
        maxWidth: '240px'
      }}
    >
      <p className="text-xs" style={{ color: '#1e40af' }}>
        💡 Try different keywords or browse all coins
      </p>
    </div>
  </div>
);

const MarketStats: React.FC<{ cryptos: CryptoData[] }> = ({ cryptos }) => {
  const totalMarketCap = cryptos.reduce((sum, crypto) => sum + crypto.market_cap, 0);
  const gainers = cryptos.filter(crypto => crypto.price_change_percentage_24h > 0).length;
  const losers = cryptos.filter(crypto => crypto.price_change_percentage_24h < 0).length;

  return (
    <div className="market-stats">
      <h3 className="text-xs font-semibold text-gray-700 mb-2">Market Overview</h3>
      <div className="stats-grid">
        <div className="text-center">
          <div className="text-base font-bold text-gray-900">
            ${(totalMarketCap / 1e12).toFixed(2)}T
          </div>
          <div className="text-xs text-gray-500">Market Cap</div>
        </div>
        <div className="text-center">
          <div className="text-base font-bold" style={{ color: '#16a34a' }}>{gainers}</div>
          <div className="text-xs text-gray-500">Gainers</div>
        </div>
        <div className="text-center">
          <div className="text-base font-bold" style={{ color: '#dc2626' }}>{losers}</div>
          <div className="text-xs text-gray-500">Losers</div>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC<HomePageProps> = ({
  cryptos,
  loading,
  error,
  onRetry,
  searchTerm,
  setSearchTerm,
  onRefresh,
  isRefreshing
}) => {
  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Fixed Header Section */}
      <div className="header-section">
        <AppHeader onRefresh={onRefresh} isRefreshing={isRefreshing} />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      
      {/* Scrollable Content */}
      <div className="scrollable-content">
        {/* Market Stats - only show when not searching */}
        {!searchTerm && !loading && !error && cryptos.length > 0 && (
          <MarketStats cryptos={cryptos} />
        )}
        
        {/* Loading State */}
        {loading && (
          <div className="crypto-list">
            {[...Array(10)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        )}
        
        {/* Error State */}
        {error && <ErrorState error={error} onRetry={onRetry} />}
        
        {/* Crypto List */}
        {!loading && !error && cryptos.length > 0 && (
          <div className="crypto-list">
            {filteredCryptos.map((crypto, index) => (
              <div 
                key={crypto.id} 
                className="animate-slide-up" 
                style={{ animationDelay: `${index * 20}ms` }}
              >
                <CryptoCard crypto={crypto} index={index} />
              </div>
            ))}
            
            {/* Empty Search Results */}
            {filteredCryptos.length === 0 && searchTerm && (
              <EmptySearchState 
                searchTerm={searchTerm} 
                onClear={() => setSearchTerm('')}
              />
            )}
            
            {/* Footer Info */}
            {filteredCryptos.length > 0 && (
              <div className="text-center py-4 px-4">
                <p className="text-xs text-gray-500 mb-1">
                  🔄 Auto-updates • {filteredCryptos.length} cryptocurrencies
                </p>
                <p className="text-xs text-gray-400">
                  Data by CoinGecko
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;