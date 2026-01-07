"use client";

import { AsidePDABorder } from "./AsidePDABorder";
import { AsideContext } from "@molecules";
import { AtomWrapper } from "@atoms";

export const AsidePDA = () => {
  return (
    <AtomWrapper variant="aside_wrapper" asChild>
      <aside>
        <AsidePDABorder />
        <AsideContext />
      </aside>
    </AtomWrapper>
  );
};
