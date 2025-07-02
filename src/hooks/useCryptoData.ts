// src/hooks/useCryptoData.ts
import { useState, useEffect, useCallback } from 'react';
import { CryptoData } from '../types/crypto';
import { fetchCryptoData } from '../utils/api';

export const useCryptoData = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true);
    else setLoading(true);
    
    setError(null);
    
    try {
      const data = await fetchCryptoData();
      setCryptos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  const refreshData = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(true), 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    cryptos,
    loading,
    error,
    isRefreshing,
    refreshData,
    retryFetch: () => fetchData()
  };
};