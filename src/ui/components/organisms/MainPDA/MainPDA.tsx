"use client";

import { AtomWrapper } from "@atoms";

export const MainPDA = ({ children }: React.PropsWithChildren) => {
  return (
    <AtomWrapper variant="main_wrapper" asChild>
      <main className="overflow-auto">{children}</main>
    </AtomWrapper>
  );
};
