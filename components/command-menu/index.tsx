"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { DialogProps } from "@radix-ui/react-dialog";
import { HiOutlineCommandLine, HiCalculator } from "react-icons/hi2";
import { motion } from "framer-motion";
import {
  CommandDialog,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/ui/command";

// Import command hooks
import { useThemeCommand } from "./apps/theme-command";
import { useCalculatorCommand } from "./apps/calculator";
import { useTimeCommand } from "./apps/time";
import { useWeatherCommand } from "./apps/weather";
import { useCurrencyCommand } from "./apps/currency";
import { useGeminiCommand } from "./apps/gemini";

export function CommandMenu({ ...props }: DialogProps) {
  // State management
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const commandsListRef = useRef<HTMLDivElement>(null);

  // Initialize command hooks
  const themeCommands = useThemeCommand();
  const calculatorCommands = useCalculatorCommand({
    searchQuery,
    setSearchQuery,
  });
  const timeCommands = useTimeCommand({ searchQuery, setSearchQuery });
  const weatherCommands = useWeatherCommand();
  const currencyCommands = useCurrencyCommand({ searchQuery, setSearchQuery });
  const geminiCommands = useGeminiCommand({
    searchQuery,
    setSearchQuery,
  });

  // Filter and organize commands based on search query and active results
  const filteredCommands = useMemo(() => {
    // Handle calculator results
    if (calculatorCommands.name === "Result") {
      return [calculatorCommands];
    }

    // Handle time results
    const timeResults = timeCommands.commands.filter((cmd) =>
      cmd.id.startsWith("time-")
    );
    if (timeResults.length > 0) {
      return [
        {
          name: "Time",
          commands: timeResults,
        },
      ];
    }

    // Handle currency results
    const currencyResults = currencyCommands.commands.filter(
      (cmd) => cmd.id === "currency-conversion"
    );
    if (currencyResults.length > 0) {
      return [
        {
          name: "Currency",
          commands: currencyResults,
        },
      ];
    }

    // Show all commands when no search query
    if (!searchQuery) {
      return [
        themeCommands,
        {
          name: "Tools",
          commands: [
            ...calculatorCommands.commands,
            ...timeCommands.commands.slice(0, 1),
            ...weatherCommands.commands,
            ...currencyCommands.commands.slice(0, 1),
            ...geminiCommands.commands.slice(0, 1),
          ],
        },
      ];
    }

    // Filter commands based on search
    const filteredGroups = [
      themeCommands,
      calculatorCommands,
      timeCommands,
      weatherCommands,
      currencyCommands,
      geminiCommands,
    ]
      .map((group) => ({
        name: group.name,
        commands: group.commands.filter(
          (command) =>
            command.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            command.description
              ?.toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((group) => group.commands.length > 0);

    // If no matches found and there's a search query, show AI response
    if (filteredGroups.length === 0 && searchQuery.trim()) {
      return [geminiCommands];
    }

    return filteredGroups;
  }, [
    searchQuery,
    calculatorCommands,
    timeCommands,
    currencyCommands,
    themeCommands,
    weatherCommands,
    geminiCommands,
  ]);

  // Helper functions
  const getAllCommands = () => {
    return filteredCommands.reduce(
      (acc, group) => [...acc, ...group.commands],
      [] as any[]
    );
  };

  const scrollSelectedIntoView = (index: number) => {
    if (!commandsListRef.current) return;

    const commandElements = commandsListRef.current.children;
    if (commandElements[index]) {
      commandElements[index].scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  };

  const handleMouseMove = (groupIndex: number, commandIndex: number) => {
    let flatIndex = 0;
    for (let i = 0; i < groupIndex; i++) {
      flatIndex += filteredCommands[i].commands.length;
    }
    flatIndex += commandIndex;
    setSelectedIndex(flatIndex);
  };

  // Keyboard shortcuts for opening/closing
  useEffect(() => {
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

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const allCommands = getAllCommands();

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < allCommands.length - 1 ? prev + 1 : prev
          );
          scrollSelectedIntoView(selectedIndex + 1);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          scrollSelectedIntoView(selectedIndex - 1);
          break;
        }
        case "Enter": {
          e.preventDefault();
          const commandToExecute = allCommands[selectedIndex];
          if (commandToExecute?.action) {
            commandToExecute.action();
          }
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, selectedIndex]);

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen} {...props}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 border-b"
      >
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-900/5">
          {calculatorCommands.name === "Result" ? (
            <HiCalculator className="w-5 h-5 text-gray-400" />
          ) : (
            <HiOutlineCommandLine className="w-5 h-5 text-gray-400" />
          )}
          <input
            type="text"
            placeholder={
              calculatorCommands.name === "Result"
                ? "Calculate anything..."
                : "Type a command or search..."
            }
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-lg py-1 sm:py-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const allCommands = getAllCommands();
                if (allCommands.length > 0) {
                  const commandToExecute = allCommands[selectedIndex];
                  if (commandToExecute?.action) {
                    commandToExecute.action();
                  }
                }
              }
            }}
            autoFocus
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:flex items-center justify-center px-2 py-1 text-xs font-medium rounded">
              ESC
            </kbd>
          </div>
        </div>
      </motion.div>

      <CommandList ref={commandsListRef}>
        <CommandEmpty>No results found.</CommandEmpty>
        {filteredCommands.map((group, groupIndex) => (
          <CommandGroup key={group.name} className="mb-4">
            <div className="px-4 sm:px-6 py-2 text-xs font-medium tracking-wider">
              {group.name.toUpperCase()}
            </div>
            {group.commands.map((command, index) => (
              <CommandItem asChild key={command.id}>
                <motion.button
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  onClick={() => {
                    if (
                      command.id === "gemini-input" &&
                      (!searchQuery || !searchQuery.startsWith("@"))
                    ) {
                      setSearchQuery("@");
                    } else {
                      command.action();
                    }
                  }}
                  onMouseMove={() => handleMouseMove(groupIndex, index)}
                  className={`
                    w-full px-4 sm:px-6 py-3 flex items-center
                    group transition-all duration-75
                  `}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 w-full">
                    {command.icon && (
                      <div className="p-1.5 rounded-lg flex-shrink-0 flex items-center justify-center w-8 h-8 transition-colors">
                        {React.createElement(command.icon, {
                          className: "w-4 h-4",
                        })}
                      </div>
                    )}
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-medium text-base text-left">
                        {command.name}
                      </span>
                      {command.description && (
                        <div className="text-sm text-left text-gray-500 dark:text-gray-400">
                          {command.description}
                        </div>
                      )}
                    </div>
                    {command.rightIcon && (
                      <div className="flex-shrink-0">
                        {React.createElement(command.rightIcon, {
                          className: "w-4 h-4",
                        })}
                      </div>
                    )}
                  </div>
                </motion.button>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}