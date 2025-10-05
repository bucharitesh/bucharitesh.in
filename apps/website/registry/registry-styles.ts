import { type Registry } from 'shadcn/schema';

export const styles: Registry['items'] = [
  {
    name: 'book-styles',
    type: 'registry:style',
    files: [
      {
        path: 'styles/book.css',
        type: 'registry:style',
      },
    ],
  },
  {
    name: 'modern-progress-styles',
    type: 'registry:style',
    files: [
      {
        path: 'styles/modern-progress.css',
        type: 'registry:style',
      },
    ],
  },
];
