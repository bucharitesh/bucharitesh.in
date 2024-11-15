import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineCommandLine,
  HiCheck,
  HiCalculator,
  HiClock,
  HiCurrencyDollar,
  HiGlobeAlt,
  HiClipboard,
  HiMoon,
  HiEnvelope,
  HiDocumentText,
  HiPhoto,
  HiCloud,
  HiCodeBracket,
  HiArrowRight,
  HiSparkles,
  HiOutlineSparkles,
  HiSun,
  HiArrowPath,
} from "react-icons/hi2";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import cityTimezones from "city-timezones";
import profilePic from "../images/profile.png";
import profilePicLight from "../images/profile-light.jpg";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown"; // Add this import at the top
import { useFont } from "../App";
import { useEasterEggs } from "../contexts/EasterEggContext";

// Replace the hardcoded initialization with environment variable
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_AI_KEY);

// Add these constants near the top
const MAX_REQUESTS_PER_MINUTE = 10;
const MAX_TOKENS = 250;
const BLOCKED_KEYWORDS = ["hack", "exploit", "attack", "malware", "password"];
const PRATEEK_CONTEXT = `
Prateek Keshari is a product and marketing leader based in Berlin. He helps companies with marketing that sticks and believes in making, leading, and taking things from 0 to 1. He has a deep passion for good tech and design, often experimenting with AI, code, design, photo, and film. He values high agency, clarity, creativity and big-picture thinking. He currently works at GetYourGuide and has built several projects including Radio Globe, Time, Scoop, Mockmint, and Peek AI.
`;

