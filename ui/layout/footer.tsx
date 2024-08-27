import {
  BUILT_WITH,
  FOCUS_VISIBLE_OUTLINE,
  FOOTER_ITEMS,
  LINK_SUBTLE_STYLES,
} from "@/lib/constants"
import clsx from "clsx"
import Link from "next/link";


const FooterItem = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link
      key={href}
      href={href}
      className={clsx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
    >
      {label}
    </Link>
  )
}

export const Footer = () => {
  return (
    <div className="mt-36 pb-36 text-base">
      <div className="text-primary-100/50 flex flex-col justify-between font-medium lg:flex-row">
        {Object.keys(FOOTER_ITEMS).map((key) => (
          <div
            key={key}
            className="flex justify-between font-medium lg:flex-row"
          >
            <div className="flex flex-col space-y-5">
              {FOOTER_ITEMS[key].map((item) => (
                <FooterItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-primary-200/30">
        Built with{" "}
        <span className="font-bold">
          {BUILT_WITH.map((item, index) => (
            <>
              {index === BUILT_WITH.length - 1 && "and "}
              <Link
                key={item.href}
                href={item.href}
                className={clsx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
              >
                {item.label}
              </Link>
              {index < BUILT_WITH.length - 1 && ", "}
            </>
          ))}
        </span>
      </p>
    </div>
  )
}
