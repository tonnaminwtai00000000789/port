"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  maxAngle?: number;
  glareOpacity?: number;
  scaleOnHover?: number;
}

export function TiltedCard({
  children,
  className = "",
  containerClassName = "",
  maxAngle = 12,
  glareOpacity = 0.25,
  scaleOnHover = 1.02,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [maxAngle, -maxAngle]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxAngle, maxAngle]), {
    stiffness: 300,
    damping: 25,
  });
  const scale = useSpring(isHovered ? scaleOnHover : 1, {
    stiffness: 300,
    damping: 25,
  });

  const glareX = useTransform(x, [0, 1], [0, 100]);
  const glareY = useTransform(y, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div className={cn("perspective-1000", containerClassName)}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className={cn("relative transition-shadow duration-300", className)}
      >
        {children}

        {/* Glare overlay */}
        {glareOpacity > 0 && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-20 overflow-hidden"
            style={{
              opacity: isHovered ? glareOpacity : 0,
              background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255, 255, 255, 0.35) 0%, rgba(255,255,255,0) 70%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
