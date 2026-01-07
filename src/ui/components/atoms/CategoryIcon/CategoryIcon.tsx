"use client";

import { Media, SectionsIcon } from "@payload-types";

import { AtomImage, AtomImageVariant, AtomWrapper } from "@atoms";
import { cn } from "@utils";
import { useState } from "react";

interface CategoryIconProps {
  icons?: SectionsIcon;
  activeIcon?: Media;
  inactiveIcon?: Media;
  variant: AtomImageVariant;
  wrapper:
    | "category_icon_wrapper"
    | "defense_aside_icon"
    | "weapons_aside_icon"
    | "zone_aside_icon"
    | "input_search_button_wrapper";
  active: boolean;
  wrapper_active?: boolean;
  onClick?: () => void;
  noHover?: boolean;
}

export const CategoryIcon = ({
  icons,
  variant,
  active,
  wrapper = "category_icon_wrapper",
  onClick,
  wrapper_active,
  noHover = false,
  activeIcon,
  inactiveIcon,
}: CategoryIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AtomWrapper
      onMouseEnter={() => !noHover && setIsHovered(true)}
      onMouseLeave={() => !noHover && setIsHovered(false)}
      variant={wrapper}
      onClick={onClick}
      data-active={wrapper_active}
    >
      <AtomImage
        image={inactiveIcon || (icons?.icon as Media)}
        variant={variant}
        className={cn(!active && !isHovered && "opacity-100")}
      />
      <AtomImage
        image={activeIcon || (icons?.icon_active as Media)}
        variant={variant}
        className={cn((active || isHovered) && "opacity-100")}
      />
    </AtomWrapper>
  );
};
