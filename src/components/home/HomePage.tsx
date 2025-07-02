// src/components/home/HomePage.tsx - FIXED VERSION
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
        className="rounded-full"
        style={{
          width: '40px',
          height: '40px',
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200px 100%',
          animation: 'shimmer 1.5s infinite'
        }}
      ></div>
      <div className="flex-1">
        <div 
          className="h-4 bg-gray-200 rounded mb-2"
          style={{
            width: '80px',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200px 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        ></div>
        <div 
          className="h-3 bg-gray-200 rounded"
          style={{
            width: '50px',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200px 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        ></div>
      </div>
      <div className="text-right">
        <div 
          className="h-4 bg-gray-200 rounded mb-2"
          style={{
            width: '70px',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200px 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        ></div>
        <div 
          className="h-3 bg-gray-200 rounded"
          style={{
            width: '50px',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200px 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        ></div>
      </div>
    </div>
  </div>
);

const ErrorState: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <div 
      className="rounded-full flex items-center justify-center mx-auto mb-6"
      style={{
        width: '64px',
        height: '64px',
        backgroundColor: '#fef2f2'
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="32" height="32" color="#ef4444">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
      </svg>
    </div>
    
    <h3 className="text-xl font-bold text-gray-900 mb-3">Connection Error</h3>
    <p className="text-gray-600 mb-6" style={{ maxWidth: '280px', lineHeight: '1.5' }}>
      {error}
    </p>
    
    <button onClick={onRetry} className="btn btn-primary">
      Try Again
    </button>
    
    <div className="text-sm text-gray-500 mt-6 space-y-1">
      <p>• Check your internet connection</p>
      <p>• Try refreshing the page</p>
    </div>
  </div>
);

const EmptySearchState: React.FC<{ searchTerm: string }> = ({ searchTerm }) => (
  <div className="flex flex-col items-center justify-center py-12 px-8 text-center">
    <div 
      className="rounded-full flex items-center justify-center mx-auto mb-6"
      style={{
        width: '48px',
        height: '48px',
        backgroundColor: '#f3f4f6'
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="24" height="24" color="#9ca3af">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    </div>
    
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
    <p className="text-gray-500 mb-4">
      No cryptocurrencies found for "{searchTerm}"
    </p>
    
    <div 
      className="rounded-xl p-3"
      style={{ 
        backgroundColor: '#eff6ff',
        maxWidth: '280px'
      }}
    >
      <p className="text-sm" style={{ color: '#1e40af' }}>
        💡 Try different keywords or check spelling
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
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Market Overview</h3>
      <div className="stats-grid">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">
            ${(totalMarketCap / 1e12).toFixed(2)}T
          </div>
          <div className="text-xs text-gray-500">Market Cap</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold" style={{ color: '#16a34a' }}>{gainers}</div>
          <div className="text-xs text-gray-500">Gainers</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold" style={{ color: '#dc2626' }}>{losers}</div>
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
      <AppHeader onRefresh={onRefresh} isRefreshing={isRefreshing} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <div className="content-area">
        {loading && (
          <div className="pt-4">
            {[...Array(6)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        )}
        
        {error && <ErrorState error={error} onRetry={onRetry} />}
        
        {!loading && !error && cryptos.length > 0 && (
          <>
            {!searchTerm && <MarketStats cryptos={cryptos} />}
            
            <div className="pt-2">
              {filteredCryptos.map((crypto, index) => (
                <div 
                  key={crypto.id} 
                  className="animate-slide-up" 
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CryptoCard crypto={crypto} index={index} />
                </div>
              ))}
            </div>
            
            {filteredCryptos.length === 0 && searchTerm && (
              <EmptySearchState searchTerm={searchTerm} />
            )}
            
            {!searchTerm && (
              <div className="px-6 py-6 text-center">
                <p className="text-sm text-gray-500">
                  🔄 Updates every 30 seconds
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Data provided by CoinGecko
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;