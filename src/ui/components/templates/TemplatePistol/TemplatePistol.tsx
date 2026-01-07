"use client";

import { ElementsPage, Media } from "@payload-types";
import { AtomWrapper, AtomText, AtomHR, RichText, AtomImage } from "@atoms";
import {
  ElementTableResistance,
  WeaponAdditionBlock,
  ElementTableDetails,
  AuthorBlock,
} from "@molecules";

interface TemplatePistolProps {
  data: ElementsPage;
}

export const TemplatePistol = ({ data }: TemplatePistolProps) => {
  const pistolData = data.pistol_group;
  const tacticalKits = pistolData?.tactical_kits_relation?.docs;
  return (
    <AtomWrapper variant="content_element">
      <AtomWrapper variant="content_header">
        <AtomWrapper variant="content_top_wrapper">
          <AtomWrapper variant="content_top_title">
            <AtomText variant="h1" asChild>
              <h1>{data.title}</h1>
            </AtomText>
            <AtomText variant="description">{data.sub_title}</AtomText>
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
      <AtomWrapper variant="content_suits_wrapper">
        <AtomWrapper variant="content_suits_wrapper_left">
          <AtomHR variant="default" />
          <AtomWrapper variant="image_author_wrapper">
            <AtomImage image={data.image as Media} variant="element_pistol" />
            {pistolData?.author_image &&
              pistolData.designer_name &&
              pistolData.designer_link && (
                <AuthorBlock
                  image={pistolData.author_image as Media}
                  name={pistolData.designer_name}
                  link={pistolData.designer_link}
                />
              )}
          </AtomWrapper>
          <RichText text={data.description} />
          {pistolData && (
            <ElementTableResistance items={pistolData.resistance} />
          )}
        </AtomWrapper>
        <AtomWrapper variant="content_suits_wrapper_right">
          <WeaponAdditionBlock tacticalKits={tacticalKits as ElementsPage[]} />
          {pistolData?.details && (
            <ElementTableDetails items={pistolData?.details} variant="pistol" />
          )}
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};
