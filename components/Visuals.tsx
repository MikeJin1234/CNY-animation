
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VisualsProps {
  isTransformed: boolean;
}

const Visuals: React.FC<VisualsProps> = ({ isTransformed }) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      
      {/* Top Blessing Text */}
      <div className="absolute top-20 w-full text-center h-32 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {isTransformed && (
            <motion.div
              initial={{ y: -100, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", damping: 12 }}
              className="text-7xl md:text-9xl font-italic-art text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700 drop-shadow-[0_5px_15px_rgba(255,215,0,0.5)]"
            >
              马到成功
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content (Snow House / Unicorn) */}
      <div className="relative w-96 h-96 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isTransformed ? (
            <motion.div
              key="snowhouse"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 2, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <SnowHouse />
            </motion.div>
          ) : (
            <motion.div
              key="unicorn"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1.2, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="relative"
            >
              <Unicorn />
              {/* Sparkle background when unicorn appears */}
              <div className="absolute -inset-20 pointer-events-none">
                 {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                      style={{ 
                        left: '50%', 
                        top: '50%',
                        transform: `rotate(${i * 30}deg) translateY(-120px)`
                      }}
                      animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                    />
                 ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Explosion Effect Wrapper */}
      <AnimatePresence>
        {isTransformed && <ExplosionParticles />}
      </AnimatePresence>

      {/* Bottom Subtext */}
      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-12 text-2xl font-art text-yellow-400 opacity-80"
      >
        新春快乐 · 万事大吉
      </motion.div>
    </div>
  );
};

const SnowHouse = () => (
  <div className="relative group">
    {/* Sparkling particles around the house */}
    <div className="absolute -inset-10">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]"
          animate={{ 
            opacity: [0.2, 1, 0.2], 
            scale: [0.5, 1.2, 0.5],
            y: [0, -20, 0] 
          }}
          transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() }}
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        />
      ))}
    </div>
    <svg width="240" height="240" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Base */}
      <path d="M40 160H160V100L100 50L40 100V160Z" fill="#FFFBF0" stroke="#FFE4B5" strokeWidth="4" />
      {/* Roof with "Snow" */}
      <path d="M30 110L100 40L170 110" stroke="#F0F8FF" strokeWidth="12" strokeLinecap="round" />
      <path d="M100 40L170 110" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
      {/* Door */}
      <rect x="85" y="120" width="30" height="40" rx="4" fill="#8B4513" />
      <circle cx="110" cy="140" r="2" fill="#FFD700" />
      {/* Window */}
      <rect x="55" y="120" width="20" height="20" rx="2" fill="#FFD700" className="animate-pulse" />
      {/* Chimney */}
      <rect x="130" y="60" width="15" height="30" fill="#CD853F" />
      {/* Ground Snow */}
      <ellipse cx="100" cy="165" rx="80" ry="10" fill="#FFF" fillOpacity="0.8" />
    </svg>
  </div>
);

const Unicorn = () => (
  <motion.div 
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
    className="relative"
  >
    <svg width="300" height="300" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Unicorn Body */}
      <ellipse cx="100" cy="110" rx="45" ry="30" fill="#FFF" stroke="#FFD700" strokeWidth="2" />
      {/* Head */}
      <path d="M130 80C130 60 160 60 165 85L150 110H130V80Z" fill="#FFF" stroke="#FFD700" strokeWidth="2" />
      {/* Horn */}
      <path d="M158 65L168 35L173 68" fill="url(#hornGradient)" />
      {/* Mane */}
      <path d="M130 70C120 60 110 90 130 90" fill="#FF69B4" />
      {/* Legs */}
      <motion.path 
        d="M75 140L65 165" 
        stroke="#FFF" 
        strokeWidth="6" 
        strokeLinecap="round"
        animate={{ d: ["M75 140L65 165", "M75 140L85 165", "M75 140L65 165"] }}
        transition={{ duration: 0.4, repeat: Infinity }}
      />
      <motion.path 
        d="M95 140L105 165" 
        stroke="#FFF" 
        strokeWidth="6" 
        strokeLinecap="round"
        animate={{ d: ["M95 140L105 165", "M95 140L85 165", "M95 140L105 165"] }}
        transition={{ duration: 0.4, repeat: Infinity, delay: 0.1 }}
      />
      <motion.path 
        d="M125 140L135 165" 
        stroke="#FFF" 
        strokeWidth="6" 
        strokeLinecap="round"
        animate={{ d: ["M125 140L135 165", "M125 140L115 165", "M125 140L135 165"] }}
        transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
      />
      {/* Tail */}
      <motion.path 
        d="M55 110C40 90 30 130 50 130" 
        stroke="#FFB6C1" 
        strokeWidth="8" 
        strokeLinecap="round"
        animate={{ rotate: [-10, 10, -10] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      
      <defs>
        <linearGradient id="hornGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFF" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
);

const ExplosionParticles = () => {
  useEffect(() => {
    // Play a synthesized "sparkle/pop" sound when explosion happens
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const playSparkle = (freq: number, startTime: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.exponentialRampToValueAtTime(1, startTime + 0.3);
        gain.gain.setValueAtTime(0.1, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.3);
      };
      playSparkle(1500, ctx.currentTime);
      playSparkle(1200, ctx.currentTime + 0.05);
      playSparkle(1800, ctx.currentTime + 0.1);
    } catch (e) {
      console.warn("Audio Context not supported or interaction required");
    }
  }, []);

  const colors = ['#FFD700', '#FFFFFF', '#FF3131', '#FF4500'];
  const particles = [...Array(45)];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Shockwave Rings */}
      <motion.div
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute w-40 h-40 border-4 border-yellow-400 rounded-full"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 6, opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        className="absolute w-40 h-40 border-2 border-white rounded-full"
      />

      {/* Scattered Particles */}
      {particles.map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 200 + Math.random() * 400;
        const targetX = Math.cos(angle) * velocity;
        const targetY = Math.sin(angle) * velocity;
        const size = 2 + Math.random() * 6;
        const isStar = Math.random() > 0.7;

        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
            animate={{ 
              x: targetX, 
              y: targetY,
              scale: 0,
              opacity: 0,
              rotate: Math.random() * 720
            }}
            transition={{ duration: 0.8 + Math.random() * 0.4, ease: "circOut" }}
            style={{ 
              width: size, 
              height: size, 
              backgroundColor: colors[i % colors.length],
              borderRadius: isStar ? '0' : '50%',
              clipPath: isStar ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : 'none'
            }}
          />
        );
      })}
    </div>
  );
};

export default Visuals;
