"use client"

import PageWrapper from "@/ui/layout/page-wrapper"
/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react

import Cal, { getCalApi } from "@calcom/embed-react"

export default function MyApp() {
  return (
    <PageWrapper
      title="Book a Meeting"
      description="Schedule a meeting with me to discuss anything from design to engineering to business to anything else."
    >
      <Cal
        namespace="30min"
        calLink="bucharitesh/30min"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
      />
    </PageWrapper>
  )
}
