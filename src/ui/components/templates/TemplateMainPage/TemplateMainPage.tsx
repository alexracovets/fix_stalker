"use client";

import { MainPage, Section } from "@payload-types";

import { AtomHR, AtomText, AtomWrapper } from "@atoms";
import { CategoriesViewSwitch } from "@molecules";
import { CategoriesView } from "@organisms";

interface TemplateMainPageProps {
  data: MainPage;
}

export const TemplateMainPage = ({ data }: TemplateMainPageProps) => {
  return (
    <AtomWrapper variant="content">
      <AtomWrapper variant="content_header">
        <AtomWrapper variant="content_top_wrapper">
          <AtomWrapper variant="content_top_title">
            <AtomText variant="h1" asChild>
              <h1>{data.title}</h1>
            </AtomText>
            <AtomText variant="description">{data.sub_title}</AtomText>
          </AtomWrapper>
          <AtomHR variant="default" className="max-w-[679px]" />
        </AtomWrapper>
        <CategoriesViewSwitch />
      </AtomWrapper>
      <CategoriesView sections={data.sections as Section[]} />
    </AtomWrapper>
  );
};
