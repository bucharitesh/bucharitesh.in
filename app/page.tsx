import { meta } from "@/lib/config";
import { COMMON_SCRIPT_ORG } from "@/lib/script";
import { Metadata } from "next/types";
import MapLocation from "@/components/shared/compoenents/map";
import ViewMagnifier from "@/components/shared/compoenents/view-magnifier";
// import { SelfImage } from "@/old/ui/ProfileImage";
import Info from "@/components/home/info";

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
      <Info />
      <div className="layout-sm relative z-10 grid gap-y-8 px-4 pt-12 xl:layout-xl xl:gap-x-9 xl:px-0 [&>*]:col-start-2 xl:[&>*]:col-start-3">
        <header className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0"
            style={{ aspectRatio: "1 / 1" }}
          >
            {/* <SelfImage /> */}
          </div>
          <div>
            <h1 className="text-base sm:text-l">
              <span className="font-bold">Hi, I am Ritesh.</span>{" "}
              <span className={`font-normal dark:text-gray-500 text-gray-600`}>
                What I'm learning about shipping great products, becoming a
                better developer, and growing a career in tech.
              </span>
            </h1>
          </div>
        </header>

        <section className="mt-12">
          <h2 className="mb-3 text-lg font-medium">About</h2>
          <p>
            What I'm learning about shipping great products, becoming a better
            developer, and growing a career in tech.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="mb-3 text-lg font-medium">Where</h2>
          <ViewMagnifier>
            <MapLocation />
          </ViewMagnifier>
        </section>
      </div>
    </>
  );
}
