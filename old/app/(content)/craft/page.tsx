import { getAllCrafts } from "@/old/lib/crafts";
// import { SnippetPostPreview } from "@/old/ui/snippet/snippet-preview";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Craft",
  description: "A collection of craft that I've written.",
  alternates: {
    canonical: "/craft",
  },
};

export default async function Page() {
  const crafts = await getAllCrafts({ published: true, sorted: true });

  return (
    <div className="grid gap-2 w-full">
      {/* {crafts.map((craft) => {
        return <SnippetPostPreview key={craft.slugAsParams} {...craft} />;
      })} */}
    </div>
    // </PageWrapper>
  );
}
