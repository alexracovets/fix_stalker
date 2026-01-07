"use client";

import { AtomButton, AtomWrapper, IconGrid, IconList } from "@atoms";
import { useSectionViewStore } from "@store";
import { cn } from "@utils";

export const CategoriesViewSwitch = () => {
  const { isList, setIsList } = useSectionViewStore();

  return (
    <AtomWrapper variant="view_switch">
      <AtomButton
        type="button"
        variant="view_switch"
        onClick={() => setIsList(true)}
        className={cn(isList ? "bg-switch-bg" : "bg-switch-bg-active")}
      >
        <IconList isActive={isList} />
      </AtomButton>
      <AtomButton
        type="button"
        variant="view_switch"
        onClick={() => setIsList(false)}
        className={cn(!isList ? "bg-switch-bg" : "bg-switch-bg-active")}
      >
        <IconGrid isActive={!isList} />
      </AtomButton>
    </AtomWrapper>
  );
};
