'use client';

import { SendIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@repo/design-system/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/design-system/components/ui/drawer';
import { analytics } from '@/lib/analytics';
import { SubmitBookmarkForm } from './form';

export const SubmitBookmarkDrawer = ({
  bookmarks,
  currentBookmark,
}: { bookmarks: any[]; currentBookmark: any }) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      analytics.trackBookmarkSubmissionFormOpened();
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button size="sm" className="relative">
          <SendIcon size={16} className="mr-2" />
          Submit
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-6">
        <DrawerHeader className="sm:text-center">
          <DrawerTitle>{'Submit a bookmark'}</DrawerTitle>
          <DrawerDescription className="m-0">
            {
              "Send me a website you like and if I like it too, you'll see it in the bookmarks list. With respect, please do not submit more than 5 websites a day."
            }
          </DrawerDescription>
        </DrawerHeader>
        <SubmitBookmarkForm
          setFormOpen={setOpen}
          bookmarks={bookmarks}
          currentBookmark={currentBookmark}
          className="py-8"
        />
      </DrawerContent>
    </Drawer>
  );
};
