"use client";

import { DetaileTable, ElementsPage, Media } from "@payload-types";

import { AtomImage, AtomWrapper, AtomText } from "@atoms";
import { cn } from "@/utils/cn";

interface ElementTableDetailsProps {
  items: NonNullable<ElementsPage["armor_group"]>["details"];
  variant?: "pistol" | "granade";
}

interface CheckColorProps {
  power: string;
  effect: string;
}

export const ElementTableDetails = ({
  items,
  variant,
}: ElementTableDetailsProps) => {
  const checkColor = ({ power, effect }: CheckColorProps) => {
    switch (effect) {
      case "positive":
        switch (power) {
          case "low":
            return "text-effect-low";
          case "medium":
            return "text-main-yellow";
          case "high":
            return "text-effect-best";
          default:
            break;
        }
      case "negative":
        switch (power) {
          case "low":
            return "text-effect-low";
          case "medium":
            return "text-main-yellow";
          case "high":
            return "text-effect-worst";
          default:
            break;
        }
      default:
        break;
    }
  };
console.log(items);
  return (
    <AtomWrapper variant="details_list" asChild>
      <ul>
        {items?.map((item, idx) => {
          const color = checkColor({
            power: item.efect_power,
            effect: item.effect,
          });
          const reservId = [16, 21, 22, 23, 24, 26, 27, 28];

          const isReserv = reservId.includes(
            (item.indicator as DetaileTable)?.id
          );

          return (
            <AtomWrapper
              variant={variant ? `details_item_${variant}` : `details_item`}
              key={idx}
              asChild
            >
              <li>
                {typeof item?.indicator === "object" &&
                  item.indicator !== null && (
                    <AtomWrapper variant="details_item_indicator">
                      <AtomImage
                        image={item.indicator.image as Media}
                        variant="table_icon"
                      />
                      <AtomText variant="table_title">
                        {isReserv ? "Тип" : item.indicator.title}
                      </AtomText>
                    </AtomWrapper>
                  )}
                <AtomWrapper variant="details_item_value">
                  <AtomText variant="table_title" className={cn(color)}>
                    {item.value}
                  </AtomText>
                </AtomWrapper>
              </li>
            </AtomWrapper>
          );
        })}
      </ul>
    </AtomWrapper>
  );
};
