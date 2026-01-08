'use client'

import { Media, SiteSetting } from '@payload-types'

import { AtomVideo, AtomWrapper } from '@atoms'
import { HeaderHome } from '@organisms'

import { useSettings } from '@store'

export const TemplateHome = () => {
  const { logo, home_video } = useSettings()
  const video = home_video?.video as SiteSetting['home_video']['video'] as Media

  return (
    <AtomWrapper variant="home_page">
      <HeaderHome logo={logo as SiteSetting['logo']} />
      {video && (
        <AtomVideo
          wrapperVariant="home_video"
          videoVariant="home_video"
          videoSrc={video.url || ''}
          videoType={video.mimeType || ''}
        />
      )}
    </AtomWrapper>
  )
}
