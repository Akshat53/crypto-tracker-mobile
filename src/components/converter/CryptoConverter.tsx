// src/components/converter/CryptoConverter.tsx
import React, { useState, useEffect } from 'react';
import { CryptoData } from '../../types/crypto';
import { formatCurrency } from '../../utils/formatters';

interface CryptoConverterProps {
  cryptos: CryptoData[];
}

const CryptoConverter: React.FC<CryptoConverterProps> = ({ cryptos }) => {
  const [fromCrypto, setFromCrypto] = useState('bitcoin');
  const [toCrypto, setToCrypto] = useState('ethereum');
  const [amount, setAmount] = useState('1');
  const [result, setResult] = useState('0');

  const convertCrypto = () => {
    const fromPrice = cryptos.find(c => c.id === fromCrypto)?.current_price || 0;
    const toPrice = cryptos.find(c => c.id === toCrypto)?.current_price || 0;
    
    if (fromPrice && toPrice && amount) {
      const converted = (parseFloat(amount) * fromPrice) / toPrice;
      setResult(converted.toFixed(8));
    }
  };

  useEffect(() => {
    convertCrypto();
  }, [fromCrypto, toCrypto, amount, cryptos]);

  const swapCryptos = () => {
    const tempFrom = fromCrypto;
    const tempAmount = amount;
    setFromCrypto(toCrypto);
    setToCrypto(tempFrom);
    setAmount(result);
  };

  const fromCryptoData = cryptos.find(c => c.id === fromCrypto);
  const toCryptoData = cryptos.find(c => c.id === toCrypto);

  const PriceChangeIndicator = ({ percentage }: { percentage: number }) => {
    const isPositive = percentage > 0;
    const color = isPositive ? '#10b981' : '#ef4444';
    
    return (
      <div className="flex items-center" style={{ gap: '4px', color }}>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          width="12" 
          height="12"
        >
          {isPositive ? (
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          ) : (
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
          )}
        </svg>
        <span className="text-xs font-medium">
          {Math.abs(percentage).toFixed(2)}%
        </span>
      </div>
    );
  };

  return (
    <div className="flex-1" style={{ background: 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)' }}>
      {/* Header */}
      <div className="gradient-green-teal px-6 py-8 text-white">
        <h1 className="text-2xl font-bold mb-2">Currency Converter</h1>
        <p style={{ color: 'rgba(240, 253, 244, 0.8)' }}>
          Convert between cryptocurrencies
        </p>
      </div>

      <div className="px-6 py-6">
        {/* Main Converter Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6" style={{ border: '1px solid #f3f4f6' }}>
          
          {/* From Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">From</label>
            <div 
              className="rounded-2xl p-4 border-2"
              style={{ 
                background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
                borderColor: '#e5e7eb'
              }}
            >
              <div className="flex items-center mb-4" style={{ gap: '12px' }}>
                {fromCryptoData && (
                  <div className="relative">
                    <img 
                      src={fromCryptoData.image} 
                      alt={fromCryptoData.name} 
                      className="rounded-full shadow-lg"
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '2px solid white'
                      }}
                    />
                    <div 
                      className="absolute text-white text-xs font-bold rounded-full flex items-center justify-center"
                      style={{
                        top: '-4px',
                        right: '-4px',
                        width: '16px',
                        height: '16px',
                        backgroundColor: '#3b82f6'
                      }}
                    >
                      {fromCryptoData.market_cap_rank}
                    </div>
                  </div>
                )}
                <div className="flex-1">
                  <select
                    value={fromCrypto}
                    onChange={(e) => setFromCrypto(e.target.value)}
                    className="w-full bg-transparent text-lg font-bold text-gray-900"
                    style={{ 
                      border: 'none',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {cryptos.map((crypto) => (
                      <option key={crypto.id} value={crypto.id}>
                        {crypto.name} ({crypto.symbol.toUpperCase()})
                      </option>
                    ))}
                  </select>
                  {fromCryptoData && (
                    <div className="flex items-center mt-1" style={{ gap: '8px' }}>
                      <span className="text-sm text-gray-600">
                        {formatCurrency(fromCryptoData.current_price)}
                      </span>
                      <PriceChangeIndicator percentage={fromCryptoData.price_change_percentage_24h} />
                    </div>
                  )}
                </div>
              </div>
              
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent text-3xl font-bold text-gray-900"
                placeholder="0.00"
                min="0"
                step="any"
                style={{ 
                  border: 'none',
                  outline: 'none'
                }}
              />
              
              {fromCryptoData && (
                <p className="text-sm text-gray-500 mt-3 font-medium">
                  ≈ {formatCurrency(parseFloat(amount || '0') * fromCryptoData.current_price)}
                </p>
              )}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={swapCryptos}
              className="transition shadow-lg hover-lift"
              style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                borderRadius: '50%',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                width="24" 
                height="24"
                className="transition"
                style={{ transform: 'rotate(0deg)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(180deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg)';
                }}
              >
                <polyline points="16 3 21 3 21 8"></polyline>
                <line x1="4" y1="20" x2="21" y2="3"></line>
                <polyline points="21 16 21 21 16 21"></polyline>
                <line x1="15" y1="10" x2="21" y2="4"></line>
              </svg>
            </button>
          </div>

          {/* To Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">To</label>
            <div 
              className="rounded-2xl p-4 border-2"
              style={{ 
                background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                borderColor: '#93c5fd'
              }}
            >
              <div className="flex items-center mb-4" style={{ gap: '12px' }}>
                {toCryptoData && (
                  <div className="relative">
                    <img 
                      src={toCryptoData.image} 
                      alt={toCryptoData.name} 
                      className="rounded-full shadow-lg"
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '2px solid white'
                      }}
                    />
                    <div 
                      className="absolute text-white text-xs font-bold rounded-full flex items-center justify-center"
                      style={{
                        top: '-4px',
                        right: '-4px',
                        width: '16px',
                        height: '16px',
                        backgroundColor: '#10b981'
                      }}
                    >
                      {toCryptoData.market_cap_rank}
                    </div>
                  </div>
                )}
                <div className="flex-1">
                  <select
                    value={toCrypto}
                    onChange={(e) => setToCrypto(e.target.value)}
                    className="w-full bg-transparent text-lg font-bold text-gray-900"
                    style={{ 
                      border: 'none',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {cryptos.map((crypto) => (
                      <option key={crypto.id} value={crypto.id}>
                        {crypto.name} ({crypto.symbol.toUpperCase()})
                      </option>
                    ))}
                  </select>
                  {toCryptoData && (
                    <div className="flex items-center mt-1" style={{ gap: '8px' }}>
                      <span className="text-sm text-gray-600">
                        {formatCurrency(toCryptoData.current_price)}
                      </span>
                      <PriceChangeIndicator percentage={toCryptoData.price_change_percentage_24h} />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-3xl font-bold text-gray-900 mb-3">
                {result}
              </div>
              
              {toCryptoData && (
                <p className="text-sm text-gray-500 font-medium">
                  ≈ {formatCurrency(parseFloat(result) * toCryptoData.current_price)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Conversion Rate Card */}
        {fromCryptoData && toCryptoData && (
          <div className="bg-white rounded-2xl p-4 shadow mb-4" style={{ border: '1px solid #e5e7eb' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center" style={{ gap: '8px' }}>
                <span className="text-gray-600 font-medium">
                  1 {fromCryptoData.symbol.toUpperCase()}
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" color="#9ca3af">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
              <span className="font-bold text-gray-900">
                {(fromCryptoData.current_price / toCryptoData.current_price).toFixed(6)} {toCryptoData.symbol.toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {/* Quick Convert Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {['0.1', '0.5', '1', '10'].map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className={`py-2 px-3 rounded-xl text-sm font-medium transition ${
                amount === value ? 'text-white shadow-lg' : 'hover-lift'
              }`}
              style={{
                background: amount === value ? '#3b82f6' : '#f3f4f6',
                color: amount === value ? 'white' : '#374151',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (amount !== value) {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }
              }}
              onMouseLeave={(e) => {
                if (amount !== value) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoConverter;