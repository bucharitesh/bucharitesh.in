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
    <div className="flex flex-col items-center justify-center h-screen w-full space-y-12 bottom-12">
      <div className="max-h-400 z-10 w-full">
        <CalEmbed />
      </div>
    </div>
  );
}
