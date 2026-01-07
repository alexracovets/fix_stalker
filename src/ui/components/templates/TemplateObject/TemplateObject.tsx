"use client";

import { ElementsPage, Media } from "@payload-types";

import { AtomHR, AtomText, AtomWrapper, RichText, AtomImage } from "@atoms";
import { ElementTableDetails, ObjectEffects } from "@molecules";

interface TemplateObjectProps {
    data: ElementsPage;
}

export const TemplateObject = ({ data }: TemplateObjectProps) => {
    const objectData = data.objects_group;
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
                    <AtomWrapper variant="object_effects_list">
                        <RichText text={data.description} />
                        {objectData && objectData.effects && (
                            <ObjectEffects list={objectData.effects} />
                        )}
                    </AtomWrapper>
                </AtomWrapper>
                <AtomWrapper variant="content_suits_wrapper_right">
                    <AtomImage image={data.image as Media} variant="element_object" />
                    {objectData && (
                        <ElementTableDetails items={objectData.details} />
                    )}
                </AtomWrapper>
            </AtomWrapper>
        </AtomWrapper>
    );
};
