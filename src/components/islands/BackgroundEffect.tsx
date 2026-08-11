import React, { useEffect, useState } from "react";

export function BackgroundEffect() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [visible]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 overflow-hidden"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div
        className="absolute w-[500px] h-[500px] rounded-full transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${pos.x - 250}px, ${pos.y - 250}px)`,
          background: `radial-gradient(circle, rgba(37, 99, 235, 0.045) 0%, rgba(254, 240, 138, 0.035) 45%, transparent 70%)`,
        }}
      />
    </div>
  );
}
