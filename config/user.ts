import { Experience, experiences } from "./experience";

export type User = {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  location: string;
  domain: string;
  website: string;
  description: string;
  jobTitle: string;
  twitterHandle: string;
  namePronunciationUrl: string;
  username: string;
  tagline: string;
  social: {
    twitter: string;
    github: string;
    linkedin: string;
    bluesky: string;
  };
  image: {
    profile: string;
  };
  flipSentences: string[];
  experiences?: Experience[];
};

export const USER: User = {
  firstName: "Ritesh",
  lastName: "Bucha",
  name: "Ritesh Bucha",
  email: "bucharitesh@gmail.com",
  domain: "bucharitesh.in",
  website: "https://bucharitesh.in",
  jobTitle: "Senior Frontend Engineer",
  username: "bucharitesh",
  tagline: "User Experience at Flam",
  twitterHandle: "@bucha.ritesh",
  location: "Bengaluru, India",
  description:
    "What I'm learning about shipping great products, becoming a better developer, and growing a career in tech.",
  namePronunciationUrl: "https://bucharitesh.in/assets/ritesh-bucha.mp3",
  social: {
    twitter: "https://twitter.com/bucha_ritesh",
    github: "https://github.com/bucharitesh",
    linkedin: "https://www.linkedin.com/in/bucharitesh/",
    bluesky: "https://bsky.app/profile/bucharitesh.in",
  },
  flipSentences: [
    "Creating with code. Small details matter.",
    "Design Engineer",
    "Open Source Contributor",
    "Frontend Developer",
    "Researching and building",
  ],
  image: {
    profile:
      "https://res.cloudinary.com/bucha/image/upload/c_thumb,q_100/bucharitesh_u1v1rt.png",
  },
  experiences: experiences,
};