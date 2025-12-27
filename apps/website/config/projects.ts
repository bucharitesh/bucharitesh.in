export type Project = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string;
  title: string;
  /**
   * Project period for display and sorting.
   * Use "MM.YYYY" format. Omit `end` for ongoing projects.
   */
  period: {
    /** Start date (e.g., "05.2025"). */
    start: string;
    /** End date; leave undefined for "Present". */
    end?: string;
  };
  /** Public URL (site, repository, demo, or video). */
  link: string;
  /** Tags/technologies for chips or filtering. */
  skills: string[];
  /** Optional rich description; Markdown and line breaks supported. */
  description?: string;
  /** Logo image URL (absolute or path under /public). */
  logo?: string;
  /** Whether the project card is expanded by default in the UI. */
  isExpanded?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: 'qrdx-dev',
    title: 'qrdx.dev',
    period: {
      start: '03.2024',
    },
    link: 'https://qrdx.dev',
    skills: [
      'Next.js',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'QR Code Generation',
    ],
    description: `A powerful QR code generator with advanced features and customization options for modern web applications.

Features include:
- Dynamic QR code generation
- Customizable design options
- Multiple export formats
- High-quality output`,
    isExpanded: true,
  },
  {
    id: 'bucharitesh-in',
    title: 'bucharitesh.in',
    period: {
      start: '01.2025',
    },
    link: 'https://bucharitesh.in',
    skills: [
      'Open Source',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'shadcn/ui',
      'Component Registry',
      'Vercel',
    ],
    description: `A minimal, pixel-perfect dev portfolio, component registry, and blog to showcase work as a Design Engineer.

**Featured:**
- Clean & modern design
- Light/Dark themes
- SEO optimized (JSON-LD schema, sitemap, robots)
- AI-ready with /llms.txt
- Installable as PWA

**Registry:**
- Easily build and distribute reusable components using a custom registry powered by shadcn CLI
- Each entry is well-documented with live preview & code snippets`,
  },
];
