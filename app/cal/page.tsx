import { FloatingHeader } from '@/components/navigation/floating-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Metadata } from 'next/types';
import CalEmbed from './cal-embed';

export const metadata: Metadata = {
  title: 'Book a Meeting',
  description:
    'Schedule a meeting with me to discuss anything from design to engineering to business to anything else.',
  alternates: {
    canonical: '/cal',
  },
};

export default function BookingPage() {
  return (
    <ScrollArea useScrollAreaId className="h-full">
      <FloatingHeader title="Book a Meeting" />
      <div className="flex h-full select-none items-center justify-center space-y-12 p-0 content-wrapper md:min-h-dvh lg:px-8 lg:pt-12 lg:pb-20">
        <div className="z-10 mx-auto flex h-full w-full items-center justify-center">
          <CalEmbed />
        </div>
      </div>
    </ScrollArea>
  );
}
