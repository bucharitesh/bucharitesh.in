import PageWrapper from "@/ui/layout/page-wrapper"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { getDesignInspiration } from "@/lib/get-design-inspiraion";
import { DesignInspirationItem } from "@/.contentlayer/generated";

export default async function Page() {
  const { data: items } = await getDesignInspiration();
  
  return (
    <PageWrapper
      title="Designers and Design Engineers"
      description="A curated list of designers and design engineers I follow and look up
          to."
    >
      <div className="max-w-2xl mx-auto w-full pb-20">
        {items.map((item: DesignInspirationItem) => (
          <div key={item.name} className="md:mb-20">
            <h2 className="font-bold text-base text-primary-200">
              {item.name}
            </h2>
            <div className="flex items-center gap-2">
              <Link
                href={item.twitter}
                target="_blank"
                className="text-primary-400 text-sm"
              >
                @{item.twitter.split("/").pop()}
              </Link>
              <span className="bg-primary-300 h-1 w-1 text-sm rounded-full"></span>
              <Link
                href={item.website}
                target="_blank"
                className="text-primary-100 text-sm"
              >
                {item.website.replace("https://", "").replace("www.", "")}
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {item.images.map((image) => (
                <Image
                  src={image}
                  alt={item.name}
                  key={image}
                  width={500}
                  height={500}
                  className="rounded-lg w-full object-cover h-full bg-primary-400"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  )
}
