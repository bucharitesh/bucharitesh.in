import { OOF_GRAD } from "@/lib/constants"
import clsx from "clsx"
import Balancer from "react-wrap-balancer"
import { USES, UsesPreviewProps } from "@/content/uses"

export default async function Page() {
  return (
    <>
      <div className="mt-24 mb-4 xl:!col-end-5">
        <h1 className={clsx("mt-6 text-2xl font-medium sm:text-4xl", OOF_GRAD)}>
          <Balancer>Uses</Balancer>
        </h1>
        <p className="mt-6 text-sm font-bold text-lavender-300/40">
          All the things I use to do my job, run my life, and get things done!
        </p>
      </div>

      <div className="space-y-10">
        {USES.map((uses_item: any) => {
          return <UsesPreview key={uses_item.title} item={uses_item} />
        })}
      </div>
    </>
  )
}

export const UsesPreview: React.FC<UsesPreviewProps> = ({ item }) => {
  return (
    <div className="border-b border-dashed pb-10 border-lavender-500/30 last:border-b-0">
      <h3
        className={clsx(
          "mt-6 text-4xl text-lavender-500 font-bold sm:text-2xl",
          OOF_GRAD,
        )}
      >
        <Balancer>{item.title}</Balancer>
      </h3>
      <ul className="mt-10 space-y-4 text-sm list-outside list-disc">
        {item.children.map((child, index) => (
          <li
            key={index}
            className="rounded-md p-2 px-0.5 slashed-zero tabular-nums tracking-tight animate-[mutation_2s_ease-in-out_1]"
          >
            <a
              className="cursor-pointer font-semibold text-lavender-300/80"
              href={child.link}
            >
              {child.name}
            </a>
            <p className="text-lavender-400/40">({child.description})</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
