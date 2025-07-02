// src/App.tsx - OPTIMIZED VERSION (No Status Bar)
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
    <div className="app-container">
      {/* Main Content Area - No Status Bar */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderActiveTab()}
      </div>
      
      {/* Fixed Bottom Navigation */}
      <div className="bottom-nav-container">
        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default App;