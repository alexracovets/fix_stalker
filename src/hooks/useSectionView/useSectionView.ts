"use client";

import { useSectionViewStore } from "@store";

export const useSectionView = () => {
  const { isList, setIsList } = useSectionViewStore();

  return { isList, setIsList };
};
