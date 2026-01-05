
import React, { useRef, useEffect, useState } from 'react';
import { GestureState } from '../types';

interface HandTrackerProps {
  onGestureChange: (gesture: GestureState) => void;
}

const HandTracker: React.FC<HandTrackerProps> = ({ onGestureChange }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    // Load MediaPipe scripts from window (loaded in index.html)
    const { Hands, HAND_CONNECTIONS } = (window as any);
    const { drawConnectors, drawLandmarks } = (window as any);
    const { Camera } = (window as any);

    const hands = new Hands({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    hands.onResults((results: any) => {
      const canvasCtx = canvasRef.current?.getContext('2d');
      if (!canvasCtx || !canvasRef.current) return;

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Draw a dark background for the "track" screen
      canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      canvasCtx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        
        // Logic to detect Open Hand vs Fist
        // Simplified: Check distance between fingertips and wrist
        const wrist = landmarks[0];
        const fingerTips = [8, 12, 16, 20]; // index, middle, ring, pinky
        
        let openFingers = 0;
        fingerTips.forEach(tipIdx => {
          const tip = landmarks[tipIdx];
          const dist = Math.sqrt(Math.pow(tip.x - wrist.x, 2) + Math.pow(tip.y - wrist.y, 2));
          // If distance is large enough, finger is extended
          if (dist > 0.18) openFingers++;
        });

        if (openFingers >= 3) {
          onGestureChange('OPEN');
        } else if (openFingers <= 1) {
          onGestureChange('FIST');
        }

        // Draw Landmarks with custom style for CNY
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: '#FFD700',
          lineWidth: 2
        });
        drawLandmarks(canvasCtx, landmarks, {
          color: '#FF4500',
          lineWidth: 1,
          radius: 3
        });
      }
      canvasCtx.restore();
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current! });
      },
      width: 320,
      height: 240
    });

    camera.start().then(() => setIsActive(true));

    return () => {
      camera.stop();
      hands.close();
    };
  }, [onGestureChange]);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-48 h-36 rounded-xl overflow-hidden border-2 border-yellow-500 shadow-2xl bg-black">
        <video ref={videoRef} className="hidden" playsInline muted />
        <canvas 
          ref={canvasRef} 
          width={320} 
          height={240} 
          className="w-full h-full object-cover grayscale invert contrast-125"
        />
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center text-yellow-500 text-xs animate-pulse">
            启动摄像头中...
          </div>
        )}
      </div>
      <div className="text-[10px] text-yellow-600 font-mono tracking-tighter uppercase">
        Hand Tracking Matrix v1.0
      </div>
    </div>
  );
};

export default HandTracker;
