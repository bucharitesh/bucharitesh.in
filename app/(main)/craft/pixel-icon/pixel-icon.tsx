'use client';

import React, { useRef, useEffect, useState } from "react"

interface PixelIconProps {
  icon: number[][]
  baseColor: string
  glitterColors: string[]
  secondaryColor?: string
  size?: number
  changeProbability?: number
  pixelShape?: "circle" | "square"
}

const PixelIcon: React.FC<PixelIconProps> = ({
  icon,
  baseColor,
  glitterColors,
  secondaryColor = "gray",
  size = 80,
  changeProbability = 0.01,
  pixelShape = "circle",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const pixelSize = size / icon.length
    let animationId: number

    const pixelStates = icon.map((row) =>
      row.map((pixel) => ({
        colorIndex: Math.floor(Math.random() * glitterColors.length),
        changeProb: Math.random() * changeProbability,
      })),
    )

    const drawPixel = (x: number, y: number, color: string) => {
      ctx.fillStyle = color
      if (pixelShape === "circle") {
        ctx.beginPath()
        ctx.arc(
          x * pixelSize + pixelSize / 2,
          y * pixelSize + pixelSize / 2,
          pixelSize / 2,
          0,
          Math.PI * 2,
        )
        ctx.fill()
      } else {
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
      }
    }

    const drawIcon = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

      icon.forEach((row, y) => {
        row.forEach((pixel, x) => {
          const state = pixelStates[y][x]
          let color: string

          if (pixel === 1 || pixel === 2) {
            if (isHovering) {
              if (Math.random() < state.changeProb) {
                state.colorIndex = (state.colorIndex + 1) % glitterColors.length
              }
              color = glitterColors[state.colorIndex]
            } else {
              color = pixel === 1 ? baseColor : secondaryColor
            }
          } else {
            return // Skip drawing for pixel value 0
          }

          drawPixel(x, y, color)
        })
      })
    }

    const animate = () => {
      drawIcon()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [
    icon,
    isHovering,
    baseColor,
    glitterColors,
    secondaryColor,
    size,
    changeProbability,
    pixelShape,
  ])

  return (
    <div
      role="img"
      aria-label="Pixel icon"
      className="box-border"
      style={{ width: `${size}px`, height: `${size}px` }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full"
        width={size}
        height={size}
      ></canvas>
    </div>
  )
}

export default PixelIcon
