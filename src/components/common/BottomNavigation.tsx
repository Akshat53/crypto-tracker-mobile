// src/components/common/BottomNavigation.tsx - Desktop Enhanced
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
      shortLabel: 'Markets',
      gradient: 'from-blue-500 to-purple-600',
      bgGradient: 'bg-gradient-to-r from-blue-500 to-purple-600',
      icon: (
        <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 3v18h18"></path>
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
        </svg>
      )
    },
    { 
      id: 'converter' as const, 
      label: 'Convert',
      shortLabel: 'Convert',
      gradient: 'from-green-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-r from-green-500 to-cyan-500',
      icon: (
        <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="16 3 21 3 21 8"></polyline>
          <line x1="4" y1="20" x2="21" y2="3"></line>
          <polyline points="21 16 21 21 16 21"></polyline>
          <line x1="15" y1="10" x2="21" y2="4"></line>
        </svg>
      )
    },
    { 
      id: 'portfolio' as const, 
      label: 'Portfolio',
      shortLabel: 'Portfolio',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
      icon: (
        <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
          <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
        </svg>
      )
    },
    { 
      id: 'settings' as const, 
      label: 'Settings',
      shortLabel: 'Settings',
      gradient: 'from-gray-500 to-gray-700',
      bgGradient: 'bg-gradient-to-r from-gray-500 to-gray-700',
      icon: (
        <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      )
    },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl">
        <div className="safe-area-bottom px-2 sm:px-4">
          <div className="flex justify-around items-center py-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 transform active:scale-95 hover:bg-gray-50 ${
                    isActive ? 'scale-105' : 'hover:scale-102'
                  }`}
                  style={{ minWidth: '60px', minHeight: '60px' }}
                >
                  {/* Active background indicator */}
                  {isActive && (
                    <div className={`absolute inset-0 ${item.bgGradient} opacity-10 rounded-2xl animate-pulse`}></div>
                  )}
                  
                  {/* Icon container */}
                  <div className={`
                    relative z-10 w-8 h-8 rounded-xl flex items-center justify-center mb-1 transition-all duration-300 transform
                    ${isActive 
                      ? `${item.bgGradient} text-white shadow-lg` 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                    ${isActive ? 'animate-bounce-subtle' : ''}
                  `}>
                    {item.icon}
                    
                    {/* Glow effect for active state */}
                    {isActive && (
                      <div className={`absolute inset-0 ${item.bgGradient} rounded-xl blur-md opacity-30 -z-10 animate-pulse`}></div>
                    )}
                  </div>
                  
                  {/* Label */}
                  <span className={`
                    relative z-10 text-xs font-semibold transition-all duration-300 leading-tight
                    ${isActive 
                      ? `bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent` 
                      : 'text-gray-600'
                    }
                  `}>
                    {item.shortLabel}
                  </span>
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className={`
                      absolute -top-1 w-1.5 h-1.5 ${item.bgGradient} rounded-full animate-pulse
                    `}></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Home indicator for iPhone-style devices */}
        <div className="flex justify-center pb-1">
          <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Desktop Sidebar Navigation */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-20 xl:w-64 bg-white/95 backdrop-blur-lg border-r border-gray-200 shadow-lg z-40">
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="p-4 xl:p-6 border-b border-gray-200">
            <div className="xl:flex xl:items-center xl:gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto xl:mx-0">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 3v18h18"></path>
                  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                </svg>
              </div>
              <div className="hidden xl:block">
                <h2 className="font-bold text-gray-900 text-lg">CryptoTracker</h2>
                <p className="text-xs text-gray-500">Pro Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-2 xl:p-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`
                      w-full flex items-center gap-3 p-3 xl:p-4 rounded-2xl transition-all duration-300 group relative
                      ${isActive 
                        ? `${item.bgGradient} text-white shadow-lg transform scale-105` 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    {/* Active background glow */}
                    {isActive && (
                      <div className={`absolute inset-0 ${item.bgGradient} rounded-2xl blur-xl opacity-20 -z-10`}></div>
                    )}

                    {/* Icon */}
                    <div className={`
                      flex-shrink-0 transition-transform duration-300
                      ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                    `}>
                      {item.icon}
                    </div>
                    
                    {/* Label - only show on xl screens */}
                    <span className={`
                      hidden xl:block font-semibold transition-all duration-300 text-left
                      ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'}
                    `}>
                      {item.label}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse xl:hidden"></div>
                    )}

                    {/* Hover tooltip for collapsed state */}
                    <div className="xl:hidden absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 xl:p-6 border-t border-gray-200">
            <div className="text-center xl:text-left">
              <div className="hidden xl:block">
                <p className="text-xs text-gray-500 mb-1">Version 1.0.0</p>
                <p className="text-xs text-gray-400">© 2025 CryptoTracker</p>
              </div>
              <div className="xl:hidden">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNavigation;