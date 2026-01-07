"use client";

import { AtomImage, AtomLink, AtomText } from "@atoms";

import { Media } from "@payload-types";

interface AuthorBlockProps {
  image: Media;
  name: string;
  link: string;
}

export const AuthorBlock = ({ image, name, link }: AuthorBlockProps) => {
  return (
    <AtomLink variant="author_link" href={link} target="_blank">
      <AtomImage image={image} variant="table_icon" />
      <AtomText variant="author">{name}</AtomText>
    </AtomLink>
  );
};
