import React from 'react';

function App() {
  return (
    <div className="min-h-screen gradient-blue-purple flex items-center justify-center p-4">
      <div className="card text-center animate-fade-in" style={{maxWidth: '28rem', width: '100%'}}>
        <div 
          className="gradient-green-teal rounded-full mx-auto mb-4 flex items-center justify-center" 
          style={{width: '4rem', height: '4rem'}}
        >
          <span className="text-white text-2xl font-bold">✓</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Setup Complete! 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          CSS is working perfectly. Ready to build the crypto tracker!
        </p>
        <button className="btn btn-primary">
          Let's Build the Crypto Tracker! 🚀
        </button>
      </div>
    </div>
  );
}

export default App;
