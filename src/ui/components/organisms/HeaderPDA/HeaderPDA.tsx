"use client";

import { HeaderPDATop } from "./HeaderPDATop";
import { NavigationPDA } from "@molecules";
import { AtomWrapper } from "@atoms";

export const HeaderPDA = () => {
  return (
    <AtomWrapper variant="pda_header" asChild>
      <header>
        <HeaderPDATop />
        <NavigationPDA />
      </header>
    </AtomWrapper>
  );
};
