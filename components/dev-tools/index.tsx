import DraftModeIndicator from './draft-mode-indicator';
import TailwindIndicator from './tailwind-indicator';

const DevTools = () => {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <>
      <DraftModeIndicator />
      <TailwindIndicator />
    </>
  );
};

export default DevTools;
