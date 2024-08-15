import prisma from "@/lib/prisma"

export async function GET(
  request: Request,
) {
  try {
    const all = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      }
    })

    return Response.json(all)

  } catch (error: any) {
    console.error(error.message)

    return Response.json({
      statusCode: 500,
      message: error.message,
    })
  }
}