"use client";

import { AtomImage } from "@atoms";

export const AsidePDABorder = () => {
  return (
    <div className="absolute right-0 top-0 h-full w-[.8rem] select-none pointer-events-none">
      <AtomImage
        src="/layoutPDA/vertical_center.png"
        variant="aside_right"
        alt="aside_right"
        noLoader
      />
    </div>
  );
};
