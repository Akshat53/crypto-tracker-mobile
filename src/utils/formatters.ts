// src/utils/formatters.ts
/**
 * Comprehensive formatting utilities for the crypto tracker app
 */

/**
 * Format numbers as currency with proper locale and decimal places
 */
export const formatCurrency = (
  value: number,
  currency: string = 'USD',
  minimumFractionDigits: number = 2,
  maximumFractionDigits?: number
): string => {
  // Handle edge cases
  if (isNaN(value) || !isFinite(value)) {
    return '$0.00';
  }

  // For very small values, show more decimal places
  const maxDecimals = maximumFractionDigits ?? (value < 1 ? 6 : 2);
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits: maxDecimals,
  }).format(value);
};

/**
 * Format large numbers with proper thousands separators
 */
export const formatNumber = (value: number): string => {
  if (isNaN(value) || !isFinite(value)) {
    return '0';
  }
  
  return new Intl.NumberFormat('en-US').format(value);
};

/**
 * Format large numbers in compact form (K, M, B, T)
 */
export const formatCompactNumber = (value: number): string => {
  if (isNaN(value) || !isFinite(value)) {
    return '$0';
  }

  const absValue = Math.abs(value);
  
  if (absValue >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  } else if (absValue >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (absValue >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  } else if (absValue >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  }
  
  return `$${value.toFixed(2)}`;
};

/**
 * Format volume numbers without currency symbol
 */
export const formatVolume = (value: number): string => {
  if (isNaN(value) || !isFinite(value)) {
    return '0';
  }

  const absValue = Math.abs(value);
  
  if (absValue >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`;
  } else if (absValue >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  } else if (absValue >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  } else if (absValue >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  }
  
  return value.toFixed(2);
};

/**
 * Format percentage values with proper sign and decimals
 */
export const formatPercentage = (
  value: number, 
  decimals: number = 2,
  showSign: boolean = true
): string => {
  if (isNaN(value) || !isFinite(value)) {
    return '0.00%';
  }

  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
};

/**
 * Format crypto amounts with appropriate decimal places
 */
export const formatCryptoAmount = (
  value: number,
  symbol: string = '',
  maxDecimals: number = 8
): string => {
  if (isNaN(value) || !isFinite(value)) {
    return `0${symbol ? ' ' + symbol : ''}`;
  }

  // Remove trailing zeros and unnecessary decimals
  let decimals = maxDecimals;
  if (value >= 1) {
    decimals = Math.min(4, maxDecimals);
  } else if (value >= 0.01) {
    decimals = Math.min(6, maxDecimals);
  }

  const formatted = value.toFixed(decimals).replace(/\.?0+$/, '');
  return `${formatted}${symbol ? ' ' + symbol : ''}`;
};

/**
 * Format time ago (for last updated timestamps)
 */
export const formatTimeAgo = (timestamp: number | Date): string => {
  const now = new Date().getTime();
  const time = typeof timestamp === 'number' ? timestamp : timestamp.getTime();
  const diffInSeconds = Math.floor((now - time) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }
};

/**
 * Format market cap rank with proper suffix
 */
export const formatRank = (rank: number): string => {
  if (isNaN(rank) || rank <= 0) {
    return 'N/A';
  }

  if (rank === 1) return '1st';
  if (rank === 2) return '2nd';
  if (rank === 3) return '3rd';
  return `${rank}th`;
};

/**
 * Truncate long text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Format price change with color and arrow indicators
 */
export const formatPriceChange = (
  value: number,
  decimals: number = 2
): {
  formatted: string;
  isPositive: boolean;
  color: string;
  bgColor: string;
  icon: 'up' | 'down' | 'neutral';
} => {
  const isPositive = value > 0;
  const isNeutral = value === 0;
  
  return {
    formatted: formatPercentage(value, decimals),
    isPositive,
    color: isNeutral ? '#6b7280' : isPositive ? '#16a34a' : '#dc2626',
    bgColor: isNeutral ? '#f3f4f6' : isPositive ? '#f0fdf4' : '#fef2f2',
    icon: isNeutral ? 'neutral' : isPositive ? 'up' : 'down'
  };
};

/**
 * Format conversion rate between two currencies
 */
export const formatConversionRate = (
  fromAmount: number,
  fromSymbol: string,
  toAmount: number,
  toSymbol: string
): string => {
  if (isNaN(fromAmount) || isNaN(toAmount) || fromAmount === 0) {
    return `1 ${fromSymbol} = 0 ${toSymbol}`;
  }

  const rate = toAmount / fromAmount;
  const formattedRate = formatCryptoAmount(rate, '', 8);
  
  return `1 ${fromSymbol.toUpperCase()} = ${formattedRate} ${toSymbol.toUpperCase()}`;
};

/**
 * Format file size for data usage display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};

/**
 * Sanitize and format user input for numbers
 */
export const sanitizeNumberInput = (input: string): string => {
  // Remove all non-numeric characters except decimal point
  const cleaned = input.replace(/[^0-9.]/g, '');
  
  // Ensure only one decimal point
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }
  
  return cleaned;
};

/**
 * Check if a number is valid for crypto calculations
 */
export const isValidCryptoAmount = (value: string | number): boolean => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && isFinite(num) && num >= 0;
};

/**
 * Format error messages for user display
 */
export const formatErrorMessage = (error: Error | string): string => {
  const message = typeof error === 'string' ? error : error.message;
  
  // Make error messages more user-friendly
  if (message.includes('fetch')) {
    return 'Unable to connect to the server. Please check your internet connection.';
  }
  if (message.includes('404')) {
    return 'The requested data could not be found.';
  }
  if (message.includes('500')) {
    return 'Server error. Please try again later.';
  }
  if (message.includes('Network')) {
    return 'Network error. Please check your connection and try again.';
  }
  
  return message || 'An unexpected error occurred.';
};