"use client";

import Image from "next/image";

import { AtomWrapper } from "@atoms";

export const AtomLoader = () => {
  return (
    <AtomWrapper variant="loader_wrapper">
      <Image
        src="/svg/loader.svg"
        alt="loader"
        priority={true}
        sizes="100%"
        width={16}
        height={16}
        unoptimized={true}
        className="animate-spin"
      />
    </AtomWrapper>
  );
};
