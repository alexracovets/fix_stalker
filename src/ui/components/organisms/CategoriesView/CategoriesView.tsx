"use client";

import { Section } from "@payload-types";

import { ListColumns, ListGrid } from "@molecules";
import { useSectionViewStore } from "@store";

interface CategoriesViewProps {
  sections: Section[] | null | undefined;
}

export const CategoriesView = ({ sections }: CategoriesViewProps) => {
  const { isList } = useSectionViewStore();
  return (
    <>
      {isList ? (
        <ListColumns sections={sections as Section[]} />
      ) : (
        <ListGrid sections={sections as Section[]} />
      )}
    </>
  );
};
