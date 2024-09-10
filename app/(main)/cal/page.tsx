"use client"

import PageWrapper from "@/ui/layout/page-wrapper"
/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react

import Cal from "@calcom/embed-react"
import { Metadata } from "next/types"
// import { useEffect } from "react"

export const metadata: Metadata = {
  title: "Book a Meeting",
  description: "Schedule a meeting with me to discuss anything from design to engineering to business to anything else.",
}

export default function MyApp() {

  // useEffect(() => {
  //   (async () => {
  //     const cal = await getCalApi({ namespace: "30min" })
  //     cal("ui", {
  //       theme: "dark",
  //       hideEventTypeDetails: false,
  //       cssVarsPerTheme: {
  //         light: {
  //           "cal-brand": "#6F61C0",
  //           "cal-text": "#6F61C0",
  //           "cal-text-emphasis": "#4D408D",
  //           "cal-border-emphasis": "#4D408D",
  //           "cal-text-error": "pink",
  //           "cal-border": "#A090E0",
  //           "cal-border-default": "#A090E0",
  //           "cal-border-subtle": "#A090E0",
  //           "cal-border-booker": "#A090E0",
  //           "cal-text-muted": "#C0B8FF",
  //           "cal-bg-emphasis": "#E1DFFF",
  //           "cal-border-booker-width": "3px",
  //           // More CSS variables are defined here
  //           // https://github.com/calcom/cal.com/blob/b0ca7dae1a17f897e34b83c990f30ab65f615ee0/packages/config/tailwind-preset.js#L69
  //         },
  //         dark: {
  //           // Set the similar variables as in light theme but for dark mode.
  //         },
  //       },
  //     })
  //   })();
  // }, [])

  return (
    <PageWrapper
      title="Book a Meeting"
      description="Schedule a meeting with me to discuss anything from design to engineering to business to anything else."
    >
      <Cal
        namespace="30min"
        calLink="bucharitesh/30min"
        style={{
          width: "100%",
          height: "100%",
          overflow: "scroll",
        }}
      />
    </PageWrapper>
  )
}
