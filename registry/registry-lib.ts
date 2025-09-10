import type { Registry } from 'shadcn/schema';

export const lib: Registry['items'] = [
  {
    name: 'utils',
    type: 'registry:lib',
    title: 'Utility Functions',
    author: 'bucharitesh <contact@bucharitesh.in>',
    dependencies: ['clsx', 'tailwind-merge'],
    files: [
      {
        path: 'lib/utils.ts',
        type: 'registry:lib',
      },
    ],
  },
];
