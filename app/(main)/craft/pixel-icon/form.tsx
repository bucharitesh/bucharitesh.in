"use client"

import { useState } from "react"
import PixelIcon from "./pixel-icon"

export default function ImageProcessor() {
  const [result, setResult] = useState<number[][] | null>(null)

  const processImage = async (imageFile: File) => {
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.readAsDataURL(imageFile)
    })

    try {
      const response = await fetch("/api/processImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64.split(",")[1] }),
      })

      if (!response.ok) {
        throw new Error("Image processing failed")
      }

      const data = await response.json()
      setResult(data.processedImage)
    } catch (error) {
      console.error("Error processing image:", error)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) processImage(file)
        }}
      />
      {result && (
        <PixelIcon
          icon={result}
          baseColor="#000000"
          glitterColors={["#ff00ff", "#20211a", "#3e4b51"]}
          changeProbability={0.1}
          pixelShape="circle"
        />
      )}
    </div>
  )
}
