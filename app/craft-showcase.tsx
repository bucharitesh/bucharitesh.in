"use client"

import { ArrowRight, BellIcon, CalendarIcon, FileTextIcon, Share2Icon } from "lucide-react"

import { BentoCard, BentoGrid } from "@/ui/bento-grid"
import { Marquee } from "@/ui/marquee"
import { Link } from "next-view-transitions"
import { PixelIconData } from "@/registry/default/example/pixel-icon-demo"
import PixelIcon from "@/registry/default/bucharitesh/pixel-icon"

const features = [
  {
    Icon: FileTextIcon,
    name: "Pixel Icons",
    description: "Handcrafted pixel based icons",
    href: "/craft/pixel-icon",
    cta: "Read more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute flex flex-col gap-4 h-full top-6 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)]">
        <Marquee pauseOnHover className="[--duration:20s]">
          {PixelIconData.map((icon) => {
            return (
              <PixelIcon
                key={icon.name}
                icon={icon.code}
                baseColor="#0e0e0e"
                flickerColor={icon.color}
                secondaryColor="gray"
                size={80}
                flickerChance={0.2}
              />
            )
          })}
        </Marquee>
        <Marquee pauseOnHover reverse className="[--duration:20s]">
          {PixelIconData.map((icon) => {
            return (
              <PixelIcon
                key={icon.name}
                icon={icon.code}
                baseColor="#0e0e0e"
                flickerColor={icon.color}
                secondaryColor="gray"
                size={80}
                flickerChance={0.2}
              />
            )
          })}
        </Marquee>
      </div>
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Read more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute flex flex-col gap-4 h-full top-6 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)]">
        
      </div>
    ),
  },
  {
    Icon: Share2Icon,
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "#",
    cta: "Read more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute flex flex-col gap-4 h-full top-6 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)]">
        
      </div>
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Read more",
    background: (
      <div className="absolute flex flex-col gap-4 h-full top-6 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)]">
        
      </div>
    ),
  },
]

export function CraftShowcase() {
  return (
    <div className="font-semibold space-y-10">
      <h3 className="text-2xl text-primary-500/90 mb-10">
        Crafts
      </h3>
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
      <Link
        href="/blog"
        className="flex font-bold items-center justify-end hover:underline transition-all hover:underline-offset-4 text-primary-300/90 text-xs self-center gap-2 group"
      >
        view all
        <ArrowRight className="w-2 h-2 group-hover:translate-x-1 transition-all" />
      </Link>
    </div>
  )
}
