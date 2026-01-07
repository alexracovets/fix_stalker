"use client";

import { ElementsPage, Media } from "@payload-types";

import { AtomText, AtomWrapper, AtomImage, AtomLink } from "@atoms";

import { useNavigation } from "@hooks";

export const AsideElementsControl = () => {
  const { elements, activeElement } = useNavigation();
  return (
    <AtomWrapper variant="aside_elements_control_wrapper" asChild>
      <ul>
        {elements?.map((element) => {
          const elementData = element as ElementsPage;
          return (
            <li key={elementData.id}>
              <AtomLink
                href={elementData.slug}
                data-active={elementData === activeElement}
                variant="aside_li"
              >
                {elementData.aside_image && (
                  <AtomImage
                    image={elementData.aside_image as Media}
                    variant="table_icon"
                  />
                )}
                <AtomText variant="aside_li">{elementData.title}</AtomText>
              </AtomLink>
            </li>
          );
        })}
      </ul>
    </AtomWrapper>
  );
};
