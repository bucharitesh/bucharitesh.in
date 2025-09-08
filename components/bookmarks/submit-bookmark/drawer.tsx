'use client'

import { SendIcon } from 'lucide-react'
import { useState } from 'react'

import { SubmitBookmarkForm } from './form'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { SUBMIT_BOOKMARK_FORM_DESCRIPTION, SUBMIT_BOOKMARK_FORM_TITLE } from '@/lib/config'

export const SubmitBookmarkDrawer = ({ bookmarks, currentBookmark }: { bookmarks: any[], currentBookmark: any }) => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="sm" className="relative">
          <SendIcon size={16} className="mr-2" />
          Submit
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-6">
        <DrawerHeader className="sm:text-center">
          <DrawerTitle>{SUBMIT_BOOKMARK_FORM_TITLE}</DrawerTitle>
          <DrawerDescription className="m-0">{SUBMIT_BOOKMARK_FORM_DESCRIPTION}</DrawerDescription>
        </DrawerHeader>
        <SubmitBookmarkForm
          setFormOpen={setOpen}
          bookmarks={bookmarks}
          currentBookmark={currentBookmark}
          className="py-8"
        />
      </DrawerContent>
    </Drawer>
  )
}