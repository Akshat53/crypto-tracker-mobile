// src/components/common/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: { width: '16px', height: '16px' },
    md: { width: '32px', height: '32px' },
    lg: { width: '48px', height: '48px' }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div 
        className="animate-spin mb-3"
        style={{
          ...sizeClasses[size],
          color: '#3b82f6'
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="100%" height="100%">
          <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
      </div>
      <span className="text-gray-600 text-sm">{text}</span>
    </div>
  );
};

export default LoadingSpinner;