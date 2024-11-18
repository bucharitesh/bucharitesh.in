import { useTheme } from "next-themes";
import { HiSun, HiMoon } from "react-icons/hi2";
import { CommandGroup } from "../types";

export const useThemeCommand = (): CommandGroup => {
  const { theme, setTheme } = useTheme();

  return {
    name: "Appearance",
    commands: [
      {
        id: "theme",
        name: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
        description: `Currently in ${theme === "dark" ? "dark" : "light"} mode`,
        icon: theme === "dark" ? HiSun : HiMoon,
        action: () => setTheme(theme === "light" ? "dark" : "light"),
      },
    ],
  };
};
