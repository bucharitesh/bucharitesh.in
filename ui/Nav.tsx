import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import { ChatBubbleBottomCenterTextIcon } from "@/ui/icons"
import {
  CommandLineIcon,
} from "@heroicons/react/24/solid"
import clsx from "clsx"
import Link from "next/link"
import React, { ElementType } from "react"

function NavItem({
  children,
  href,
  isActive,
  Icon,
}: {
  children: React.ReactNode
  href: string
  isActive?: boolean
  Icon: ElementType
}) {
  return (
    <Link href={href} className={clsx("group", FOCUS_VISIBLE_OUTLINE)}>
      <div className="sm:flex sm:items-center sm:space-x-2">
        <div className="mb-1.5 flex justify-center sm:mb-0 sm:block">
          <div
            className={clsx(
              "rounded-lg bg-gradient-to-tl from-primary-500/80 to-primary-400/80 p-1 shadow-lg transition-all duration-300 ease-out group-hover:scale-[1.2] group-hover:rounded-[10px] group-hover:shadow-primary-500/40 group-active:translate-y-1",
              {
                "ring-[2px] ring-primary-500/30 ring-offset-1 ring-offset-black/5":
                  isActive,
              },
            )}
          >
            <Icon className="w-[16px] transform text-primary-100 transition delay-100 duration-500 ease-out group-hover:scale-110" />
          </div>
        </div>
        <div className="transition-colors group-hover:text-primary-50">
          {children}
        </div>
      </div>
    </Link>
  )
}

export const Nav = () => {
  return (
    <div className="flex items-center space-x-3 text-base font-medium leading-none text-primary-100/90 lg:space-x-6">
      <NavItem href="/blog" Icon={ChatBubbleBottomCenterTextIcon}>
        Blog
      </NavItem>
      <NavItem href="/snippet" Icon={CommandLineIcon}>
        Snippets
      </NavItem>
    </div>
  )
}
