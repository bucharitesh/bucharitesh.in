import { z } from "zod"
import prisma from "@/lib/prisma"
import { createHash } from "crypto"

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      // Fallback for localhost or non Vercel deployments
      "0.0.0.0"

    const slug = z.string().parse(params.slug)

    const currentUserId =
      // Since a users IP address is part of the sessionId in our database, we
      // hash it to protect their privacy. By combining it with a salt, we get
      // get a unique id we can refer to, but we won't know what their ip
      // address was.
      createHash("md5")
        .update(ipAddress + process.env.IP_ADDRESS_SALT!, "utf8")
        .digest("hex")

    // Identify a specific users interactions with a specific post
    const sessionId = slug + "___" + currentUserId

    const [post, user] = await Promise.all([
      // get the number of likes this post has
      prisma.post.findUnique({
        where: { slug },
      }),

      // get the number of times the current user has liked this post
      prisma.session.findUnique({
        where: { id: sessionId },
      }),
    ])

    return Response.json({
      likes: post?.likes || 0,
      currentUserLikes: user?.likes || 0,
    })
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
    const body = await request.json()

    const count = z.number().min(1).max(3).parse(body.count)

    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      // Fallback for localhost or non Vercel deployments
      "0.0.0.0"

    const slug = z.string().parse(params.slug)

    const currentUserId =
      // Since a users IP address is part of the sessionId in our database, we
      // hash it to protect their privacy. By combining it with a salt, we get
      // get a unique id we can refer to, but we won't know what their ip
      // address was.
      createHash("md5")
        .update(ipAddress + process.env.IP_ADDRESS_SALT!, "utf8")
        .digest("hex")

    const sessionId = slug + "___" + currentUserId

    // Upsert: if a row exists, update it by incrementing likes. If it
    // doesn't exist, create a new row with the number of likes this api
    // route receives
    const [post, user] = await Promise.all([
      // increment the number of times everyone has liked this post
      prisma.post.upsert({
        where: { slug },
        create: {
          slug,
          likes: count,
        },
        update: {
          likes: {
            increment: count,
          },
        },
      }),

      // increment the number of times this user has liked this post
      prisma.session.upsert({
        where: { id: sessionId },
        create: {
          id: sessionId,
          likes: count,
        },
        update: {
          likes: {
            increment: count,
          },
        },
      }),
    ])

    return Response.json({
      likes: post?.likes || 0,
      currentUserLikes: user?.likes || 0,
    })
  } catch (error: any) {
    console.error(error.message)

    return Response.json({
      statusCode: 500,
      message: error.message,
    })
  }
}
