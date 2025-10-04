import { USER } from '@/config/user';
import { type Registry } from 'shadcn/schema';

export const lib: Registry['items'] = [
  {
    name: 'utils',
    type: 'registry:lib',
    title: 'Utility Functions',
    author: `${USER.username} <${USER.email}>`,
    dependencies: ['clsx', 'tailwind-merge'],
    files: [
      {
        path: 'lib/utils.ts',
        type: 'registry:lib',
      },
    ],
  },
];
