import { HiLanguage } from "react-icons/hi2";
import { useState } from "react";
import { CommandGroup } from "../types";

interface TranslateCommandProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useTranslateCommand = ({
  searchQuery,
  setSearchQuery,
}: TranslateCommandProps): CommandGroup => {
  const [lastTranslation, setLastTranslation] = useState<string | null>(null);

  const translateText = async (text: string, targetLang: string) => {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang }),
      });
      const data = await response.json();
      setLastTranslation(data.translatedText);
      return data.translatedText;
    } catch (error) {
      console.error("Translation failed:", error);
      return null;
    }
  };

  const parseTranslateQuery = (query: string) => {
    const match = query.match(/translate\s+"([^"]+)"\s+to\s+(\w+)/i);
    if (match) {
      const [_, text, language] = match;
      return {
        text,
        language: language.toLowerCase(),
      };
    }
    return null;
  };

  const translation = parseTranslateQuery(searchQuery);

  return {
    name: "Translate",
    commands: translation
      ? [
          {
            id: "translate-result",
            name: lastTranslation || "Translating...",
            description: `Original: "${translation.text}"`,
            icon: HiLanguage,
            action: async () => {
              const result = await translateText(
                translation.text,
                translation.language
              );
              if (result) {
                await navigator.clipboard.writeText(result);
              }
            },
          },
        ]
      : [
          {
            id: "translate",
            name: "Translate text",
            description: 'Try: translate "hello world" to spanish',
            icon: HiLanguage,
            action: () => setSearchQuery('translate "hello world" to spanish'),
          },
        ],
  };
};
