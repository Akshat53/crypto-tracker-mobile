// src/components/home/AppHeader.tsx
import React from 'react';

interface AppHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onRefresh, isRefreshing }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-4 sm:px-6 lg:px-8 py-4 lg:py-6 text-white">
      <div className="max-w-md lg:max-w-7xl mx-auto">
        {/* Desktop Header Layout */}
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 3v18h18"></path>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                CryptoTracker
              </h1>
              <p className="text-blue-100 text-sm opacity-90 font-medium">
                Professional crypto portfolio management
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onRefresh}
              disabled={isRefreshing}
              className={`flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 transition-all duration-300 hover:bg-white/30 ${
                isRefreshing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
              }`}
            >
              <svg 
                className={`w-4 h-4 text-white ${isRefreshing ? 'animate-spin' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="m20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
              </svg>
              <span className="text-sm font-medium">Refresh</span>
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 transition-all duration-300 hover:bg-white/30 hover:shadow-lg">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
              <span className="text-sm font-medium">Alerts</span>
            </button>
          </div>
        </div>

        {/* Mobile Header section */}
        <div className="flex justify-between items-center mb-3 lg:hidden">
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              CryptoTracker
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm opacity-90 font-medium">
              Track your crypto investments
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={onRefresh}
              disabled={isRefreshing}
              className={`w-8 h-8 sm:w-9 sm:h-9 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110 hover:rotate-12 ${
                isRefreshing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg active:scale-95'
              }`}
            >
              <svg 
                className={`w-4 h-4 text-white ${isRefreshing ? 'animate-spin' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="m20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
              </svg>
            </button>
            
            <button className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110 hover:shadow-lg active:scale-95 group">
              <svg 
                className="w-4 h-4 text-white group-hover:animate-bounce" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </button>
          </div>
        </div>
        
      {/* Portfolio summary card */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20 shadow-lg lg:max-w-md">
        <div className="flex justify-between items-center mb-2">
          <span className="text-blue-100 text-xs lg:text-sm font-medium uppercase tracking-wide">
            Portfolio Value
          </span>
          <button className="text-blue-100 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10">
            <svg className="w-3 h-3 lg:w-4 lg:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
        
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-white">
          $12,847.92
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-400/30">
            <svg className="w-3 h-3 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            <span className="text-xs font-semibold text-green-300">
              +2.34%
            </span>
          </div>
          
          <span className="text-blue-100 text-xs font-medium">
            Today
          </span>
          
          <div className="ml-auto flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-300 font-medium">Live</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AppHeader;