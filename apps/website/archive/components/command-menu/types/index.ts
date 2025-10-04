import type { ReactNode } from 'react';

export interface CommandItem {
  id: string;
  name: string;
  description?: string | ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  rightIcon?: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export interface CommandGroup {
  name: string;
  commands: CommandItem[];
}
