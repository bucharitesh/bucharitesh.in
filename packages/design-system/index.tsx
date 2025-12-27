import type { ThemeProviderProps } from 'next-themes';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider } from './providers/theme';

type DesignSystemProviderProperties = ThemeProviderProps;

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
    <TooltipProvider>{children}</TooltipProvider>
  </ThemeProvider>
);

// Export typography components
export { Code, Heading, Prose, ProseMono } from './components/ui/typography';
