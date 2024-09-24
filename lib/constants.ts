// show customised outline when an element has focus (but only if the user is
// using the keyboard)
// TODO: move this to a global css rule
export const FOCUS_VISIBLE_OUTLINE = `focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70`

export const LINK_STYLES = `text-primary-200 underline decoration-primary-200/20 underline-offset-2 transition-all hover:text-primary-100 hover:decoration-primary-100/40`

export const LINK_SUBTLE_STYLES = `hover:underline hover:decoration-primary-300/30 hover:underline-offset-2 hover:text-primary-200/90`

export const HEADING_LINK_ANCHOR = `before:content-['#'] before:absolute before:-ml-[1em] before:text-primary-100/0 hover:before:text-primary-200/50 pl-[1em] -ml-[1em]`

export const OOF_GRAD = `bg-gradient-to-br from-primary-200 to-primary-200/30 bg-clip-text text-transparent`

export const meta = {
  name: "Ritesh Bucha",
  social: {
    twitter: "https://twitter.com/bucha_ritesh",
    github: "https://github.com/bucharitesh",
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
}

export const FOOTER_ITEMS = {
  GENERAL: [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
    { href: "/guestbook", label: "Guestbook" },
    { href: "/bookmarks", label: "Bookmarks"}
  ],
  SOCIAL: [
    { href: meta.social.github, label: "GitHub" },
    { href: meta.social.twitter, label: "Twitter" },
    { href: "/cal", label: "Book a Meeting" },
  ],
  PAGES: [
    { href: "/snippets", label: "Snippets" },
    { href: "/design-inspiration", label: "Design Inspiration" },
  ],
}

export const BUILT_WITH = [
  { href: "https://nextjs.org", label: "Next.js" },
  { href: "https://mdxjs.com", label: "MDX" },
  { href: "https://tailwindcss.com", label: "Tailwind" },
  { href: "https://vercel.com", label: "Vercel" },
]

export const COLLECTION_IDS = [
  48069938, 
  48073561,
]