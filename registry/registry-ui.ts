import { USER } from '@/config/user';
import { type Registry } from 'shadcn/schema';

export const ui: Registry['items'] = [
  {
    name: 'book',
    type: 'registry:ui',
    title: 'Book',
    author: `${USER.username} <${USER.email}>`,
    description:
      'A book component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.',
    registryDependencies: ['@bucharitesh/utils'],
    dependencies: ['@radix-ui/react-icons'],
    files: [
      {
        path: 'bucharitesh/book/book.tsx',
        type: 'registry:ui',
      },
      {
        path: 'bucharitesh/book/book.css',
        type: 'registry:style',
      },
    ],
    docs: 'https://bucharitesh.in/craft/book',
  },
  {
    name: 'modern-progress',
    type: 'registry:ui',
    description:
      'A modern progress component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.',
    title: 'Modern Progress',
    author: `${USER.username} <${USER.email}>`,
    registryDependencies: ['@bucharitesh/utils'],
    dependencies: ['class-variance-authority'],
    files: [
      {
        path: 'bucharitesh/modern-progress/modern-progress.tsx',
        type: 'registry:ui',
      },
      {
        path: 'bucharitesh/modern-progress/modern-progress.css',
        type: 'registry:style',
      },
    ],
    docs: 'https://bucharitesh.in/craft/modern-progress',
  },
  {
    name: 'pixel-icon',
    type: 'registry:ui',
    description:
      'A pixel icon component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.',
    title: 'Pixel Icon',
    author: `${USER.username} <${USER.email}>`,
    registryDependencies: ['@bucharitesh/utils'],
    files: [
      {
        path: 'bucharitesh/pixel-icon/pixel-icon.tsx',
        type: 'registry:ui',
      },
    ],
    docs: 'https://bucharitesh.in/craft/pixel-icon',
  },
  {
    name: 'split-text-effect',
    type: 'registry:ui',
    description:
      'A split text effect component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.',
    title: 'Split Text Effect',
    author: `${USER.username} <${USER.email}>`,
    registryDependencies: ['@bucharitesh/utils'],
    dependencies: ['motion'],
    files: [
      {
        path: 'bucharitesh/split-text-effect/split-text-effect.tsx',
        type: 'registry:ui',
      },
    ],
    docs: 'https://bucharitesh.in/craft/split-text-effect',
  },
  {
    name: 'view-magnifier',
    type: 'registry:ui',
    description:
      'A view magnifier component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.',
    title: 'View Magnifier',
    author: `${USER.username} <${USER.email}>`,
    registryDependencies: ['@bucharitesh/utils'],
    dependencies: ['motion'],
    files: [
      {
        path: 'bucharitesh/view-magnifier/view-magnifier.tsx',
        type: 'registry:ui',
      },
    ],
    docs: 'https://bucharitesh.in/craft/view-magnifier',
  },
  {
    name: 'game-of-life',
    type: 'registry:ui',
    description:
      'A game of life component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.',
    title: 'Game of Life',
    author: `${USER.username} <${USER.email}>`,
    registryDependencies: ['@bucharitesh/utils'],
    files: [
      {
        path: 'bucharitesh/game-of-life/game-of-life.tsx',
        type: 'registry:ui',
      },
    ],
    docs: 'https://bucharitesh.in/craft/game-of-life',
  },
  {
    name: 'magical-mouse',
    type: 'registry:ui',
    description:
      'A magical mouse component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.',
    title: 'Magical Mouse',
    author: `${USER.username} <${USER.email}>`,
    registryDependencies: ['@bucharitesh/utils'],
    dependencies: ['lucide-react'],
    files: [
      {
        path: 'bucharitesh/magical-mouse/magical-mouse.tsx',
        type: 'registry:ui',
      },
      {
        path: 'bucharitesh/magical-mouse/magical-mouse.css',
        type: 'registry:style',
      },
    ],
    docs: 'https://bucharitesh.in/craft/magical-mouse',
  },
];
