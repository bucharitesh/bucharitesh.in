export type PostMetadata = {
  title: string;
  description: string;
  date: string;
  published: boolean;
  type: string;
  theme: string;
  image: string;
  video: string;
  aspect_ratio: number;
  href: string;
  blurImage: string | null;
};

export type Post = {
  /** Parsed frontmatter metadata from the MDX file. */
  metadata: PostMetadata;
  /** Slug derived from the MDX filename (without extension). */
  slug: string;
  /** MDX content body without frontmatter. */
  content: string;
};
