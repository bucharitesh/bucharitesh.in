import { headers } from 'next/headers';

export const getDomain = async () => {
  const headersList = await headers();
  let domain = headersList.get('host') as string;

  if (domain === 'localhost:6969' || domain.endsWith('.vercel.app')) {
    // for local development and preview URLs
    domain = 'bucharitesh.in';
  }

  return domain;
};

export const addPathToBaseURL = async (path: string) =>
  `https://${await getDomain()}${path}`;
