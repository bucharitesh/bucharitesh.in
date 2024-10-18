'use client'

import React, { useEffect, useRef } from "react";

interface DitheredImageProps {
  src: string;
  width?: number;
  height?: number;
}

const DitheredImage: React.FC<DitheredImageProps> = ({
  src,
  width = 300,
  height = 300,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const ditheredData = floydSteinbergDithering(imageData);
      ctx.putImageData(ditheredData, 0, 0);
    };
  }, [src, width, height]);

  const floydSteinbergDithering = (imageData: ImageData): ImageData => {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const oldR = data[i];
        const oldG = data[i + 1];
        const oldB = data[i + 2];

        const newR = oldR < 128 ? 0 : 255;
        const newG = oldG < 128 ? 0 : 255;
        const newB = oldB < 128 ? 0 : 255;

        data[i] = newR;
        data[i + 1] = newG;
        data[i + 2] = newB;

        const errR = oldR - newR;
        const errG = oldG - newG;
        const errB = oldB - newB;

        if (x < width - 1) {
          data[i + 4] += (errR * 7) / 16;
          data[i + 5] += (errG * 7) / 16;
          data[i + 6] += (errB * 7) / 16;
        }

        if (y < height - 1) {
          if (x > 0) {
            data[i + width * 4 - 4] += (errR * 3) / 16;
            data[i + width * 4 - 3] += (errG * 3) / 16;
            data[i + width * 4 - 2] += (errB * 3) / 16;
          }

          data[i + width * 4] += (errR * 5) / 16;
          data[i + width * 4 + 1] += (errG * 5) / 16;
          data[i + width * 4 + 2] += (errB * 5) / 16;

          if (x < width - 1) {
            data[i + width * 4 + 4] += (errR * 1) / 16;
            data[i + width * 4 + 5] += (errG * 1) / 16;
            data[i + width * 4 + 6] += (errB * 1) / 16;
          }
        }
      }
    }

    return imageData;
  };

  return (
    <div className="flex justify-center items-center">
      <canvas ref={canvasRef} className="border border-gray-300" />
    </div>
  );
};

export default DitheredImage;
