export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  market_cap_rank: number;
  market_cap: number;
  total_volume: number;
}

export interface ConversionRate {
  [key: string]: number;
}

export type TabType = 'home' | 'converter' | 'portfolio' | 'settings';

export interface ApiResponse {
  data: CryptoData[];
  error?: string;
  loading: boolean;
}
