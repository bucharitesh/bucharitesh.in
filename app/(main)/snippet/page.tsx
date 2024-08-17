import { OOF_GRAD } from "@/lib/constants"
import { getSnippets } from "@/lib/snippets";
import { SnippetPostPreview } from "@/ui/snippet/post-preview"
import clsx from "clsx"
import Balancer from "react-wrap-balancer"

export default async function Page() {
  const { snippets } = await getSnippets();

  return (
    <>
      <div className="mt-24 mb-4 xl:!col-end-5">
        <h1 className={clsx("mt-6 text-2xl font-medium sm:text-4xl", OOF_GRAD)}>
          <Balancer>Snippets</Balancer>
        </h1>
      </div>

      <div className="space-y-10">
        {snippets.map((snippet) => {
          return <SnippetPostPreview key={snippet.slug} {...snippet} />
        })}
      </div>
    </>
  )
}
