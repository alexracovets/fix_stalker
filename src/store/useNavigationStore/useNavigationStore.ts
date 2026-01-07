"use client";

import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

import { MainPage, Section } from "@payload-types";

interface NavigationStore {
  navigation: MainPage[];
  switchedSectionAside: Section | null;
  isFilterActive: boolean;
  searchInput: string;
  setNavigation: (navigation: MainPage[]) => void;
  setSwitchedSectionAside: (switchedSectionAside: Section | null) => void;
  setIsFilterActive: (isFilterActive: boolean) => void;
  setSearchInput: (searchInput: string) => void;
}

export const useNavigationStore = create<NavigationStore>()(
  immer((set) => ({
    navigation: [],
    switchedSectionAside: null,
    isFilterActive: false,
    searchInput: "",
    setNavigation: (navigation: MainPage[]) => set({ navigation }),
    setSwitchedSectionAside: (switchedSectionAside: Section | null) => set({ switchedSectionAside }),
    setIsFilterActive: (isFilterActive: boolean) => set({ isFilterActive }),
    setSearchInput: (searchInput: string) => set({ searchInput }),
  }))
);
