"use client";

import { Section } from "@payload-types";

import { AtomWrapper } from "@atoms";
import { ListGridItem } from "@molecules";

interface ListGridProps {
  sections: Section[];
}

export const ListGrid = ({ sections }: ListGridProps) => {
  return (
    <AtomWrapper variant="list_grid_wrapper">
      {sections.map((section, idx) => (
        <ListGridItem section={section} key={idx} />
      ))}
    </AtomWrapper>
  );
};
