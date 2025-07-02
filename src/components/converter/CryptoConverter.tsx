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
    setFromCrypto(toCrypto);
    setToCrypto(tempFrom);
    setAmount(result);
  };

  const fromCryptoData = cryptos.find(c => c.id === fromCrypto);
  const toCryptoData = cryptos.find(c => c.id === toCrypto);

  const PriceChangeIndicator = ({ percentage }: { percentage: number }) => {
    const isPositive = percentage > 0;
    
    return (
      <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <svg 
          className="w-3 h-3" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 text-white">
        <div className="max-w-md lg:max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Crypto Converter</h1>
          <p className="text-green-100 text-sm sm:text-base lg:text-lg opacity-90">
            Convert between cryptocurrencies instantly
          </p>
        </div>
      </div>

      <div className="max-w-md lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
        {/* Main Converter Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden lg:max-w-2xl">
          
          {/* From Section */}
          <div className="p-6 pb-3">
            <label className="block text-sm font-semibold text-gray-700 mb-4">From</label>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                {fromCryptoData && (
                  <div className="relative">
                    <img 
                      src={fromCryptoData.image} 
                      alt={fromCryptoData.name} 
                      className="w-10 h-10 rounded-full shadow-md border-2 border-white"
                    />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {fromCryptoData.market_cap_rank}
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <select
                    value={fromCrypto}
                    onChange={(e) => setFromCrypto(e.target.value)}
                    className="w-full bg-transparent text-lg font-bold text-gray-900 border-none outline-none cursor-pointer truncate"
                  >
                    {cryptos.map((crypto) => (
                      <option key={crypto.id} value={crypto.id}>
                        {crypto.name} ({crypto.symbol.toUpperCase()})
                      </option>
                    ))}
                  </select>
                  {fromCryptoData && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-600 font-medium">
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
                className="w-full bg-transparent text-3xl font-bold text-gray-900 border-none outline-none placeholder-gray-400"
                placeholder="0.00"
                min="0"
                step="any"
              />
              
              {fromCryptoData && (
                <p className="text-sm text-gray-500 mt-3 font-medium">
                  ≈ {formatCurrency(parseFloat(amount || '0') * fromCryptoData.current_price)}
                </p>
              )}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center py-3">
            <button
              onClick={swapCryptos}
              className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-white group"
            >
              <svg 
                className="w-6 h-6 transform group-hover:rotate-180 transition-transform duration-500" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <polyline points="16 3 21 3 21 8"></polyline>
                <line x1="4" y1="20" x2="21" y2="3"></line>
                <polyline points="21 16 21 21 16 21"></polyline>
                <line x1="15" y1="10" x2="21" y2="4"></line>
              </svg>
            </button>
          </div>

          {/* To Section */}
          <div className="p-6 pt-3">
            <label className="block text-sm font-semibold text-gray-700 mb-4">To</label>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200 hover:border-blue-300 transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                {toCryptoData && (
                  <div className="relative">
                    <img 
                      src={toCryptoData.image} 
                      alt={toCryptoData.name} 
                      className="w-10 h-10 rounded-full shadow-md border-2 border-white"
                    />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {toCryptoData.market_cap_rank}
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <select
                    value={toCrypto}
                    onChange={(e) => setToCrypto(e.target.value)}
                    className="w-full bg-transparent text-lg font-bold text-gray-900 border-none outline-none cursor-pointer truncate"
                  >
                    {cryptos.map((crypto) => (
                      <option key={crypto.id} value={crypto.id}>
                        {crypto.name} ({crypto.symbol.toUpperCase()})
                      </option>
                    ))}
                  </select>
                  {toCryptoData && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-600 font-medium">
                        {formatCurrency(toCryptoData.current_price)}
                      </span>
                      <PriceChangeIndicator percentage={toCryptoData.price_change_percentage_24h} />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-3xl font-bold text-gray-900 mb-3 animate-pulse">
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
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mt-4 hover:shadow-xl transition-shadow duration-300 lg:max-w-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium text-sm">
                  1 {fromCryptoData.symbol.toUpperCase()}
                </span>
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
        <div className="grid grid-cols-4 gap-2 mt-4 lg:max-w-2xl">
          {['0.1', '0.5', '1', '10'].map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className={`py-3 px-3 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                amount === value 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        {/* Market Info */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-100 lg:max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Live Rates</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Rates are updated in real-time from multiple exchanges. 
            Conversion rates may vary slightly due to market volatility.
          </p>
        </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Market Stats</h3>
              <div className="space-y-4">
                {cryptos.slice(0, 3).map((crypto) => (
                  <div key={crypto.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={crypto.image} alt={crypto.name} className="w-6 h-6 rounded-full" />
                      <span className="font-medium text-sm">{crypto.symbol.toUpperCase()}</span>
                    </div>
                    <span className="text-sm font-semibold">{formatCurrency(crypto.current_price)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversion History */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Conversions</h3>
              <div className="space-y-3">
                <div className="text-xs text-gray-500 text-center py-8">
                  Your conversion history will appear here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoConverter;