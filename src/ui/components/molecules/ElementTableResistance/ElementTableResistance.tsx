"use client";

import { AtomImage, AtomText, AtomWrapper } from "@atoms";
import { ElementsPage, Media } from "@payload-types";

interface ElementTableResistanceProps {
  items: NonNullable<ElementsPage["armor_group"]>["resistance"];
}

export const ElementTableResistance = ({
  items,
}: ElementTableResistanceProps) => {
  const maxValue = 5;
  return (
    <AtomWrapper variant="resistance_list" asChild>
      <ul>
        {items?.map((item, idx) => (
          <AtomWrapper variant="resistance_item" asChild key={idx}>
            <li>
              {typeof item?.indicator === "object" &&
                item.indicator !== null && (
                  <AtomWrapper variant="resistance_item_indicator">
                    <AtomImage
                      image={item.indicator.image as Media}
                      variant="table_icon"
                    />
                    <AtomText variant="table_title">
                      {item.indicator.title}
                    </AtomText>
                  </AtomWrapper>
                )}
              <AtomWrapper variant="resistance_item_value">
                <AtomText variant="table_title">{item.value}</AtomText>
              </AtomWrapper>
              <AtomWrapper variant="resistance_item_dashfields">
                <AtomWrapper variant="resistance_item_dashfields_inner">
                  <AtomWrapper
                    variant="resistance_item_dashfields_dash"
                    style={{
                      width: `${((item?.value || 0) / maxValue) * 100}%`,
                    }}
                  />
                  <AtomWrapper
                    variant="resistance_item_dashfields_dash_separator"
                    style={{ left: `${19}%` }}
                  />
                  <AtomWrapper
                    variant="resistance_item_dashfields_dash_separator"
                    style={{ left: `${39}%` }}
                  />
                  <AtomWrapper
                    variant="resistance_item_dashfields_dash_separator"
                    style={{ left: `${59}%` }}
                  />
                  <AtomWrapper
                    variant="resistance_item_dashfields_dash_separator"
                    style={{ left: `${79}%` }}
                  />
                </AtomWrapper>
              </AtomWrapper>
            </li>
          </AtomWrapper>
        ))}
      </ul>
    </AtomWrapper>
  );
};
