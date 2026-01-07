"use client";

import { ElementsPage, Media } from "@payload-types";
import { AtomWrapper, AtomText, AtomHR, RichText, AtomImage } from "@atoms";
import {
  ElementTableResistance,
  WeaponAdditionBlock,
  ElementTableDetails,
  AuthorBlock,
} from "@molecules";

interface TemplateMachineGunProps {
  data: ElementsPage;
}

export const TemplateMachineGun = ({ data }: TemplateMachineGunProps) => {
  const machineGunData = data.machine_gun_group;

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
            {machineGunData?.author_image &&
              machineGunData.designer_name &&
              machineGunData.designer_link && (
                <AuthorBlock
                  image={machineGunData.author_image as Media}
                  name={machineGunData.designer_name}
                  link={machineGunData.designer_link}
                />
              )}
          </AtomWrapper>
          <RichText text={data.description} />
          {machineGunData && (
            <ElementTableResistance items={machineGunData.resistance} />
          )}
        </AtomWrapper>
        <AtomWrapper variant="content_suits_wrapper_right">
          <WeaponAdditionBlock tacticalKits={[]} />
          {machineGunData?.details && (
            <ElementTableDetails
              items={machineGunData?.details}
              variant="pistol"
            />
          )}
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};
