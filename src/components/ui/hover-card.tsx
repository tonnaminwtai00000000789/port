import React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "../../lib/utils";

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 rounded-xl p-4 shadow-xl outline-none animate-in zoom-in-90",
        className
      )}
      style={{
        background: "var(--kuro-surface-2)",
        border: "1px solid var(--kuro-border-bright)",
        color: "var(--kuro-skull)",
        boxShadow: "0 0 24px rgba(155,48,217,0.2)",
      }}
      {...props}
    />
  </HoverCardPrimitive.Portal>
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
