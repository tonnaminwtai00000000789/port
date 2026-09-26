"use client";

import React from "react";
import { FloatingStars } from "../reactbits/FloatingStars";
import LightRays from "../reactbits/LightRays";

export function BackgroundEffect() {
  return (
    <>
      {/* Ambient Top Light Rays */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <LightRays
          raysOrigin="top-center"
          raysColor="#c060ff"
          raysSpeed={1.2}
          lightSpread={0.8}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.05}
          distortion={0.04}
        />
      </div>

      {/* Floating decorative stars */}
      <FloatingStars count={20} />
    </>
  );
}
