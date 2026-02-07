import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RefreshCw, Play, Pause } from 'lucide-react';

const Timer = ({ part, onBack }) => {
  // Configuration for different parts
  const getConfig = () => {
    switch(part) {
      case 'part1': return { mode: 'simple', duration: 4 * 60, title: 'Part 1: Introduction' };
      case 'part2': return { mode: 'sequence', prep: 60, speech: 2 * 60, title: 'Part 2: Long Turn' };
      case 'part3': return { mode: 'simple', duration: 6 * 60, title: 'Part 3: Discussion' };
      default: return { mode: 'simple', duration: 0, title: '' };
    }
  };

  const config = getConfig();
  
  // State
  const [timeLeft, setTimeLeft] = useState(config.mode === 'sequence' ? config.prep : config.duration);
  const [isActive, setIsActive] = useState(false);
  const [stage, setStage] = useState(config.mode === 'sequence' ? 'prep' : 'speech'); // 'prep', 'speech', 'finished'
  
  // Audio refs
  const audioContext = useRef(null);

  // Sound effect generator
  const playSound = (type) => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const ctx = audioContext.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'tick') {
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'switch') {
      osc.frequency.setValueAtTime(1200, ctx.currentTime); // High pitch for switch
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'end') {
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
      osc.start();
      osc.stop(ctx.currentTime + 1.0);
    }
  };

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // Logic for Part 2 Sequence
      if (config.mode === 'sequence' && stage === 'prep') {
        playSound('switch');
        setStage('speech');
        setTimeLeft(config.speech);
      } else {
        // Finished
        playSound('end');
        setIsActive(false);
        setStage('finished');
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, stage, config]);

  // Auto-start for Part 2 on mount
  useEffect(() => {
    if (part === 'part2' && !isActive && stage === 'prep' && timeLeft === config.prep) {
      setIsActive(true);
    }
  }, []);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    if (config.mode === 'sequence') {
      setStage('prep');
      setTimeLeft(config.prep);
    } else {
      setStage('speech');
      setTimeLeft(config.duration);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md px-4 h-full relative">
      {/* Header */}
      <div className="absolute top-0 w-full flex items-center justify-between p-4">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="text-white/60 font-medium tracking-wide">{config.title}</span>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Main Timer Display */}
      <div className="flex flex-col items-center justify-center space-y-8 mt-12">
        <div className={`relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 rounded-full border-4 ${isActive ? 'border-white/40 shadow-[0_0_50px_rgba(255,255,255,0.2)]' : 'border-white/10'} bg-white/5 backdrop-blur-md transition-all duration-500`}>
          <div className="flex flex-col items-center">
             {/* Stage Indicator for Part 2 */}
            {config.mode === 'sequence' && stage !== 'finished' && (
              <span className={`text-xl font-medium mb-2 ${stage === 'prep' ? 'text-pink-300' : 'text-purple-300'} uppercase tracking-widest`}>
                {stage === 'prep' ? 'Preparation' : 'Speaking'}
              </span>
            )}
            
            {/* Simple Timer Display */}
            <span className="text-7xl md:text-8xl font-black text-white tracking-tighter tabular-nums drop-shadow-xl">
              {stage === 'finished' ? "Time's End" : formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Controls */}
        {stage !== 'finished' && (
          <div className="flex items-center space-x-6">
            <button 
              onClick={toggleTimer}
              className="p-6 bg-white rounded-full text-purple-600 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-110 active:scale-95 transition-all duration-300"
            >
              {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </button>
            
            <button 
              onClick={resetTimer}
              className="p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all duration-300"
            >
              <RefreshCw size={24} />
            </button>
          </div>
        )}

        {stage === 'finished' && (
          <button 
            onClick={resetTimer}
            className="px-8 py-3 bg-white text-purple-600 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform"
          >
            Start Again
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;
