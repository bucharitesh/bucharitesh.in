'use client';

import { useEffect, useState } from 'react';

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

  if (!isActive) {
    return null;
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-10000">
        {/* Only show these elements before explosion */}
        {!hasExploded && (
          <>
            {/* Spacecraft */}
            <div className="-left-10 -translate-y-1/2 absolute top-1/2 h-5 w-10 animate-spacecraft bg-gray-300" />

            {/* Asteroid */}
            <div className="-translate-y-1/2 absolute top-1/2 right-24 h-24 w-24 rounded-full bg-gray-600" />

            {/* Initial explosion */}
            <div className="-translate-y-1/2 absolute top-1/2 right-12 h-48 w-48 animate-explosion bg-gradient-radial from-orange-500 to-transparent opacity-0" />

            {/* Screen flash */}
            <div className="fixed inset-0 animate-flash bg-white opacity-0" />
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
