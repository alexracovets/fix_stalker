"use client";

import { Section } from "@payload-types";

import { ListColumnsItem } from "./ListColumnsItem";
import { Accordion } from "@atoms";

interface ListColumnsProps {
  sections: Section[];
}

export const ListColumns = ({ sections }: ListColumnsProps) => {
  return (
    <div className="w-full max-w-[100%]">
      <Accordion type="multiple">
        <div className="grid grid-cols-[1fr_1fr] gap-[48px]">
          <div className="flex flex-col gap-y-[48px] h-fit">
            {sections.map((section, idx) =>
              idx % 2 === 0 ? (
                <ListColumnsItem section={section} idx={idx} key={idx} />
              ) : null
            )}
          </div>
          <div className="flex flex-col gap-y-[48px] h-fit">
            {sections.map((section, idx) =>
              idx % 2 !== 0 ? (
                <ListColumnsItem section={section} idx={idx} key={idx} />
              ) : null
            )}
          </div>
        </div>
      </Accordion>
    </div>
  );
};
