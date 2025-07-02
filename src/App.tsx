// src/App.tsx
import React, { useState } from 'react';
import StatusBar from './components/common/StatusBar';
import BottomNavigation from './components/common/BottomNavigation';
import HomePage from './components/home/HomePage';
import CryptoConverter from './components/converter/CryptoConverter';
import PortfolioPage from './components/portfolio/PortfolioPage';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { useCryptoData } from './hooks/useCryptoData';
import { TabType } from './types/crypto';
import SettingsPage from './components/portfolio/SettingsPage';

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
    <div 
      className="h-screen bg-gray-50 flex flex-col container shadow-2xl relative"
      style={{ overflow: 'hidden' }}
    >
      <StatusBar isOnline={isOnline} />
      
      <div className="flex-1 flex flex-col" style={{ overflow: 'hidden' }}>
        {renderActiveTab()}
      </div>
      
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;