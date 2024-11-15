"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { type DialogProps } from "@radix-ui/react-dialog";
import {
  CircleIcon,
  FileIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
import {
  HiArrowPath,
  HiCalculator,
  HiClock,
  HiCloud,
  HiCurrencyDollar,
  HiMoon,
  HiOutlineCommandLine,
  HiSun,
} from "react-icons/hi2";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import cityTimezones from "city-timezones";
import { formatInTimeZone } from "date-fns-tz";

// Helper function to format calculation results - moved to top
const formatCalculationResult = (result) => {
  if (result === null) return "";
  if (Number.isInteger(result)) return result.toString();
  return result.toFixed(2);
};

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [calculationResult, setCalculationResult] = useState<string | null>(
    null
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [userLocation, setUserLocation] = useState("Berlin");
  const [geminiResponse, setGeminiResponse] = useState("");
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState(Date.now());

  // Add ref for the commands list container
  const commandsListRef = React.useRef<any>(null);

  // Add function to scroll selected item into view
  const scrollSelectedIntoView = (index) => {
    if (!commandsListRef.current) return;

    const commandElements = commandsListRef.current.children;
    if (commandElements[index]) {
      commandElements[index].scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  };

  const handleMouseMove = (groupIndex, commandIndex) => {
    let flatIndex = 0;
    for (let i = 0; i < groupIndex; i++) {
      flatIndex += filteredCommands[i].commands.length;
    }
    flatIndex += commandIndex;
    setSelectedIndex(flatIndex);
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Enhanced safe calculation function
  const calculateExpression = (query) => {
    try {
      if (!query) return null;

      // Handle percentage calculations with various formats
      if (query.includes("%")) {
        // Remove any extra spaces and convert to lowercase
        const cleanQuery = query.toLowerCase().trim().replace(/\s+/g, " ");

        // Handle "X% of Y" format
        if (cleanQuery.includes(" of ")) {
          const [percentPart, valuePart] = cleanQuery.split(" of ");
          const percentage = parseFloat(percentPart);
          const value = parseFloat(valuePart);
          if (!isNaN(percentage) && !isNaN(value)) {
            return (percentage / 100) * value;
          }
        }

        // Handle "X% on Y" format
        if (cleanQuery.includes(" on ")) {
          const [percentPart, valuePart] = cleanQuery.split(" on ");
          const percentage = parseFloat(percentPart);
          const value = parseFloat(valuePart);
          if (!isNaN(percentage) && !isNaN(value)) {
            return (percentage / 100) * value;
          }
        }

        // Handle simple percentage (just converting to decimal)
        const value = parseFloat(query);
        if (!isNaN(value)) {
          return value / 100;
        }
      }

      // Handle basic arithmetic safely
      const sanitizedQuery = query
        .replace(/[×x]/g, "*")
        .replace(/[÷]/g, "/")
        .replace(/[^0-9+\-*/.() ]/g, "");

      // Prevent malicious code execution
      if (
        sanitizedQuery.includes("function") ||
        sanitizedQuery.includes("=>")
      ) {
        return null;
      }

      // Safe evaluation
      return new Function(`return ${sanitizedQuery}`)();
    } catch (error) {
      return null;
    }
  };

  // Update weather fetch to use user's location
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`/api/weather?city=${userLocation}`);
        if (!response.ok) throw new Error("Weather fetch failed");
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setWeatherData(null);
      }
    };

    if (open) {
      fetchWeather();
    }
  }, [open, userLocation]);

  // Check if query is a calculation
  useEffect(() => {
    if (
      searchQuery.match(/^[\d\s+\-*/%()×x.]+$/) ||
      searchQuery.toLowerCase().includes("% of ") ||
      searchQuery.toLowerCase().includes("% on ")
    ) {
      const result = calculateExpression(searchQuery);
      setCalculationResult(result);
    } else {
      setCalculationResult(null);
    }
  }, [searchQuery]);

  // Helper function for timezone conversions
  const getTimeInTimezone = (timezone) => {
    const now = new Date();
    return formatInTimeZone(now, timezone, "h:mm a");
  };

  // Helper function to parse time queries
  const parseTimeQuery = (query) => {
    const normalizedQuery = query.toLowerCase().trim();

    if (normalizedQuery.includes("time")) {
      const cityQuery = normalizedQuery
        .replace("time in", "")
        .replace("time at", "")
        .trim();

      const cityResults = cityTimezones.lookupViaCity(cityQuery);

      if (cityResults && cityResults.length > 0) {
        const city = cityResults[0];
        const timeString = getTimeInTimezone(city.timezone);
        return {
          id: `time-${city.city}`,
          name: `${city.city}, ${city.country}: ${timeString}`,
          description: `Current time in ${city.city}`,
          icon: HiClock,
          // Add action to copy time to clipboard
          action: async () => {
            await navigator.clipboard.writeText(timeString);
            // setCopiedId(`time-${city.city}`);
            // setTimeout(() => {
            //   setCopiedId(null);
            // }, 1000);
          },
        };
      }

      // Handle multiple matches
      const allCities = cityTimezones.cityMapping;
      const possibleMatches = allCities
        .filter(
          (city) =>
            city.city.toLowerCase().includes(cityQuery) ||
            city.country.toLowerCase().includes(cityQuery)
        )
        .slice(0, 5);

      if (possibleMatches.length > 0) {
        return possibleMatches.map((city) => {
          const timeString = getTimeInTimezone(city.timezone);
          return {
            id: `time-${city.city}`,
            name: `${city.city}, ${city.country}: ${timeString}`,
            description: `Current time in ${city.city}`,
            icon: HiClock,
            // Add action to copy time to clipboard
            action: async () => {
              await navigator.clipboard.writeText(timeString);
              // setCopiedId(`time-${city.city}`);
              // setTimeout(() => {
              //   setCopiedId(null);
              // }, 1000);
            },
          };
        });
      }
    }

    return null;
  };

  // Create time command if query matches
  const timeCommand = parseTimeQuery(searchQuery);
  const timeCommands = Array.isArray(timeCommand)
    ? timeCommand
    : timeCommand
      ? [timeCommand]
      : [];

  // Modified calculation command - removed auto-close
  const calculationCommand =
    calculationResult !== null
      ? [
          {
            id: "calculation",
            name: `= ${formatCalculationResult(calculationResult)}`,
            description: searchQuery,
            icon: HiCalculator,
            action: async () => {
              await navigator.clipboard.writeText(calculationResult.toString());
              // setCopiedId("calculation");
              // setTimeout(() => {
              //   setCopiedId(null); // Just clear the copied state, don't close
              // }, 1000);
            },
          },
        ]
      : [];

  // Update the keyboard navigation useEffect
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      // Only handle Escape and Arrow keys here
      switch (e.key) {
        case "Escape":
          setOpen(false);
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => {
            const newIndex = prev + 1;
            scrollSelectedIntoView(newIndex);
            return newIndex;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => {
            const newIndex = Math.max(0, prev - 1);
            scrollSelectedIntoView(newIndex);
            return newIndex;
          });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Add IP location fetch
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) throw new Error("Location fetch failed");
        const data = await response.json();
        if (data.city) {
          setUserLocation(data.city);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
    fetchLocation();
  }, []);

  // Fetch exchange rates on component mount
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };
    fetchRates();
  }, []);

  // Modified currency command - removed auto-close
  const parseCurrencyQuery = (query) => {
    const normalizedQuery = query.toLowerCase().trim();

    // Match patterns like "100 usd to eur" or "convert 50 gbp to inr"
    const currencyPattern =
      /(?:convert\s+)?(\d+(?:\.\d+)?)\s*([a-z]{3})\s+(?:to|in)\s+([a-z]{3})/i;
    const match = normalizedQuery.match(currencyPattern);

    if (match && exchangeRates) {
      const [_, amount, fromCurrency, toCurrency] = match;
      const fromRate = exchangeRates[fromCurrency.toUpperCase()];
      const toRate = exchangeRates[toCurrency.toUpperCase()];

      if (fromRate && toRate) {
        // Convert through USD as base
        const inUSD = parseFloat(amount) / fromRate;
        const result = inUSD * toRate;

        return {
          id: "currency-conversion",
          name: `${amount} ${fromCurrency.toUpperCase()} = ${result.toFixed(2)} ${toCurrency.toUpperCase()}`,
          description: `Currency conversion (${new Date().toLocaleDateString()})`,
          icon: HiCurrencyDollar,
          action: async () => {
            await navigator.clipboard.writeText(result.toFixed(2));
            // setCopiedId("currency-conversion");
            // setTimeout(() => {
            //   setCopiedId(null); // Just clear the copied state, don't close
            // }, 1000);
          },
        };
      }
    }

    return null;
  };

  // Create currency command if query matches
  const currencyCommand = parseCurrencyQuery(searchQuery)
    ? [parseCurrencyQuery(searchQuery)]
    : [];

  const commandGroups = useMemo(() => {
    const appearanceCommands = {
      name: "Appearance",
      commands: [
        {
          id: "theme",
          name: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
          description: `Currently in ${theme === "dark" ? "dark" : "light"} mode`,
          icon: theme === "dark" ? HiSun : HiMoon,
          rightIcon: ({ className }) => (
            <kbd
              className={`${className} text-[11px] font-medium font-['Inter'] opacity-50`}
            >
              L
            </kbd>
          ),
          action: () => {
            if (theme === "light") {
              setTheme("dark");
            } else {
              setTheme("light");
            }
          },
        },
      ],
    };

    const essentialCommands = {
      name: "Tools",
      commands: [
        {
          id: "calculator",
          name: "Calculate",
          description: "Try: 2 + 2 or 34% of 567",
          icon: HiCalculator,
          action: () => setSearchQuery("34% of 567"),
        },
        {
          id: "time",
          name: "Check time anywhere",
          description: "Try: time in tokyo or time in berlin",
          icon: HiClock,
          action: () => setSearchQuery("time in tokyo"),
        },
        {
          id: "weather",
          name: "Current weather",
          description:
            weatherData && weatherData.main && weatherData.weather
              ? `${userLocation}: ${Math.round(weatherData.main.temp)}°C, ${weatherData.weather[0].description}`
              : "Loading weather...",
          icon: HiCloud,
          action: () => {
            // if (weatherData && weatherData.main && weatherData.weather) {
            //   navigator.clipboard.writeText(
            //     `Current weather in ${userLocation}: ${Math.round(weatherData.main.temp)}°C, ${weatherData.weather[0].description}`
            //   );
            //   // setCopiedId("weather");
            //   setTimeout(() => setCopiedId(null), 1000);
            // }
          },
        },
        {
          id: "currency",
          name: "Convert currency",
          description: "Try: 100 usd to eur",
          icon: HiCurrencyDollar,
          action: () => setSearchQuery("100 usd to eur"),
        },
      ],
    };

    return [appearanceCommands, essentialCommands];
  }, [theme]);

  const filteredCommands = React.useMemo(() => {
    if (calculationResult !== null) {
      return [
        {
          name: "Result",
          commands: calculationCommand,
        },
      ];
    }

    if (currencyCommand?.length > 0) {
      return [
        {
          name: "Currency",
          commands: currencyCommand,
        },
      ];
    }

    if (timeCommands?.length > 0) {
      return [
        {
          name: "Time",
          commands: timeCommands,
        },
      ];
    }

    // Add debug commands when searching for 'reset'
    if (searchQuery.toLowerCase().includes("reset")) {
      return [
        {
          name: "Debug",
          commands: [
            {
              id: "reset-eggs",
              name: "Reset Easter Eggs",
              description: "Reset all discovered easter eggs",
              icon: HiArrowPath,
              action: () => {
                setOpen(false);
              },
            },
          ],
        },
      ];
    }

    if (!searchQuery) {
      return commandGroups;
    }

    // Filter commands within groups
    const filteredGroups = commandGroups
      .map((group) => ({
        name: group.name,
        commands: group.commands.filter(
          (command) =>
            command.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            command.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((group) => group.commands.length > 0);

    return filteredGroups;
  }, [
    commandGroups,
    calculationResult,
    currencyCommand,
    timeCommands,
    searchQuery,
  ]);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`
                    p-4 border-b 
                  `}
        >
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-900/5">
            {calculationResult !== null ? (
              <HiCalculator className="w-5 h-5 text-gray-400" />
            ) : (
              <HiOutlineCommandLine className="w-5 h-5 text-gray-400" />
            )}
            <input
              type="text"
              placeholder={
                calculationResult !== null
                  ? "Calculate anything..."
                  : "Type a command or search..."
              }
              className={`
                        w-full bg-transparent border-none outline-none 
                        placeholder-gray-400 text-lg
                        py-1 sm:py-0
                      `}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();

                  // Get all commands in a flat array
                  const allCommands = filteredCommands.reduce((acc, group) => {
                    return [...acc, ...group.commands];
                  }, []);

                  // Execute selected command if it exists
                  if (allCommands.length > 0) {
                    const commandToExecute = allCommands[selectedIndex];
                    if (commandToExecute?.action) {
                      commandToExecute.action();
                      // if (commandToExecute.closeOnExecute) {
                      //   setOpen(false);
                      // }
                    }
                  }
                }
              }}
              autoFocus
            />
            <div className="flex items-center gap-2">
              <kbd
                className={`
                        hidden sm:flex items-center justify-center
                        px-2 py-1 text-xs font-medium rounded
                      `}
              >
                ESC
              </kbd>
            </div>
          </div>
        </motion.div>
        <CommandList ref={commandsListRef}>
          <CommandEmpty>No results found.</CommandEmpty>
          {filteredCommands.map((group, groupIndex) => (
            <CommandGroup key={group.name} className="mb-4">
              {/* Group header */}
              <div
                className={`px-4 sm:px-6 py-2 text-xs font-medium tracking-wider`}
              >
                {group.name.toUpperCase()}
              </div>

              {/* Group commands */}
              {group.commands.map((command, index) => (
                <CommandItem asChild>
                  <motion.button
                    key={command?.id || index}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    onClick={() => command?.action?.()}
                    onMouseMove={() => handleMouseMove(groupIndex, index)}
                    className={`
                            w-full px-4 sm:px-6 py-3 flex items-center
                            group transition-all duration-75
                          `}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 w-full">
                      {command?.icon && (
                        <div
                          className={`
                                p-1.5 rounded-lg flex-shrink-0 flex items-center justify-center
                                w-8 h-8 transition-colors
                              `}
                        >
                          {typeof command.icon === "function" ? (
                            command.icon({ className: "w-4 h-4" })
                          ) : (
                            // <command.icon className="w-4 h-4" />
                            <p>command icon</p>
                          )}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0 flex-1">
                        <span
                          className={`
                                font-medium text-base text-left
                              `}
                        >
                          {command?.name}
                        </span>
                        {command?.description && (
                          <span className={`text-sm text-left`}>
                            {command.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.button>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
