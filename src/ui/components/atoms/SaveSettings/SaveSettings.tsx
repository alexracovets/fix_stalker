'use client'

import { MainPage, Navigation, SiteSetting } from '@payload-types'
import { useEffect } from 'react'

import { useNavigationStore, useSettings } from '@store'

interface SaveSettingsProps {
  settings: SiteSetting
  navigation: Navigation
}

export const SaveSettings = ({ settings, navigation }: SaveSettingsProps) => {
  const { logo, home_video, aside, signal } = settings
  const { setNavigation } = useNavigationStore()
  const { setLogo, setHomeVideo, setAside, setSignal } = useSettings()

  useEffect(() => {
    setNavigation(navigation.pages.map((page) => page.page as MainPage))
  }, [navigation, setNavigation])

  useEffect(() => {
    setLogo(logo)
  }, [setLogo, logo])

  useEffect(() => {
    setHomeVideo(home_video)
  }, [setHomeVideo, home_video])

  useEffect(() => {
    setAside(aside)
  }, [setAside, aside])

  useEffect(() => {
    setSignal(signal)
  }, [setSignal, signal])

  return null
}
