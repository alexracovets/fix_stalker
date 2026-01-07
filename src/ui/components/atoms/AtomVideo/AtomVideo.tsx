"use client";

import { cva, VariantProps } from "class-variance-authority";

import { AtomWrapper } from "@atoms";
import { cn } from "@utils";

const variants = cva("", {
  variants: {
    variant: {
      default: "w-full",
      home_video: cn("w-full h-full object-cover relative"),
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface AtomVideoProps {
  wrapperVariant: VariantProps<typeof AtomWrapper>["variant"];
  videoVariant: VariantProps<typeof variants>["variant"];
  videoSrc: string;
  videoType: string;
}

export const AtomVideo = ({
  wrapperVariant,
  videoVariant,
  videoSrc,
  videoType,
}: AtomVideoProps) => {
  return (
    <AtomWrapper variant={wrapperVariant}>
      <video
        muted
        autoPlay
        loop
        className={cn(variants({ variant: videoVariant }))}
      >
        <source src={videoSrc} type={videoType} />
      </video>
    </AtomWrapper>
  );
};
