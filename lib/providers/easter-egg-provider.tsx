import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  HiCommandLine,
  HiDocumentText,
} from "react-icons/hi2";
import { IconType } from "react-icons";
import { AnimatePresence, motion } from "framer-motion";
import useSound from "use-sound";
import { Palette } from "lucide-react";

// Types remain the same as before
interface Tier {
  name: string;
  multiplier: number;
  minPoints: number;
}

interface EasterEgg {
  id: string;
  name: string;
  description: string;
  points: number;
  tier: Tier;
  icon: IconType;
}

interface DiscoveredEgg {
  timestamp: string;
  points: number;
}

interface Progress {
  discovered: number;
  total: number;
  percentage: number;
  possiblePoints: number;
  earnedPoints: number;
  earnedPercentage: number;
}

interface EasterEggContextType {
  discoveredEggs: Record<string, DiscoveredEgg>;
  discoverEgg: (eggId: string) => boolean;
  totalPoints: number;
  currentTier: Tier;
  progress: Progress;
  TOTAL_POSSIBLE_POINTS: number;
  resetEasterEggs: () => void;
}

// Toast component
const Toast = ({ achievement, onClose }: { achievement: EasterEgg; onClose: () => void }) => {
  const [playSound] = useSound("/assets/achievement.mp3", { volume: 0.3 });

  useEffect(() => {
    playSound();
  }, [playSound]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute bottom-6 w-full max-w-xs right-6 flex justify-center md:justify-end items-center z-50"
    >
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg w-full border bg-neutral-100/90 text-black dark:bg-neutral-800/90 dark:text-white backdrop-blur-xl border-neutral-200 dark:border-neutral-800 shadow-2xl">
        <div className="p-2 rounded-lg bg-white/10 dark:bg-black/10">
          {achievement.icon && <achievement.icon className="w-4 h-4" />}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium tracking-tight">{achievement.name}</span>
          <span className="text-xs text-gray-800 dark:text-gray-400">{achievement.description}</span>
          <span className="text-xs text-green-600 dark:text-green-400 mt-0.5">+{achievement.points} points</span>
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 rounded-full dark:hover:bg-white/10 hover:bg-black/10 transition-colors"
      >
        <svg className="w-3 h-3 opacity-50" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </svg>
      </button>
    </motion.div>
  );
};

const TIERS: Record<string, Tier> = {
  EXPLORER: { name: "Explorer", multiplier: 1, minPoints: 0 },
  DISCOVERER: { name: "Discoverer", multiplier: 1.5, minPoints: 50 },
  MASTER: { name: "Master", multiplier: 2, minPoints: 100 },
};

export const easterEggs: Record<string, EasterEgg> = {
  THEME_TOGGLE: {
    id: "THEME_TOGGLE",
    name: "Theme warrior",
    description: 'Toggled the theme',
    points: 15,
    tier: TIERS.EXPLORER,
    icon: Palette as any,
  },
  // FIND_A_NOTE: {
  //   id: "FIND_A_NOTE",
  //   name: "Note finder",
  //   description: "Found a note",
  //   points: 15,
  //   tier: TIERS.EXPLORER,
  //   icon: HiDocumentText,
  // },
  // SUBMIT_A_ENTRY: {
  //   id: "SUBMIT_A_ENTRY",
  //   name: "Entry submitter",
  //   description: "Submitted an entry",
  //   points: 15,
  //   tier: TIERS.MASTER,
  //   icon: HiDocumentText,
  // },
  CONSOLE_MASTER: {
    id: "CONSOLE_MASTER",
    name: "Console Explorer",
    description: "Found the secret console command",
    points: 25,
    tier: TIERS.DISCOVERER,
    icon: HiCommandLine,
  },
};

const TOTAL_POSSIBLE_POINTS = Object.values(easterEggs).reduce(
  (total, egg) => total + egg.points,
  0
);

const canDiscoverEgg = (
  eggId: string,
  discoveredEggs: Record<string, DiscoveredEgg>
): boolean => {
  return easterEggs[eggId] && !discoveredEggs[eggId];
};

const EasterEggContext = createContext<EasterEggContextType>({} as EasterEggContextType);

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const [discoveredEggs, setDiscoveredEggs] = useState<Record<string, DiscoveredEgg>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("discoveredEggs");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const [totalPoints, setTotalPoints] = useState(() => {
    return Object.values(discoveredEggs).reduce(
      (sum, egg) => sum + egg.points,
      0
    );
  });

  const [currentTier, setCurrentTier] = useState<Tier>(TIERS.EXPLORER);
  const [activeToasts, setActiveToasts] = useState<EasterEgg[]>([]);

  const discoverEgg = (eggId: string): boolean => {
    if (!canDiscoverEgg(eggId, discoveredEggs)) {
      return false;
    }

    const currentTime = new Date();
    const newDiscoveredEggs = {
      ...discoveredEggs,
      [eggId]: {
        timestamp: currentTime.toISOString(),
        points: easterEggs[eggId].points,
      },
    };

    setDiscoveredEggs(newDiscoveredEggs);
    setTotalPoints((prev) => prev + easterEggs[eggId].points);

    const newTotal = totalPoints + easterEggs[eggId].points;
    if (newTotal >= TIERS.MASTER.minPoints) setCurrentTier(TIERS.MASTER);
    else if (newTotal >= TIERS.DISCOVERER.minPoints)
      setCurrentTier(TIERS.DISCOVERER);

    // Add new toast to the array
    setActiveToasts((prev) => [...prev, easterEggs[eggId]]);

    // Automatically remove toast after 5 seconds
    setTimeout(() => {
      setActiveToasts((prev) => prev.filter((toast) => toast.id !== eggId));
    }, 5000);

    return true;
  };

  const progress: Progress = {
    discovered: Object.keys(discoveredEggs).length,
    total: Object.keys(easterEggs).length,
    percentage: Math.round(
      (Object.keys(discoveredEggs).length / Object.keys(easterEggs).length) *
        100
    ),
    possiblePoints: TOTAL_POSSIBLE_POINTS,
    earnedPoints: totalPoints,
    earnedPercentage: Math.round((totalPoints / TOTAL_POSSIBLE_POINTS) * 100),
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("discoveredEggs", JSON.stringify(discoveredEggs));
    }
  }, [discoveredEggs]);

  const resetEasterEggs = () => {
    setDiscoveredEggs({});
    setTotalPoints(0);
    setCurrentTier(TIERS.EXPLORER);
    setActiveToasts([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("discoveredEggs");
    }
  };

  return (
    <EasterEggContext.Provider
      value={{
        discoveredEggs,
        discoverEgg,
        totalPoints,
        currentTier,
        progress,
        TOTAL_POSSIBLE_POINTS,
        resetEasterEggs,
      }}
    >
      {children}
      <AnimatePresence>
        {activeToasts.map((achievement) => (
          <Toast
            key={achievement.id}
            achievement={achievement}
            onClose={() => setActiveToasts((prev) => 
              prev.filter((toast) => toast.id !== achievement.id)
            )}
          />
        ))}
      </AnimatePresence>
    </EasterEggContext.Provider>
  );
}

export const useEasterEggs = () => useContext(EasterEggContext);