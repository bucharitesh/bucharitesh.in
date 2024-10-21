import { meta } from "@/lib/constants";
import { Metadata } from "next";
import { COMMON_SCRIPT_ORG } from "../lib/script";

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
        <p>Ritesh Bucha</p>
      </div>
    </>
  );
}
