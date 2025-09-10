'use client';

import { approveGuestbookEntry, declineGuestbookEntry } from '@/lib/actions';
import { localEntriesAtom } from '@/lib/atoms/guestbook';
import { useSetAtom } from 'jotai';

const ApproveButton = ({ id }: { id: string }) => {
  const setLocalEntries = useSetAtom(localEntriesAtom);
  return (
    <div className="flex gap-x-2">
      <form
        action={async () => {
          await approveGuestbookEntry(id);
          setLocalEntries((prev) => prev.filter((entry) => entry.id !== id));
        }}
      >
        <button
          className="mt-2 rounded-[6px] bg-[#267E5C] px-2 py-1 font-medium text-gray-1 text-white hover:bg-[#267E5C]/80"
          type="submit"
        >
          Approve
        </button>
      </form>
      <form
        action={async () => {
          await declineGuestbookEntry(id);
          setLocalEntries((prev) => prev.filter((entry) => entry.id !== id));
        }}
      >
        <button
          className="mt-2 rounded-[6px] bg-[#F74F00] px-2 py-1 font-medium text-gray-1 text-white hover:bg-[#F74F00]/80"
          type="submit"
        >
          Decline
        </button>
      </form>
    </div>
  );
};

export default ApproveButton;
