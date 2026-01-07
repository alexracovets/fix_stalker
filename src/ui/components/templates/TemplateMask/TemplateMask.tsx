"use client";

import { ElementsPage, Media } from "@payload-types";

import { AtomHR, AtomText, AtomWrapper, RichText, AtomImage } from "@atoms";
import { ElementTableResistance, ElementTableDetails } from "@molecules";

interface TemplateMaskProps {
  data: ElementsPage;
}

export const TemplateMask = ({ data }: TemplateMaskProps) => {
  const maskData = data.mask_group;
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
          <RichText text={data.description} />
          {maskData && (
            <ElementTableResistance items={maskData.resistance} />
          )}
        </AtomWrapper>
        <AtomWrapper variant="content_suits_wrapper_right">
          <AtomImage image={data.image as Media} variant="element_suit" />
          {maskData && (
            <ElementTableDetails items={maskData.details} />
          )}
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};
