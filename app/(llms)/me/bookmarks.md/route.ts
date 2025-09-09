import { USER } from "@/config/user";
import { getBookmarks } from "@/features/bookmarks/lib/raindrop";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const bookmarks = await getBookmarks();

    if (!bookmarks || bookmarks.length === 0) {
      const content = `# Bookmarks

        No bookmarks available at the moment.
        `;
      return new Response(content, {
        headers: {
          "Content-Type": "text/markdown;charset=utf-8",
        },
      });
    }

    const content = `# Bookmarks

${bookmarks
  .map(
    (bookmark: any) =>
      `- [${bookmark.title}](https://${USER.domain}/bookmarks/${bookmark.slug})`
  )
  .join("\n")}
`;

    return new Response(content, {
      headers: {
        "Content-Type": "text/markdown;charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);

    const errorContent = `# Bookmarks

Error loading bookmarks. Please try again later.
`;

    return new Response(errorContent, {
      status: 500,
      headers: {
        "Content-Type": "text/markdown;charset=utf-8",
      },
    });
  }
}
