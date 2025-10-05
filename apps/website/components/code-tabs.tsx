'use client';

import type { InstallationType } from '@/lib/hooks/use-config';
import { useConfig } from '@/lib/hooks/use-config';

import { Tabs } from '@repo/design-system/components/ui/tabs';

export function CodeTabs(props: React.ComponentProps<typeof Tabs>) {
  const [config, setConfig] = useConfig();

  const installationType = config.installationType || 'bucharitesh-cli';

  return (
    <Tabs
      value={installationType}
      onValueChange={(value) => {
        setConfig((prev) => ({
          ...prev,
          installationType: value as InstallationType,
        }));
      }}
      {...props}
    />
  );
}
