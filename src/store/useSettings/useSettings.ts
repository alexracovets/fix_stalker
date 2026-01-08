'use client'

import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'

import { SiteSetting } from '@payload-types'

interface SettingsStore {
  logo: SiteSetting['logo'] | null
  home_video: SiteSetting['home_video'] | null
  aside: SiteSetting['aside'] | null
  signal: SiteSetting['signal'] | null
  setLogo: (logo: SiteSetting['logo']) => void
  setHomeVideo: (home_video: SiteSetting['home_video']) => void
  setAside: (aside: SiteSetting['aside']) => void
  setSignal: (signal: SiteSetting['signal']) => void
}

export const useSettings = create<SettingsStore>()(
  immer((set) => ({
    logo: null,
    home_video: null,
    aside: null,
    signal: null,
    setLogo: (logo: SiteSetting['logo']) => set({ logo }),
    setHomeVideo: (home_video: SiteSetting['home_video']) => set({ home_video }),
    setAside: (aside: SiteSetting['aside']) => set({ aside }),
    setSignal: (signal: SiteSetting['signal']) => set({ signal }),
  })),
)
