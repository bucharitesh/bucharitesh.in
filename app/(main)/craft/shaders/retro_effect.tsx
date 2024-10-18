'use client';

import React, { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { useControls } from "leva";

const fragmentShader = `
  precision highp float;
  uniform float colorNum;
  uniform float pixelSize;
  uniform vec2 resolution;
  uniform sampler2D inputBuffer;

  const float bayerMatrix8x8[64] = float[64](
    0.0/ 64.0, 48.0/ 64.0, 12.0/ 64.0, 60.0/ 64.0,  3.0/ 64.0, 51.0/ 64.0, 15.0/ 64.0, 63.0/ 64.0,
    32.0/ 64.0, 16.0/ 64.0, 44.0/ 64.0, 28.0/ 64.0, 35.0/ 64.0, 19.0/ 64.0, 47.0/ 64.0, 31.0/ 64.0,
    8.0/ 64.0, 56.0/ 64.0,  4.0/ 64.0, 52.0/ 64.0, 11.0/ 64.0, 59.0/ 64.0,  7.0/ 64.0, 55.0/ 64.0,
    40.0/ 64.0, 24.0/ 64.0, 36.0/ 64.0, 20.0/ 64.0, 43.0/ 64.0, 27.0/ 64.0, 39.0/ 64.0, 23.0/ 64.0,
    2.0/ 64.0, 50.0/ 64.0, 14.0/ 64.0, 62.0/ 64.0,  1.0/ 64.0, 49.0/ 64.0, 13.0/ 64.0, 61.0/ 64.0,
    34.0/ 64.0, 18.0/ 64.0, 46.0/ 64.0, 30.0/ 64.0, 33.0/ 64.0, 17.0/ 64.0, 45.0/ 64.0, 29.0/ 64.0,
    10.0/ 64.0, 58.0/ 64.0,  6.0/ 64.0, 54.0/ 64.0,  9.0/ 64.0, 57.0/ 64.0,  5.0/ 64.0, 53.0/ 64.0,
    42.0/ 64.0, 26.0/ 64.0, 38.0/ 64.0, 22.0/ 64.0, 41.0/ 64.0, 25.0/ 64.0, 37.0/ 64.0, 21.0 / 64.0
  );

  vec3 dither(vec2 uv, vec3 color) {
    int x = int(uv.x * resolution.x) % 8;
    int y = int(uv.y * resolution.y) % 8;
    float threshold = bayerMatrix8x8[y * 8 + x] - 0.88;
    color.rgb += threshold;
    color.r = floor(color.r * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
    color.g = floor(color.g * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
    color.b = floor(color.b * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
    return color;
  }

  void main() {
    vec2 normalizedPixelSize = pixelSize / resolution;  
    vec2 uvPixel = normalizedPixelSize * floor(gl_FragCoord.xy / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, uvPixel / resolution);
    color.rgb = dither(uvPixel / resolution, color.rgb);
    gl_FragColor = color;
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

interface RetroImageProps {
  src: string;
  width?: number;
  height?: number;
}

const RetroImage: React.FC<RetroImageProps> = ({
  src,
  width = 500,
  height = 500,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const { colorNum, pixelSize } = useControls({
    colorNum: {
      value: 8,
      min: 2,
      max: 16,
      step: 1,
    },
    pixelSize: {
      value: 4,
      min: 1,
      max: 16,
      step: 1,
    },
  });

  const initScene = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    rendererRef.current = new THREE.WebGLRenderer({ canvas, antialias: true });
    rendererRef.current.setSize(width, height);

    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const loader = new THREE.TextureLoader();
    loader.load(
      src,
      (texture) => {
        materialRef.current = new THREE.ShaderMaterial({
          uniforms: {
            colorNum: { value: colorNum },
            pixelSize: { value: pixelSize },
            resolution: { value: new THREE.Vector2(width, height) },
            inputBuffer: { value: texture },
          },
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
        });

        const plane = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          materialRef.current
        );
        sceneRef.current?.add(plane);

        rendererRef.current?.render(sceneRef.current, cameraRef.current);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the texture", error);
      }
    );
  }, [src, width, height, colorNum, pixelSize]);

  useEffect(() => {
    initScene();
    return () => {
      rendererRef.current?.dispose();
    };
  }, [initScene]);

  useEffect(() => {
    if (
      materialRef.current &&
      rendererRef.current &&
      sceneRef.current &&
      cameraRef.current
    ) {
      materialRef.current.uniforms.colorNum.value = colorNum;
      materialRef.current.uniforms.pixelSize.value = pixelSize;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  }, [colorNum, pixelSize]);

  return (
    <div style={{ width, height, position: "relative" }}>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default RetroImage;
