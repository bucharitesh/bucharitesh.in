'use client';

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D tDiffuse;
uniform vec2 uResolution;

varying vec2 vUv;

float valueAtPoint(sampler2D image, vec2 coord, vec2 texel, vec2 point) {
    vec3 luma = vec3(0.299, 0.587, 0.114);
    return dot(texture2D(image, coord + texel * point).xyz, luma);
}

float diffuseValue(int x, int y) {
    return valueAtPoint(tDiffuse, vUv, vec2(1.0 / uResolution.x, 1.0 / uResolution.y), vec2(float(x), float(y))) * 0.6;
}

float getValue(int x, int y) {
    return diffuseValue(x, y);
}

float combinedSobelValue() {
    const mat3 Gx = mat3(-1, -2, -1, 0, 0, 0, 1, 2, 1);
    const mat3 Gy = mat3(-1, 0, 1, -2, 0, 2, -1, 0, 1);

    float tx0y0 = getValue(-1, -1);
    float tx0y1 = getValue(-1, 0);
    float tx0y2 = getValue(-1, 1);
    float tx1y0 = getValue(0, -1);
    float tx1y1 = getValue(0, 0);
    float tx1y2 = getValue(0, 1);
    float tx2y0 = getValue(1, -1);
    float tx2y1 = getValue(1, 0);
    float tx2y2 = getValue(1, 1);

    float valueGx = Gx[0][0] * tx0y0 + Gx[1][0] * tx1y0 + Gx[2][0] * tx2y0 +
                    Gx[0][1] * tx0y1 + Gx[1][1] * tx1y1 + Gx[2][1] * tx2y1 +
                    Gx[0][2] * tx0y2 + Gx[1][2] * tx1y2 + Gx[2][2] * tx2y2;

    float valueGy = Gy[0][0] * tx0y0 + Gy[1][0] * tx1y0 + Gy[2][0] * tx2y0 +
                    Gy[0][1] * tx0y1 + Gy[1][1] * tx1y1 + Gy[2][1] * tx2y1 +
                    Gy[0][2] * tx0y2 + Gy[1][2] * tx1y2 + Gy[2][2] * tx2y2;

    float G = (valueGx * valueGx) + (valueGy * valueGy);
    return clamp(G, 0.0, 1.0);
}

void main() {
    float sobelValue = combinedSobelValue();
    sobelValue = smoothstep(0.01, 0.03, sobelValue);

    vec4 lineColor = vec4(1.0, 1.0, 1.0, 1.0);  // White color

    if (sobelValue > 0.1) {
        gl_FragColor = lineColor;
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);  // Transparent background
    }
}
`;

interface SketchImageProps {
  src: string;
  width?: number;
  height?: number;
}

const SketchImage: React.FC<SketchImageProps> = ({
  src,
  width = 500,
  height = 500,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true, // Enable alpha channel in the render buffer
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Set clear color to transparent

    const geometry = new THREE.PlaneGeometry(2, 2);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(src);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const sketchShader = {
      uniforms: {
        tDiffuse: { value: null },
        uResolution: { value: new THREE.Vector2(width, height) },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    };

    const sketchPass = new ShaderPass(sketchShader);
    sketchPass.renderToScreen = true;
    composer.addPass(sketchPass);

    const animate = () => {
      requestAnimationFrame(animate);
      composer.render();
    };

    animate();

    return () => {
      renderer.dispose();
      composer.dispose();
    };
  }, [src, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ background: "transparent" }}
    />
  );
};

export default SketchImage;
