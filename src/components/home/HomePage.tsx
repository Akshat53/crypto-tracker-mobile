// src/components/home/HomePage.tsx - Fixed Desktop Layout
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
  <div className="w-full bg-white rounded-2xl p-4 shadow-md border border-gray-100 animate-pulse">
    <div className="flex items-center gap-3 w-full">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
      <div className="flex-1 min-w-0">
        <div className="h-4 bg-gray-200 rounded mb-2 w-20 max-w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-16 max-w-full"></div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="h-4 bg-gray-200 rounded mb-2 w-16"></div>
        <div className="h-3 bg-gray-200 rounded w-12"></div>
      </div>
    </div>
  </div>
);

const ErrorState: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center bg-white rounded-2xl shadow-lg border border-gray-100 mx-4">
    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
      <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
      </svg>
    </div>
    
    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Connection Error</h3>
    <p className="text-gray-600 mb-6 text-sm leading-relaxed max-w-sm">
      {error}
    </p>
    
    <button 
      onClick={onRetry}
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95"
    >
      Try Again
    </button>
    
    <div className="mt-6 text-xs text-gray-500 space-y-1">
      <p>• Check your internet connection</p>
      <p>• Try refreshing the page</p>
    </div>
  </div>
);

const EmptySearchState: React.FC<{ searchTerm: string; onClear: () => void }> = ({ searchTerm, onClear }) => (
  <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-6 text-center bg-white rounded-2xl shadow-lg border border-gray-100 mx-4">
    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
      <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    </div>
    
    <h3 className="text-lg font-bold text-gray-900 mb-2">No Results Found</h3>
    <p className="text-gray-500 mb-4 text-sm">
      No cryptocurrencies found for <span className="font-semibold text-blue-600">"{searchTerm}"</span>
    </p>
    
    <button
      onClick={onClear}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
    >
      Clear Search
    </button>
    
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4 max-w-xs">
      <p className="text-xs text-blue-700 font-medium">
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
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-3 sm:p-4 mx-4 mb-4 lg:mx-0 lg:mb-6 border border-blue-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        Market Overview
      </h3>
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="text-center">
          <div className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1">
            ${(totalMarketCap / 1e12).toFixed(2)}T
          </div>
          <div className="text-xs text-gray-500 font-medium">Total Cap</div>
        </div>
        <div className="text-center">
          <div className="text-base sm:text-lg lg:text-xl font-bold text-green-600 mb-1">{gainers}</div>
          <div className="text-xs text-gray-500 font-medium">Gainers</div>
        </div>
        <div className="text-center">
          <div className="text-base sm:text-lg lg:text-xl font-bold text-red-600 mb-1">{losers}</div>
          <div className="text-xs text-gray-500 font-medium">Losers</div>
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
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Fixed Header Section */}
      <div className="flex-shrink-0">
        <AppHeader onRefresh={onRefresh} isRefreshing={isRefreshing} />
      </div>
      
      {/* Mobile Layout */}
      <div className="lg:hidden flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="flex-shrink-0">
          <div className="px-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          
          
       
        </div>
        
        {/* Mobile Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4">
          <div className="pb-24 max-w-full">
            {/* Loading State */}
            {loading && (
              <div className="space-y-3">
                {[...Array(8)].map((_, i) => (
                  <LoadingCard key={i} />
                ))}
              </div>
            )}
            
            {/* Error State */}
            {error && (
              <div className="px-2">
                <ErrorState error={error} onRetry={onRetry} />
              </div>
            )}
            
            {/* Crypto List */}
            {!loading && !error && cryptos.length > 0 && (
              <div className="w-full">
                <div className="space-y-3 w-full">
                  {filteredCryptos.map((crypto, index) => (
                    <div 
                      key={crypto.id} 
                      className="animate-slide-up w-full"
                      style={{ 
                        animationDelay: `${Math.min(index * 0.05, 2)}s`,
                        animationFillMode: 'both'
                      }}
                    >
                      <div className="w-full max-w-full">
                        <CryptoCard crypto={crypto} index={index} />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Empty Search Results */}
                {filteredCryptos.length === 0 && searchTerm && (
                  <div className="px-2">
                    <EmptySearchState 
                      searchTerm={searchTerm} 
                      onClear={() => setSearchTerm('')}
                    />
                  </div>
                )}
                
                {/* Footer Info */}
                {filteredCryptos.length > 0 && (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-xs text-gray-600 font-medium">
                        Live • {filteredCryptos.length} coins
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Powered by CoinGecko
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout - FIXED */}
      <div className="hidden lg:block flex-1 min-h-0">
        <div className="h-full max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex gap-6 h-full">
            {/* Main Content - Left Side */}
            <div className="flex-1 flex flex-col min-h-0 min-w-0">
              {/* Search and Market Stats */}
              <div className="flex-shrink-0 mb-6">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                
             
              </div>
              
              {/* Main Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Loading State */}
                {loading && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 px-2">
                    {[...Array(12)].map((_, i) => (
                      <LoadingCard key={i} />
                    ))}
                  </div>
                )}
                
                {/* Error State */}
                {error && (
                  <div className="px-2">
                    <ErrorState error={error} onRetry={onRetry} />
                  </div>
                )}
                
                {/* Crypto Grid */}
                {!loading && !error && cryptos.length > 0 && (
                  <div className="px-2">
                    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                      {filteredCryptos.map((crypto, index) => (
                        <div 
                          key={crypto.id} 
                          className="animate-slide-up"
                          style={{ 
                            animationDelay: `${Math.min(index * 0.02, 1)}s`,
                            animationFillMode: 'both'
                          }}
                        >
                          <CryptoCard crypto={crypto} index={index} />
                        </div>
                      ))}
                    </div>
                    
                    {/* Empty Search Results */}
                    {filteredCryptos.length === 0 && searchTerm && (
                      <div className="mt-4">
                        <EmptySearchState 
                          searchTerm={searchTerm} 
                          onClear={() => setSearchTerm('')}
                        />
                      </div>
                    )}
                    
                    {/* Footer Info */}
                    {filteredCryptos.length > 0 && (
                      <div className="text-center py-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <p className="text-xs text-gray-600 font-medium">
                            Live updates • {filteredCryptos.length} cryptocurrencies
                          </p>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          Data powered by CoinGecko API
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Right Side - FIXED WIDTH */}
            <div className="hidden xl:block w-80 flex-shrink-0 overflow-y-auto">
              <div className="space-y-6">
                {/* Top Gainers */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Top Gainers
                  </h3>
                  <div className="space-y-3">
                    {cryptos
                      .filter(crypto => crypto.price_change_percentage_24h > 0)
                      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
                      .slice(0, 5)
                      .map((crypto) => (
                        <div key={crypto.id} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <img src={crypto.image} alt={crypto.name} className="w-6 h-6 rounded-full flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-sm">{crypto.symbol.toUpperCase()}</div>
                              <div className="text-xs text-gray-500 truncate">{crypto.name}</div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-2">
                            <div className="text-sm font-semibold">{formatCompactNumber(crypto.current_price)}</div>
                            <div className="text-xs text-green-600 font-medium">+{crypto.price_change_percentage_24h.toFixed(2)}%</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Top Losers */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    Top Losers
                  </h3>
                  <div className="space-y-3">
                    {cryptos
                      .filter(crypto => crypto.price_change_percentage_24h < 0)
                      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
                      .slice(0, 5)
                      .map((crypto) => (
                        <div key={crypto.id} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <img src={crypto.image} alt={crypto.name} className="w-6 h-6 rounded-full flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-sm">{crypto.symbol.toUpperCase()}</div>
                              <div className="text-xs text-gray-500 truncate">{crypto.name}</div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-2">
                            <div className="text-sm font-semibold">{formatCompactNumber(crypto.current_price)}</div>
                            <div className="text-xs text-red-600 font-medium">{crypto.price_change_percentage_24h.toFixed(2)}%</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Market Insights */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                    Market Insights
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Bitcoin dominance remains strong in the current market cycle.</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">DeFi tokens showing increased activity this week.</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Market volatility expected due to upcoming events.</p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Fear & Greed Index</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="font-semibold text-yellow-600">Neutral</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">BTC Dominance</span>
                      <span className="font-semibold text-orange-600">42.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Coins</span>
                      <span className="font-semibold text-blue-600">{cryptos.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style >{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slideInUp 0.4s ease-out forwards;
        }
        
        /* Prevent horizontal overflow on mobile */
        @media (max-width: 1023px) {
          * {
            max-width: 100%;
            box-sizing: border-box;
          }
          
          .crypto-card {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;