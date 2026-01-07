"use client";

import { useRef, RefObject, useCallback, useEffect } from "react";

import { MainPage } from "@payload-types";
import { AtomLink } from "@atoms";
import { cn } from "@utils";

interface NavigationPDALinkProps {
  item: MainPage;
  currentMainPage: MainPage | null;
  setHoveredRef: (ref: RefObject<HTMLLIElement | null>) => void;
  setHoveredSpanRef: (ref: RefObject<HTMLSpanElement | null>) => void;
  setCurrentPageRef: (ref: RefObject<HTMLLIElement | null>) => void;
  setCurrentPageSpanRef: (ref: RefObject<HTMLSpanElement | null>) => void;
}

export const NavigationPDALink = ({
  item,
  currentMainPage,
  setHoveredRef,
  setHoveredSpanRef,
  setCurrentPageRef,
  setCurrentPageSpanRef,
}: NavigationPDALinkProps) => {
  const elementRef = useRef<HTMLLIElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = useCallback(() => {
    setHoveredRef({ current: elementRef.current });
    setHoveredSpanRef({ current: spanRef.current });
  }, [setHoveredRef, setHoveredSpanRef]);

  const handleClick = useCallback(() => {
    if (currentMainPage === item) {
      setCurrentPageRef({ current: elementRef.current });
      setCurrentPageSpanRef({ current: spanRef.current });
    }
  }, [setCurrentPageRef, setCurrentPageSpanRef, currentMainPage, item]);

  useEffect(() => {
    handleClick();
  }, [handleClick]);

  return (
    <li ref={elementRef} onMouseEnter={handleMouseEnter} onClick={handleClick}>
      <AtomLink
        href={`/${item.slug}`}
        variant="pda_link"
        style={
          {
            "--before-content": `"${item.title}"`,
          } as React.CSSProperties
        }
        className={cn(
          currentMainPage?.slug === item.slug
            ? "text-main-white-active font-medium"
            : "text-main-gray"
        )}
      >
        <span ref={spanRef} className="text-transparent font-medium">
          {item.title}
        </span>
      </AtomLink>
    </li>
  );
};
