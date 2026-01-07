"use client";

import { HeaderPDA, FooterPDA, AsidePDA, MainPDA } from "@organisms";
import { MainPDABorder } from "./MainPDABorder";
import { AtomWrapper } from "@atoms";

export const LayoutPDA = ({ children }: React.PropsWithChildren) => {
  return (
    <AtomWrapper variant="pda_layout">
      <HeaderPDA />
      <AtomWrapper variant="content_wrapper">
        <MainPDABorder />
        <AsidePDA />
        <MainPDA>{children}</MainPDA>
      </AtomWrapper>
      <FooterPDA />
    </AtomWrapper>
  );
};
