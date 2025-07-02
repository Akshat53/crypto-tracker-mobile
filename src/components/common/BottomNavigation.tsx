// src/components/common/BottomNavigation.tsx
import React from 'react';
import { TabType } from '../../types/crypto';

interface BottomNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { 
      id: 'home' as const, 
      label: 'Markets',
      gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="24" height="24">
          <path d="M3 3v18h18"></path>
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
        </svg>
      )
    },
    { 
      id: 'converter' as const, 
      label: 'Convert',
      gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="24" height="24">
          <polyline points="16 3 21 3 21 8"></polyline>
          <line x1="4" y1="20" x2="21" y2="3"></line>
          <polyline points="21 16 21 21 16 21"></polyline>
          <line x1="15" y1="10" x2="21" y2="4"></line>
          <line x1="4" y1="14" x2="4" y2="20"></line>
        </svg>
      )
    },
    { 
      id: 'portfolio' as const, 
      label: 'Portfolio',
      gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="24" height="24">
          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
          <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
        </svg>
      )
    },
    { 
      id: 'settings' as const, 
      label: 'Settings',
      gradient: 'linear-gradient(135deg, #6b7280, #374151)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="24" height="24">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      )
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 container">
      <div 
        className="rounded-t-2xl shadow-2xl"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid #e5e7eb'
        }}
      >
        <div className="px-6 py-3">
          <div className="flex justify-around items-center">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex flex-col items-center py-3 px-4 rounded-2xl transition ${
                    isActive ? 'transform' : 'hover-lift'
                  }`}
                  style={{
                    transform: isActive ? 'scale(1.1)' : 'scale(1)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    }
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = isActive ? 'scale(1.05)' : 'scale(0.95)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = isActive ? 'scale(1.1)' : 'scale(1.05)';
                  }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div 
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: item.gradient,
                        opacity: 0.1
                      }}
                    ></div>
                  )}
                  
                  {/* Icon container */}
                  <div 
                    className="relative p-2 rounded-xl transition"
                    style={{
                      background: isActive ? item.gradient : '#f9fafb',
                      color: isActive ? 'white' : '#6b7280',
                      boxShadow: isActive ? '0 4px 15px rgba(0, 0, 0, 0.2)' : 'none'
                    }}
                  >
                    {item.icon}
                  </div>
                  
                  {/* Label */}
                  <span 
                    className="text-xs font-medium mt-1 transition"
                    style={{
                      color: isActive ? '#111827' : '#6b7280'
                    }}
                  >
                    {item.label}
                  </span>
                  
                  {/* Active dot */}
                  {isActive && (
                    <div 
                      className="absolute rounded-full"
                      style={{
                        top: '-2px',
                        width: '4px',
                        height: '4px',
                        background: item.gradient
                      }}
                    ></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;