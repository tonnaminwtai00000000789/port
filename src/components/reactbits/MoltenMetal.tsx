"use client";

import React, { useRef, useEffect, useState } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";

interface MoltenMetalProps {
  color1?: string; // Hex color for dark metal base
  color2?: string; // Hex color for metallic highlight / purple sheen
  speed?: number;
  distortion?: number;
  className?: string;
  children?: React.ReactNode;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [
        parseInt(m[1], 16) / 255,
        parseInt(m[2], 16) / 255,
        parseInt(m[3], 16) / 255,
      ]
    : [0.1, 0.0, 0.15];
};

export function MoltenMetal({
  color1 = "#120018",
  color2 = "#9b30d9",
  speed = 1.0,
  distortion = 1.2,
  className = "",
  children,
}: MoltenMetalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const uniformsRef = useRef<any>(null);
  const animationIdRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current || !canvasContainerRef.current || typeof window === "undefined") return;

    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    const initWebGL = async () => {
      if (!canvasContainerRef.current || !containerRef.current) return;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio || 1, 2),
        alpha: true,
      });
      rendererRef.current = renderer;

      const gl = renderer.gl;
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      gl.canvas.style.position = "absolute";
      gl.canvas.style.inset = "0";
      gl.canvas.style.pointerEvents = "none";

      while (canvasContainerRef.current.firstChild) {
        canvasContainerRef.current.removeChild(canvasContainerRef.current.firstChild);
      }
      canvasContainerRef.current.appendChild(gl.canvas);

      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

      const frag = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform float uSpeed;
uniform float uDistortion;
uniform vec2  uMouse;

varying vec2 vUv;

// Simplex-like noise helper
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;

  float t = iTime * 0.3 * uSpeed;

  // Liquid ripple distortion
  float n1 = snoise(p * 2.5 * uDistortion + vec2(t, t * 0.8));
  float n2 = snoise(p * 4.0 * uDistortion - vec2(t * 0.6, t));
  
  // Mouse influence wave
  float dMouse = length(uv - uMouse);
  float mouseWave = sin(dMouse * 12.0 - t * 4.0) * exp(-dMouse * 3.5) * 0.3;

  float height = n1 * 0.6 + n2 * 0.4 + mouseWave;
  
  // Specular sheen & metallic reflection
  float sheen = pow(clamp(height + 0.5, 0.0, 1.0), 3.0);
  float highlight = pow(clamp(height + 0.3, 0.0, 1.0), 8.0);

  vec3 baseColor = mix(uColor1, uColor2, sheen * 0.7);
  vec3 metalShine = vec3(0.9, 0.7, 1.0) * highlight * 0.5;
  
  vec3 finalColor = baseColor + metalShine;
  float alpha = clamp(sheen * 0.45 + highlight * 0.3, 0.05, 0.65);

  gl_FragColor = vec4(finalColor, alpha);
}`;

      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        uColor1: { value: hexToRgb(color1) },
        uColor2: { value: hexToRgb(color2) },
        uSpeed: { value: speed },
        uDistortion: { value: distortion },
        uMouse: { value: [0.5, 0.5] },
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms,
        transparent: true,
      });
      const mesh = new Mesh(gl, { geometry, program });

      const handleResize = () => {
        if (!containerRef.current || !renderer) return;
        const wCSS = containerRef.current.clientWidth;
        const hCSS = containerRef.current.clientHeight;
        renderer.setSize(wCSS, hCSS);
        uniforms.iResolution.value = [wCSS * renderer.dpr, hCSS * renderer.dpr];
      };

      const loop = (time: number) => {
        if (!rendererRef.current) return;
        uniforms.iTime.value = time * 0.001;
        
        // Smooth mouse lerp
        uniforms.uMouse.value[0] += (mouseRef.current.x - uniforms.uMouse.value[0]) * 0.05;
        uniforms.uMouse.value[1] += (mouseRef.current.y - uniforms.uMouse.value[1]) * 0.05;

        renderer.render({ scene: mesh });
        animationIdRef.current = requestAnimationFrame(loop);
      };

      window.addEventListener("resize", handleResize);
      handleResize();
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupRef.current = () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
        window.removeEventListener("resize", handleResize);
        if (renderer) {
          try {
            const loseContextExt = renderer.gl.getExtension("WEBGL_lose_context");
            if (loseContextExt) loseContextExt.loseContext();
            if (renderer.gl.canvas.parentNode) {
              renderer.gl.canvas.parentNode.removeChild(renderer.gl.canvas);
            }
          } catch (e) {
            // Cleanup safe catch
          }
        }
      };
    };

    initWebGL();

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [isVisible, color1, color2, speed, distortion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: 1.0 - (e.clientY - rect.top) / rect.height,
    };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* Background WebGL canvas container */}
      <div ref={canvasContainerRef} className="absolute inset-0 pointer-events-none z-0" />
      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
