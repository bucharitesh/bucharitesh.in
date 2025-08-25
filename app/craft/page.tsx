import { Metadata } from "next";
import { getCrafts } from "@/lib/db/craft";
import { MasonryGrid } from "@/components/masonary-grid";
import { Card } from "./page-client";

export const metadata: Metadata = {
  title: "Craft",
  description: "A collection of craft that I've written.",
  alternates: {
    canonical: "/craft",
  },
};

export default async function Page() {
  const crafts = await getCrafts();

  return (
    <>
    <MasonryGrid
      breakpoints={{
        sm: 1,
        lg: 2,
        xl: 3,
      }}
    >
      {crafts.map((item, index) => (
        <Card
          key={`${item.title}-${index}`}
          title={item.title}
          date={item.date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
          href={item.href ? item.href : `/craft/${item.slug}`}
          src={item.video ? item.video : item.image}
          type={item.video ? "video" : "image"}
          blurImage={item.blurImage}
          craft_type={item.type}
          theme={item.theme}
          aspectRatio={item.aspect_ratio}
        />
      ))}
    </MasonryGrid>
    </>
  );
};