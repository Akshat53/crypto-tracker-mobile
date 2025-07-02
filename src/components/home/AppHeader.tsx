// src/components/home/AppHeader.tsx - ULTRA COMPACT VERSION
import React from 'react';

interface AppHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onRefresh, isRefreshing }) => {
  return (
    <div className="app-header">
      {/* Ultra Compact Header section */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-lg font-bold">CryptoTracker</h1>
          <p style={{ color: 'rgba(219, 234, 254, 0.8)', fontSize: '0.7rem' }}>
            Track investments
          </p>
        </div>
        <div className="flex" style={{ gap: '6px' }}>
          <button 
            onClick={onRefresh}
            disabled={isRefreshing}
            className="transition hover-lift"
            style={{
              width: '28px', // Reduced from 36px
              height: '28px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              borderRadius: '50%',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              opacity: isRefreshing ? 0.5 : 1
            }}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              width="12" // Reduced from 16px
              height="12"
              className={isRefreshing ? 'animate-spin' : ''}
            >
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="m20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
          </button>
          <button 
            className="transition hover-lift"
            style={{
              width: '28px', // Reduced from 36px
              height: '28px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              borderRadius: '50%',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="12" height="12">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Ultra compact portfolio summary card */}
      <div className="portfolio-card">
        <div className="flex justify-between items-center mb-1">
          <span style={{ color: 'rgba(219, 234, 254, 0.9)', fontSize: '0.7rem' }}>
            Portfolio
          </span>
          <button 
            className="transition"
            style={{ 
              color: 'rgba(219, 234, 254, 0.9)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px'
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="10" height="10">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
        <div className="text-lg font-bold mb-1">$12,847.92</div> {/* Reduced from text-2xl */}
        <div className="flex items-center" style={{ gap: '4px' }}>
          <div 
            className="flex items-center px-1 py-0.5 rounded"
            style={{ 
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              gap: '2px'
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="8" height="8" color="#10b981">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            <span style={{ fontSize: '0.65rem', fontWeight: '500', color: '#10b981' }}>
              +2.34%
            </span>
          </div>
          <span style={{ color: 'rgba(219, 234, 254, 0.9)', fontSize: '0.65rem' }}>
            Today
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;