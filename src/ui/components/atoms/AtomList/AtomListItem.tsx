"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils";

const variants = cva("w-full", {
  variants: {
    variant: {
      default: "",
      column_section_view: cn(
        "relative nth-of-type-[2n]:bg-main-border bg-aside-li-gradient relative",
        "border-x-[8px] border-x-transparent",
        "after:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:h-[1px]",
        "before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[1px]"
      ),
    },
    defaultVariants: {
      variant: "default",
    },
  },
});

interface AtomListItemProps {
  children: React.ReactNode;
  variant?: VariantProps<typeof variants>["variant"];
  className?: string;
}

export const AtomListItem = ({
  children,
  variant,
  className,
}: AtomListItemProps) => {
  return <li className={cn(variants({ variant, className }))}>{children}</li>;
};
