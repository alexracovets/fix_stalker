"use client";

import { cva, VariantProps } from "class-variance-authority";
import { Media } from "@payload-types";
import { useState } from "react";
import Image from "next/image";

import { cn } from "@utils";
import { AtomLoader } from "@atoms";

interface AtomImageProps {
  image?: Media;
  src?: string;
  alt?: string;
  variant: VariantProps<typeof variants>["variant"];
  priority?: boolean;
  className?: string;
  noLoader?: boolean;
  noCover?: boolean;
}

const variants = cva("", {
  variants: {
    variant: {
      default: "w-full",
      home_logo: "w-[391px] h-[110px]",
      header_layout: cn(
        "w-[164.7rem] h-[4.1rem] select-none pointer-events-none"
      ),
      battery: cn("w-[1.6rem] h-[.8rem]"),
      line_dot: cn("w-[8.5rem] h-[2.5rem]"),
      line_dot_small: cn("w-[4.4rem] h-[1.7rem]"),
      navigation_selection: cn("w-[41rem] h-[8.7rem]"),
      footer_horizontal: cn("w-full h-[.8rem]"),
      footer_bottom: cn("w-full h-[.7rem]"),
      footer_left: cn("w-[.9rem] h-full"),
      footer_right: cn("w-[.9rem] h-full"),
      aside_right: cn("w-[.8rem] h-full"),
      main_left: cn("w-[.9rem] h-full"),
      main_right: cn("w-[.9rem] h-full"),
      main_top: cn("w-full h-[1rem]"),
      section_view: cn(
        "absolute left-0 top-0 w-[56px] h-[56px] opacity-0 transition-opacity ease-in-out duration-300"
      ),
      aside_view: cn(
        "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[32px] h-[32px] opacity-0 transition-opacity ease-in-out duration-300"
      ),
      grid_showcase: cn("w-[19.2rem] h-[19.2rem]"),
      element_suit: cn("w-[388px] h-[388px]"),
      element_object: cn("w-[388px] h-[256px]"),
      element_granade: cn("w-[222px] h-[222px]"),
      element_pistol: cn("w-[563px] h-[204px]"),
      table_icon: cn("w-[32px] min-w-[32px] h-[32px] min-h-[32px]"),
      input_search: cn(
        "absolute top-[50%] left-[12px] translate-y-[-50%] w-[32px] h-[32px]"
      ),
      loader: cn("w-[32px] h-[32px]"),
      input_search_button: cn(
        "absolute left-0 top-0 w-[24px] h-[24px] opacity-0 transition-opacity ease-in-out duration-300"
      ),
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const AtomImage = ({
  image,
  src,
  alt,
  variant,
  priority = false,
  className,
  noLoader = false,
  noCover = false,
}: AtomImageProps) => {
  const resolvedSrc = image?.url || src || null;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative", variants({ variant }), className)}>
      {!isLoaded && !noLoader && <AtomLoader />}
      {resolvedSrc && (
        <Image
          src={resolvedSrc}
          alt={image?.alt || alt || "image"}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
          sizes="100%"
          fill
          className={cn(
            !noCover ? "object-cover" : "object-contain",
            "transition-opacity ease-in-out duration-300",
            !isLoaded && !noLoader && "opacity-0"
          )}
          unoptimized={true}
        />
      )}
    </div>
  );
};

export type AtomImageVariant = VariantProps<typeof variants>["variant"];
