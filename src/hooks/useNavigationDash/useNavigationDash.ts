import { MainPage } from "@payload-types";
import { useCallback, useEffect, useState } from "react";

interface useNavigationDashProps {
  listRef: React.RefObject<HTMLUListElement | null>;
  hoveredRef: React.RefObject<HTMLLIElement | null>;
  hoveredSpanRef: React.RefObject<HTMLSpanElement | null>;
  currentPageRef: React.RefObject<HTMLLIElement | null>;
  currentPageSpanRef: React.RefObject<HTMLSpanElement | null>;
  navigation: MainPage[];
}

export const useNavigationDash = ({
  listRef,
  hoveredRef,
  hoveredSpanRef,
  currentPageRef,
  currentPageSpanRef,
  navigation,
}: useNavigationDashProps) => {
  const [underline, setUnderline] = useState<React.CSSProperties | null>(null);
  const [shortline, setShortline] = useState<React.CSSProperties | null>(null);
  const [active, setActive] = useState<boolean>(false);

  const boundingClientRect = (element: React.RefObject<HTMLElement | null>) => {
    if (element.current) {
      const elementRect = element.current.getBoundingClientRect();
      return elementRect;
    }
  };

  const getValues = useCallback(() => {
    const listRect = boundingClientRect(listRef);
    const linkRectHovered = boundingClientRect(hoveredRef);
    const spanRectHovered = boundingClientRect(hoveredSpanRef);
    const linkRectCurrent = boundingClientRect(currentPageRef);
    const spanRectCurrent = boundingClientRect(currentPageSpanRef);
    if (linkRectHovered?.left && listRect?.left && spanRectHovered?.left) {
      setUnderline({
        left: `${linkRectHovered?.left - listRect?.left}px`,
        width: `${linkRectHovered?.width}px`,
      });
      setShortline({
        left: `${spanRectHovered?.left - listRect?.left}px`,
        width: `${spanRectHovered?.width}px`,
      });
      setActive(true);
    } else if (
      linkRectCurrent?.left &&
      listRect?.left &&
      spanRectCurrent?.left
    ) {
      setUnderline({
        left: `${linkRectCurrent?.left - listRect?.left}px`,
        width: `${linkRectCurrent?.width}px`,
      });
      setShortline({
        left: `${spanRectCurrent?.left - listRect?.left}px`,
        width: `${spanRectCurrent?.width}px`,
      });
      setActive(true);
    }
  }, [listRef, hoveredRef, hoveredSpanRef, currentPageRef, currentPageSpanRef]);

  useEffect(() => {
    if (listRef) {
      requestAnimationFrame(() => {
        getValues();
      });
    }
  }, [getValues, listRef, navigation, currentPageRef, currentPageSpanRef]);

  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => {
        getValues();
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getValues]);

  return {
    underline,
    shortline,
    active,
  };
};
