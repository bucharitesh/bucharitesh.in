import {
  Body,
  Container,
  Head,
  Html,
  Text,
  Preview,
  Tailwind,
  Section,
  Img,
} from "@react-email/components"
import Footer from "./footer"
import { meta } from "@/lib/constants"

export default function EmailBody(
  {
  email,
  marketing = false,
  children
}: {
  email: string
  marketing?: boolean
  children: React.ReactNode,
}) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Bucharitesh.in</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans text-[#fb7185]">
          <svg
            className="pointer-events-none fixed isolate z-50 mix-blend-soft-light"
            width="100%"
            height="100%"
          >
            <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.80"
                numOctaves="4"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>

          <Container className="relative mx-auto my-10 overflow-hidden bg-[#1c1917] max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <div className="pointer-events-none absolute inset-0 overflow-hidden bg-blend-overlay z-0">
              <div className="h-full bg-[url('https://res.cloudinary.com/bucha/image/upload/h_500/bg_gradient_fmgwrc')] bg-top bg-no-repeat opacity-[0.3]" />
            </div>

            <Section className="mt-8 z-20">
              <Img
                src={meta.image.profile}
                height="40"
                alt="Dub"
                className="mx-auto my-0 rounded-full bg-white"
              />
            </Section>

            {children}
            <Text className="text-sm font-bold leading-6 text-[#f43f5e]">
              {meta.name}
            </Text>
            <Footer email={email} marketing={marketing} unsubscribe={false} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
