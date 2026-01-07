"use client";

import { MainPage } from "@payload-types";
import { AtomLink, AtomWrapper } from "@atoms";

interface NavigationHomeProps {
  navigation: MainPage[];
}

export const NavigationHome = ({ navigation }: NavigationHomeProps) => {
  return (
    <AtomWrapper variant="home_navigation" asChild>
      <ul>
        {navigation.map((item, idx) => (
          <AtomWrapper
            variant="home_navigationElement"
            asChild
            key={`${item.id}-${idx}`}
          >
            <li>
              <AtomLink href={item.slug} variant="home_link">
                {item.title}
              </AtomLink>
            </li>
          </AtomWrapper>
        ))}
      </ul>
    </AtomWrapper>
  );
};
