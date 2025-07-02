
// src/components/portfolio/PortfolioPage.tsx
import React from 'react';

const PortfolioPage: React.FC = () => {
  return (
    <div className="flex-1" style={{ background: 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)' }}>
      <div 
        className="px-6 py-8 text-white"
        style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}
      >
        <h1 className="text-2xl font-bold mb-2">Portfolio</h1>
        <p style={{ color: 'rgba(240, 253, 244, 0.8)' }}>
          Track your investments
        </p>
      </div>
      
      <div className="px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div 
            className="rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #f3e8ff, #fce7f3)'
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="40" height="40" color="#8b5cf6">
              <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
              <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
            </svg>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Start Building Your Portfolio
          </h3>
          
          <p 
            className="text-gray-600 mb-8"
            style={{ lineHeight: '1.6' }}
          >
            Track your cryptocurrency investments, monitor performance, and get insights into your portfolio's growth.
          </p>
          
          <button 
            className="w-full py-4 rounded-2xl font-semibold transition text-white flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              border: 'none',
              cursor: 'pointer',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #7c3aed, #db2777)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #8b5cf6, #ec4899)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add Your First Investment</span>
          </button>
          
          <div className="mt-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="24" height="24" color="#10b981" className="mx-auto mb-2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              <div className="text-sm text-gray-600">Total Gain</div>
              <div className="font-bold" style={{ color: '#10b981' }}>Coming Soon</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="24" height="24" color="#3b82f6" className="mx-auto mb-2">
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
              </svg>
              <div className="text-sm text-gray-600">Holdings</div>
              <div className="font-bold" style={{ color: '#3b82f6' }}>0 Assets</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;