import { NextRequest, NextResponse } from "next/server"
import sharp from "sharp"

const processImage = async (imageBuffer: Buffer): Promise<number[][]> => {
  const image = sharp(imageBuffer)
  const metadata = await image.metadata()

  if (metadata.width !== 96 || metadata.height !== 96) {
    throw new Error("Image is not 96x96")
  }

  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true })

  const rows: number[][] = []

  for (let i = 0; i < 96; i += 4) {
    const cols: number[] = []
    for (let j = 0; j < 96; j += 4) {
      const pixelIndex = ((i + 2) * 96 + (j + 2)) * info.channels
      const r = data[pixelIndex]
      const g = data[pixelIndex + 1]
      const b = data[pixelIndex + 2]

      // Calculate intensity similar to RMagick's implementation
      const intensity = Math.round((r * 0.299 + g * 0.587 + b * 0.114) * 257)

      if (intensity <= 5910) {
        cols.push(0)
      } else if (intensity <= 26213) {
        cols.push(1)
      } else {
        cols.push(2)
      }
    }
    rows.push(cols)
  }

  return rows
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const imageBuffer = Buffer.from(body.image, "base64")
    const processedImage = await processImage(imageBuffer)
    return NextResponse.json({ processedImage }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 },
      )
    }
  }
}
