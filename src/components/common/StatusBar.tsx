// src/components/common/StatusBar.tsx
import React from 'react';

interface StatusBarProps {
  isOnline: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ isOnline }) => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="status-bar flex justify-between items-center">
      {/* Signal dots */}
      <div className="flex items-center" style={{ gap: '4px' }}>
        <div style={{ 
          width: '4px', 
          height: '4px', 
          backgroundColor: 'white', 
          borderRadius: '50%' 
        }}></div>
        <div style={{ 
          width: '4px', 
          height: '4px', 
          backgroundColor: 'white', 
          borderRadius: '50%' 
        }}></div>
        <div style={{ 
          width: '4px', 
          height: '4px', 
          backgroundColor: '#9ca3af', 
          borderRadius: '50%' 
        }}></div>
      </div>
      
      {/* Time */}
      <div className="font-medium">{currentTime}</div>
      
      {/* Status icons */}
      <div className="flex items-center" style={{ gap: '4px' }}>
        {/* WiFi icon */}
        <div style={{ width: '16px', height: '16px' }}>
          {isOnline ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" color="#ef4444">
              <path d="M2.28 3L1 4.27l2.47 2.47C2.01 8.06 1 9.18 1 9l2 2c1.42-1.42 3.29-2.41 5.3-2.87L9.73 9.56C8.18 9.84 6.74 10.5 5.59 11.59L7 13c.81-.81 1.88-1.28 3-1.28.34 0 .67.04 1 .12L20 21l1.27-1.28L2.28 3zm8.43 9.57c-.28-.14-.57-.24-.86-.31l1.44 1.44c-.19-.36-.35-.75-.58-1.13zm8.88-2.16l-1.41-1.41c-1.39 1.39-3.19 2.27-5.18 2.45l1.64 1.64c1.18-.66 2.24-1.58 3.12-2.68z"/>
            </svg>
          )}
        </div>
        
        {/* Battery indicator */}
        <div style={{ 
          width: '24px', 
          height: '12px', 
          border: '1px solid white', 
          borderRadius: '2px',
          position: 'relative'
        }}>
          <div style={{ 
            width: '16px', 
            height: '6px', 
            backgroundColor: '#10b981', 
            borderRadius: '1px',
            margin: '2px'
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;