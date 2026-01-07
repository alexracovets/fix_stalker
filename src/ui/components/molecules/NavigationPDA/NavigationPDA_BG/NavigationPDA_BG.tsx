"use client";

import { AtomImage, AtomWrapper } from "@atoms";

export const NavigationPDA_BG = () => {
  return (
    <>
      <AtomWrapper variant="navigation_selection_wrapper" className="left-0">
        <AtomImage
          src="/layoutPDA/left_selection.png"
          alt="left"
          priority
          variant="navigation_selection"
        />
      </AtomWrapper>
      <AtomWrapper variant="navigation_selection_wrapper" className="right-0">
        <AtomImage
          src="/layoutPDA/right_selection.png"
          alt="right"
          priority
          variant="navigation_selection"
        />
      </AtomWrapper>
    </>
  );
};
