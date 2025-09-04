import { Icons } from "@/components/icons";

export const meta = {
  name: "Ritesh Bucha",
  social: {
    twitter: "https://twitter.com/bucha_ritesh",
    github: "https://github.com/bucharitesh",
    linkedin: "https://www.linkedin.com/in/bucharitesh/",
    bluesky: "https://bsky.app/profile/bucharitesh.in",
  },
  email: "bucharitesh@gmail.com",
  twitterHandle: "@bucha.ritesh",
  username: "bucharitesh",
  domain: "bucharitesh.in",
  tagline: "User Experience at Flam",
  description:
    "What I'm learning about shipping great products, becoming a better developer, and growing a career in tech.",
  image: {
    profile:
      "https://res.cloudinary.com/bucha/image/upload/c_thumb,q_100/bucha_h6yyke.png",
    animated:
      "https://res.cloudinary.com/bucha/image/upload/c_thumb,q_100/download_1_ksk2zu.png",
  },
  flipSentences: [
    "Creating with code. Small details matter.",
    "Design Engineer",
    "Open Source Contributor",
    "Frontend Developer",
    "Researching and building",
  ],
};

export const ENABLE_BUDDY = false;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const SOURCE_CODE_GITHUB_REPO = "bucharitesh/bucharitesh.in";
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/bucharitesh/bucharitesh.in";

export const UTM_PARAMS = {
  utm_source: "bucharitesh.in",
  utm_medium: "portfolio_website",
  utm_campaign: "referral",
};

export const DockConfig = {
  navbar: [
    { href: "/", icon: Icons.home, label: "Home" },
    { href: "/craft", icon: Icons.craft, label: "Crafts", new: true },
    { href: "/guestbook", icon: Icons.guestbook, label: "Guestbook" },
    // { href: "/blog", icon: Icons.guestbook, label: "Blog" },
    // { href: "/bookmarks", icon: Icons.bookmark, label: "Bookmarks" },
    { href: "/cal", icon: Icons.calendar, label: "Book a Meeting" },
    // { href: "/resume", icon: Icons.resume, label: "Resume" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: meta.social.github,
        icon: Icons.github,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: meta.social.linkedin,
        icon: Icons.linkedin,
      },
      X: {
        name: "X",
        url: meta.social.twitter,
        icon: Icons.x,
      },
      email: {
        name: "Send Email",
        url: `mailto:${meta.email}`,
        icon: Icons.email,
      },
      Bluesky: {
        name: "Bluesky",
        url: meta.social.bluesky,
        icon: Icons.bluesky,
      },
    },
  },
};

export const COLLECTION_IDS = [48069938, 48073561];
