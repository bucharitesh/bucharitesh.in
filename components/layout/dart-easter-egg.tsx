"use client";

import { useState, useEffect } from 'react';

const DartEffect = () => {
  const [isActive, setIsActive] = useState(false);
  const [typed, setTyped] = useState('');
  const [hasExploded, setHasExploded] = useState(false);

  useEffect(() => {
    let timeoutId: any;

    const mainContent = document.getElementById('main-content');

    const handleKeyDown = (e: any) => {
      const newTyped = typed + e.key.toLowerCase();
      setTyped(newTyped);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setTyped('');
      }, 1000);

      if (newTyped.includes('boom') && !isActive) {
        setIsActive(true);
        
        // Trigger explosion after spacecraft animation
        setTimeout(() => {
          setHasExploded(true);
          // Apply final tilt
          if (mainContent) {
            mainContent.style.transform = 'rotate(6deg)';
          }
        }, 4800);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, [typed, isActive]);

  if (!isActive) return null;

  return (
    <>
      <div className="fixed z-10000 inset-0 pointer-events-none">
        {/* Only show these elements before explosion */}
        {!hasExploded && (
          <>
            {/* Spacecraft */}
            <div className="absolute w-10 h-5 bg-gray-300 -left-10 top-1/2 -translate-y-1/2 animate-spacecraft" />
            
            {/* Asteroid */}
            <div className="absolute w-24 h-24 bg-gray-600 right-24 top-1/2 -translate-y-1/2 rounded-full" />
            
            {/* Initial explosion */}
            <div className="absolute w-48 h-48 right-12 top-1/2 -translate-y-1/2 animate-explosion bg-gradient-radial from-orange-500 to-transparent opacity-0" />
            
            {/* Screen flash */}
            <div className="fixed inset-0 bg-white animate-flash opacity-0" />
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes spacecraft {
          0% { left: -50px; }
          95% { left: 90%; opacity: 1; }
          100% { left: 90%; opacity: 0; }
        }

        @keyframes explosion {
          0% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(1.5); }
        }

        @keyframes flash {
          0% { opacity: 0; }
          50% { opacity: 0.3; }
          100% { opacity: 0; }
        }

        .animate-spacecraft {
          animation: spacecraft 3s linear forwards;
        }

        .animate-explosion {
          animation: explosion 2s ease-out 2.8s forwards;
        }

        .animate-flash {
          animation: flash 0.5s ease-out 2.8s forwards;
        }
      `}</style>
    </>
  );
};

export default DartEffect;