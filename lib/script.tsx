import Script from "next/script";
import {
  BlogPosting,
  Organization,
  TechArticle,
  WithContext,
} from "schema-dts";
import { meta } from "@/lib/config";
import { formatSchemaOrgDate } from "@/lib/formatShortDate";

function createBlogJsonLd(data: {
  title: string;
  description: string;
  slug: string;
  published_at: string;
  image: string;
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
    image: data.image,
    publisher: {
      "@type": "Person",
      name: meta.name,
    },
    datePublished: formatSchemaOrgDate(data.published_at),
    dateModified: formatSchemaOrgDate(data.published_at),
  };
}

function createCodeSnippetJsonLd(data: {
  slug: string;
  title: string;
  published_at: string;
  description: string;
  image: string;
}): WithContext<TechArticle> {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: data.title,
    description: data.description,
    author: {
      "@type": "Person",
      name: meta.name,
      url: `https://${meta.domain}`,
    },
    datePublished: formatSchemaOrgDate(data.published_at),
    dateModified: formatSchemaOrgDate(data.published_at),
    publisher: {
      "@type": "Person",
      name: meta.name,
    },
    image: data.image,
    articleBody: data.description,
    url: `https://${meta.domain}/craft/${data.slug}/`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://${meta.domain}/craft/${data.slug}/`,
    },
  };
}

const CommonJsonLd: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  email: meta.email,
  image: meta.image.profile,
  description: meta.description,
  name: meta.name,
  telephone: "+91 93651 80200",
  url: `https://${meta.domain}`,
  sameAs: [
    "https://www.facebook.com/bucharitesh",
    "https://twitter.com/bucha_ritesh",
    "https://instagram.com/bucha._.ritesh",
    "https://www.linkedin.com/in/bucharitesh/",
    "https://github.com/bucharitesh",
    "https://bucharitesh.in",
  ],
};

export function COMMON_SCRIPT_ORG() {
  return (
    <Script
      id="personal-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(CommonJsonLd),
      }}
    />
  );
}

export function BLOG_SCRIPT_ORG({
  title,
  description,
  slug,
  published_at,
  image,
}) {
  return (
    <Script
      id="blog-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          createBlogJsonLd({ title, description, slug, published_at, image })
        ),
      }}
    />
  );
}

export function SNIPPET_SCRIPT_ORG({
  title,
  description,
  slug,
  published_at,
  image,
}) {
  return (
    <Script
      id="snippet-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          createCodeSnippetJsonLd({
            title,
            description,
            slug,
            published_at,
            image,
          })
        ),
      }}
    />
  );
}
