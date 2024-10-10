import { meta } from "@/lib/constants";
import { COMMON_SCRIPT_ORG } from "@/lib/script";
import { Metadata } from "next";
import { CraftShowcase } from "./craft-showcase";

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

      <div className="mt-12">
        <div className="space-y-20">
          {/* <div className="text-gray-200 space-y-4 leading-snug">
            <p>
              I'm a frontend developer, optimist, and community builder. I work
              at{" "}
              <Link href="/work" className="text-blue-500 hover:text-blue-700">
                Vercel
              </Link>
              , where I teach the{" "}
              <Link
                href="/n/stack"
                className="text-blue-500 hover:text-blue-700"
              >
                Next.js
              </Link>{" "}
              community, an open-source web framework built with React.
            </p>
            <p>
              I create educational content for developers, teaching them about
              TypeScript, React and Next.js, and more. I write about{" "}
              <Link href="/n/dx" className="text-blue-500 hover:text-blue-700">
                developer experience
              </Link>
              ,{" "}
              <Link
                href="/n/developer-marketing"
                className="text-blue-500 hover:text-blue-700"
              >
                developer marketing
              </Link>
              ,{" "}
              <Link
                href="/n/devrel"
                className="text-blue-500 hover:text-blue-700"
              >
                developer relations
              </Link>
              , building{" "}
              <Link
                href="/n/devtools"
                className="text-blue-500 hover:text-blue-700"
              >
                developer tools
              </Link>
              , and{" "}
              <Link
                href="/n/moderation"
                className="text-blue-500 hover:text-blue-700"
              >
                open-source
              </Link>
              .
            </p>
            <p>
              I invest small angel checks into early stage startups building
              tools for developers.
            </p>
          </div> */}

          <CraftShowcase />
        </div>
      </div>
    </>
  );
}
