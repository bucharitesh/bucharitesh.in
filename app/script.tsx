import Script from "next/script"
import { BlogPosting, WithContext } from "schema-dts"
import { meta } from "@/lib/constants"
import { formatSchemaOrgDate } from "@/lib/formatShortDate"

function createBlogJsonLd(data: {
  title: string
  description: string
  slug: string
  published_at: string
}): WithContext<BlogPosting> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.description,
    author: {
      "@type": "Person",
      name: meta.name,
      url: `https://${meta.domain}`,
    },
    url: `https://${meta.domain}/blog/${data.slug}/`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://${meta.domain}/blog/${data.slug}/`,
    },
    image: "",
    publisher: {
      "@type": "Person",
      name: meta.name,
    },
    datePublished: formatSchemaOrgDate(data.published_at),
    dateModified: formatSchemaOrgDate(data.published_at),
  }
}

export default function BLOG_SCRIPT_ORG({ title, description, slug, published_at }) {
  return (
    <Script
      id="blog-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(createBlogJsonLd({ title, description, slug, published_at })),
      }}
    />
  )
}
