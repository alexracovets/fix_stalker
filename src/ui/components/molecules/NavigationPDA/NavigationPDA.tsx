"use client";

import { useState, RefObject, useRef, useCallback, useEffect } from "react";

import {
  NavigationPDADash,
  NavigationPDALink,
  NavigationPDA_BG,
} from "@molecules";
import { AtomWrapper, AtomButton, AtomLink } from "@atoms";

import { useNavigation } from "@hooks";

export const NavigationPDA = () => {
  const { navigation, mainPage } = useNavigation();
  const listRef = useRef<HTMLUListElement>(null);
  const [hoveredRef, setHoveredRef] = useState<RefObject<HTMLLIElement | null>>(
    { current: null }
  );
  const [hoveredSpanRef, setHoveredSpanRef] = useState<
    RefObject<HTMLSpanElement | null>
  >({ current: null });
  const [currentPageRef, setCurrentPageRef] = useState<
    RefObject<HTMLLIElement | null>
  >({ current: null });
  const [currentPageSpanRef, setCurrentPageSpanRef] = useState<
    RefObject<HTMLSpanElement | null>
  >({ current: null });

  const handleListLeave = useCallback(() => {
    setHoveredRef({ current: null });
    setHoveredSpanRef({ current: null });
  }, [setHoveredRef, setHoveredSpanRef]);

  useEffect(() => {
    setHoveredRef({ current: null });
    setHoveredSpanRef({ current: null });
  }, [mainPage, navigation]);


  return (
    <AtomWrapper variant="pda_navigation_wrapper">
      <AtomButton variant="destructive">Q</AtomButton>
      <AtomWrapper variant="pda_navigation_link_wrapper" asChild>
        <nav>
          <AtomWrapper variant="pda_navigation" asChild>
            <ul ref={listRef} onMouseLeave={handleListLeave}>
              {navigation.length > 0 ? (
                navigation.map((item, idx) => (
                  <NavigationPDALink
                    key={idx}
                    item={item}
                    currentMainPage={mainPage}
                    setHoveredRef={setHoveredRef}
                    setHoveredSpanRef={setHoveredSpanRef}
                    setCurrentPageRef={setCurrentPageRef}
                    setCurrentPageSpanRef={setCurrentPageSpanRef}
                  />
                ))
              ) : (
                <li>
                  <AtomLink href="/" variant="pda_link" className="opacity-0">
                    blank
                  </AtomLink>
                </li>
              )}
            </ul>
          </AtomWrapper>
          <NavigationPDADash
            listRef={listRef}
            hoveredRef={hoveredRef}
            hoveredSpanRef={hoveredSpanRef}
            currentPageRef={currentPageRef}
            currentPageSpanRef={currentPageSpanRef}
          />
        </nav>
      </AtomWrapper>
      <AtomButton variant="destructive">E</AtomButton>
      <NavigationPDA_BG />
    </AtomWrapper>
  );
};
