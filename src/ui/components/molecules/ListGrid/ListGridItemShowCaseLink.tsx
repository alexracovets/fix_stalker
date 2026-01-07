"use client";

import { ElementsPage, Media } from "@payload-types";
import { useState } from "react";

import { AtomImage, AtomLink, AtomText } from "@atoms";
import { cn } from "@utils";

interface ListGridItemShowCaseLinkProps {
  element: ElementsPage;
}

export const ListGridItemShowCaseLink = ({
  element,
}: ListGridItemShowCaseLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AtomLink
      href={element.slug}
      variant="list_grid_item_showcase"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {typeof element === "object" && element.image && (
        <AtomImage
          image={element.image as Media}
          variant="grid_showcase"
          noCover
        />
      )}
      <AtomText
        variant="showcase_title"
        className={cn(isHovered && "text-main-yellow")}
      >
        {element.title}
      </AtomText>
    </AtomLink>
  );
};
