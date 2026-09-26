"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: "view" | "hover" | "both";
}

const DEFAULT_CHARS = "✦✧★☆✺❋⁕✾♦ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&!@";

export function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = DEFAULT_CHARS,
  className = "",
  encryptedClassName = "opacity-70 text-[var(--kuro-pink)]",
  parentClassName = "inline-block",
  animateOn = "view",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20px" });

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
    : characters.split("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentIteration = 0;

    const shouldAnimate =
      (animateOn === "view" && isInView) ||
      (animateOn === "hover" && isHovered) ||
      (animateOn === "both" && (isInView || isHovered));

    if (shouldAnimate && !isScrambling) {
      setIsScrambling(true);

      interval = setInterval(() => {
        setDisplayText((_) => {
          return text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (sequential) {
                if (index < Math.floor((currentIteration / maxIterations) * text.length)) {
                  return char;
                }
              } else {
                if (currentIteration >= maxIterations) {
                  return char;
                }
              }
              const randomChar =
                availableChars[Math.floor(Math.random() * availableChars.length)];
              return randomChar;
            })
            .join("");
        });

        currentIteration++;

        if (currentIteration > maxIterations) {
          clearInterval(interval);
          setIsScrambling(false);
          setDisplayText(text);
        }
      }, speed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isInView, isHovered, text, speed, maxIterations, sequential, animateOn]);

  const handleMouseEnter = () => {
    if (animateOn === "hover" || animateOn === "both") {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (animateOn === "hover" || animateOn === "both") {
      setIsHovered(false);
    }
  };

  return (
    <span
      ref={containerRef}
      className={parentClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={isScrambling ? encryptedClassName : className}>
        {displayText}
      </span>
    </span>
  );
}
