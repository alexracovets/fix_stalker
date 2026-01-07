"use client";

import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

import { cn } from "@utils";

const variants = cva("outline-none!", {
  variants: {
    variant: {
      default: "bg-red",
      home_link: cn(
        "text-[32px] text-main-white uppercase font-roboto_condensed font-medium w-[390px] h-[40px] relative clip_startBtn flex justify-center items-center",
        "after:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-[url('/png/btn_home.png')] after:bg-cover after:opacity-0",
        "hover:after:opacity-[1]",
        "active:after:opacity-[1] active:bg-main-white active:text-main-black"
      ),
      pda_link: cn(
        "block text-[2.5rem] font-normal font-roboto_condensed py-[2.5rem] px-[3rem] cursor-pointer text-main-gray relative",
        "before:content-[var(--before-content)] before:absolute before:left-0 before:top-0 before:w-full before:h-full",
        "before:flex before:justify-center before:items-center",
        "before:transition-all before:ease-in-out before:duration-100 before:will-change-auto",
        "hover:before:text-main-white-active hover:before:font-medium"
      ),
      categoryListTrigger: cn(
        "flex justify-start items-center gap-x-[16px] w-full text-[26px] text-switch-bg font-[500] font-roboto_condensed h-full",
        "p-[16px] bg-accordion-bg rounded-l-[4px] overflow-hidden"
      ),
      categoryList: cn(
        "flex justify-start items-center gap-x-[16px] w-full text-[26px] text-switch-bg font-[400] font-roboto_condensed h-full underline",
        "p-[16px] overflow-hidden pl-[52px] relative",
        "before:content-[''] before:absolute before:left-[32px] before:top-[50%] before:w-[6px] before:h-[6px] before:translate-y-[-50%] before:translate-x-[-100%] before:bg-main-white before:rounded-full"
      ),
      category_grid_trigger: cn(
        "flex justify-start items-center gap-x-[16px] w-fit text-[26px] text-switch-bg font-[500] font-roboto_condensed h-full",
        "p-[16px] rounded-l-[4px] overflow-hidden"
      ),
      list_grid_item_showcase: cn(
        "flex flex-col gap-y-[8px] justify-center items-center w-[19.2rem]",
        "transition-text ease-in-out duration-300"
      ),
      author_link: cn("flex justify-start items-center gap-x-[8px]"),
      aside_li: cn(
        "flex justify-start items-center gap-x-[16px] w-full relative bg-aside-li-gradient cursor-pointer",
        "border-x-[8px] border-x-transparent px-[16px] py-[14px]",
        "after:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:h-[1px]",
        "before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[1px]"
      ),
      weapon_addition: cn(
        "flex justify-start items-center gap-x-[8px] w-full"
      ),
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface AtomLinkProps {
  variant?: VariantProps<typeof variants>["variant"];
  className?: string;
  children?: React.ReactNode;
  href: string;
  style?: React.CSSProperties;
  target?: string;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const AtomLink = ({
  variant,
  className,
  children,
  href,
  style,
  onMouseEnter,
  onMouseLeave,
  target,
  ...props
}: AtomLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(variants({ variant, className }))}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </Link>
  );
};
