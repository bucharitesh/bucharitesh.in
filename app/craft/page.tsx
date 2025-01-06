import { Metadata } from "next";
import PageClient from "./page-client";
import { allCrafts } from "content-collections";

export const metadata: Metadata = {
  title: "Craft",
  description: "A collection of craft that I've written.",
  alternates: {
    canonical: "/craft",
  },
};

export default async function Page() {
  const crafts = await allCrafts;
  
  return <PageClient crafts={crafts} />;
}