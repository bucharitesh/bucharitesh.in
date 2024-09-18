import { OOF_GRAD } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Balancer from "react-wrap-balancer"
import { getUses, ProcessedUseCategory } from "@/lib/uses"
import PageWrapper from "@/ui/layout/page-wrapper"
import { Metadata } from "next/types"

export const metadata: Metadata = {
  title: "Uses",
  description:
    "All the things I use to do my job, run my life, and get things done!",
  alternates: {
    canonical: "/uses",
  },
}

export default async function Page() {
  const uses = await getUses()

  return (
    <PageWrapper
      title="Uses"
      description="All the things I use to do my job, run my life, and get things done!"
    >
      <div className="space-y-10">
        {uses.map((uses_item) => (
          <UsesPreview key={uses_item.title} item={uses_item} />
        ))}
      </div>
    </PageWrapper>
  )
}

interface UsesPreviewProps {
  item: ProcessedUseCategory
}

const UsesPreview: React.FC<UsesPreviewProps> = ({ item }) => {
  return (
    <div className="border-b border-dashed pb-10 border-primary-500/30 last:border-b-0">
      <h3
        className={cn(
          "mt-6 text-4xl text-primary-500 font-bold sm:text-2xl",
          OOF_GRAD,
        )}
      >
        <Balancer>{item.title}</Balancer>
      </h3>
      <ul className="mt-10 space-y-4 text-sm list-outside list-disc">
        {item.children.map((child, index) => (
          <li
            key={index}
            className="rounded-md p-2 px-0.5 slashed-zero tabular-nums tracking-tight"
          >
            <a
              className="cursor-pointer font-semibold text-primary-300/80"
              href={child.link}
            >
              {child.name}
            </a>
            <p className="text-primary-200/40">({child.description})</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
