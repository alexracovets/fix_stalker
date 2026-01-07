"use client";

import { ElementsPage, Media } from "@payload-types";
import { AtomWrapper, AtomText, AtomHR, RichText, AtomImage } from "@atoms";
import {
  WeaponAdditionBlock,
  ElementTableDetails,
  AuthorBlock,
} from "@molecules";

interface TemplateAmmoProps {
  data: ElementsPage;
}

export const TemplateAmmo = ({ data }: TemplateAmmoProps) => {
  const ammoData = data.ammo_group;
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
            {ammoData?.author_image &&
              ammoData.designer_name &&
              ammoData.designer_link && (
                <AuthorBlock
                  image={ammoData.author_image as Media}
                  name={ammoData.designer_name}
                  link={ammoData.designer_link}
                />
              )}
          </AtomWrapper>
          <RichText text={data.description} />
          {ammoData?.details && (
            <ElementTableDetails items={ammoData?.details} variant="granade" />
          )}
        </AtomWrapper>
        <AtomWrapper variant="content_suits_wrapper_right">
          <WeaponAdditionBlock
            additional
            tacticalKits={ammoData?.relation_ammo as ElementsPage[]}
          />
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};
