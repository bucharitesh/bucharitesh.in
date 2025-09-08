import Script from "next/script";
import {
  BlogPosting,
  Organization,
  TechArticle,
  WithContext,
} from "schema-dts";
import { USER } from "@/config/user";
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
      name: USER.name,
      url: `https://${USER.domain}`,
    },
    url: `https://${USER.domain}/blog/${data.slug}/`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://${USER.domain}/blog/${data.slug}/`,
    },
    image: data.image,
    publisher: {
      "@type": "Person",
      name: USER.name,
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
      name: USER.name,
      url: `https://${USER.domain}`,
    },
    datePublished: formatSchemaOrgDate(data.published_at),
    dateModified: formatSchemaOrgDate(data.published_at),
    publisher: {
      "@type": "Person",
      name: USER.name,
    },
    image: data.image,
    articleBody: data.description,
    url: `https://${USER.domain}/craft/${data.slug}/`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://${USER.domain}/craft/${data.slug}/`,
    },
  };
}

const CommonJsonLd: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  email: USER.email,
  image: USER.image.profile,
  description: USER.description,
  name: USER.name,
  telephone: "+91 93651 80200",
  url: `https://${USER.domain}`,
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
}: {
  title: string;
  description: string;
  slug: string;
  published_at: string;
  image: string;
}) {
  return (
    <Script
      id="blog-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          createBlogJsonLd({ title, description, slug, published_at, image }),
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
}: {
  title: string;
  description: string;
  slug: string;
  published_at: string;
  image: string;
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
          }),
        ),
      }}
    />
  );
}
