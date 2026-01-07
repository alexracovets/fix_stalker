"use client";

import { ElementsPage, Media } from "@payload-types";
import { AtomWrapper, AtomText, AtomHR, RichText, AtomImage } from "@atoms";
import { ElementTableDetails, AuthorBlock } from "@molecules";

interface TTemplateGrenadeProps {
  data: ElementsPage;
}

export const TemplateGrenade = ({ data }: TTemplateGrenadeProps) => {
  const grenadeData = data.grenade_group;

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
            {grenadeData?.author_image &&
              grenadeData.designer_name &&
              grenadeData.designer_link && (
                <AuthorBlock
                  image={grenadeData.author_image as Media}
                  name={grenadeData.designer_name}
                  link={grenadeData.designer_link}
                />
              )}
          </AtomWrapper>
          <RichText text={data.description} />
          {grenadeData?.details && (
            <ElementTableDetails
              items={grenadeData?.details}
              variant="granade"
            />
          )}
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};
