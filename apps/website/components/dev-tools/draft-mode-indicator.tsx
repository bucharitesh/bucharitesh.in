import { EyeIcon } from 'lucide-react';
import { draftMode } from 'next/headers';

const DraftModeIndicator = async () => {
  const { isEnabled } = await draftMode();

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="absolute inset-x-0 bottom-0 z-9999 flex h-12 w-full items-center justify-center bg-green-500 text-center font-medium text-sm text-white">
      <div className="flex items-center gap-2">
        <EyeIcon size={16} />
        <span>Draft mode is enabled</span>
      </div>
    </div>
  );
};

export default DraftModeIndicator;
