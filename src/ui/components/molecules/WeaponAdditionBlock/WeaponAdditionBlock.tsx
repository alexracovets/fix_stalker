"use client";

import { ElementsPage, Media } from "@payload-types";
import { AtomText, AtomImage, AtomLink } from "@atoms";
import { getCollectionItem } from "@api";
import { useEffect, useState } from "react";

interface WeaponAdditionBlockProps {
  tacticalKits: ElementsPage[];
  additional?: boolean;
}

interface WeaponAdditionItemProps {
  item: ElementsPage;
}

const WeaponAdditionItem = ({ item }: WeaponAdditionItemProps) => {
  const [image, setImage] = useState<Media | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      if (typeof item.aside_image === "number") {
        const loadedImage = await getCollectionItem({
          collection: "media",
          type: true,
          id: item.aside_image,
          depth: 0,
        });
        if (loadedImage) {
          setImage(loadedImage as Media);
        }
      } else {
        setImage(item.aside_image as Media);
      }
    };

    loadImage();
  }, [item.aside_image]);

  return (
    <AtomLink href={item.slug} variant="weapon_addition" key={item.id}>
      <AtomImage image={image as Media} variant="table_icon" />
      <AtomText variant="weapon_addition">{item.title}</AtomText>
    </AtomLink>
  );
};

export const WeaponAdditionBlock = ({
  tacticalKits,
  additional,
}: WeaponAdditionBlockProps) => {
  return (
    <div className="flex flex-col w-full gap-y-[4px]">
      <AtomText variant="weapon_addition_title">
        {additional ? "До Зброї:" : "Tактичний обвіс:"}
      </AtomText>
      <div className="flex flex-col w-full gap-y-[12px]">
        {tacticalKits.map((item) => (
          <WeaponAdditionItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
