// show customised outline when an element has focus (but only if the user is
// using the keyboard)
// TODO: move this to a global css rule
export const FOCUS_VISIBLE_OUTLINE = `focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500/70`

export const LINK_STYLES = `text-lavender-200 underline decoration-lavender-200/20 underline-offset-2 transition-all hover:text-lavender-100 hover:decoration-lavender-100/40`

export const LINK_SUBTLE_STYLES = `hover:underline hover:decoration-lavender-300/30 hover:underline-offset-2 hover:text-lavender-200/90`

export const HEADING_LINK_ANCHOR = `before:content-['#'] before:absolute before:-ml-[1em] before:text-lavender-100/0 hover:before:text-lavender-200/50 pl-[1em] -ml-[1em]`

export const OOF_GRAD = `bg-gradient-to-br from-lavender-200 to-lavender-200/30 bg-clip-text text-transparent`

export const meta = {
  name: "Ritesh Bucha",
  social: {
    twitter: "https://twitter.com/bucha_ritesh",
    github: "https://github.com/bucharitesh",
  },
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