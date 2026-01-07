'use client'

import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'

import { Media } from '@payload-types'

interface SettingsStore {
  logo: {
    logo: Media
    subtitle: string
  } | null
  home_video: Media | null
  setLogo: (logo: SettingsStore['logo']) => void
  setHomeVideo: (home_video: Media) => void
}

export const useSettings = create<SettingsStore>()(
  immer((set) => ({
    logo: null,
    home_video: null,
    setLogo: (logo: SettingsStore['logo']) => set({ logo }),
    setHomeVideo: (home_video: Media) => set({ home_video }),
  })),
)
