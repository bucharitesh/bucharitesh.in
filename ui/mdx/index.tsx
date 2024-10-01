import { FOCUS_VISIBLE_OUTLINE, LINK_STYLES, OOF_GRAD } from "@/lib/constants"
import { Aside } from "@/ui/mdx/aside"
import { BlurImage } from "@/ui/mdx/blur-image"
import { Code } from "./code"
import { Filesystem } from "./file-system"
import { Grid } from "./grid"
import { FauxTweet } from "./faux-tweet"
import { LoadingSkeleton } from "./loading-skeleton"
import { cn } from "@/lib/utils"
import type { ImageProps } from "next/image"
import NextLink from "next/link"
import React from "react"
import { Caption } from "./caption"
import { LinkPreview } from "./link-preview"
// import { CopyButton } from "../copy-button"
import { useMDXComponent } from "next-contentlayer/hooks"
import { ComponentPreview } from "./component-preview"
import { ComponentSource } from "./component-source"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs"

export const components = {
  // One off components
  // Import these components globally until importing components directly inside
  // .mdx files is supported again.
  // https://github.com/contentlayerdev/contentlayer/issues/309
  LoadingSkeleton,
  Code,
  Filesystem,
  FauxTweet,

  // Global components
  Grid,
  Aside,

  ComponentPreview,
  ComponentSource: (props: any) => <ComponentSource {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("m-0 border-t p-0", className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
    <Tabs className={cn("relative mt-6 w-full", className)} {...props} />
  ),
  TabsList: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsList>) => (
    <TabsList
      className={cn(
        "w-full justify-start rounded-none border-b bg-transparent p-0",
        className,
      )}
      {...props}
    />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      className={cn(
        "relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
        className,
      )}
      {...props}
    />
  ),
  TabsContent: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        "relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
        className,
      )}
      {...props}
    />
  ),
  h1: (props: any) => (
    <h2
      className="relative mt-3 border-t-2 border-primary-200/5 pt-9 text-xl font-medium text-primary-200/95 sm:text-3xl"
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "font-heading mt-6 mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: (props: any) => (
    <h4 className="text-xl font-medium text-primary-200/95" {...props} />
  ),
  h4: (props: any) => (
    <h5 className="text-lg font-medium text-primary-200/95" {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  hr: (props: any) => (
    <hr className="border-t-2 border-primary-200/5" {...props} />
  ),
  a: ({ href = "", ...props }) => {
    if (href.startsWith("http")) {
      return (
        <a
          className={cn(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)}
          href={href}
          target="_blank"
          rel="noopener"
          {...props}
        />
      )
    }

    return (
      <NextLink
        href={href}
        className={cn(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)}
        {...props}
      />
    )
  },
  ul: (props: any) => (
    <ul
      className="space-y-3 [li>&]:mt-3 [&>li]:relative [&>li]:pl-7 before:[&>li]:absolute before:[&>li]:left-1 before:[&>li]:top-2 before:[&>li]:h-1.5 before:[&>li]:w-1.5 before:[&>li]:rounded-full before:[&>li]:bg-primary-200/20"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol className="list-decimal space-y-3 pl-10 my-5" {...props} />
  ),
  strong: (props: any) => <strong className="font-semibold" {...props} />,
  Img: ({
    children,
    bleed,
    caption,
    ...props
  }: {
    children: React.ReactNode
    bleed?: boolean
    caption?: string
  } & ImageProps) => {
    return (
      <>
        <div
          className={cn("my-4", {
            "xl:!col-start-2 xl:!col-end-4": bleed === true,
          })}
        >
          <BlurImage {...props} />
        </div>
        {caption ? <Caption>{caption}</Caption> : null}
      </>
    )
  },
  // Since markdown blockquotes don't have native support for citations, we
  // reserve `<em>` to style citations.
  blockquote: (props: any) => (
    <blockquote
      className={cn(
        "relative border-l-2 border-primary-200/5 pl-4 pt-8 before:absolute before:top-5 before:-ml-1 before:-mt-6 before:text-6xl before:text-primary-200/20 before:content-['“'] [&_em]:mt-3 [&_em]:block [&_em]:not-italic [&_em]:leading-none [&_em]:before:pr-1 [&_em]:before:content-['—']",
        OOF_GRAD,
      )}
      {...props}
    />
  ),
  del: (props: any) => (
    <del className="text-primary-200/50 line-through" {...props} />
  ),
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),
  LinkPreview: (props: any) => <LinkPreview {...props} />,
}

interface MDXProps {
  code: string
  className?: string
}

export function Mdx({ code, className }: MDXProps) {
  const Component = useMDXComponent(code)

  return (
    <article className={cn("", className)}>
      <Component components={components} />
    </article>
  )
}