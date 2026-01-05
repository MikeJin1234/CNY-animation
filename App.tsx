
import React, { useState, useEffect, useRef } from 'react';
import HandTracker from './components/HandTracker';
import Visuals from './components/Visuals';
import { GestureState } from './types';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [gesture, setGesture] = useState<GestureState>('FIST');
  const [isTransformed, setIsTransformed] = useState(false);

  useEffect(() => {
    if (gesture === 'OPEN') {
      setIsTransformed(true);
    } else if (gesture === 'FIST') {
      setIsTransformed(false);
    }
  }, [gesture]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#8b0000] flex items-center justify-center">
      {/* Background Decorative Patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 border-8 border-yellow-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 border-8 border-yellow-500 rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold text-yellow-600 select-none">
          福
        </div>
      </div>

      {/* Main Interaction Area */}
      <Visuals isTransformed={isTransformed} />

      {/* Camera and Hand Tracking Debug UI (Bottom Left) */}
      <div className="absolute bottom-6 left-6 z-50">
        <HandTracker onGestureChange={setGesture} />
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 right-6 text-yellow-400 text-sm font-light tracking-widest opacity-60">
        {gesture === 'OPEN' ? '张开手：吉祥如意' : '握紧拳：岁岁平安'}
      </div>
      
      {/* Festive Borders */}
      <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 shadow-lg"></div>
      <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 shadow-lg"></div>
    </div>
  );
};

export default App;
