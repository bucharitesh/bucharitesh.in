import { useEffect, useState } from "react";
import { HiSparkles, HiCheck, HiClipboard } from "react-icons/hi2";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { CommandGroup } from "../types";

// Constants and configurations
const MAX_REQUESTS_PER_MINUTE = 10;
const MAX_TOKENS = 250;
const BLOCKED_KEYWORDS = ["hack", "exploit", "attack", "malware", "password"];

const TECH_JOKES = [
  "Running git commit -m 'thinking hard'...",
  "npm installing brain.js...",
  "Compiling witty responses in O(1)...",
  "await Promise.resolve(clever_answer)...",
  "Converting caffeine to code...",
  "Checking StackOverflow just in case...",
  "sudo generate smart_response...",
  "Rehydrating my component state...",
  "yarn add intelligence@latest",
  "Fighting with TypeScript errors...",
  "docker run thinking-container...",
  "webpack bundling thoughts...",
  "prettier --write response...",
  "jest --watchAll brain-cells",
];

const PERSONALITY_CONTEXT = `
You are an AI Assistant with a quick wit and smart humor, integrated into Ritesh Bucha's portfolio website. You help visitors learn about Ritesh while keeping them entertained.

About Ritesh:
Professional:
- Lead Frontend Developer at Flam, Bengaluru
- Expert in React, TypeScript, and Frontend Architecture
- Over 5 years of experience in frontend development
- Currently building and scaling Flam's web platform

Current Work (Flam):
- Leading frontend development at Flam (flam.id)
- Building next-gen social platform with AR/VR experiences
- Managing frontend architecture and team
- Tech stack: React, TypeScript, Next.js, ThreeJS

Notable Projects:
- Command Menu - A powerful search interface (like this one!)
- Portfolio Website - Modern, responsive personal site
- Gitstats - GitHub analytics dashboard
- [Add more of your projects here]

Technical Skills:
- Frontend: React, TypeScript, Next.js, ThreeJS
- State Management: Redux, Zustand
- Styling: Tailwind CSS, Styled Components
- Tools: Git, Webpack, Vite
- Testing: Jest, React Testing Library

Education:
- [Add your education details]

Contact:
- Email: [your email]
- GitHub: [your GitHub]
- LinkedIn: [your LinkedIn]
- Portfolio: [your website]

Interests:
- Open Source Development
- UI/UX Design
- Web Performance Optimization
- [Add your other interests]

Style Guide:
1. Be smart and witty, but keep answers concise
2. For simple questions (math/facts), give direct answers with a touch of humor
3. Use clever tech puns and programming humor when relevant
4. Mix technical accuracy with entertaining responses
5. Keep the tone friendly and engaging
6. Use minimal emojis for emphasis (max 1 per response)

Example Responses:
Project: "Ah, the Command Menu! It's one of Ritesh's favorite creations - think Spotlight search meets React, but cooler than a CSS-in-JS theme 😎"
Work: "At Flam, Ritesh is architecting the frontend like a master builder - turning complex AR/VR experiences into smooth user interactions."
Skills: "React and TypeScript are just the beginning. Ritesh's tech stack is more diverse than a node_modules folder!"

Remember:
- Keep responses smart and engaging
- Mix humor with helpful information
- Stay focused on Ritesh's expertise
- Make tech-savvy visitors smile
- Reference specific projects and experiences when relevant
- Provide contact information when asked
`;

