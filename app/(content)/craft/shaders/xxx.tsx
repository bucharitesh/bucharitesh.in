"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useControls } from "leva";

const fragmentShader = `
  uniform sampler2D tDiffuse;
  uniform vec2 resolution;
  uniform float outlineThickness;
  uniform float colorLevels;
  uniform float saturation;

  varying vec2 vUv;

  vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    vec2 texel = vec2(1.0 / resolution.x, 1.0 / resolution.y);
    vec4 pixelColor = texture2D(tDiffuse, vUv);
    
    // Edge detection
    float edgeX = 
      abs(texture2D(tDiffuse, vUv + vec2(-1.0, 0.0) * texel).r - texture2D(tDiffuse, vUv + vec2(1.0, 0.0) * texel).r) +
      abs(texture2D(tDiffuse, vUv + vec2(-1.0, 0.0) * texel).g - texture2D(tDiffuse, vUv + vec2(1.0, 0.0) * texel).g) +
      abs(texture2D(tDiffuse, vUv + vec2(-1.0, 0.0) * texel).b - texture2D(tDiffuse, vUv + vec2(1.0, 0.0) * texel).b);
    
    float edgeY = 
      abs(texture2D(tDiffuse, vUv + vec2(0.0, -1.0) * texel).r - texture2D(tDiffuse, vUv + vec2(0.0, 1.0) * texel).r) +
      abs(texture2D(tDiffuse, vUv + vec2(0.0, -1.0) * texel).g - texture2D(tDiffuse, vUv + vec2(0.0, 1.0) * texel).g) +
      abs(texture2D(tDiffuse, vUv + vec2(0.0, -1.0) * texel).b - texture2D(tDiffuse, vUv + vec2(0.0, 1.0) * texel).b);
    
    float edge = sqrt(edgeX * edgeX + edgeY * edgeY);
    
    // Apply edge detection
    vec3 edgeColor = vec3(0.0);
    pixelColor.rgb = mix(pixelColor.rgb, edgeColor, smoothstep(0.0, outlineThickness, edge));

    // Color quantization
    pixelColor.rgb = floor(pixelColor.rgb * colorLevels) / colorLevels;

    // Increase saturation
    vec3 hsv = rgb2hsv(pixelColor.rgb);
    hsv.y *= saturation;
    pixelColor.rgb = hsv2rgb(hsv);
    
    gl_FragColor = pixelColor;
  }
`;

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

interface MoebiusRetroImageProps {
  src: string;
  width?: number;
  height?: number;
}

const MoebiusRetroImage: React.FC<MoebiusRetroImageProps> = ({
  src,
  width = 500,
  height = 500,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const { outlineThickness, colorLevels, saturation } = useControls({
    outlineThickness: { value: 0.1, min: 0, max: 0.5, step: 0.01 },
    colorLevels: { value: 5, min: 2, max: 10, step: 1 },
    saturation: { value: 1.5, min: 0.5, max: 2.5, step: 0.1 },
  });

  useEffect(() => {
    if (!canvasRef.current || !isImageLoaded) return;

    const canvas = canvasRef.current;
    rendererRef.current = new THREE.WebGLRenderer({ canvas, antialias: true });
    rendererRef.current.setSize(width, height);

    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");

    loader.load(
      src,
      (texture) => {
        const geometry = new THREE.PlaneGeometry(2, 2);
        materialRef.current = new THREE.ShaderMaterial({
          uniforms: {
            tDiffuse: { value: texture },
            resolution: { value: new THREE.Vector2(width, height) },
            outlineThickness: { value: outlineThickness },
            colorLevels: { value: colorLevels },
            saturation: { value: saturation },
          },
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
        });

        const mesh = new THREE.Mesh(geometry, materialRef.current);
        sceneRef.current?.add(mesh);

        const render = () => {
          requestAnimationFrame(render);
          if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
          }
        };

        render();
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the texture", error);
      }
    );

    return () => {
      rendererRef.current?.dispose();
      materialRef.current?.dispose();
    };
  }, [src, width, height, isImageLoaded]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsImageLoaded(true);
    img.src = src;
  }, [src]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.outlineThickness.value = outlineThickness;
      materialRef.current.uniforms.colorLevels.value = colorLevels;
      materialRef.current.uniforms.saturation.value = saturation;
    }
  }, [outlineThickness, colorLevels, saturation]);

  return (
    <div style={{ width, height, position: "relative" }}>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default MoebiusRetroImage;
