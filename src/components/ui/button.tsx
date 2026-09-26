"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[9px] text-sm font-bold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "kuro-btn text-white",
        pink:
          "kuro-btn-pink text-[#1a0020]",
        outline:
          "kuro-btn-outline",
        ghost:
          "text-[var(--kuro-skull-dim)] hover:bg-[rgba(155,48,217,0.1)] hover:text-[var(--kuro-primary-glow)] rounded-[9px]",
        link:
          "text-[var(--kuro-primary-glow)] underline-offset-4 hover:underline p-0 h-auto font-bold",
        destructive:
          "bg-[var(--kuro-red)] text-white hover:brightness-110",
      },
      size: {
        default: "h-9 px-5 py-2 text-sm",
        sm: "h-7 px-3 py-1.5 text-xs",
        lg: "h-11 px-8 py-3 text-base",
        icon: "h-9 w-9 p-0",
        xs: "h-6 px-2.5 py-1 text-[11px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