interface GeminiCommandProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Initialize Gemini with safety settings
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export const useGeminiCommand = ({
  searchQuery,
  setSearchQuery,
}: GeminiCommandProps): CommandGroup => {
  const [response, setResponse] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [requestCount, setRequestCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState(Date.now());
  const [thinkingMessage, setThinkingMessage] = useState(
    () => TECH_JOKES[Math.floor(Math.random() * TECH_JOKES.length)]
  );

  // Reset response when search query changes
  useEffect(() => {
    setResponse("");
    setDisplayedResponse("");
    setIsLoading(false);
  }, [searchQuery]);

  // Text animation effect
  useEffect(() => {
    if (!response) return;

    let index = 0;
    const getRandomDelay = () => Math.random() * 10 + 15;

    const intervalId = setInterval(() => {
      if (index <= response.length) {
        setDisplayedResponse(response.slice(0, index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, getRandomDelay());

    return () => clearInterval(intervalId);
  }, [response]);

  // Rotate thinking messages
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setThinkingMessage(
        TECH_JOKES[Math.floor(Math.random() * TECH_JOKES.length)]
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  const generateContent = async (userPrompt: string) => {
    try {
      // Rate limiting
      const now = Date.now();
      if (now - lastRequestTime < 60000) {
        if (requestCount >= MAX_REQUESTS_PER_MINUTE) {
          return "Whoa! My CPU is running hot. Give me a moment to cool down! 🌡️";
        }
        setRequestCount((prev) => prev + 1);
      } else {
        setRequestCount(1);
        setLastRequestTime(now);
      }

      // Input validation
      if (userPrompt.length > 500) {
        return "That's quite a long script! Could you refactor it to be a bit shorter? 📝";
      }

      if (
        BLOCKED_KEYWORDS.some((keyword) =>
          userPrompt.toLowerCase().includes(keyword)
        )
      ) {
        return "I keep my responses as clean as a linter-approved codebase! 🛡️";
      }

      // Check if it's a simple math expression
      if (/^[\d\s+\-*/%()]+$/.test(userPrompt.trim())) {
        try {
          const result = eval(userPrompt).toString();
          return `${result} (calculated faster than a webhook response! 😉)`;
        } catch {
          // If eval fails, proceed with normal processing
        }
      }

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
        safetySettings,
      });

      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              { text: `${PERSONALITY_CONTEXT}\n\nUser Query: ${userPrompt}` },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: MAX_TOKENS,
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        },
      });

      let responseText = result.response.text().trim();

      // Clean up response formatting
      responseText = responseText
        .replace(/^\d+\.\s+/gm, "")
        .replace(/^[-*•]\s+/gm, "")
        .replace(/\\n/g, "\n")
        .replace(/\n\n+/g, "\n\n")
        .trim();

      return responseText;
    } catch (error) {
      console.error("Error generating content:", error);
      return "Oops! Even AI has its moments. Let me try that again! 🔄";
    }
  };

  const ThinkingAnimation = () => (
    <div className="flex flex-col space-y-2 items-start text-gray-500 dark:text-gray-400">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Computing</span>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
      </div>
      <span className="text-xs italic font-mono">{thinkingMessage}</span>
    </div>
  );

  const EmptyState = () => <>Get AI Assistant for any questions</>;

  return {
    name: "AI Assistant",
    commands: [
      {
        id: "gemini-input",
        name: searchQuery.startsWith("@")
          ? `Ask: "${searchQuery.replace(/^@\s*/, "").trim()}"`
          : "Ask AI",
        description: (
          <div className="flex flex-col space-y-2">
            {!response && !isLoading ? (
              <EmptyState />
            ) : (
              <>
                {isLoading ? (
                  <ThinkingAnimation />
                ) : (
                  <pre className="whitespace-pre-wrap break-words text-gray-700 dark:text-gray-200 text-sm">
                    {displayedResponse}
                  </pre>
                )}
                {response && !isLoading && (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        await navigator.clipboard.writeText(response);
                        setCopiedId("gemini-copy");
                        setTimeout(() => setCopiedId(null), 1000);
                      }}
                      className="flex items-center gap-1.5 px-1.5 py-0.5 rounded text-xs bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors duration-200"
                    >
                      {copiedId === "gemini-copy" ? (
                        <HiCheck className="w-3 h-3" />
                      ) : (
                        <HiClipboard className="w-3 h-3" />
                      )}
                      {copiedId === "gemini-copy" ? "Copied" : "Copy"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ),
        icon: HiSparkles,
        action: async () => {
          // If search is empty or doesn't start with @, set it to @ and return
          if (!searchQuery || !searchQuery.startsWith("@")) {
            setSearchQuery("@");
            return;
          }

          // Trim @ from the start of the query
          const cleanQuery = searchQuery.replace(/^@\s*/, "").trim();

          if (!cleanQuery) {
            setResponse(
              "Ask me anything about development, tech, or general questions!"
            );
            return;
          }

          setIsLoading(true);
          setResponse("");
          setDisplayedResponse("");

          try {
            const generatedResponse = await generateContent(cleanQuery);
            setResponse(generatedResponse.trim());
          } catch (error) {
            setResponse(
              "Encountered a runtime error. Let me reboot my neural nets! 🔄"
            );
          }

          setIsLoading(false);
        },
      },
    ],
  };
};
