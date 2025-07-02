// src/components/home/CryptoCard.tsx - Mobile-Optimized Version
import React from 'react';
import { CryptoData } from '../../types/crypto';

interface CryptoCardProps {
  crypto: CryptoData;
  index: number;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto, index }) => {
  const formatPrice = (price: number) => {
    if (price >= 1) {
      return `$${price.toFixed(2)}`;
    } else if (price >= 0.01) {
      return `$${price.toFixed(4)}`;
    } else {
      return `$${price.toFixed(8)}`;
    }
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${(marketCap / 1e3).toFixed(2)}K`;
    }
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    } else {
      return `$${(volume / 1e3).toFixed(2)}K`;
    }
  };

  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <div className="w-full max-w-full bg-white rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 crypto-card">
      <div className="flex items-center gap-3 w-full min-w-0">
        {/* Crypto Icon and Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img 
            src={crypto.image} 
            alt={crypto.name} 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://via.placeholder.com/48x48/3B82F6/FFFFFF?text=${crypto.symbol.charAt(0)}`;
            }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                {crypto.symbol.toUpperCase()}
              </h3>
              <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
                #{crypto.market_cap_rank}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              {crypto.name}
            </p>
          </div>
        </div>

        {/* Price and Change */}
        <div className="text-right flex-shrink-0">
          <div className="font-bold text-gray-900 text-sm sm:text-base mb-1">
            {formatPrice(crypto.current_price)}
          </div>
          <div className={`text-xs sm:text-sm font-semibold flex items-center justify-end gap-1 ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <span className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '↗' : '↘'}
            </span>
            {isPositive ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Additional Info - Mobile Responsive */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-gray-500 mb-1">Market Cap</div>
            <div className="font-semibold text-gray-900 truncate">
              {formatMarketCap(crypto.market_cap)}
            </div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">Volume (24h)</div>
            <div className="font-semibold text-gray-900 truncate">
              {formatVolume(crypto.total_volume)}
            </div>
          </div>
        </div>

        {/* Price Chart Indicator */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isPositive ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
            <span className="text-xs text-gray-500">Live</span>
          </div>
          <div className="text-xs text-gray-400">
            Vol: {formatVolume(crypto.total_volume)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;