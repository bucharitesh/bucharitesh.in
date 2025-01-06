// import PageWrapper from "@/old/ui/layout/page-wrapper";
import { Metadata } from "next/types";
import CalEmbed from "./cal-embed";

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
    <div className="flex flex-col items-center justify-center h-full w-full space-y-12">
      <div className="z-10 w-full mx-auto overflow-y-auto pb-20 pt-12 md:pt-0 px-12">
        <CalEmbed />
      </div>
    </div>
  );
}
