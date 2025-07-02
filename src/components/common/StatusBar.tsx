// src/components/common/StatusBar.tsx
import React, { useState, useEffect } from 'react';

interface StatusBarProps {
  isOnline: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ isOnline }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(85);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate battery level changes
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(20, Math.min(100, prev + change));
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getBatteryColor = () => {
    if (batteryLevel > 50) return 'bg-green-500';
    if (batteryLevel > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSignalStrength = () => {
    // Simulate signal strength based on online status
    return isOnline ? [true, true, true, true] : [false, false, false, false];
  };

  const signalBars = getSignalStrength();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white px-4 py-1 text-xs font-medium">
      <div className="flex justify-between items-center h-6">
        {/* Left side - Carrier and Signal */}
        <div className="flex items-center gap-2">
          {/* Carrier name */}
          <span className="text-white font-semibold">Carrier</span>
          
          {/* Signal strength indicators */}
          <div className="flex items-end gap-0.5">
            {signalBars.map((active, index) => (
              <div
                key={index}
                className={`w-1 rounded-sm transition-all duration-300 ${
                  active ? 'bg-white' : 'bg-gray-600'
                }`}
                style={{ height: `${(index + 1) * 3 + 2}px` }}
              ></div>
            ))}
          </div>
          
          {/* Network type indicator */}
          <span className={`text-xs font-bold ${isOnline ? 'text-white' : 'text-red-400'}`}>
            {isOnline ? '5G' : 'No Service'}
          </span>
        </div>
        
        {/* Center - Time */}
        <div className="flex items-center">
          <span className="font-bold text-white text-sm tracking-wide">
            {currentTime}
          </span>
        </div>
        
        {/* Right side - Status icons */}
        <div className="flex items-center gap-1">
          {/* Bluetooth indicator */}
          <div className="text-white">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.71,7.71L12,2H11V9.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L11,14.41V22H12L17.71,16.29L13.41,12L17.71,7.71ZM13,5.83L15.17,8L13,10.17V5.83ZM13,13.83L15.17,16L13,18.17V13.83Z"/>
            </svg>
          </div>
          
          {/* WiFi indicator */}
          <div className={`transition-colors duration-300 ${isOnline ? 'text-white' : 'text-red-400'}`}>
            {isOnline ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.28 3L1 4.27l2.47 2.47C2.01 8.06 1 9.18 1 9l2 2c1.42-1.42 3.29-2.41 5.3-2.87L9.73 9.56C8.18 9.84 6.74 10.5 5.59 11.59L7 13c.81-.81 1.88-1.28 3-1.28.34 0 .67.04 1 .12L20 21l1.27-1.28L2.28 3zm8.43 9.57c-.28-.14-.57-.24-.86-.31l1.44 1.44c-.19-.36-.35-.75-.58-1.13zm8.88-2.16l-1.41-1.41c-1.39 1.39-3.19 2.27-5.18 2.45l1.64 1.64c1.18-.66 2.24-1.58 3.12-2.68z"/>
              </svg>
            )}
          </div>
          
          {/* Battery percentage */}
          <span className="text-white text-xs font-semibold">
            {batteryLevel}%
          </span>
          
          {/* Battery indicator */}
          <div className="relative">
            {/* Battery outline */}
            <div className="w-6 h-3 border border-white rounded-sm relative">
              {/* Battery fill */}
              <div 
                className={`h-full ${getBatteryColor()} rounded-sm transition-all duration-500`}
                style={{ width: `${batteryLevel}%` }}
              ></div>
              
              {/* Low battery animation */}
              {batteryLevel <= 20 && (
                <div className="absolute inset-0 bg-red-500 rounded-sm animate-pulse"></div>
              )}
            </div>
            
            {/* Battery terminal */}
            <div className="absolute -right-0.5 top-0.5 w-0.5 h-2 bg-white rounded-r-sm"></div>
            
            {/* Charging indicator */}
            {batteryLevel > 95 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.67,4H14V2C14,1.45 13.55,1 13,1H11C10.45,1 10,1.45 10,2V4H8.33C7.6,4 7,4.6 7,5.33V20.67C7,21.4 7.6,22 8.33,22H15.67C16.4,22 17,21.4 17,20.67V5.33C17,4.6 16.4,4 15.67,4Z"/>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Dynamic Island (iPhone 14 Pro style) - Optional */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
        <div className="w-24 h-1 bg-black rounded-full shadow-lg"></div>
      </div>
    </div>
  );
};

export default StatusBar;