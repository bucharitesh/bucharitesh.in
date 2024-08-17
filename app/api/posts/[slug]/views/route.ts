import { z } from "zod"
import prisma from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const slug = z.string().parse(params.slug)

    const post = await prisma.post.findUnique({
      where: { slug },
    })

    return Response.json(post?.views || 1)
  } catch (error: any) {
    console.error(error.message)

    return Response.json({
      statusCode: 500,
      message: error.message,
    })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const slug = z.string().parse(params.slug)

    const post = await prisma.post.upsert({
      where: { slug },
      create: { slug, views: 1 },
      update: { views: { increment: 1 } },
    })

    return Response.json(post?.views || 1)
  } catch (error: any) {
    console.error(error.message)

    return Response.json({
      statusCode: 500,
      message: error.message,
    })
  }
}
