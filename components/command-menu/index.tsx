"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DialogProps } from "@radix-ui/react-dialog";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

// Import command hooks
import { useThemeCommand } from "./apps/theme-command";
import { useCalculatorCommand } from "./apps/calculator";
import { useTimeCommand } from "./apps/time";
import { useWeatherCommand } from "./apps/weather";
import { useCurrencyCommand } from "./apps/currency";
import { useGeminiCommand } from "./apps/gemini";
import { useSocialsCommand } from "./apps/socials";
import { cn } from "@/lib/utils";

export function CommandMenu({ ...props }: DialogProps) {
  // State management
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

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
  const socialsCommands = useSocialsCommand({ setOpen });

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
        socialsCommands,
      ];
    }

    // Filter commands based on search
    const filteredGroups = [
      themeCommands,
      socialsCommands,
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
    socialsCommands,
  ]);

  // Helper functions
  const getAllCommands = () => {
    return filteredCommands.reduce(
      (acc, group) => [...acc, ...group.commands],
      [] as any[]
    );
  };

  // const scrollSelectedIntoView = (index: number) => {
  //   if (!commandsListRef.current) return;

  //   const commandElements = commandsListRef.current.children;
  //   if (commandElements[index]) {
  //     commandElements[index].scrollIntoView({
  //       block: "nearest",
  //       behavior: "smooth",
  //     });
  //   }
  // };

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
      switch (e.key) {
        case "Escape":
          setOpen(false);
          break;
        case "ArrowDown":
          e.preventDefault();
          const allCommands = getAllCommands();
          setSelectedIndex((prev) => {
            const newIndex = (prev + 1) % allCommands.length;
            // scrollSelectedIntoView(newIndex);
            return newIndex;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          const commands = getAllCommands();
          setSelectedIndex((prev) => {
            const newIndex = prev - 1 < 0 ? commands.length - 1 : prev - 1;
            // scrollSelectedIntoView(newIndex);
            return newIndex;
          });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, getAllCommands]);

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Render component
  return (
    <CommandDialog open={open} onOpenChange={setOpen} {...props}>
      <CommandInput
        placeholder={
          calculatorCommands.name === "Result"
            ? "Calculate anything..."
            : "Type a command or search..."
        }
        className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-lg py-1 sm:py-0"
        value={searchQuery}
        onValueChange={(value) => setSearchQuery(value)}
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
      <CommandList className="min-h-80">
        {filteredCommands.map((group, groupIndex) => (
          <CommandGroup key={group.name} heading={group.name}>
            {group.commands.map((command, index) => (
              <CommandItem key={command.id} asChild>
                <button
                  onClick={() => {
                    if (command.id === "gemini-input" && !searchQuery) {
                      setSearchQuery("@");
                    } else {
                      command.action();
                    }
                  }}
                  onMouseMove={() => handleMouseMove(groupIndex, index)}
                  className={cn(
                    `relative w-full flex items-center group transition-all duration-75 cursor-pointer`
                  )}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 w-full relative z-10">
                    {command.icon && (
                      <div
                        className={cn(
                          "rounded-lg flex-shrink-0 flex items-center justify-center w-8 h-8 transition-colors",
                          "bg-gray-300/60 text-gray-600/50 dark:bg-gray-600/50 dark:text-white"
                        )}
                      >
                        {React.createElement(command.icon, {
                          className: "w-4 h-4",
                        })}
                      </div>
                    )}
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className={cn("font-medium text-base text-left")}>
                        {command.name}
                      </span>
                      {command.description && (
                        <div className={cn("text-sm text-left text-gray-500")}>
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
                </button>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent
        noClose
        className="overflow-hidden p-0 max-w-2xl border-neutral-700"
      >
        <VisuallyHidden asChild>
          <DialogTitle>Command Menu</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden asChild>
          <DialogDescription>
            Search for commands and tools
          </DialogDescription>
        </VisuallyHidden>
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
};


function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "pointer-events-none flex h-5 min-w-6 items-center justify-center gap-1 rounded-sm bg-black/5 px-1 font-sans text-[13px] font-normal text-muted-foreground shadow-[inset_0_-1px_2px] shadow-black/10 select-none dark:bg-white/10 dark:shadow-white/10 dark:text-shadow-xs [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  );
}