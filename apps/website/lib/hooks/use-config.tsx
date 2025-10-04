import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type PackageManager = 'pnpm' | 'yarn' | 'npm' | 'bun';
export type InstallationType = 'bucharitesh-cli' | 'shadcn-cli' | 'manual';

type Config = {
  packageManager: PackageManager;
  installationType: InstallationType;
};

const configAtom = atomWithStorage<Config>('bucharitesh.config', {
  packageManager: 'pnpm',
  installationType: 'bucharitesh-cli',
});

export function useConfig() {
  return useAtom(configAtom);
}
