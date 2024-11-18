import { meta } from "@/lib/constants";
import { COMMON_SCRIPT_ORG } from "../lib/script";
import { Metadata } from "next/types";

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
          <h2 className="mb-3 font-medium text-white">Where</h2>
          <div className="relative h-fit w-full overflow-hidden rounded-xl">
            <img
              src="/assets/map/cloud.webp"
              width="100%"
              height="100%"
              alt=""
              draggable="false"
              className="absolute animate-cloud opacity-75 blur-sm"
            />
            <img
              src="/assets/map/plane.webp"
              width="24"
              height="56"
              alt=""
              draggable="false"
              className="absolute -translate-x-96 animate-plane [animation-delay:5s]"
            />
            <img
              src="/assets/map/plane-shadow.webp"
              width="24"
              height="24"
              alt=""
              draggable="false"
              className="absolute -translate-x-96 animate-plane-shadow [animation-delay:5s]"
            />
            <img
              width="100%"
              height="100%"
              src="/assets/map/map.webp"
              alt="Map with marker of Bengaluru, India"
              loading="eager"
              draggable="false"
              className="rounded-xl"
            />

            <a
              href="https://en.wikipedia.org/wiki/Bangalore"
              target="_blank"
              rel="noreferrer"
              className="exclude absolute bottom-0 right-0 mb-3 mr-3 select-none rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1.5 text-[0.6rem] text-neutral-600"
            >
              Bengaluru, India
            </a>
            <div aria-hidden>
              <div className="absolute left-2/3 top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-marker rounded-full bg-blue-500"></div>
              <div className="absolute left-2/3 top-1/2 z-10 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-neutral-50 bg-blue-500 shadow-marker"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
