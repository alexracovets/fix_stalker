"use client";

import { ElementsPage, Section, SectionsIcon } from "@payload-types";

import { AtomLink, AtomWrapper, CategoryIcon } from "@atoms";
import { ListGridItemShowCase } from "@molecules";

interface ListGridItemProps {
  section: Section;
}

export const ListGridItem = ({ section }: ListGridItemProps) => {
  return (
    <AtomWrapper variant="list_grid_item">
      <AtomLink href={section.slug} variant="category_grid_trigger">
        <CategoryIcon
          active={false}
          icons={section.icons as SectionsIcon}
          variant="section_view"
          wrapper="category_icon_wrapper"
        />
        {section.title} :
      </AtomLink>
      <ListGridItemShowCase elements={section.elements as ElementsPage[]} />
    </AtomWrapper>
  );
};
