import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface SectionViewStore {
  isList: boolean;
  setIsList: (isList: boolean) => void;
}

export const useSectionViewStore = create<SectionViewStore>()(
  immer((set) => ({
    isList: true,
    setIsList: (isList: boolean) => set({ isList }),
  }))
);
