"use client";

import { AsideSectionsControl } from "./AsideSectionsControl";
import { AsideElementsControl } from "./AsideElementsControl";
import { AsideSearch } from "./AsideSearch/AsideSearch";
import { AtomHR } from "@atoms";

export const AsideContext = () => {
  return (
    <>
      <AsideSearch />
      <AsideSectionsControl />
      <AtomHR variant="default" />
      <AsideElementsControl />
    </>
  );
};
