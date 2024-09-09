import { HelpButton } from "./help-button"
import { Suspense } from "react"

const toolbarItems = ["help"] as const

type ToolbarProps = {
  show?: (typeof toolbarItems)[number][]
}

export default function Toolbar(props: ToolbarProps) {
  return (
    <Suspense fallback={null}>
      <div className="fixed bottom-0 right-0 z-40 m-5">
        <ToolbarRSC {...props} />
      </div>
    </Suspense>
  )
}

async function ToolbarRSC({ show = ["help"] }: ToolbarProps) {
  return (
    <div className="flex items-center gap-3">
      {show.includes("help") && (
        <div className="shrink-0">
          <HelpButton />
        </div>
      )}
    </div>
  )
}