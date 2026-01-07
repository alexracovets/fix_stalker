'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

import { AtomWrapper, AtomImage, AtomText } from '@atoms'
import { NavigationHome } from '@molecules'
import { useNavigationStore } from '@store'
import { Media, SiteSetting } from '@payload-types'

interface HeaderHomeProps {
  logo: SiteSetting['logo']
}

export const HeaderHome = ({ logo }: HeaderHomeProps) => {
  const { navigation } = useNavigationStore()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(navigation.length > 0)
  }, [navigation])

  return (
    <AtomWrapper variant="home_header" asChild>
      <motion.header
        initial={isAnimating ? { opacity: 1, x: '-100%' } : { opacity: 1, x: '-100%' }}
        animate={isAnimating ? { opacity: 1, x: '0%' } : { opacity: 1, x: '-100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ boxShadow: '0 0 14px 0 var(--color-main-black)' }}
      >
        {logo && (
          <AtomWrapper variant="home_logo_wrapper">
            <AtomImage image={logo.logo as Media} variant="home_logo" priority />
            <AtomText variant="logo_title">
              {logo.subtitle.split('').map((char, index) => (
                <span key={index} className="block">
                  {char}
                </span>
              ))}
            </AtomText>
          </AtomWrapper>
        )}
        <NavigationHome navigation={navigation} />
      </motion.header>
    </AtomWrapper>
  )
}
