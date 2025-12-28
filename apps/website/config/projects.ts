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
  /** Github repository URL. */
  github?: string;
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
    id: 'QRdx',
    title: 'QRdx',
    period: {
      start: '08.2025',
    },
    link: 'https://qrdx.dev',
    github: 'https://github.com/bucharitesh/qrdx',
    skills: [
      'Next.js',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'QR Code Generation',
    ],
    logo: 'https://cdn.bucharitesh.in/images/project-logos/qrdx.svg?v=75a651b2',
    description: `Better way to generate QR codes.

Features include:
- Dynamic QR code generation
- Customizable design options
- Multiple export formats
- High-quality output`,
    isExpanded: true,
  },
  {
    id: 'bucharitesh-cli',
    title: '@bucharitesh/cli',
    period: {
      start: '03.2025',
    },
    link: 'https://www.npmjs.com/package/@bucharitesh/cli',
    github:
      'https://github.com/bucharitesh/bucharitesh.in/tree/main/packages/cli',
    skills: ['CLI', 'TypeScript', 'Node.js', 'shadcn/ui', 'Open Source'],
    logo: 'https://cdn.bucharitesh.in/images/project-logos/buchariteshin.svg',
    description: `CLI tool for adding Bucharitesh components and configuring MCP for AI coding assistants.

Features include:
- Add components to projects via shadcn CLI
- Configure MCP for multiple AI assistants
- Support for Claude, Cursor, Cline, Roo-Cline, and Windsurf
- Interactive component selection`,
  },
  {
    id: 'bucharitesh-in',
    title: 'bucharitesh.in',
    period: {
      start: '01.2024',
    },
    link: 'https://bucharitesh.in',
    github: 'https://github.com/bucharitesh/bucharitesh.in',
    skills: [
      'Open Source',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'shadcn/ui',
      'Component Registry',
      'Vercel',
    ],
    logo: 'https://cdn.bucharitesh.in/images/project-logos/buchariteshin.svg',
    description: `A minimal dev portfolio with guestbook, bookmarks and unique crafts and registry.
`,
  },
];
