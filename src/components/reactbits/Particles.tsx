import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
}

interface ParticlesProps {
  particleCount?: number;
  particleColors?: string[];
  maxDistance?: number;
  className?: string;
}

export function Particles({
  particleCount = 28,
  particleColors = ["#c060ff", "#ff69c8", "#ede0ff"],
  maxDistance = 85,
  className = "fixed inset-0 pointer-events-none z-0",
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 90 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initialize particles with very gentle floating velocities
    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const alpha = 0.08 + Math.random() * 0.18;
      const bVx = (Math.random() - 0.5) * 0.2;
      const bVy = (Math.random() - 0.5) * 0.2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: bVx,
        vy: bVy,
        baseVx: bVx,
        baseVy: bVy,
        size: 1.2 + Math.random() * 1.8,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: alpha,
        baseAlpha: alpha,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gently return velocity towards base float speed
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

        // Mouse interaction: gentle ambient repulsion
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 0 && dist < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
          p.vx -= (dx / dist) * force * 0.06;
          p.vy -= (dy / dist) * force * 0.06;
          p.alpha = Math.min(0.35, p.baseAlpha + force * 0.15);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Soft screen wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Connect nearby particles with subtle lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distP = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distP < maxDistance) {
            const lineAlpha = (1 - distP / maxDistance) * 0.07;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, maxDistance, particleColors]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
