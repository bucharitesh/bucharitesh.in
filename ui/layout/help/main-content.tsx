import React from 'react'
import { Dispatch, SetStateAction } from "react"

const MainContent = ({
  setScreen,
}: {
  setScreen: Dispatch<SetStateAction<"main" | "contact">>
}) => {
  return (
    <div className="space-y-2">
      <p className="font-medium text-foreground">Need help?</p>
      <p className="text-muted-foreground text-sm">
        We are here to help you with any questions you may have.
      </p>
      {/* <Button variant="ghost" className="w-full" asChild>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://cal.com/team/openstatus/30min"
        >
          Book a call
        </a>
      </Button>
      <Button variant="ghost" className="w-full" asChild>
        <a target="_blank" rel="noreferrer" href="https://docs.openstatus.dev">
          Browse documentation
        </a>
      </Button>
      <Button variant="ghost" className="w-full" asChild>
        <a target="_blank" rel="noreferrer" href="/discord">
          Join Discord
        </a>
      </Button> */}
      <button
        // variant="ghost"
        className="w-full"
        onClick={() => setScreen("contact")}
      >
        Get in touch
      </button>
    </div>
  )
}

export default MainContent