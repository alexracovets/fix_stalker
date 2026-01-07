"use client";

import { useMemo } from "react";
import { AtomWrapper, AtomText } from "@atoms";
import { useInternet } from "@hooks";

export const Internet = () => {
  const isOnline = useInternet();

  const signalsElements = useMemo(
    () => ["h-[30%]", "h-[50%]", "h-[75%]", "h-[100%]"],
    []
  );

  return (
    <AtomWrapper variant="internet_wrapper">
      <AtomWrapper variant="internet_signal_wrapper">
        {signalsElements.map((element, index) => (
          <AtomWrapper
            variant="internet_signal"
            key={index}
            className={isOnline ? element : "h-[0%]"}
          />
        ))}
      </AtomWrapper>
      <AtomText variant="header_top">
        {isOnline ? "Аномальна Зона" : "Немає з'єднання"}
      </AtomText>
    </AtomWrapper>
  );
};
