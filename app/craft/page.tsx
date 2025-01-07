import { Metadata } from "next";
import PageClient from "./page-client";
import { getCrafts } from "@/lib/db/craft";

export const metadata: Metadata = {
  title: "Craft",
  description: "A collection of craft that I've written.",
  alternates: {
    canonical: "/craft",
  },
};

export default async function Page() {
  const crafts = await getCrafts();

  return <PageClient crafts={crafts} />;
}
