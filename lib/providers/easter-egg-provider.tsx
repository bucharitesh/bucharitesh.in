import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import {
  HiCommandLine,
  HiSquare2Stack,
  HiSparkles,
  HiLanguage,
  HiKey,
} from "react-icons/hi2";
import { IconType } from "react-icons";
import { AnimatePresence, motion } from "framer-motion";
import useSound from "use-sound";
import { useTheme } from "next-themes";

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
  showAchievement: boolean;
  setShowAchievement: (show: boolean) => void;
  currentAchievement: EasterEgg | null;
  resetEasterEggs: () => void;
}

const TIERS: Record<string, Tier> = {
  EXPLORER: { name: "Explorer", multiplier: 1, minPoints: 0 },
  DISCOVERER: { name: "Discoverer", multiplier: 1.5, minPoints: 50 },
  MASTER: { name: "Master", multiplier: 2, minPoints: 100 },
};

export const easterEggs: Record<string, EasterEgg> = {
  FONT_SWITCH: {
    id: "FONT_SWITCH",
    name: "Typography enthusiast",
    description: "Experimented with different fonts",
    points: 15,
    tier: TIERS.EXPLORER,
    icon: HiLanguage,
  },
  THEME_KEYBOARD: {
    id: "THEME_KEYBOARD",
    name: "Keyboard warrior",
    description: 'Used the "L" shortcut to toggle theme',
    points: 15,
    tier: TIERS.EXPLORER,
    icon: HiKey,
  },
  COMMAND_PALETTE: {
    id: "COMMAND_PALETTE",
    name: "Power user",
    description: "Used ⌘K to open command palette",
    points: 25,
    tier: TIERS.DISCOVERER,
    icon: HiCommandLine,
  },
  SOCIAL_EXPANDER: {
    id: "SOCIAL_EXPANDER",
    name: "Social explorer",
    description: "Found the hidden social links",
    points: 20,
    tier: TIERS.EXPLORER,
    icon: HiSquare2Stack,
  },
  VERSION_SHIMMER: {
    id: "VERSION_SHIMMER",
    name: "Detail observer",
    description: "Found the version number shimmer",
    points: 25,
    tier: TIERS.EXPLORER,
    icon: HiSparkles,
  },
};

const TOTAL_POSSIBLE_POINTS = Object.values(easterEggs).reduce(
  (total, egg) => total + egg.points,
  0,
);

const canDiscoverEgg = (
  eggId: string,
  discoveredEggs: Record<string, DiscoveredEgg>,
): boolean => {
  return easterEggs[eggId] && !discoveredEggs[eggId];
};

const EasterEggContext = createContext<EasterEggContextType>(
  {} as EasterEggContextType,
);

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const [discoveredEggs, setDiscoveredEggs] = useState<
    Record<string, DiscoveredEgg>
  >(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("discoveredEggs");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const soundPlayedRef = useRef(false);
  const [playGameSound] = useSound("/assets/achievement.mp3", { volume: 0.5 }); // Add your sound file

  const [totalPoints, setTotalPoints] = useState(() => {
    return Object.values(discoveredEggs).reduce(
      (sum, egg) => sum + egg.points,
      0,
    );
  });

  const [currentTier, setCurrentTier] = useState<Tier>(TIERS.EXPLORER);
  const [showAchievement, setShowAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] =
    useState<EasterEgg | null>(null);

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

    setCurrentAchievement(easterEggs[eggId]);
    setShowAchievement(true);

    return true;
  };

  const progress: Progress = {
    discovered: Object.keys(discoveredEggs).length,
    total: Object.keys(easterEggs).length,
    percentage: Math.round(
      (Object.keys(discoveredEggs).length / Object.keys(easterEggs).length) *
        100,
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
        showAchievement,
        setShowAchievement,
        currentAchievement,
        resetEasterEggs,
      }}
    >
      {children}
      <AnimatePresence
        onExitComplete={() => {
          soundPlayedRef.current = false;
        }}
      >
        {showAchievement && currentAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
              fixed left-0 right-0 mx-auto bottom-8
              w-fit px-6 py-4 rounded-lg
              dark:bg-black/90 bg-white/90
              border
              dark:border-white/[0.08] border-black/[0.08]
              backdrop-blur-xl shadow-lg
              flex items-center gap-4
              z-[9999]
            `}
            onAnimationStart={() => {
              if (!soundPlayedRef.current) {
                playGameSound();
                soundPlayedRef.current = true;
              }
            }}
          >
            <div className="text-2xl">
              {currentAchievement.icon && (
                <currentAchievement.icon
                  className={`
                    w-6 h-6
                    dark:text-gray-300 text-gray-700
                  `}
                />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-sm">
                  {currentAchievement.name}
                </h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full dark:bg-green-500/20 dark:text-green-400 bg-green-100 text-green-600`}
                >
                  +{currentAchievement.points}
                </span>
              </div>
              <p className={`text-sm mt-1 dark:text-gray-400 text-gray-600`}>
                {currentAchievement.description}
              </p>
            </div>
            <button
              onClick={() => setShowAchievement(false)}
              className={`absolute top-2 right-2 p-1 rounded-full dark:hover:bg-white/10 hover:bg-black/10 transition-colors`}
            >
              <svg className="w-3 h-3 opacity-50" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </EasterEggContext.Provider>
  );
}

export const useEasterEggs = () => useContext(EasterEggContext);
