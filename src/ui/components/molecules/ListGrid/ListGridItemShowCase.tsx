"use client";

import { ElementsPage } from "@payload-types";

import { ListGridItemShowCaseLink } from "@molecules";
import { AtomWrapper } from "@atoms";

interface ListGridItemShowCaseProps {
  elements: ElementsPage[];
}

export const ListGridItemShowCase = ({
  elements,
}: ListGridItemShowCaseProps) => {
  return (
    <AtomWrapper variant="list_grid_item_showcase">
      {elements?.map((element, idx) => (
        <ListGridItemShowCaseLink key={idx} element={element} />
      ))}
    </AtomWrapper>
  );
};
