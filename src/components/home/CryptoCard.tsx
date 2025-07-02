// src/components/home/CryptoCard.tsx
import React from 'react';
import { CryptoData } from '../../types/crypto';
import { formatCurrency, formatCompactNumber, formatPercentage } from '../../utils/formatters';

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
      className="flex items-center rounded-lg border"
      style={{ 
        gap: '4px',
        padding: '4px 8px',
        backgroundColor: bgClass,
        borderColor: borderClass
      }}
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        width="12" 
        height="12" 
        color={colorClass}
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
      <span style={{ fontSize: '12px', fontWeight: '600', color: colorClass }}>
        {Math.abs(percentage).toFixed(2)}%
      </span>
      <span style={{ fontSize: '12px', color: '#6b7280' }}>{period}</span>
    </div>
  );
};

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto, index }) => {
  return (
    <div className="mx-6 mb-3 transition hover-scale">
      <div 
        className="card transition animate-slide-up"
        style={{ 
          animationDelay: `${index * 50}ms`,
          border: '1px solid #f3f4f6'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#3b82f6';
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#f3f4f6';
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
        }}
      >
        <div className="flex items-center justify-between">
          {/* Left section - Coin info */}
          <div className="flex items-center flex-1" style={{ gap: '12px' }}>
            <div className="relative">
              <img
                src={crypto.image}
                alt={crypto.name}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  border: '2px solid #f3f4f6'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="24" cy="24" r="24" fill="#F3F4F6"/>
                      <text x="24" y="28" text-anchor="middle" fill="#9CA3AF" font-size="12" font-weight="bold">
                        ${crypto.symbol.toUpperCase().substring(0, 3)}
                      </text>
                    </svg>
                  `)}`;
                }}
              />
              <div 
                className="absolute text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg"
                style={{
                  top: '-4px',
                  left: '-4px',
                  width: '20px',
                  height: '20px',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                }}
              >
                {crypto.market_cap_rank}
              </div>
            </div>
            
            <div className="flex-1" style={{ minWidth: '0' }}>
              <div className="flex items-center" style={{ gap: '8px' }}>
                <h3 className="font-bold text-lg text-gray-900" style={{ 
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {crypto.name}
                </h3>
              </div>
              <div className="flex items-center mt-1" style={{ gap: '8px' }}>
                <p className="text-gray-500 text-sm font-bold" style={{ 
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {crypto.symbol}
                </p>
                <div style={{
                  width: '4px',
                  height: '4px',
                  backgroundColor: '#d1d5db',
                  borderRadius: '50%'
                }}></div>
                <p className="text-gray-400 text-xs">
                  Vol: {formatCompactNumber(crypto.total_volume)}
                </p>
              </div>
            </div>
          </div>
          
          {/* Right section - Price info */}
          <div className="text-right" style={{ marginLeft: '16px' }}>
            <div className="text-lg font-bold text-gray-900 mb-2">
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
          className="mt-3 pt-3 flex justify-between items-center text-xs text-gray-500"
          style={{ borderTop: '1px solid #f3f4f6' }}
        >
          <span>Market Cap: {formatCompactNumber(crypto.market_cap)}</span>
          <span className="flex items-center" style={{ gap: '4px' }}>
            <div 
              className="rounded-full"
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: crypto.price_change_percentage_24h > 0 ? '#10b981' : '#ef4444'
              }}
            ></div>
            <span>Live</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;