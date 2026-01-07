'use client'

import { MainPage, Media, Navigation, SiteSetting } from '@payload-types'
import { useEffect } from 'react'

import { useNavigationStore, useSettings } from '@store'

interface SaveSettingsProps {
  settings: SiteSetting
  navigation: Navigation
}
export const SaveSettings = ({ settings, navigation }: SaveSettingsProps) => {
  const { logo, home_video } = settings
  const { setNavigation } = useNavigationStore()
  const { setLogo, setHomeVideo } = useSettings()

  useEffect(() => {
    setNavigation(navigation.pages.map((page) => page.page as MainPage))
  }, [navigation])

  useEffect(() => {
    setLogo({
      logo: logo.logo as Media,
      subtitle: logo.subtitle as string,
    })
    setHomeVideo(home_video.video as Media)
  }, [settings])
  return null
}
