import { headers } from "next/headers";

export function urlToName(url: string) {
    return url.replace(/(^\w+:|^)\/\//, "");
  }
  
  export function addQueryParams(
    urlString: string,
    query: Record<string, string>
  ): string {
    try {
      const url = new URL(urlString);
  
      for (const [key, value] of Object.entries(query)) {
        url.searchParams.set(key, value);
      }
  
      return url.toString();
    } catch {
      return urlString;
    }
  }

export const getDomain = async () => {
  const headersList = await headers();
  let domain = headersList.get("host") as string;

  if (domain === "localhost:6969" || domain.endsWith(".vercel.app")) {
    // for local development and preview URLs
    domain = "bucharitesh.in";
  }

  return domain;
}

export const addPathToBaseURL = async (path: string) => `https://${await getDomain()}${path}`;