export interface UseItem {
  name: string
  description: string
  link: string
}

// Define the type for a category of uses
export interface UseCategory {
  title: string
  children: UseItem[]
}

// Define the props type for the UsesPreview component
export interface UsesPreviewProps {
  item: UseCategory
}

export const USES: UseCategory[] = [
  {
    title: "Apps - Work & Productivity",
    children: [
      {
        name: "Visual Studio Code",
        description: "Code editor",
        link: "https://code.visualstudio.com/",
      },
      {
        name: "iTerm2",
        description: "Terminal emulator with Oh My Zsh",
        link: "https://iterm2.com/",
      },
      {
        name: "Google Chrome",
        description: "Browser for browsing and development",
        link: "https://www.google.com/chrome/",
      },
      {
        name: "Slack",
        description: "Work communication tool",
        link: "https://slack.com/",
      },
      {
        name: "Notion",
        description: "Personal and work knowledge base",
        link: "https://www.notion.so/",
      },
      {
        name: "Figma",
        description: "Design tool",
        link: "https://www.figma.com/",
      },
      {
        name: "Raycast",
        description: "Spotlight on steroids",
        link: "https://www.raycast.com/",
      },
      {
        name: "Discord",
        description: "For gaming and community",
        link: "https://discord.com/",
      },
      {
        name: "Hoppscotch",
        description: "Lightweight API tool",
        link: "https://hoppscotch.io/",
      },
      {
        name: "Homebrew",
        description: "Package manager for macOS",
        link: "https://brew.sh/",
      },
    ],
  },
  {
    title: "VS Code Extensions",
    children: [
      {
        name: "Auto Rename Tag",
        description: "Automatically rename paired HTML/XML tags",
        link: "https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag",
      },
      {
        name: "Better Comments",
        description: "Improve your code commenting",
        link: "https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments",
      },
      {
        name: "Code Spell Checker",
        description: "Spelling checker for source code",
        link: "https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker",
      },
      {
        name: "Comment Divider",
        description: "Divide your code with custom comments",
        link: "https://marketplace.visualstudio.com/items?itemName=stackbreak.comment-divider",
      },
      {
        name: "Error Lens",
        description:
          "Improve highlighting of errors, warnings and other language diagnostics",
        link: "https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens",
      },
      {
        name: "ES7+ React/Redux/React-Native snippets",
        description: "JavaScript and React/Redux snippets",
        link: "https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets",
      },
      {
        name: "GitHub Copilot",
        description: "AI pair programmer",
        link: "https://marketplace.visualstudio.com/items?itemName=GitHub.copilot",
      },
      {
        name: "GitHub Copilot Chat",
        description: "AI chat interface for GitHub Copilot",
        link: "https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat",
      },
      {
        name: "GitLens",
        description: "Supercharge Git within VS Code",
        link: "https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens",
      },
      {
        name: "Import Cost",
        description: "Display import/require package size",
        link: "https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost",
      },
      {
        name: "JavaScript (ES6) code snippets",
        description: "Code snippets for JavaScript in ES6 syntax",
        link: "https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets",
      },
      {
        name: "Markdown All in One",
        description: "All you need to write Markdown",
        link: "https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one",
      },
      {
        name: "Material Icon Theme",
        description: "Material Design Icons for Visual Studio Code",
        link: "https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme",
      },
      {
        name: "One Dark Pro",
        description: "Atom's iconic One Dark theme",
        link: "https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme",
      },
      {
        name: "Sort lines",
        description: "Sort lines of text",
        link: "https://marketplace.visualstudio.com/items?itemName=Tyriar.sort-lines",
      },
      {
        name: "SVG",
        description: "SVG Coding, Minify, Pretty, Preview All-In-One",
        link: "https://marketplace.visualstudio.com/items?itemName=jock.svg",
      },
      {
        name: "Pretty TypeScript Errors",
        description: "Make TypeScript errors prettier and more human-readable",
        link: "https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors",
      },
      {
        name: "i18n Ally",
        description: "All in one i18n extension for VS Code",
        link: "https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally",
      },
      {
        name: "WakaTime",
        description:
          "Metrics, insights, and time tracking automatically generated from your programming activity",
        link: "https://marketplace.visualstudio.com/items?itemName=WakaTime.vscode-wakatime",
      },
      {
        name: "Turbo Console Log",
        description:
          "Automating the process of writing meaningful log messages",
        link: "https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log",
      },
    ],
  },
  {
    title: "Setup - Work",
    children: [
      {
        name: "MacBook Pro 13-inch, M2, 2022",
        description: "My work laptop",
        link: "https://www.apple.com/macbook-pro-13/",
      },
      {
        name: "Logitech Signature M650L Wireless Mouse",
        description: "My work mouse",
        link: "https://www.logitech.com/en-us/products/mice/m650-signature-wireless-mouse.html",
      },
      {
        name: "GMK67 Keyboard",
        description: "My work keyboard with brown switches",
        link: "https://www.gmk67.com/",
      },
      {
        name: 'Lenovo L-Series 24" Monitor',
        description: "My work monitor",
        link: "https://www.lenovo.com/us/en/c/monitors-accessories/monitors/l-series",
      },
      {
        name: "Jabra Elite 85t TWS Earbuds",
        description: "My work earbuds",
        link: "https://www.jabra.com/bluetooth-headsets/jabra-elite-85t",
      },
      {
        name: "Amazon Basics Extended Gaming Mouse Pad",
        description: "My work mouse pad",
        link: "https://www.amazon.com/AmazonBasics-Extended-Gaming-Mouse-Pad/dp/B06X19FLTC",
      },
      {
        name: "Portronics C-Konnect Type C Dongle",
        description: "My work USB-C dongle",
        link: "https://www.portronics.com/products/c-konnect",
      },
    ],
  },
  {
    title: "Setup - Gaming",
    children: [
      {
        name: "Intel Core i9 10900K",
        description: "CPU for gaming PC",
        link: "https://www.intel.com/content/www/us/en/products/sku/199332/intel-core-i910900k-processor-20m-cache-up-to-5-30-ghz/specifications.html",
      },
      {
        name: "MSI Gaming Z Trio GeForce RTX 3080",
        description: "GPU for gaming PC",
        link: "https://www.msi.com/Graphics-Card/GeForce-RTX-3080-GAMING-Z-TRIO-10G",
      },
      {
        name: "MSI MEG Z490 ACE ATX Motherboard",
        description: "Motherboard for gaming PC",
        link: "https://www.msi.com/Motherboard/MEG-Z490-ACE",
      },
      {
        name: "ANTEC HCG EXTREME 1000 WATTS POWER SUPPLY",
        description: "Power supply for gaming PC",
        link: "https://antec.com/product/power/hcg-1000-extreme.php",
      },
      {
        name: "DEEPCOOL GAMERSTORM MACUBE 550",
        description: "Case for gaming PC",
        link: "https://global.deepcool.com/products/Casechassis/fulltowercases/2019-09/13091_11827.shtml",
      },
      {
        name: "Corsair Vengeance LPX 16GB X 2",
        description: "RAM for gaming PC",
        link: "https://www.corsair.com/us/en/Categories/Products/Memory/VENGEANCE-LPX/p/CMK32GX4M2D3600C18",
      },
      {
        name: "Corsair Force Series MP600 1TB Gen4 PCIe X4 NVMe M.2 SSD X 2",
        description: "SSDs for gaming PC",
        link: "https://www.corsair.com/us/en/Categories/Products/Storage/M-2-SSDs/Force-Series%E2%84%A2-MP600/p/CSSD-F1000GBMP600",
      },
      {
        name: "DEEPCOOL Castle 360EX, ARGB AIO Liquid CPU Cooler",
        description: "CPU cooler for gaming PC",
        link: "https://global.deepcool.com/products/Cooling/cpuliquidcoolers/2019-08/Castle-360EX-12580.shtml",
      },
      {
        name: "Acer 27 inch WQHD Monitor XB271HU",
        description: "Gaming monitor",
        link: "https://www.acer.com/us-en/monitors/gaming/predator-xb1-series/pdp/UM.HX1AA.001",
      },
      {
        name: "AJAZZ K870T 87 Keys Bluetooth Wired/Wireless Mechanical Keyboard",
        description: "Gaming keyboard with Akko CS Matcha Green Switch",
        link: "https://en.ajazz.com/products/75-ajazz-k870t-wireless-mechanical-keyboard",
      },
      {
        name: "Logitech G304 Lightspeed Wireless Gaming Mouse",
        description: "Gaming mouse",
        link: "https://www.logitechg.com/en-us/products/gaming-mice/g304-lightspeed-wireless-gaming-mouse.html",
      },
      {
        name: "Corsair HS50 Pro Wired Gaming Headphones",
        description: "Gaming headphones",
        link: "https://www.corsair.com/us/en/Categories/Products/Gaming-Headsets/Stereo-Headsets/HS50-PRO-STEREO-Gaming-Headset/p/CA-9011215-NA",
      },
      {
        name: "Razer Kraken 7.1 Wired Gaming Headphones",
        description: "Alternative gaming headphones",
        link: "https://www.razer.com/gaming-headsets/razer-kraken-71-v2",
      },
      {
        name: "Lenovo 300 FHD Webcam",
        description: "Webcam for streaming",
        link: "https://www.lenovo.com/us/en/p/accessories-and-software/webcams-and-video/webcams/4xc1b34802",
      },
    ],
  },
  {
    title: "Mobile Device",
    children: [
      {
        name: "Samsung Galaxy S23",
        description: "My secondary smartphone",
        link: "https://www.samsung.com/us/smartphones/galaxy-s23/",
      },
    ],
  },
]