import { meta } from "@/lib/config";
import { COMMON_SCRIPT_ORG } from "@/lib/script";
import { Metadata } from "next/types";
import Info from "@/components/home/info";
import { ProfileImage } from "@/components/profile-image";
import { PronounceMyName } from "@/components/home/pronounce-my-name";
import MyActivityCalendar from "@/components/home/activity-calendar";
import { getGithubContributions } from "@/lib/github";
import { RaycastBackground } from "@/components/backgrounds/raycast";
import { FlipSentences } from "@/components/ui/flip-sentences";

export const metadata: Metadata = {
  title: meta.tagline,
  description: meta.description,
  alternates: {
    canonical: "/",
  },
};

export default async function Page() {
  const data = await getGithubContributions("bucharitesh");
  return (
    <>
      <COMMON_SCRIPT_ORG />
      <Info show={["time", "screen"]} />
      <div className="layout-sm relative z-10 grid gap-y-2 px-4 pt-12 xl:layout-xl xl:gap-x-9 xl:px-0 [&>*]:col-start-2 xl:[&>*]:col-start-3 pb-40">
        <header className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <ProfileImage />
          <div className="space-y-2">
            <div className="flex space-x-2">
              <h1 className="text-3xl font-semibold sm:text-l">
                Ritesh Bucha
              </h1>
              <PronounceMyName namePronunciationUrl="./assets/ritesh-bucha.mp3" />
            </div>
            <div className="">
              <FlipSentences sentences={meta.flipSentences} />
            </div>
          </div>
        </header>

        <section className="mt-12">
          <h2 className="mb-3 text-lg font-medium">About</h2>
          <div className="space-y-4 text-neutral-800 dark:text-neutral-300/80">
            <p>
              I’m a senior frontend engineer based in India, specializing in
              building pixel-perfect, engaging, and accessible digital
              experiences.
            </p>
            <p>
              As a passionate engineer and also a total nerd, I enjoy building
              software in the sweet spot where design, problem-solving, and
              engineering meet — creating things that not only look good but are
              also easy to use and well-built under the hood.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <MyActivityCalendar data={data} />
        </section>

        {/* <section className="mt-12">
          <h2 className="mb-3 text-lg font-medium">Where</h2>
          <ViewMagnifier>
            <MapLocation />
          </ViewMagnifier>
        </section> */}
      </div>
    </>
  );
}
