import { meta } from "@/lib/constants";
import { COMMON_SCRIPT_ORG } from "../lib/script";
import { Metadata } from "next/types";
import MapLocation from "@/components/home/map";
import ViewMagnifier from "@/components/view-magnifier";

export const metadata: Metadata = {
  title: meta.tagline,
  description: meta.description,
  alternates: {
    canonical: "/",
  },
};

export default async function Page() {
  return (
    <>
      <COMMON_SCRIPT_ORG />
      <div className="layout-sm relative z-10 grid gap-y-8 px-4 pt-12 xl:layout-xl xl:gap-x-9 xl:px-0 [&>*]:col-start-2 xl:[&>*]:col-start-3">
        <h1 className="font-medium text-xl">Ritesh Bucha</h1>
        <section className="mt-12">
          <h2 className="mb-3 font-medium">Where</h2>

          <ViewMagnifier maxWidth={800}>
            <MapLocation />
          </ViewMagnifier>
        </section>
      </div>
    </>
  );
}
