'use client';

import { useEffect } from 'react';
// import { useEasterEggs } from '@/lib/providers/easter-egg-provider'

declare global {
  interface Window {
    findSecrets: () => void;
  }
}

const ConsoleEasterEgg = () => {
  // const { discoverEgg } = useEasterEggs()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Create an ASCII art message
      const asciiArt = `
    %c
       _____                      _       
      / ____|                    | |      
     | |     __ _ _ __ _ __   __| | ___  
     | |    / _' | '__| '_ \\ / _' |/ _ \\ 
     | |___| (_| | |  | | | | (_| | (_) |
      \\_____\\__,_|_|  |_| |_|\\__,_|\\___/ 
                                          
    %cTip: Try calling %cfindSecrets()%c in the console...
          `;

      const styles = [
        'color: #3b82f6; font-family: monospace;',
        'color: #6b7280; font-size: 12px;',
        'color: #10b981; font-weight: bold;',
        'color: #6b7280;',
      ];

      console.log(asciiArt, ...styles);

      // Add the secret function to window object
      window.findSecrets = () => {
        console.log(
          '%c🎉 Congratulations! You found the secret function!',
          'color: #10b981; font-size: 14px; font-weight: bold;'
        );
        console.log(
          "%c⭐ Here's your reward...",
          'color: #6b7280; font-size: 12px;'
        );

        // Small delay for dramatic effect
        setTimeout(() => {
          const messages = [
            '🔍 Searching for treasure...',
            '📦 Opening chest...',
            '✨ Achievement unlocked!',
          ];

          let delay = 0;
          for (const message of messages) {
            setTimeout(() => {
              console.log(`%c${message}`, 'color: #6b7280; font-size: 12px;');
              if (message === messages.at(-1)) {
                // discoverEgg("CONSOLE_MASTER");
              }
            }, delay);
            delay += 800;
          }
        }, 500);
      };
      return () => {
        // Make findSecrets optional before deletion
        if ('findSecrets' in window) {
          (window as any).findSecrets = undefined;
        }
      };
    }
  }, []);

  return <></>;
};

export default ConsoleEasterEgg;
