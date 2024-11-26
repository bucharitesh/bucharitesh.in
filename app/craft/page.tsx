import { allPosts } from "content-collections";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Craft",
  description: "A collection of craft that I've written.",
  alternates: {
    canonical: "/craft",
  },
};

export default async function Page() {
  const crafts = allPosts;

  return (
    <div className="grid gap-2 space-y-4 w-full">
      {crafts.map((item) => {
        return <p>{JSON.stringify(item)}</p>;
      })}
    </div>
  );
}
