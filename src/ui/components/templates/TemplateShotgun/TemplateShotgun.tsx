"use client";

import { ElementsPage, Media } from "@payload-types";
import { AtomWrapper, AtomText, AtomHR, RichText, AtomImage } from "@atoms";
import {
  ElementTableResistance,
  WeaponAdditionBlock,
  ElementTableDetails,
  AuthorBlock,
} from "@molecules";

interface TemplateShotgunProps {
  data: ElementsPage;
}

export const TemplateShotgun = ({ data }: TemplateShotgunProps) => {
  const shotgunData = data.shotgun_group;
  const tacticalKits = shotgunData?.tactical_kits_relation?.docs;
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
            {shotgunData?.author_image &&
              shotgunData.designer_name &&
              shotgunData.designer_link && (
                <AuthorBlock
                  image={shotgunData.author_image as Media}
                  name={shotgunData.designer_name}
                  link={shotgunData.designer_link}
                />
              )}
          </AtomWrapper>
          <RichText text={data.description} />
          {shotgunData && (
            <ElementTableResistance items={shotgunData.resistance} />
          )}
        </AtomWrapper>
        <AtomWrapper variant="content_suits_wrapper_right">
          <WeaponAdditionBlock tacticalKits={tacticalKits as ElementsPage[]} />
          {shotgunData?.details && (
            <ElementTableDetails
              items={shotgunData?.details}
              variant="pistol"
            />
          )}
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};
