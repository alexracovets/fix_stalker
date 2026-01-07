"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils";

const variants = cva("", {
  variants: {
    variant: {
      default: "w-full border-t border-main-hr",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface AtomHRProps {
  variant: VariantProps<typeof variants>["variant"];
  className?: string;
}

export const AtomHR = ({ variant, className }: AtomHRProps) => {
  return <hr className={cn(variants({ variant }), className)} />;
};
