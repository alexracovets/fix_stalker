"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils";

const variants = cva("outline-none border-[1px] border-main-border", {
  variants: {
    variant: {
      default: "flex flex-col gap-y-[16px]",
      column_section_view: "flex flex-col w-full border-none bg-accordion-bg",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface AtomListProps {
  children: React.ReactNode;
  variant?: VariantProps<typeof variants>["variant"];
  className?: string;
}

export const AtomList = ({ children, variant, className }: AtomListProps) => {
  return <ul className={cn(variants({ variant, className }))}>{children}</ul>;
};
