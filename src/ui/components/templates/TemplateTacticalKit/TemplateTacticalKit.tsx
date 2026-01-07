"use client";

import { ElementsPage, Media } from "@payload-types";
import { AtomWrapper, AtomText, AtomHR, RichText, AtomImage } from "@atoms";
import {
  WeaponAdditionBlock,
  ElementTableDetails,
  AuthorBlock,
} from "@molecules";

interface TemplateTacticalKitProps {
  data: ElementsPage;
}

export const TemplateTacticalKit = ({ data }: TemplateTacticalKitProps) => {
  const tacticalKitData = data.tactical_kit_group;
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
            <AtomImage image={data.image as Media} variant="element_granade" />
            {tacticalKitData?.author_image &&
              tacticalKitData.designer_name &&
              tacticalKitData.designer_link && (
                <AuthorBlock
                  image={tacticalKitData.author_image as Media}
                  name={tacticalKitData.designer_name}
                  link={tacticalKitData.designer_link}
                />
              )}
          </AtomWrapper>
          <RichText text={data.description} />
          {tacticalKitData?.details && (
            <ElementTableDetails
              items={tacticalKitData?.details}
              variant="granade"
            />
          )}
        </AtomWrapper>
        <AtomWrapper variant="content_suits_wrapper_right">
          <WeaponAdditionBlock
            additional
            tacticalKits={tacticalKitData?.relation as ElementsPage[]}
          />
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};
