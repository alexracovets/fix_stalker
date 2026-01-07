"use client";

import { MainPage, Section, SectionsIcon } from "@payload-types";

import { CategoryIcon, AtomButton, AtomWrapper } from "@atoms";

import { useNavigationStore } from "@store";
import { useNavigation } from "@hooks";

export const AsideSectionsControl = () => {
  const { sections, activeSection } = useNavigation();
  const { setSwitchedSectionAside } = useNavigationStore();
  const nameSection = (sections?.[0]?.parent as MainPage)?.slug as
    | "defense"
    | "weapons"
    | "zone";
  if (!nameSection) return null;
  return (
    <AtomWrapper variant="aside_control_wrapper">
      <AtomButton variant="destructive">A</AtomButton>
      <AtomWrapper variant={`${nameSection}_aside_control_inner`}>
        {(sections as Section[])?.map((section: Section) => {
          return (
            <CategoryIcon
              key={section.id}
              icons={section.icons as SectionsIcon}
              variant="aside_view"
              wrapper={`${nameSection}_aside_icon`}
              active={section === activeSection}
              wrapper_active={section === activeSection}
              onClick={() => setSwitchedSectionAside(section)}
            />
          );
        })}
      </AtomWrapper>
      <AtomButton variant="destructive">D</AtomButton>
    </AtomWrapper>
  );
};
