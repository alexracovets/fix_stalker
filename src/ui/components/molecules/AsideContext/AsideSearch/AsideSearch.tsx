"use client";

import { Media, SystemField } from "@payload-types";
import { useEffect, useState } from "react";

import {
  AtomWrapper,
  AtomButton,
  AtomImage,
  AtomInput,
  AtomText,
  CategoryIcon,
} from "@atoms";

import { useNavigationStore } from "@store";
import { getCollectionItem } from "@api";

export const AsideSearch = () => {
  const [data, setData] = useState<SystemField | null>(null);
  const [filterHovered, setFilterHovered] = useState<boolean>(false);

  const { searchInput, isFilterActive, setSearchInput, setIsFilterActive } =
    useNavigationStore();

  const searchData = data?.group_search_aside;

  const fetchData = async () => {
    const payload = await getCollectionItem({
      collection: "system-fields",
      slug: "search_aside",
      depth: 1,
      type: true,
    });
    if (payload) {
      setData(payload as SystemField);
    }
  };

  const handleClick = () => {
    const status = useNavigationStore.getState().isFilterActive;
    setIsFilterActive(!status);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!searchData) return null;

  return (
    <AtomWrapper variant="aside_search_wrapper">
      <AtomWrapper variant="aside_search_inner">
        <AtomImage
          variant="input_search"
          image={searchData?.search_image as Media}
        />
        <AtomInput
          variant="aside"
          placeholder={searchData?.search_name}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </AtomWrapper>
      <AtomButton
        variant="aside_search_button"
        data-active={isFilterActive || filterHovered}
        onClick={handleClick}
        onMouseEnter={() => setFilterHovered(true)}
        onMouseLeave={() => setFilterHovered(false)}
      >
        <CategoryIcon
          activeIcon={searchData?.filter_image_active as Media}
          inactiveIcon={searchData?.filter_image as Media}
          variant="input_search_button"
          wrapper="input_search_button_wrapper"
          active={isFilterActive || filterHovered}
        />
        <AtomText
          variant="aside_search_button_text"
          data-active={isFilterActive || filterHovered}
        >
          {searchData?.filter_name}
        </AtomText>
      </AtomButton>
    </AtomWrapper>
  );
};
