import { cn } from "@/lib/utils"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className,
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  header,
}: {
  className?: string
  header?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl h-full w-full group/bento hover:shadow-xl transition duration-200 shadow-input shadow-none bg-gray-400/10 border-white/[0.2] border justify-between flex flex-col space-y-4",
        className,
      )}
    >
      {header}
    </div>
  )
}
