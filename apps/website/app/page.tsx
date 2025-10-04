import { FloatingHeader } from '@/components/navigation/floating-header';
import { ProfileImage } from '@/components/profile-image';
import { PronounceMyName } from '@/components/pronounce-my-name';
import { FlipSentences } from '@repo/design-system/components/ui/flip-sentences';
import { ScrollArea } from '@/components/scroll-area';
import { USER } from '@/config/user';
import { GitHubContribution } from '@/features/home/components/github-contribution';
import Info from '@/features/home/components/info';
import { createOgImage } from '@/lib/createOgImage';
import { JsonLd, Organization, WithContext } from '@/lib/seo/json-ld';
import { createMetadata } from '@/lib/seo/metadata';
import type { Metadata } from 'next/types';

export async function generateMetadata(): Promise<Metadata> {
  const title = USER.tagline;
  const description = USER.description;
  const image = createOgImage({
    title: title,
    meta: description,
  });
  return createMetadata({
    title: title,
    description: description,
    image: image,
  });
}

export default async function Page() {
  const jsonLd: WithContext<Organization> = {
    '@type': 'Organization',
    '@context': 'https://schema.org',
  };

  return (
    <>
      <JsonLd code={jsonLd} />
      <Info show={['time', 'screen', 'llms']} />
      <ScrollArea useScrollAreaId className="bg-grid">
        <FloatingHeader scrollTitle="Ritesh Bucha" />
        <div className="layout relative z-10 content-wrapper">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <ProfileImage />
            <div className="space-y-2">
              <div className="flex space-x-2">
                <h1 className="font-semibold text-3xl sm:text-l">
                  Ritesh Bucha
                </h1>
                <PronounceMyName namePronunciationUrl="./assets/ritesh-bucha.mp3" />
              </div>
              <div className="">
                <FlipSentences sentences={USER.flipSentences} />
              </div>
            </div>
          </header>

          <section className="mt-12">
            <h2 className="mb-3 font-medium text-lg">About</h2>
            <div className="space-y-4 text-neutral-800 dark:text-neutral-300/80">
              <p>
                I’m a senior frontend engineer based in India, specializing in
                building pixel-perfect, engaging, and accessible digital
                experiences.
              </p>
              <p>
                As a passionate engineer and also a total nerd, I enjoy building
                software in the sweet spot where design, problem-solving, and
                engineering meet — creating things that not only look good but
                are also easy to use and well-built under the hood.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <GitHubContribution />
          </section>

          {/* <section className="mt-12">
          <h2 className="mb-3 text-lg font-medium">Where</h2>
          <ViewMagnifier>
            <MapLocation />
          </ViewMagnifier>
        </section> */}
        </div>
      </ScrollArea>
    </>
  );
}
