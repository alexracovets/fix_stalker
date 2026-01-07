"use client";

import { ElementsPage, Section, SectionsIcon } from "@payload-types";
import { useState } from "react";

import { AtomList, AtomListItem, AtomWrapper } from "@atoms";

import {
  CategoryIcon,
  AtomLink,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@atoms";
import { cn } from "@/utils";

interface ListColumnsItemProps {
  section: Section;
  idx: number;
}

export const ListColumnsItem = ({ section, idx }: ListColumnsItemProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <AccordionItem value={`item-${idx}`}>
      <AccordionTrigger
        variant="section_view"
        className={cn(hovered && "border-main-yellow-border")}
      >
        <AtomLink
          href={section.slug}
          variant="categoryListTrigger"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <CategoryIcon
            active={false}
            icons={section.icons as SectionsIcon}
            variant="section_view"
            wrapper="category_icon_wrapper"
            noHover
          />
          {section.title}
        </AtomLink>
      </AccordionTrigger>
      <AccordionContent className="flex w-full flex-col">
        {section.elements && section.elements.length > 0 && (
          <AtomList variant="column_section_view">
            {section.elements.map(
              (element: number | ElementsPage, index: number) =>
                typeof element === "object" && (
                  <AtomWrapper variant="page_li_wrapper" key={index}>
                    <AtomListItem variant="column_section_view">
                      <AtomLink href={element.slug} variant="categoryList">
                        {element.title}
                      </AtomLink>
                    </AtomListItem>
                  </AtomWrapper>
                )
            )}
          </AtomList>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
