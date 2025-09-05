import { Metadata } from "next/types";
import CalEmbed from "./cal-embed";
import { FloatingHeader } from "@/components/navigation/floating-header";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "Book a Meeting",
  description:
    "Schedule a meeting with me to discuss anything from design to engineering to business to anything else.",
  alternates: {
    canonical: "/cal",
  },
};

export default function BookingPage() {
  return (
    <ScrollArea useScrollAreaId className="h-full">
      <FloatingHeader title="Book a Meeting" />
      <div className="flex h-full content-wrapper p-0 lg:px-8 lg:pt-12 lg:pb-20 md:min-h-dvh items-center justify-center space-y-12 select-none">
        <div className="flex items-center justify-center z-10 w-full h-full mx-auto">
          <CalEmbed />
        </div>
      </div>
    </ScrollArea>
  );
}
