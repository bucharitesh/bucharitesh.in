import { USER } from '@/config/user';
import merge from 'lodash.merge';
import type { Metadata } from 'next';

type MetadataGenerator = Omit<Metadata, 'description' | 'title'> & {
  title: string;
  description: string;
  image?: string;
};

const applicationName = USER.name;
const author: Metadata['authors'] = {
  name: USER.name,
  url: 'https://bucharitesh.in/',
};
const publisher = USER.name;
const twitterHandle = '@bucharitesh';
const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const productionUrl = 'https://bucharitesh.in/';

export const createMetadata = ({
  title,
  description,
  image,
  ...properties
}: MetadataGenerator): Metadata => {
  const parsedTitle = `${title} | ${USER.name}`;
  const defaultMetadata: Metadata = {
    title: parsedTitle,
    description,
    applicationName: USER.name,
    metadataBase: productionUrl
      ? new URL(`${protocol}://${productionUrl}`)
      : undefined,
    authors: [author],
    creator: author.name,
    formatDetection: {
      telephone: false,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: parsedTitle,
    },
    openGraph: {
      title: parsedTitle,
      description,
      type: 'website',
      siteName: applicationName,
      locale: 'en_US',
    },
    publisher,
    twitter: {
      card: 'summary_large_image',
      creator: twitterHandle,
    },
  };

  const metadata: Metadata = merge(defaultMetadata, properties);

  if (image && metadata.openGraph) {
    metadata.openGraph.images = [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      },
    ];
  }

  return metadata;
};
