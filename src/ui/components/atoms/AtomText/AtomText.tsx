"use client";

import { cva, VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@utils";

const variants = cva("", {
  variants: {
    variant: {
      default:
        "text-[20px] font-roboto font-regular text-main-white-light leading-[1.45]",
      logo_title: cn(
        "text-[22px] font-regular font-calibri text-main-gray-light uppercase flex justify-between items-center w-full"
      ),
      header_top: cn(
        "text-[1.6rem] text-main-white-light font-roboto",
        "transition-opacity ease-in-out duration-300"
      ),
      destructive_label: cn(
        "text-[1.8rem] font-roboto text-main-destructive-label"
      ),
      h1: cn(
        "text-[32px] font-roboto_condensed font-medium text-main-destructive-bg"
      ),
      description: cn("text-[18px] font-roboto text-main-yellow"),
      showcase_title: cn(
        "text-[20px] font-roboto font-medium text-main-white-light leading-[1.45] underline"
      ),
      table_title: cn("text-[16px] font-roboto leading-[1.5]"),
      object_effects_item_title: cn(
        "text-[20px] font-roboto font-[700] leading-[1.45] text-main-white-light"
      ),
      object_effects_item_description: cn(
        "text-[20px] font-roboto font-regular leading-[1.45] text-main-white-light"
      ),
      author: cn(
        "text-[20px] font-medium font-roboto text-main-white-light leading-[1.45]",
        "border-b-[2px] border-main-white-light"
      ),
      aside_li: cn("text-[26px] font-semibold font-roboto_condensed"),
      aside_search_button_text: cn(
        "text-[26px] font-roboto_condensed font-regular text-main-destructive-bg leading-none whitespace-nowrap",
        "data-[active=true]:text-main-yellow",
        "transition-all ease-in-out duration-300"
      ),
      weapon_addition_title: cn(
        "text-[20px] font-roboto font-semibold text-main-white-light leading-[1.45]"
      ),
      weapon_addition: cn(
        "text-[20px] font-roboto font-regular text-main-white-light leading-[1.45] underline"
      ),
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface AtomTextProps {
  variant: VariantProps<typeof variants>["variant"];
  className?: string;
  asChild?: boolean;
  children?: React.ReactNode;
}

export const AtomText = ({
  className,
  variant,
  asChild = false,
  children,
  ...props
}: AtomTextProps) => {
  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      data-slot="text"
      className={cn(variants({ variant, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
};
