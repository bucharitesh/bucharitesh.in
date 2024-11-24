"use client";

import React, { useEffect, useRef } from "react";

interface PixelGridProps {
  squareSize?: number;
  gridGap?: number;
  size?: number;
  className?: string;
  imageUrl: string;
}

const PixelGrid: React.FC<PixelGridProps> = ({
  squareSize = 2,
  gridGap = 1,
  size = 100,
  className,
  imageUrl,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loadAndProcessImage = async () => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;

      img.onload = () => {
        const dpr = window.devicePixelRatio || 1;

        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;

        const cols = Math.floor(size / (squareSize + gridGap));
        const rows = cols; // Since we're using a square canvas

        // Create a temporary canvas to draw the original image
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
        if (!tempCtx) return;

        // Set temp canvas size to match original image
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;

        // Draw the original image onto the temp canvas
        tempCtx.drawImage(img, 0, 0, img.width, img.height);

        // Clear the main canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const pixelSize = squareSize * dpr;
        const gap = gridGap * dpr;

        // Calculate the scaling factors
        const scaleX = img.width / cols;
        const scaleY = img.height / rows;

        // Draw pixels on the main canvas
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const sourceX = Math.floor(i * scaleX);
            const sourceY = Math.floor(j * scaleY);
            const sourceWidth = Math.ceil(scaleX);
            const sourceHeight = Math.ceil(scaleY);

            // Sample the color from the temp canvas
            const sampleData = tempCtx.getImageData(sourceX, sourceY, sourceWidth, sourceHeight);
            
            // Calculate average color
            let r = 0, g = 0, b = 0, a = 0;
            for (let k = 0; k < sampleData.data.length; k += 4) {
              r += sampleData.data[k];
              g += sampleData.data[k + 1];
              b += sampleData.data[k + 2];
              a += sampleData.data[k + 3];
            }
            const pixelCount = sampleData.data.length / 4;
            r = Math.round(r / pixelCount);
            g = Math.round(g / pixelCount);
            b = Math.round(b / pixelCount);
            a = a / pixelCount / 255; // Normalize alpha to 0-1 range

            const pixelX = i * (pixelSize + gap);
            const pixelY = j * (pixelSize + gap);

            // Set fill style with alpha
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize);
          }
        }
      };
    };

    loadAndProcessImage();
  }, [imageUrl, size, squareSize, gridGap]);

  return (
    <canvas
      ref={canvasRef}
      className={`size-full ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default PixelGrid;