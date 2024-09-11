import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !message) {
      return NextResponse.json(
        { error: "Name, and message are required" },
        { status: 400 },
      )
    }

    // Create new support entry
    const newSupportEntry = await prisma.support.create({
      data: {
        name,
        email,
        message,
      },
    })

    return NextResponse.json(newSupportEntry, { status: 201 })
  } catch (error) {
    console.error("Error creating support entry:", error)
    return NextResponse.json(
      { error: "Error creating support entry" },
      { status: 500 },
    )
  }
}
