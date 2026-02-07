import { useState } from 'react';
import Home from './components/Home';
import Timer from './components/Timer';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'part1', 'part2', 'part3'

  const handleSelectPart = (part) => {
    setCurrentView(part);
  };

  const handleBack = () => {
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-800 flex flex-col items-center justify-center p-4 overflow-hidden relative selection:bg-pink-500/30">
      
      {/* Ambient background orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-purple-400/30 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-pink-400/30 rounded-full blur-[100px] animate-pulse pointer-events-none delay-1000"></div>

      {/* Main Content Area */}
      <div className="z-10 w-full flex justify-center h-full max-h-screen py-4 overflow-y-auto">
        {currentView === 'home' ? (
          <Home onSelectPart={handleSelectPart} />
        ) : (
          <Timer part={currentView} onBack={handleBack} />
        )}
      </div>
    </div>
  );
}

export default App;
