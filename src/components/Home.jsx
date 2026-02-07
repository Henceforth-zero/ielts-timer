import React from 'react';
import { Clock, MessageCircle, Mic } from 'lucide-react';

const Home = ({ onSelectPart }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-md px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-wide drop-shadow-lg text-center">
        IELTS Speaking
      </h1>
      
      <button
        onClick={() => onSelectPart('part1')}
        className="group w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-pink-500/30 rounded-full text-white group-hover:bg-pink-500/50 transition-colors">
            <MessageCircle size={28} />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-white">Part 1</h2>
            <p className="text-pink-100/70 text-sm">Introduction & Interview (4 min)</p>
          </div>
        </div>
      </button>

      <button
        onClick={() => onSelectPart('part2')}
        className="group w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-purple-500/30 rounded-full text-white group-hover:bg-purple-500/50 transition-colors">
            <Clock size={28} />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-white">Part 2</h2>
            <p className="text-purple-100/70 text-sm">Long Turn (1 + 2 min)</p>
          </div>
        </div>
      </button>

      <button
        onClick={() => onSelectPart('part3')}
        className="group w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-500/30 rounded-full text-white group-hover:bg-indigo-500/50 transition-colors">
            <Mic size={28} />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-white">Part 3</h2>
            <p className="text-indigo-100/70 text-sm">Discussion (6 min)</p>
          </div>
        </div>
      </button>

      <p className="text-white/40 text-sm mt-8">Code by Henceforth</p>
    </div>
  );
};

export default Home;
