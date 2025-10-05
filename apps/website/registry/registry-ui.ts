import { type Registry } from 'shadcn/schema';

export const ui: Registry['items'] = [
  {
    name: 'book',
    type: 'registry:ui',
    title: 'Book',
    description:
      'A book component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.',
    dependencies: ['@radix-ui/react-icons'],
    files: [
      {
        path: 'bucharitesh/book.tsx',
        type: 'registry:ui',
      },
      {
        path: 'styles/book.css',
        type: 'registry:style',
      },
    ],
  },
  {
    name: 'modern-progress',
    type: 'registry:ui',
    description:
      'A modern progress component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.',
    title: 'Modern Progress',
    dependencies: ['class-variance-authority'],
    files: [
      {
        path: 'bucharitesh/modern-progress.tsx',
        type: 'registry:ui',
      },
    ],
    css: {
      'body[data-pattern="stripes"],body [data-pattern="stripes"]': {
        '--rgb': '255 255 255',
        '--opacity': '0.1',
        '--size': '6px 6px',
        'background-image':
          'linear-gradient(-45deg,rgb(var(--rgb) / var(--opacity)) 25%,transparent 25%,transparent 50%,rgb(var(--rgb) / var(--opacity)) 50%,rgb(var(--rgb) / var(--opacity)) 75%,transparent 75%,transparent 100%)',
        'background-size': 'var(--size)',
      },
    },
  },
  {
    name: 'pixel-icon',
    type: 'registry:ui',
    description:
      'A pixel icon component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.',
    title: 'Pixel Icon',
    files: [
      {
        path: 'bucharitesh/pixel-icon.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'split-text-effect',
    type: 'registry:ui',
    description:
      'A split text effect component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.',
    title: 'Split Text Effect',
    dependencies: ['motion'],
    files: [
      {
        path: 'bucharitesh/split-text-effect.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'view-magnifier',
    type: 'registry:ui',
    description:
      'A view magnifier component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.',
    title: 'View Magnifier',
    dependencies: ['motion'],
    files: [
      {
        path: 'bucharitesh/view-magnifier.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'game-of-life',
    type: 'registry:ui',
    description:
      'A game of life component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.',
    title: 'Game of Life',
    files: [
      {
        path: 'bucharitesh/game-of-life.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'magical-mouse',
    type: 'registry:ui',
    description:
      'A magical mouse component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.',
    title: 'Magical Mouse',
    dependencies: ['lucide-react'],
    files: [
      {
        path: 'bucharitesh/magical-mouse.tsx',
        type: 'registry:ui',
      },
    ],
    css: {
      '@keyframes fall-1': {
        '0%': {
          transform:
            'translate(0px, 0px) rotateX(45deg) rotateY(30deg) rotateZ(0deg) scale(0.25)',
          opacity: '0',
        },
        '25%': {
          transform:
            'translate(10px, -10px) rotateX(45deg) rotateY(30deg) rotateZ(0deg) scale(1)',
          opacity: '1',
        },
      },
      '@keyframes fall-2': {
        '0%': {
          transform:
            'translate(0px, 0px) rotateX(-20deg) rotateY(10deg) scale(0.25)',
          opacity: '0',
        },
        '10%': {
          transform:
            'translate(-10px, -5px) rotateX(-20deg) rotateY(10deg) scale(1)',
          opacity: '1',
        },
      },
      '@keyframes fall-3': {
        '0%': {
          transform:
            'translate(0px, 0px) rotateX(0deg) rotateY(45deg) scale(0.5)',
          opacity: '0',
        },
        '15%': {
          transform:
            'translate(7px, 5px) rotateX(0deg) rotateY(45deg) scale(1)',
          opacity: '1',
        },
      },
    },
  },
];
