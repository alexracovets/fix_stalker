"use client";

import { useMemo } from "react";

import { AtomImage, AtomText, AtomWrapper } from "@atoms";
import { useTimer } from "@hooks";
import { cn } from "@utils";

export const Timer = () => {
  const { currentTime, isActive } = useTimer();

  const textClassName = useMemo(
    () => cn(isActive ? "opacity-100" : "opacity-0"),
    [isActive]
  );

  return (
    <AtomWrapper variant="timer_wrapper">
      <AtomText variant="header_top" className={textClassName}>
        {currentTime}
      </AtomText>
      <AtomImage
        src="/layoutPDA/battery.svg"
        alt="Battery"
        variant="battery"
        priority
      />
    </AtomWrapper>
  );
};
