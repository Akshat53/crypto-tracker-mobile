// src/App.tsx - Fixed Scroll Issues
import React, { useState } from 'react';
import BottomNavigation from './components/common/BottomNavigation';
import HomePage from './components/home/HomePage';
import CryptoConverter from './components/converter/CryptoConverter';
import PortfolioPage from './components/portfolio/PortfolioPage';
import SettingsPage from './components/portfolio/SettingsPage';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { useCryptoData } from './hooks/useCryptoData';
import { TabType } from './types/crypto';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const isOnline = useOnlineStatus();
  const { cryptos, loading, error, isRefreshing, refreshData, retryFetch } = useCryptoData();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            cryptos={cryptos}
            loading={loading}
            error={error}
            onRetry={retryFetch}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onRefresh={refreshData}
            isRefreshing={isRefreshing}
          />
        );
      case 'converter':
        return <CryptoConverter cryptos={cryptos} />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Desktop Sidebar Navigation */}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 lg:ml-20 xl:ml-64">
        {/* Offline indicator */}
        {!isOnline && (
          <div className="bg-red-500 text-white text-center py-2 px-4 text-sm font-medium animate-pulse flex-shrink-0 z-30">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              <span>You're offline. Some features may not work.</span>
            </div>
          </div>
        )}

        {/* Page Content - Scrollable Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {renderActiveTab()}
        </div>

        {/* Mobile bottom navigation spacing */}
        <div className="h-20 lg:hidden flex-shrink-0"></div>
      </div>
    </div>
  );
};

export default App;