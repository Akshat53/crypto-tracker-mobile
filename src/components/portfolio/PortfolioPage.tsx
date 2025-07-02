// src/components/portfolio/PortfolioPage.tsx - Complete Fixed Version
import React from 'react';

const PortfolioPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 text-white flex-shrink-0">
        <div className="max-w-md lg:max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
            Portfolio
          </h1>
          <p className="text-purple-100 text-sm sm:text-base lg:text-lg opacity-90 font-medium">
            Track your crypto investments and portfolio performance
          </p>
        </div>
      </div>
      
      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12 pb-24 lg:pb-12">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Main Portfolio Card */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 text-center overflow-hidden relative mb-6">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full translate-y-12 -translate-x-12 opacity-30"></div>
                
                {/* Icon */}
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg 
                    className="w-10 h-10 text-purple-600" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                  >
                    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
                    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
                  </svg>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    Start Building Your Portfolio
                  </h3>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed max-w-sm mx-auto">
                    Track your cryptocurrency investments, monitor performance, and get insights into your portfolio's growth over time.
                  </p>
                  
                  {/* CTA Button */}
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group active:scale-95">
                    <svg 
                      className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Add Your First Investment</span>
                  </button>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg 
                        className="w-6 h-6 text-green-600" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                      >
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                    </div>
                    <div className="text-xs text-gray-500 font-medium mb-1">Total Gain</div>
                    <div className="font-bold text-green-600">Coming Soon</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg 
                        className="w-6 h-6 text-blue-600" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                      >
                        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
                        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
                      </svg>
                    </div>
                    <div className="text-xs text-gray-500 font-medium mb-1">Holdings</div>
                    <div className="font-bold text-blue-600">0 Assets</div>
                  </div>
                </div>
              </div>

              {/* Feature Preview Cards */}
              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 3v18h18"></path>
                        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm">Performance Tracking</h4>
                      <p className="text-xs text-gray-600">Monitor your portfolio's growth over time with detailed charts</p>
                    </div>
                    <div className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded-full flex-shrink-0">Soon</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-4 border border-green-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm">Smart Alerts</h4>
                      <p className="text-xs text-gray-600">Get notified when your coins hit target prices or important levels</p>
                    </div>
                    <div className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full flex-shrink-0">Soon</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm">Social Trading</h4>
                      <p className="text-xs text-gray-600">Follow top traders and copy their successful strategies</p>
                    </div>
                    <div className="text-xs text-purple-600 font-medium bg-purple-100 px-2 py-1 rounded-full flex-shrink-0">Soon</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-4 border border-orange-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10,8 16,12 10,16 10,8"></polygon>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm">Auto Rebalancing</h4>
                      <p className="text-xs text-gray-600">Automatically rebalance your portfolio based on your preferences</p>
                    </div>
                    <div className="text-xs text-orange-600 font-medium bg-orange-100 px-2 py-1 rounded-full flex-shrink-0">Soon</div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-4">
                  Portfolio features are currently in development. Stay tuned for updates!
                </p>
                <div className="flex justify-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-4 space-y-6">
              {/* Portfolio Analytics Preview */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  Analytics Preview
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Total Invested</span>
                    <span className="font-semibold text-gray-400">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Current Value</span>
                    <span className="font-semibold text-gray-400">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">P&L</span>
                    <span className="font-semibold text-gray-400">$0.00 (0%)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Best Performer</span>
                    <span className="font-semibold text-gray-400">N/A</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Asset Count</span>
                    <span className="font-semibold text-gray-400">0</span>
                  </div>
                </div>
                
                {/* Chart Placeholder */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center h-32">
                    <div className="text-center">
                      <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 3v18h18"></path>
                        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                      </svg>
                      <p className="text-xs text-gray-500">Portfolio chart will appear here</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-all duration-200 transform hover:scale-105 active:scale-95 group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                        <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Add Holdings</div>
                        <div className="text-xs text-gray-500">Import or manually add crypto</div>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-all duration-200 transform hover:scale-105 active:scale-95 group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                        <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Set Price Alerts</div>
                        <div className="text-xs text-gray-500">Get notified of price changes</div>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-all duration-200 transform hover:scale-105 active:scale-95 group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                        <svg className="w-4 h-4 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M3 3v18h18"></path>
                          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-sm">View Analytics</div>
                        <div className="text-xs text-gray-500">Detailed performance insights</div>
                      </div>
                    </div>
                  </button>

                  <button className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-all duration-200 transform hover:scale-105 active:scale-95 group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-200">
                        <svg className="w-4 h-4 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14,2 14,8 20,8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10,9 9,9 8,9"></polyline>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Export Data</div>
                        <div className="text-xs text-gray-500">Download portfolio reports</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Portfolio Tips */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                  Pro Tips
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Diversify your portfolio across different cryptocurrencies to reduce risk.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Set up price alerts to stay informed about market movements.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Review your portfolio regularly and rebalance when necessary.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;