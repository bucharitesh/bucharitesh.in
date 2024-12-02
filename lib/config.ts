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
  domain: "bucharitesh.in",
  tagline: "User Experience at Flam",
  description:
    "What I'm learning about shipping great products, becoming a better developer, and growing a career in tech.",
  image: {
    profile:
      "https://res.cloudinary.com/bucha/image/upload/c_thumb,q_100/bucha_h6yyke.png",
  },
};

export const DockConfig = {
  navbar: [
    { href: "/", icon: Icons.home, label: "Home" },
    { href: "/craft", icon: Icons.craft, label: "My Crafts" },
    { href: "/guestbook", icon: Icons.guestbook, label: "Guestbook" },
    { href: "/cal", icon: Icons.calendar, label: "Book a Meeting" },
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