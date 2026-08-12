import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md font-mono text-[0.7rem] font-bold tracking-wide border transition-all duration-150 select-none",
  {
    variants: {
      variant: {
        default:
          "kuro-badge",
        pink:
          "kuro-badge-pink",
        outline:
          "border-[var(--kuro-border-bright)] bg-transparent text-[var(--kuro-skull-dim)] hover:border-[var(--kuro-primary-glow)] hover:text-[var(--kuro-primary-glow)]",
        green:
          "border-[rgba(77,255,180,0.4)] bg-[rgba(77,255,180,0.08)] text-[var(--kuro-green)]",
        yellow:
          "border-[rgba(255,224,75,0.4)] bg-[rgba(255,224,75,0.08)] text-[var(--kuro-yellow)]",
        ghost:
          "border-transparent bg-[rgba(155,48,217,0.08)] text-[var(--kuro-muted-bright)]",
      },
      size: {
        default: "px-2.5 py-0.5",
        sm: "px-2 py-0.5 text-[0.63rem]",
        lg: "px-3 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
