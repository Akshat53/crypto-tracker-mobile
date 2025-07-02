// src/components/home/CryptoCard.tsx - FIXED VERSION
import React from 'react';
import { CryptoData } from '../../types/crypto';
import { formatCurrency, formatCompactNumber } from '../../utils/formatters';

interface CryptoCardProps {
  crypto: CryptoData;
  index: number;
}

const PriceChange: React.FC<{ percentage: number; period: string }> = ({ percentage, period }) => {
  const isPositive = percentage > 0;
  const colorClass = isPositive ? '#16a34a' : '#dc2626';
  const bgClass = isPositive ? '#f0fdf4' : '#fef2f2';
  const borderClass = isPositive ? '#bbf7d0' : '#fecaca';

  return (
    <div 
      className={`price-change ${isPositive ? 'positive' : 'negative'}`}
      style={{ 
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: '600',
        backgroundColor: bgClass,
        color: colorClass,
        border: `1px solid ${borderClass}`,
        minWidth: '60px',
        justifyContent: 'center'
      }}
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        width="10" 
        height="10"
      >
        {isPositive ? (
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        ) : (
          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
        )}
        {isPositive ? (
          <polyline points="17 6 23 6 23 12"></polyline>
        ) : (
          <polyline points="17 18 23 18 23 12"></polyline>
        )}
      </svg>
      <span>{Math.abs(percentage).toFixed(2)}%</span>
      <span style={{ opacity: 0.7 }}>{period}</span>
    </div>
  );
};

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto, index }) => {
  return (
    <div className="crypto-card">
      <div className="flex items-center justify-between">
        {/* Left section - Coin info */}
        <div className="flex items-center flex-1" style={{ gap: '12px', minWidth: 0 }}>
          <div className="relative flex-shrink-0">
            <img
              src={crypto.image}
              alt={crypto.name}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid #f3f4f6'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `data:image/svg+xml;base64,${btoa(`
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#F3F4F6"/>
                    <text x="20" y="24" text-anchor="middle" fill="#9CA3AF" font-size="10" font-weight="bold">
                      ${crypto.symbol.toUpperCase().substring(0, 3)}
                    </text>
                  </svg>
                `)}`;
              }}
            />
            <div 
              className="absolute flex items-center justify-center text-white text-xs font-bold rounded-full"
              style={{
                top: '-6px',
                left: '-6px',
                width: '18px',
                height: '18px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                fontSize: '10px'
              }}
            >
              {crypto.market_cap_rank}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-1">
              <h3 
                className="font-bold text-gray-900"
                style={{ 
                  fontSize: '16px',
                  lineHeight: '20px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '120px'
                }}
              >
                {crypto.name}
              </h3>
            </div>
            <div className="flex items-center" style={{ gap: '6px' }}>
              <span 
                className="text-gray-500 font-semibold"
                style={{ 
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {crypto.symbol}
              </span>
              <div style={{
                width: '3px',
                height: '3px',
                backgroundColor: '#d1d5db',
                borderRadius: '50%'
              }}></div>
              <span className="text-gray-400" style={{ fontSize: '11px' }}>
                Vol: {formatCompactNumber(crypto.total_volume).replace('$', '')}
              </span>
            </div>
          </div>
        </div>
        
        {/* Right section - Price info */}
        <div className="text-right flex-shrink-0" style={{ minWidth: '100px' }}>
          <div 
            className="font-bold text-gray-900 mb-2"
            style={{ fontSize: '16px', lineHeight: '20px' }}
          >
            {formatCurrency(crypto.current_price)}
          </div>
          <div className="flex flex-col" style={{ gap: '4px' }}>
            <PriceChange 
              percentage={crypto.price_change_percentage_24h} 
              period="24h" 
            />
            <PriceChange 
              percentage={crypto.price_change_percentage_7d_in_currency} 
              period="7d" 
            />
          </div>
        </div>
      </div>
      
      {/* Additional info bar */}
      <div 
        className="mt-3 pt-3 flex justify-between items-center"
        style={{ 
          borderTop: '1px solid #f3f4f6',
          fontSize: '11px',
          color: '#6b7280'
        }}
      >
        <span>Market Cap: {formatCompactNumber(crypto.market_cap).replace('$', '$')}</span>
        <div className="flex items-center" style={{ gap: '4px' }}>
          <div 
            className="rounded-full"
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: crypto.price_change_percentage_24h > 0 ? '#10b981' : '#ef4444'
            }}
          ></div>
          <span>Live</span>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;