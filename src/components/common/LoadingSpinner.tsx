// src/components/common/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  variant?: 'default' | 'gradient' | 'dots' | 'pulse' | 'bars';
  color?: 'blue' | 'green' | 'purple' | 'pink' | 'gray';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...', 
  variant = 'default',
  color = 'blue'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'text-blue-500 border-blue-500',
    green: 'text-green-500 border-green-500',
    purple: 'text-purple-500 border-purple-500',
    pink: 'text-pink-500 border-pink-500',
    gray: 'text-gray-500 border-gray-500'
  };

  const gradientClasses = {
    blue: 'from-blue-500 to-purple-600',
    green: 'from-green-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    pink: 'from-pink-500 to-rose-500',
    gray: 'from-gray-500 to-gray-700'
  };

  const renderSpinner = () => {
    switch (variant) {
      case 'gradient':
        return (
          <div className={`${sizeClasses[size]} relative`}>
            <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[color]} rounded-full animate-spin opacity-75`}>
              <div className="absolute inset-1 bg-white rounded-full"></div>
            </div>
            <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[color]} rounded-full animate-pulse`}>
              <div className="absolute inset-1 bg-white rounded-full"></div>
            </div>
          </div>
        );

      case 'dots':
        return (
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 bg-gradient-to-r ${gradientClasses[color]} rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className={`${sizeClasses[size]} relative`}>
            <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[color]} rounded-full animate-ping opacity-75`}></div>
            <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[color]} rounded-full animate-pulse`}></div>
          </div>
        );

      case 'bars':
        return (
          <div className="flex items-end gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-1.5 bg-gradient-to-t ${gradientClasses[color]} rounded-full animate-pulse`}
                style={{ 
                  height: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s'
                }}
              ></div>
            ))}
          </div>
        );

      default:
        return (
          <div className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}>
            <svg
              className="w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      {/* Spinner container with glow effect */}
      <div className="relative">
        {renderSpinner()}
        
        {/* Glow effect for enhanced visual appeal */}
        {variant === 'gradient' && (
          <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[color]} rounded-full blur-lg opacity-20 animate-pulse -z-10`}></div>
        )}
      </div>

      {/* Loading text with enhanced styling */}
      {text && (
        <div className="text-center space-y-2">
          <p className="text-gray-700 font-medium text-sm animate-pulse">
            {text}
          </p>
          
          {/* Progress dots */}
          <div className="flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-1 h-1 bg-gradient-to-r ${gradientClasses[color]} rounded-full animate-pulse`}
                style={{ 
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '1.5s'
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Full page loading component
export const FullPageLoader: React.FC<{
  text?: string;
  variant?: LoadingSpinnerProps['variant'];
  color?: LoadingSpinnerProps['color'];
}> = ({ text = 'Loading application...', variant = 'gradient', color = 'blue' }) => {
  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="xl" text={text} variant={variant} color={color} />
        
        {/* App logo or brand */}
        <div className="mt-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
            </svg>
          </div>
          <p className="mt-4 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CryptoTracker
          </p>
        </div>
      </div>
    </div>
  );
};

// Inline loading component for smaller spaces
export const InlineLoader: React.FC<{
  size?: LoadingSpinnerProps['size'];
  color?: LoadingSpinnerProps['color'];
}> = ({ size = 'sm', color = 'blue' }) => {
  return (
    <div className="inline-flex items-center gap-2">
      <LoadingSpinner size={size} variant="dots" color={color} text="" />
      <span className="text-gray-600 text-sm">Loading...</span>
    </div>
  );
};

// Card loading skeleton
export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="text-right space-y-2">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;