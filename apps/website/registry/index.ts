import {
  type Registry,
  RegistryItem,
  registryIndexSchema,
} from 'shadcn/schema';

import { examples } from '@/registry/registry-examples';
import { lib } from '@/registry/registry-lib';
import { styles } from '@/registry/registry-styles';
import { ui } from '@/registry/registry-ui';

const DEPRECATED_ITEMS = [''];

const DEFAULT: RegistryItem = {
  name: 'index',
  type: 'registry:style',
  dependencies: ['class-variance-authority', 'lucide-react'],
  devDependencies: ['tw-animate-css'],
  registryDependencies: ['utils'],
  cssVars: {},
  files: [],
};

export const registry = {
  name: 'bucharitesh',
  homepage: 'https://bucharitesh.in',
  items: registryIndexSchema.parse(
    [DEFAULT, ...ui, ...examples, ...lib, ...styles].filter((item) => {
      return !DEPRECATED_ITEMS.includes(item.name);
    })
  ),
} satisfies Registry;
