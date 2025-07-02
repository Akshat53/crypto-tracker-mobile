// src/components/portfolio/SettingsPage.tsx
import React, { JSX, useState } from 'react';

// Define proper types for better TypeScript support
interface ToggleOption {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  type: 'toggle';
  value: boolean;
  onChange: (value: boolean) => void;
}

interface SelectOption {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  type: 'select';
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

type SettingOption = ToggleOption | SelectOption;

interface NavigationOption {
  icon: JSX.Element;
  title: string;
  description: string;
  action: () => void;
}

const SettingsPage: React.FC = () => {
  // State for toggles
  const [notifications, setNotifications] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  const currencies: string[] = ['USD', 'EUR', 'GBP', 'BTC', 'ETH'];

  const settingsOptions: SettingOption[] = [
    {
      id: 'notifications',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
        </svg>
      ),
      title: 'Notifications',
      description: 'Price alerts and updates',
      type: 'toggle',
      value: notifications,
      onChange: setNotifications
    },
    {
      id: 'darkMode',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      ),
      title: 'Dark Mode',
      description: 'Switch to dark theme',
      type: 'toggle',
      value: darkMode,
      onChange: setDarkMode
    },
    {
      id: 'currency',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      ),
      title: 'Currency',
      description: 'Default display currency',
      type: 'select',
      value: selectedCurrency,
      onChange: setSelectedCurrency,
      options: currencies
    }
  ];

  const navigationOptions: NavigationOption[] = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      title: 'Privacy & Security',
      description: 'Data protection and security settings',
      action: () => {
        console.log('Privacy settings clicked');
        // Add actual navigation logic here
      }
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      title: 'Help & Support',
      description: 'Get help and contact support',
      action: () => {
        console.log('Help & Support clicked');
        // Add actual navigation logic here
      }
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10,9 9,9 8,9"></polyline>
        </svg>
      ),
      title: 'Terms & Privacy',
      description: 'Legal documents and policies',
      action: () => {
        console.log('Terms & Privacy clicked');
        // Add actual navigation logic here
      }
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
          <path d="M9 12l2 2 4-4"></path>
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
          <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path>
          <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"></path>
        </svg>
      ),
      title: 'About App',
      description: 'Version info and updates',
      action: () => {
        console.log('About App clicked');
        // Add actual navigation logic here
      }
    }
  ];

  // Helper function to handle toggle changes safely
  const handleToggleChange = (option: SettingOption) => {
    if (option.type === 'toggle') {
      option.onChange(!option.value);
    }
  };

  // Helper function to handle select changes safely
  const handleSelectChange = (option: SettingOption, value: string) => {
    if (option.type === 'select') {
      option.onChange(value);
    }
  };

  return (
    <div className="flex-1" style={{ background: 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)' }}>
      {/* Header */}
      <div 
        className="px-6 py-8 text-white"
        style={{ background: 'linear-gradient(135deg, #6b7280, #374151)' }}
      >
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p style={{ color: 'rgba(229, 231, 235, 0.8)' }}>
          Customize your experience
        </p>
      </div>
      
      <div className="px-6 py-6" style={{ paddingBottom: '100px' /* Account for bottom navigation */ }}>
        {/* Preferences Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Preferences</h2>
          <div style={{ gap: '12px', display: 'flex', flexDirection: 'column' }}>
            {settingsOptions.map((option) => (
              <div 
                key={option.id} 
                className="bg-white rounded-2xl p-4 shadow border transition hover-lift"
                style={{ borderColor: '#f3f4f6' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center" style={{ gap: '16px' }}>
                    <div 
                      className="rounded-full flex items-center justify-center"
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#f3f4f6'
                      }}
                    >
                      <div style={{ color: '#6b7280' }}>
                        {option.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{option.title}</h3>
                      <p className="text-sm text-gray-500">{option.description}</p>
                    </div>
                  </div>
                  
                  {option.type === 'toggle' && (
                    <button
                      onClick={() => handleToggleChange(option)}
                      className="relative rounded-full cursor-pointer transition"
                      style={{
                        width: '48px',
                        height: '24px',
                        backgroundColor: option.value ? '#3b82f6' : '#e5e7eb',
                        border: 'none',
                        outline: 'none'
                      }}
                      aria-label={`Toggle ${option.title}`}
                    >
                      <div 
                        className="absolute bg-white rounded-full shadow transition"
                        style={{
                          width: '20px',
                          height: '20px',
                          top: '2px',
                          left: option.value ? '26px' : '2px',
                          transitionDuration: '0.2s'
                        }}
                      ></div>
                    </button>
                  )}
                  
                  {option.type === 'select' && (
                    <select
                      value={option.value}
                      onChange={(e) => handleSelectChange(option, e.target.value)}
                      className="font-medium bg-transparent cursor-pointer"
                      style={{ 
                        color: '#3b82f6',
                        outline: 'none',
                        border: 'none'
                      }}
                    >
                      {option.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">General</h2>
          <div style={{ gap: '12px', display: 'flex', flexDirection: 'column' }}>
            {navigationOptions.map((option, index) => (
              <button
                key={`nav-${index}`}
                onClick={option.action}
                className="bg-white rounded-2xl p-4 shadow border transition hover-lift w-full text-left"
                style={{ borderColor: '#f3f4f6', cursor: 'pointer' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center" style={{ gap: '16px' }}>
                    <div 
                      className="rounded-full flex items-center justify-center"
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#f3f4f6'
                      }}
                    >
                      <div style={{ color: '#6b7280' }}>
                        {option.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{option.title}</h3>
                      <p className="text-sm text-gray-500">{option.description}</p>
                    </div>
                  </div>
                  
                  <div style={{ color: '#9ca3af' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Data & Storage Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Data & Storage</h2>
          <div className="bg-white rounded-2xl p-4 shadow border" style={{ borderColor: '#f3f4f6' }}>
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-gray-900">Cache Size</span>
              <span className="text-sm text-gray-500">2.4 MB</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-gray-900">Last Update</span>
              <span className="text-sm text-gray-500">2 min ago</span>
            </div>
            <button 
              className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium transition hover-lift"
              style={{ border: 'none', cursor: 'pointer' }}
              onClick={() => {
                console.log('Clear cache clicked');
                // Add actual cache clearing logic here
              }}
            >
              Clear Cache
            </button>
          </div>
        </div>
        
        {/* App Info Section */}
        <div className="bg-white rounded-2xl p-6 shadow border text-center" style={{ borderColor: '#f3f4f6' }}>
          <div 
            className="rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ 
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' 
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="32" height="32" color="white">
              <path d="M3 3v18h18"></path>
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
            </svg>
          </div>
          
          <h3 className="font-bold text-gray-900 mb-2">CryptoTracker</h3>
          <p className="text-sm text-gray-500 mb-1">Version 1.0.0</p>
          <p className="text-sm text-gray-500 mb-4">
            Built with React, TypeScript & Custom CSS
          </p>
          
          <div className="flex justify-center" style={{ gap: '12px' }}>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium transition hover-lift"
              style={{ border: 'none', cursor: 'pointer' }}
              onClick={() => {
                console.log('Rate app clicked');
                // Add actual rating logic here
              }}
            >
              Rate App
            </button>
            <button 
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition hover-lift"
              style={{ border: 'none', cursor: 'pointer' }}
              onClick={() => {
                console.log('Share app clicked');
                // Add actual sharing logic here
              }}
            >
              Share
            </button>
          </div>
          
          <p className="text-xs text-gray-400 mt-4">
            © 2024 CryptoTracker. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;