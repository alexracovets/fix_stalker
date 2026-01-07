'use client'

import { Media, SiteSetting } from '@payload-types'

import { AtomVideo, AtomWrapper } from '@atoms'
import { HeaderHome } from '@organisms'

import { useSettings } from '@store'

export const TemplateHome = () => {
  const { logo, home_video } = useSettings()

  return (
    <AtomWrapper variant="home_page">
      <HeaderHome logo={logo as SiteSetting['logo']} />
      {home_video && (
        <AtomVideo
          wrapperVariant="home_video"
          videoVariant="home_video"
          videoSrc={typeof home_video === 'object' ? home_video?.url || '' : ''}
          videoType={typeof home_video === 'object' ? home_video?.mimeType || '' : ''}
        />
      )}
    </AtomWrapper>
  )
}
