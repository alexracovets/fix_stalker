"use client";

import { Internet, Timer } from "@molecules";
import { AtomImage } from "@atoms";

export const HeaderPDATop = () => {
  return (
    <div className="flex justify-center items-center">
      <Internet />
      <AtomImage
        src={"/layoutPDA/header_layout.png"}
        alt="header_layout"
        variant="header_layout"
        priority
        noLoader
      />
      <Timer />
    </div>
  );
};
