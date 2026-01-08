'use client'

import { Media } from '@payload-types'
import { useState } from 'react'

import { AtomWrapper, AtomButton, AtomImage, AtomInput, AtomText, CategoryIcon } from '@atoms'
import { useNavigationStore, useSettings } from '@store'

export const AsideSearch = () => {
  const { aside } = useSettings()
  const [filterHovered, setFilterHovered] = useState<boolean>(false)
  const { searchInput, isFilterActive, setSearchInput, setIsFilterActive } = useNavigationStore()

  const handleClick = () => {
    const status = useNavigationStore.getState().isFilterActive
    setIsFilterActive(!status)
  }

  if (!aside) return null

  const searchData = aside.aside_search
  const searchImage = searchData?.search_image as Media
  const searchName = searchData?.search_name
  const filterData = aside.aside_filter
  const filterImage = filterData?.filter_image as Media
  const filterImageActive = filterData?.filter_image_active as Media
  const filterName = filterData?.filter_name

  return (
    <AtomWrapper variant="aside_search_wrapper">
      <AtomWrapper variant="aside_search_inner">
        {searchImage && <AtomImage variant="input_search" image={searchImage} />}
        <AtomInput
          variant="aside"
          placeholder={searchName}
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
          activeIcon={filterImageActive}
          inactiveIcon={filterImage}
          variant="input_search_button"
          wrapper="input_search_button_wrapper"
          active={isFilterActive || filterHovered}
        />
        <AtomText variant="aside_search_button_text" data-active={isFilterActive || filterHovered}>
          {filterName}
        </AtomText>
      </AtomButton>
    </AtomWrapper>
  )
}
