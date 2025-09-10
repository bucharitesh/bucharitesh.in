'use client';

import { SendIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SubmitBookmarkForm } from './form';

export const SubmitBookmarkDialog = ({
  bookmarks,
  currentBookmark,
}: { bookmarks: any[]; currentBookmark: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="relative">
          <SendIcon size={16} />
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{'Submit a bookmark'}</DialogTitle>
          <DialogDescription>
            {
              "Send me a website you like and if I like it too, you'll see it in the bookmarks list. With respect, please do not submit more than 5 websites a day."
            }
          </DialogDescription>
        </DialogHeader>
        <SubmitBookmarkForm
          setFormOpen={setOpen}
          bookmarks={bookmarks}
          currentBookmark={currentBookmark}
        />
      </DialogContent>
    </Dialog>
  );
};