function CommandPalette({
  isOpen,
  setIsOpen,
  isDarkMode,
  projects,
  setIsDarkMode,
}) {
  // Move this to the top, before any other code that uses these values
  const { discoverEgg, discoveredEggs, resetEasterEggs } = useEasterEggs();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const [calculationResult, setCalculationResult] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [userLocation, setUserLocation] = useState("Berlin");
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [geminiInput, setGeminiInput] = useState("");
  const [geminiResponse, setGeminiResponse] = useState("");
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState(Date.now());

  // Get font controls from context
  const { fontFamily, setFontFamily } = useFont();

  // Helper function to format calculation results - moved to top
  const formatCalculationResult = (result) => {
    if (result === null) return "";
    if (Number.isInteger(result)) return result.toString();
    return result.toFixed(2);
  };

  const aboutText =
    "I help companies with marketing that sticks. I believe in making, leading, and taking things from 0 to 1. I have a deep passion for good tech and design. I am often learning and experimenting with AI, code, design, photo, and film. I value high agency, clarity, creativity and big-picture thinking.";

  // Modified createCopyCommand helper function - removed auto-close
  const createCopyCommand = (id, name, text) => ({
    id,
    name,
    action: async () => {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null); // Just clear the copied state, don't close
      }, 1000);
    },
  });

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
            setCopiedId(`time-${city.city}`);
            setTimeout(() => {
              setCopiedId(null);
            }, 1000);
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
              setCopiedId(`time-${city.city}`);
              setTimeout(() => {
                setCopiedId(null);
              }, 1000);
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
              setCopiedId("calculation");
              setTimeout(() => {
                setCopiedId(null); // Just clear the copied state, don't close
              }, 1000);
            },
          },
        ]
      : [];

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
            setCopiedId("currency-conversion");
            setTimeout(() => {
              setCopiedId(null); // Just clear the copied state, don't close
            }, 1000);
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

  // Expanded Berlin facts
  const berlinFacts = [
    {
      fact: "Berlin has more bridges than Venice",
      source: "Over 1,700 bridges compared to Venice's 400",
    },
    {
      fact: "Berlin's TV Tower is visible from every district",
      source: "Standing at 368 meters tall",
    },
    {
      fact: "Berlin has more museums than rainy days per year",
      source: "175 museums vs 106 rainy days",
    },
    {
      fact: "The Berlin Wall stood for 10,316 days",
      source: "From August 13, 1961, to November 9, 1989",
    },
    {
      fact: "Berlin has more kebab shops than Istanbul",
      source: "Over 4,000 döner shops in the city",
    },
    {
      fact: "The first traffic light in Europe was in Berlin",
      source: "Installed at Potsdamer Platz in 1924",
    },
    {
      fact: "Berlin's Hauptbahnhof is Europe's largest train station",
      source: "Spanning across 5 floors",
    },
    {
      fact: "Berlin is 9 times bigger than Paris",
      source: "892 km² vs 105 km²",
    },
  ];

  // Modified natural language command parser
  const parseNaturalCommand = (query) => {
    const normalizedQuery = query.toLowerCase();

    // Greetings in different languages
    const greetings = ["hello", "hey", "guten tag", "hola", "bonjour"];
    if (greetings.some((greeting) => normalizedQuery.trim() === greeting)) {
      // Added trim() to handle whitespace
      return {
        id: "greeting",
        name: ` Hello! Guten Tag! Hola! Bonjour!`,
        description:
          "Try asking me to calculate something or check time anywhere",
        action: () => {},
      };
    }

    // Easter eggs
    if (normalizedQuery.includes("meaning of life")) {
      return {
        id: "meaning",
        name: "42",
        description: "That's the answer to life, universe, and everything",
        action: () => {},
      };
    }

    // Quick actions
    if (normalizedQuery.includes("dark") || normalizedQuery.includes("light")) {
      return {
        id: "theme-natural",
        name: `Switch to ${isDarkMode ? "light" : "dark"} mode`,
        description: "Change the appearance",
        action: () => setIsDarkMode((prev) => !prev),
      };
    }

    // Modified Berlin facts handler - returns just one random fact
    if (
      normalizedQuery.includes("berlin") ||
      normalizedQuery.includes("fact")
    ) {
      // Get a random fact
      const randomFact =
        berlinFacts[Math.floor(Math.random() * berlinFacts.length)];

      // Return a single command object
      return {
        id: "berlin-fact",
        name: randomFact.fact,
        description: randomFact.source,
        icon: ({ className }) => (
          <span className={className} role="img" aria-label="Berlin">
            🇩🇪
          </span>
        ),
      };
    }

    return null;
  };

  // Modified naturalCommand creation
  const naturalCommand = parseNaturalCommand(searchQuery);
  const naturalCommands = naturalCommand ? [naturalCommand] : [];

  // Helper function to copy image to clipboard
  const copyImageToClipboard = async (imageUrl) => {
    try {
      // Create an image element
      const img = new Image();

      // Set crossOrigin to anonymous since we're loading from the same origin
      img.crossOrigin = "anonymous";

      // Create a promise to handle image loading
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      // Create a canvas and draw the image
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Convert to blob
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png", 1.0)
      );

      // Write to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);

      return true;
    } catch (error) {
      console.error("Error copying image:", error);
      return false;
    }
  };

  // Use ref to store randomized commands
  const randomizedCommandsRef = useRef(null);

  // Update the generateContent function with security measures
  const generateContent = async (userPrompt) => {
    try {
      // Trigger AI easter egg on first use
      if (!discoveredEggs.AI_CHAT) {
        discoverEgg("AI_CHAT");
      }

      // Check request rate limiting
      const now = Date.now();
      if (now - lastRequestTime < 60000) {
        // Within a minute
        if (requestCount >= MAX_REQUESTS_PER_MINUTE) {
          return "Too many requests. Please wait a moment before trying again.";
        }
        setRequestCount((prev) => prev + 1);
      } else {
        // Reset counter for new minute
        setRequestCount(1);
        setLastRequestTime(now);
      }

      // Check prompt length
      if (userPrompt.length > 500) {
        return "Please keep your questions shorter (under 500 characters).";
      }

      // Check for blocked keywords
      if (
        BLOCKED_KEYWORDS.some((keyword) =>
          userPrompt.toLowerCase().includes(keyword)
        )
      ) {
        return "I cannot assist with potentially harmful requests.";
      }

      // Add context about Prateek for relevant queries
      let enhancedPrompt = userPrompt;
      if (
        userPrompt.toLowerCase().includes("prateek") ||
        userPrompt.toLowerCase().includes("you") ||
        userPrompt.toLowerCase().includes("your")
      ) {
        enhancedPrompt = `Context: ${PRATEEK_CONTEXT}\n\nQuery: ${userPrompt}`;
      }

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: enhancedPrompt }] }],
        generationConfig: {
          maxOutputTokens: MAX_TOKENS,
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        },
      });

      return result.response.text();
    } catch (error) {
      console.error("Error generating content:", error);
      return "Sorry, I encountered an error. Please try again.";
    }
  };

  // New command for generating content
  const aiCommand = {
    id: "ai",
    name: "Ask AI",
    description: "Get AI assistance for any question",
    icon: HiSparkles,
    action: () => {
      setSearchQuery("@");
    },
  };

  // Update the fontCommands and merge with theme toggle
  const fontCommands = {
    name: "Appearance",
    commands: [
      {
        id: "theme",
        name: `Switch to ${isDarkMode ? "light" : "dark"} mode`,
        description: `Currently in ${isDarkMode ? "dark" : "light"} mode`,
        icon: isDarkMode ? HiSun : HiMoon,
        rightIcon: ({ className }) => (
          <kbd
            className={`${className} text-[11px] font-medium font-['Inter'] opacity-50`}
          >
            L
          </kbd>
        ),
        action: () => setIsDarkMode((prev) => !prev),
      },
      {
        id: "font-switch",
        name: `Switch to ${fontFamily === "default" ? "Inter" : "System"} font`,
        description: `Currently using ${fontFamily === "default" ? "System" : "Inter"} font`,
        icon: ({ className }) => (
          <span
            className={`
            ${className} text-[13px] font-medium
            ${fontFamily === "inter" ? 'font-["Inter"]' : "font-default"}
          `}
          >
            Aa
          </span>
        ),
        action: () =>
          setFontFamily((prev) => (prev === "default" ? "inter" : "default")),
      },
    ],
  };

  // Add these command groups inside the useMemo hook
  const commandGroups = React.useMemo(() => {
    const appearanceCommands = {
      name: "Appearance",
      commands: [
        {
          id: "theme",
          name: `Switch to ${isDarkMode ? "light" : "dark"} mode`,
          description: `Currently in ${isDarkMode ? "dark" : "light"} mode`,
          icon: isDarkMode ? HiSun : HiMoon,
          rightIcon: ({ className }) => (
            <kbd
              className={`${className} text-[11px] font-medium font-['Inter'] opacity-50`}
            >
              L
            </kbd>
          ),
          action: () => setIsDarkMode((prev) => !prev),
        },
        {
          id: "font-switch",
          name: `Switch to ${fontFamily === "default" ? "Inter" : "System"} font`,
          description: `Currently using ${fontFamily === "default" ? "System" : "Inter"} font`,
          icon: ({ className }) => (
            <span
              className={`
              ${className} text-[13px] font-medium
              ${fontFamily === "inter" ? 'font-["Inter"]' : "font-default"}
            `}
            >
              Aa
            </span>
          ),
          action: () =>
            setFontFamily((prev) => (prev === "default" ? "inter" : "default")),
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
            if (weatherData && weatherData.main && weatherData.weather) {
              navigator.clipboard.writeText(
                `Current weather in ${userLocation}: ${Math.round(weatherData.main.temp)}°C, ${weatherData.weather[0].description}`
              );
              setCopiedId("weather");
              setTimeout(() => setCopiedId(null), 1000);
            }
          },
        },
        {
          id: "currency",
          name: "Convert currency",
          description: "Try: 100 usd to eur",
          icon: HiCurrencyDollar,
          action: () => setSearchQuery("100 usd to eur"),
        },
        aiCommand,
      ],
    };

    const projectCommands = {
      name: "Recent Projects",
      commands: [
        {
          id: "visit-radio-globe",
          name: "Radio Globe",
          icon: HiCodeBracket,
          action: () =>
            window.open("https://radio.prateekkeshari.com", "_blank"),
        },
        {
          id: "visit-time",
          name: "Time",
          icon: HiCodeBracket,
          action: () =>
            window.open("https://time.prateekkeshari.com", "_blank"),
        },
        {
          id: "visit-scoop",
          name: "Scoop",
          icon: HiCodeBracket,
          action: () =>
            window.open("https://scoop.prateekkeshari.com", "_blank"),
        },
        {
          id: "visit-mockmint",
          name: "Mockmint",
          icon: HiCodeBracket,
          action: () =>
            window.open("https://mockmint.prateekkeshari.com", "_blank"),
        },
        {
          id: "visit-peek",
          name: "Peek AI",
          icon: HiCodeBracket,
          action: () =>
            window.open("https://prateekkeshari.gumroad.com/l/peek", "_blank"),
        },
      ],
    };

    const navigationCommands = {
      name: "Visit",
      commands: [
        {
          id: "visit-gyg",
          name: "GetYourGuide",
          icon: HiGlobeAlt,
          action: () => window.open("https://www.getyourguide.com", "_blank"),
        },
        {
          id: "visit-linkedin",
          name: "LinkedIn",
          icon: HiGlobeAlt,
          action: () =>
            window.open("https://linkedin.com/in/prateekkeshari", "_blank"),
        },
        {
          id: "visit-github",
          name: "GitHub",
          icon: HiGlobeAlt,
          action: () =>
            window.open("https://github.com/prateekkeshari", "_blank"),
        },
        {
          id: "visit-twitter",
          name: "Twitter",
          icon: HiGlobeAlt,
          action: () => window.open("https://twitter.com/prkeshari", "_blank"),
        },
        {
          id: "visit-threads",
          name: "Threads",
          icon: HiGlobeAlt,
          action: () =>
            window.open("https://www.threads.net/@prateekkeshari", "_blank"),
        },
      ],
    };

    const contactCommands = {
      name: "Contact",
      commands: [
        {
          id: "send-email",
          name: "Send email",
          icon: HiEnvelope,
          action: () => window.open("mailto:hi@prateekkeshari.com", "_blank"),
        },
        {
          id: "copy-email",
          name: "Copy email",
          icon: HiEnvelope,
          action: async () => {
            await navigator.clipboard.writeText("hi@prateekkeshari.com");
            setCopiedId("copy-email");
            setTimeout(() => setCopiedId(null), 1000);
          },
        },
      ],
    };

    const copyCommands = {
      name: "Details",
      commands: [
        {
          id: "copy-about",
          name: "Copy bio",
          icon: HiDocumentText,
          action: async () => {
            await navigator.clipboard.writeText(aboutText);
            setCopiedId("copy-about");
            setTimeout(() => setCopiedId(null), 1000);
          },
        },
        {
          id: "copy-image",
          name: "Copy profile picture",
          icon: HiPhoto,
          action: async () => {
            const imageUrl = isDarkMode ? profilePic : profilePicLight;
            const success = await copyImageToClipboard(imageUrl);
            if (success) {
              setCopiedId("copy-image");
              setTimeout(() => setCopiedId(null), 1000);
            }
          },
        },
      ],
    };

    return [
      appearanceCommands,
      essentialCommands,
      projectCommands,
      navigationCommands,
      contactCommands,
      copyCommands,
    ];
  }, [
    isDarkMode,
    setIsDarkMode,
    fontFamily,
    setFontFamily,
    aboutText,
    weatherData,
    userLocation,
  ]);

  // Update the existing filteredCommands logic to include both AI fallback and debug commands
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
                resetEasterEggs();
                setIsOpen(false);
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

    // If no commands found and there's a search query, show AI response
    if (filteredGroups.length === 0 && searchQuery.trim()) {
      return [
        {
          name: "AI Assistant",
          commands: [
            {
              id: "gemini-input",
              name: "",
              description: (
                <div className="flex flex-col w-full space-y-3">
                  <div className="flex items-start space-x-3">
                    <HiSparkles
                      className={`
                      w-5 h-5 mt-1 flex-shrink-0
                      ${
                        isGeminiLoading
                          ? "animate-pulse text-[#D94E1E]"
                          : geminiResponse
                            ? "text-green-500"
                            : "text-[#D94E1E]"
                      }
                    `}
                    />
                    <div
                      className={`
                    text-left text-base prose prose-sm max-w-none flex-1
                    ${isDarkMode ? "dark:prose-invert" : "prose-gray"}
                  `}
                    >
                      {geminiResponse ? (
                        <div className="space-y-2">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => (
                                <p
                                  className={`my-1 text-left ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
                                >
                                  {children}
                                </p>
                              ),
                              ul: ({ children }) => (
                                <ul
                                  className={`my-1 list-disc pl-4 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
                                >
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol
                                  className={`my-1 list-decimal pl-4 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
                                >
                                  {children}
                                </ol>
                              ),
                              li: ({ children }) => (
                                <li
                                  className={`my-1 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
                                >
                                  {children}
                                </li>
                              ),
                              code: ({ children }) => (
                                <code
                                  className={`
                                rounded px-1 py-0.5
                                ${isDarkMode ? "bg-gray-800/30 text-gray-200" : "bg-gray-100 text-gray-800"}
                              `}
                                >
                                  {children}
                                </code>
                              ),
                            }}
                          >
                            {geminiResponse}
                          </ReactMarkdown>

                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={async (e) => {
                                e.stopPropagation();
                                await navigator.clipboard.writeText(
                                  geminiResponse
                                );
                                setCopiedId("gemini-copy");
                                setTimeout(() => setCopiedId(null), 1000);
                              }}
                              className={`
                              flex items-center gap-1.5 px-1.5 py-0.5 rounded text-xs
                              ${isDarkMode ? "bg-white/5" : "bg-black/5"}
                              ${
                                copiedId === "gemini-copy"
                                  ? isDarkMode
                                    ? "text-green-400"
                                    : "text-green-600"
                                  : isDarkMode
                                    ? "text-gray-400"
                                    : "text-gray-500"
                              }
                              transition-colors duration-200
                            `}
                            >
                              {copiedId === "gemini-copy" ? (
                                <HiCheck className="w-3 h-3" />
                              ) : (
                                <HiClipboard className="w-3 h-3" />
                              )}
                              {copiedId === "gemini-copy" ? "Copied" : "Copy"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span
                          className={`block text-left ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          Press Enter to ask AI about "{searchQuery}"
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ),
              action: async () => {
                if (!searchQuery.trim()) return;

                setIsGeminiLoading(true);
                try {
                  const response = await generateContent(searchQuery);
                  const cleanResponse = response.trim();
                  setGeminiResponse(cleanResponse);
                } catch (error) {
                  setGeminiResponse(
                    "Sorry, I encountered an error. Please try again."
                  );
                }
                setIsGeminiLoading(false);
              },
            },
          ],
        },
      ];
    }

    return filteredGroups;
  }, [
    calculationResult,
    currencyCommand,
    timeCommands,
    searchQuery,
    commandGroups,
    geminiResponse,
    isGeminiLoading,
    isDarkMode,
    copiedId,
    resetEasterEggs,
    setIsOpen,
  ]);

  // Add ref for the commands list container
  const commandsListRef = React.useRef(null);

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

  // Add this helper function to get flattened commands
  const getFlattenedCommands = (groups) => {
    let flattenedCommands = [];
    let groupIndexMap = new Map(); // Maps command index to its group index

    groups.forEach((group, groupIndex) => {
      group.commands.forEach((command) => {
        flattenedCommands.push(command);
        groupIndexMap.set(flattenedCommands.length - 1, groupIndex);
      });
    });

    return { flattenedCommands, groupIndexMap };
  };

  // Update the keyboard navigation useEffect
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // Only handle Escape and Arrow keys here
      switch (e.key) {
        case "Escape":
          setIsOpen(false);
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
  }, [isOpen, setIsOpen]);

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

    if (isOpen) {
      fetchWeather();
    }
  }, [isOpen, userLocation]);

  // Add click outside handler
  const commandPaletteRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        commandPaletteRef.current &&
        !commandPaletteRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  // Add this useEffect after the other fetch effects
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        if (!response.ok) throw new Error("Exchange rates fetch failed");
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    if (isOpen) {
      fetchRates();
    }
  }, [isOpen]);

  // Update handleMouseMove to work with flat index
  const handleMouseMove = (groupIndex, commandIndex) => {
    let flatIndex = 0;
    for (let i = 0; i < groupIndex; i++) {
      flatIndex += filteredCommands[i].commands.length;
    }
    flatIndex += commandIndex;
    setSelectedIndex(flatIndex);
  };

  // Add cleanup for security counters when palette closes
  useEffect(() => {
    if (!isOpen) {
      setGeminiResponse("");
      setIsGeminiLoading(false);
      setRequestCount(0);
      setLastRequestTime(Date.now());
    }
  }, [isOpen]);

  // Improved AI chat trigger
  const handleAICommand = async (query) => {
    if (query.startsWith("@") && !discoveredEggs.AI_CHAT) {
      discoverEgg("AI_CHAT");
    }
    // Rest of AI handling...
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - removed slide animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Main container - removed slide animation, keeping fade and scale */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh]">
            <motion.div
              ref={commandPaletteRef}
              className="w-full max-w-2xl mx-4"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className={`
                ${
                  isDarkMode
                    ? "bg-black/90 border-gray-800/50"
                    : "bg-white/90 border-gray-200/50"
                } 
                rounded-2xl border shadow-2xl backdrop-blur-xl overflow-hidden
                ring-1 ring-gray-800/5
              `}
              >
                {/* Search input with ESC indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`
                    p-4 border-b 
                    ${isDarkMode ? "border-gray-800/50" : "border-gray-200/50"}
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
                        ${isDarkMode ? "text-white" : "text-gray-900"}
                        placeholder-gray-400 text-lg
                        py-1 sm:py-0
                      `}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();

                          // Get all commands in a flat array
                          const allCommands = filteredCommands.reduce(
                            (acc, group) => {
                              return [...acc, ...group.commands];
                            },
                            []
                          );

                          // Execute selected command if it exists
                          if (allCommands.length > 0) {
                            const commandToExecute = allCommands[selectedIndex];
                            if (commandToExecute?.action) {
                              commandToExecute.action();
                              if (commandToExecute.closeOnExecute) {
                                setIsOpen(false);
                              }
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
                        ${
                          isDarkMode
                            ? "bg-gray-800 text-gray-400"
                            : "bg-gray-200 text-gray-500"
                        }
                      `}
                      >
                        ESC
                      </kbd>
                    </div>
                  </div>
                </motion.div>

                {/* Commands list with groups */}
                <motion.div
                  ref={commandsListRef}
                  className="max-h-[60vh] overflow-y-auto overflow-x-hidden"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                >
                  {filteredCommands.map((group, groupIndex) => (
                    <div key={group.name} className="mb-4">
                      {/* Group header */}
                      <div
                        className={`
                        px-4 sm:px-6 py-2 text-xs font-medium tracking-wider
                        ${isDarkMode ? "text-gray-400" : "text-gray-500"}
                      `}
                      >
                        {group.name.toUpperCase()}
                      </div>

                      {/* Group commands */}
                      {group.commands.map((command, index) => (
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
                            ${
                              copiedId === command?.id
                                ? isDarkMode
                                  ? "bg-green-500/20"
                                  : "bg-green-50"
                                : isDarkMode
                                  ? index === selectedIndex &&
                                    groupIndex === selectedGroupIndex
                                    ? "bg-gray-800/50"
                                    : "hover:bg-gray-800/50"
                                  : index === selectedIndex &&
                                      groupIndex === selectedGroupIndex
                                    ? "bg-black/[0.03]"
                                    : "hover:bg-black/[0.03]"
                            }
                          `}
                        >
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0 w-full">
                            {command?.icon && (
                              <div
                                className={`
                                p-1.5 rounded-lg flex-shrink-0 flex items-center justify-center
                                w-8 h-8
                                ${
                                  copiedId === command?.id
                                    ? isDarkMode
                                      ? "bg-green-500/20 text-green-400"
                                      : "bg-green-100 text-green-600"
                                    : isDarkMode
                                      ? "bg-gray-800/50 text-gray-400 group-hover:text-gray-300"
                                      : "bg-gray-100/50 text-gray-500 group-hover:text-gray-600"
                                }
                                transition-colors
                              `}
                              >
                                {typeof command.icon === "function" ? (
                                  command.icon({ className: "w-4 h-4" })
                                ) : (
                                  <command.icon className="w-4 h-4" />
                                )}
                              </div>
                            )}
                            <div className="flex flex-col min-w-0 flex-1">
                              <span
                                className={`
                                font-medium text-base text-left
                                ${
                                  copiedId === command?.id
                                    ? isDarkMode
                                      ? "text-green-400"
                                      : "text-green-600"
                                    : isDarkMode
                                      ? "text-white"
                                      : "text-gray-900"
                                }
                              `}
                              >
                                {copiedId === command?.id
                                  ? "Copied"
                                  : command?.name}
                              </span>
                              {command?.description && (
                                <span
                                  className={`
                                  text-sm text-left
                                  ${
                                    copiedId === command?.id
                                      ? isDarkMode
                                        ? "text-green-400/70"
                                        : "text-green-600/70"
                                      : "text-gray-500 group-hover:text-gray-400"
                                  }
                                `}
                                >
                                  {command.description}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ))}

                  {filteredCommands.length === 0 && (
                    <div className="px-6 py-12 text-left">
                      <span
                        className={`
                        text-lg font-medium
                        ${isDarkMode ? "text-gray-400" : "text-gray-500"}
                      `}
                      >
                        No commands found
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;
