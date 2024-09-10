import PageWrapper from "@/ui/layout/page-wrapper"
import { Metadata } from "next/types"
import CalEmbed from "./cal-embed"

export const metadata: Metadata = {
  title: "Book a Meeting",
  description: "Schedule a meeting with me to discuss anything from design to engineering to business to anything else.",
}

export default function MyApp() {
  return (
    <PageWrapper
      title="Book a Meeting"
      description="Schedule a meeting with me to discuss anything from design to engineering to business to anything else."
    >
      <CalEmbed />
    </PageWrapper>
  )
}
