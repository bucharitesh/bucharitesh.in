import prisma from "@/lib/prisma"

export async function GET(
  request: Request,
) {
  try {
    const most_viewed = await prisma.post.findMany({
      orderBy: {
        views: "desc",
      },
      take: 5, // This will return only the top 10 most liked posts
      skip: 0, // This is useful for pagination
    })

    return Response.json(most_viewed);

  } catch (error: any) {
    console.error(error.message)

    return Response.json({
      statusCode: 500,
      message: error.message,
    })
  }
}