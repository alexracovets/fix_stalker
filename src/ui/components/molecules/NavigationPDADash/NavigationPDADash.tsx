"use client";
import { cn } from "@utils";
import { AtomImage } from "@atoms";

import { useNavigationStore } from "@store";
import { useNavigationDash } from "@hooks";

interface useNavigationDashProps {
  listRef: React.RefObject<HTMLUListElement | null>;
  hoveredRef: React.RefObject<HTMLLIElement | null>;
  hoveredSpanRef: React.RefObject<HTMLSpanElement | null>;
  currentPageRef: React.RefObject<HTMLLIElement | null>;
  currentPageSpanRef: React.RefObject<HTMLSpanElement | null>;
}

export const NavigationPDADash = (
  {
    listRef,
    hoveredRef,
    hoveredSpanRef,
    currentPageRef,
    currentPageSpanRef,
  }: useNavigationDashProps
) => {
  const { navigation } = useNavigationStore();
  const { underline, shortline, active } = useNavigationDash(
    {
      listRef,
      hoveredRef,
      hoveredSpanRef,
      currentPageRef,
      currentPageSpanRef,
      navigation,
    }
  );
  return (
    <div
      className={cn(
        "relative transition-opacity ease-out duration-300 select-none pointer-events-none",
        active ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className={cn(
          "absolute bottom-[0] h-[.15rem] bg-custom-gradient transition-all ease-out duration-300 flex justify-center items-end"
        )}
        style={underline as React.CSSProperties}
      >
        <AtomImage
          src="/layoutPDA/line_dot.png"
          alt="dot"
          variant="line_dot"
          className={cn(underline?.width)}
        />
      </div>
      <div
        className="absolute bottom-[.15rem] h-[.3rem] bg-custom-gradient_second transition-all ease-out duration-300 flex justify-center items-end"
        style={shortline as React.CSSProperties}
      >
        <AtomImage
          src="/layoutPDA/line_dot_small.png"
          alt="dot"
          variant="line_dot_small"
          className={cn(shortline?.width)}
        />
      </div>
    </div>
  );
};
