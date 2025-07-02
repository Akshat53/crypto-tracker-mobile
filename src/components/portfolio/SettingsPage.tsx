// src/components/portfolio/SettingsPage.tsx - Desktop Enhanced
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

  const currencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'BTC', 'ETH'];

  const settingsOptions: SettingOption[] = [
    {
      id: 'notifications',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
        </svg>
      ),
      title: 'Push Notifications',
      description: 'Price alerts, portfolio updates, and market news',
      type: 'toggle',
      value: notifications,
      onChange: setNotifications
    },
    {
      id: 'darkMode',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      ),
      title: 'Dark Mode',
      description: 'Switch between light and dark themes',
      type: 'toggle',
      value: darkMode,
      onChange: setDarkMode
    },
    {
      id: 'currency',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      ),
      title: 'Display Currency',
      description: 'Choose your preferred currency for prices',
      type: 'select',
      value: selectedCurrency,
      onChange: setSelectedCurrency,
      options: currencies
    }
  ];

  const navigationOptions: NavigationOption[] = [
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      title: 'Privacy & Security',
      description: 'Data protection, security settings, and privacy controls',
      action: () => console.log('Privacy settings clicked')
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      title: 'Help & Support',
      description: 'Get help, contact support, and access documentation',
      action: () => console.log('Help & Support clicked')
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10,9 9,9 8,9"></polyline>
        </svg>
      ),
      title: 'Terms & Privacy Policy',
      description: 'Legal documents, terms of service, and privacy policy',
      action: () => console.log('Terms & Privacy clicked')
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 12l2 2 4-4"></path>
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
          <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path>
          <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"></path>
        </svg>
      ),
      title: 'About CryptoTracker',
      description: 'App version, credits, and update information',
      action: () => console.log('About App clicked')
    }
  ];

  const handleToggleChange = (option: SettingOption) => {
    if (option.type === 'toggle') {
      option.onChange(!option.value);
    }
  };

  const handleSelectChange = (option: SettingOption, value: string) => {
    if (option.type === 'select') {
      option.onChange(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-800 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 text-white">
        <div className="max-w-md lg:max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-200 text-sm sm:text-base lg:text-lg opacity-90 font-medium">
            Customize your CryptoTracker experience
          </p>
        </div>
      </div>
      
      <div className="max-w-md lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12 pb-24 lg:pb-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Settings Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Preferences Section */}
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                Preferences
              </h2>
              <div className="grid gap-4 lg:grid-cols-1">
                {settingsOptions.map((option) => (
                  <div 
                    key={option.id} 
                    className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-200">
                          <div className="text-gray-600">
                            {option.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-base lg:text-lg">{option.title}</h3>
                          <p className="text-sm text-gray-500 lg:text-base">{option.description}</p>
                        </div>
                      </div>
                      
                      {option.type === 'toggle' && (
                        <button
                          onClick={() => handleToggleChange(option)}
                          className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                            option.value ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                          aria-label={`Toggle ${option.title}`}
                        >
                          <div 
                            className={`absolute w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 transform ${
                              option.value ? 'translate-x-7' : 'translate-x-0.5'
                            } top-0.5`}
                          ></div>
                        </button>
                      )}
                      
                      {option.type === 'select' && (
                        <select
                          value={option.value}
                          onChange={(e) => handleSelectChange(option, e.target.value)}
                          className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 font-semibold"
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
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-teal-600 rounded-full"></div>
                General
              </h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {navigationOptions.map((option, index) => (
                  <button
                    key={`nav-${index}`}
                    onClick={option.action}
                    className="w-full bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-0.5 text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-200">
                          <div className="text-gray-600">
                            {option.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-base lg:text-lg">{option.title}</h3>
                          <p className="text-sm text-gray-500 lg:text-base">{option.description}</p>
                        </div>
                      </div>
                      
                      <div className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Data & Storage Section */}
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
                Data & Storage
              </h2>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-900">Cache Size</span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg font-semibold">2.4 MB</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-900">Last Sync</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-500 font-semibold">2 min ago</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-medium text-gray-900">Auto Refresh</span>
                      <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-lg font-semibold">Enabled</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button 
                      className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95"
                      onClick={() => console.log('Clear cache clicked')}
                    >
                      Clear Cache
                    </button>
                    <button 
                      className="w-full py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95"
                      onClick={() => console.log('Force sync clicked')}
                    >
                      Force Sync
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            {/* App Info Section */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center sticky top-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 3v18h18"></path>
                  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                </svg>
              </div>
              
              <h3 className="font-bold text-gray-900 text-xl mb-2">CryptoTracker</h3>
              <p className="text-sm text-gray-500 mb-1">Version 1.0.0</p>
              <p className="text-xs text-gray-500 mb-6">
                Built with React, TypeScript & Tailwind CSS
              </p>
              
              <div className="flex gap-3 justify-center mb-6">
                <button 
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
                  onClick={() => console.log('Rate app clicked')}
                >
                  Rate App
                </button>
                <button 
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95"
                  onClick={() => console.log('Share app clicked')}
                >
                  Share
                </button>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  © 2024 CryptoTracker. All rights reserved.
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Usage Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">API Calls Today</span>
                  <span className="font-semibold text-blue-600">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Data Usage</span>
                  <span className="font-semibold text-green-600">12.4 MB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <span className="font-semibold text-purple-600">99.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile App Info - Only visible on mobile */}
        <div className="lg:hidden mt-8 bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 3v18h18"></path>
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
            </svg>
          </div>
          
          <h3 className="font-bold text-gray-900 text-lg mb-2">CryptoTracker</h3>
          <p className="text-sm text-gray-500 mb-1">Version 1.0.0</p>
          <p className="text-xs text-gray-500 mb-6">
            Built with React, TypeScript & Tailwind CSS
          </p>
          
          <div className="flex gap-3 justify-center mb-6">
            <button 
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
              onClick={() => console.log('Rate app clicked')}
            >
              Rate App
            </button>
            <button 
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95"
              onClick={() => console.log('Share app clicked')}
            >
              Share
            </button>
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              © 2024 CryptoTracker. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;