"use client";

import { ElementsPage, MainPage, Section } from "@payload-types";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { useNavigationStore } from "@store";

export const useNavigation = () => {
  // Використовуємо значення з store, але дозволяємо перевизначення через props для зворотної сумісності
  const {
    navigation,
    switchedSectionAside,
    setSwitchedSectionAside,
    isFilterActive,
    searchInput,
  } = useNavigationStore();

  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  const mainPagePath = pathParts[0];
  const sectionPagePath = pathParts[1];
  const elementPagePath = pathParts[2];

  const [mainPage, setMainPage] = useState<MainPage | null>(null);
  const [sections, setSections] = useState<Section[] | null>(null);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [elements, setElements] = useState<ElementsPage[] | null>(null);
  const [activeElement, setActiveElement] = useState<ElementsPage | null>(null);

  const prevPathnameRef = useRef(pathname);
  const switchedSectionAsideRef = useRef(switchedSectionAside);

  useEffect(() => {
    const currentMainPage = navigation.find(
      (mainPage) => mainPage.slug === mainPagePath
    );
    const checkMainPage = currentMainPage ? currentMainPage : navigation[0];
    setMainPage(checkMainPage);
  }, [navigation, mainPagePath, pathname]);

  useEffect(() => {
    const allSections = mainPage?.sections;
    const activeSection = (allSections as Section[])?.find(
      (section) => (section as Section).slug_name === sectionPagePath
    );
    const checkActiveSection = activeSection ? activeSection : allSections?.[0];
    const checkSection = switchedSectionAside
      ? switchedSectionAside
      : checkActiveSection;
    setSections(allSections as Section[]);
    setActiveSection(checkSection as Section);
  }, [mainPage, switchedSectionAside, sectionPagePath, pathname]);

  useEffect(() => {
    const allElements = (activeSection as Section)?.elements as ElementsPage[];
    const activeElement = (allElements as ElementsPage[])?.find(
      (element) => element.slug_name === elementPagePath
    );
    const reversedElements = isFilterActive && allElements
      ? [...allElements].reverse()
      : allElements;
    if (searchInput) {
      const filteredElements = reversedElements?.filter((element) =>
        element.title.toLowerCase().includes(searchInput?.toLowerCase() || "")
      );
      setElements(filteredElements);
    } else {
      setElements(reversedElements);
    }
    setActiveElement(activeElement as ElementsPage);
  }, [activeSection, elementPagePath, pathname, isFilterActive, searchInput]);

  useEffect(() => {
    switchedSectionAsideRef.current = switchedSectionAside;
  }, [switchedSectionAside]);

  useEffect(() => {
    if (
      prevPathnameRef.current !== pathname &&
      switchedSectionAsideRef.current
    ) {
      setSwitchedSectionAside(null);
    }
    prevPathnameRef.current = pathname;
  }, [pathname, setSwitchedSectionAside]);

  return {
    navigation,
    pathname,
    mainPage,
    sections,
    activeSection,
    elements,
    activeElement,
  };
};
