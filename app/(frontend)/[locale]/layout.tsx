import { calibri, stalker, roboto, roboto_condensed, rethink_sans } from '@fonts'
import { Navigation, SiteSetting } from '@payload-types'

import { ChildrenType } from '@types'
import { cn } from '@utils'

import '@styles/globals.css'
import { getGlobal } from '@api'
import { SaveSettings } from '@atoms'

type LayoutProps = ChildrenType & {
  params: Promise<{
    locale: 'uk' | 'en'
  }>
}

export default async function FrontendRootLayout({ params, children }: LayoutProps) {
  const { locale } = await params

  const siteSettingsData = (await getGlobal({
    slug: 'site-settings',
    depth: 4,
    locale,
  })) as SiteSetting

  const navigationData = (await getGlobal({
    slug: 'navigation',
    depth: 4,
    locale,
  })) as Navigation

  return (
    <html lang={locale} data-scroll-behavior={'smooth'}>
      <body
        suppressHydrationWarning
        className={cn(
          calibri.variable,
          stalker.variable,
          roboto_condensed.variable,
          roboto.variable,
          rethink_sans.variable,
          'antialiased bg-main-black text-main-white relative w-[100dvw] h-[100dvh] max-w-[100%] max-h-[100%] overflow-hidden',
        )}
      >
        <SaveSettings settings={siteSettingsData} navigation={navigationData} />
        {children}
      </body>
    </html>
  )
}
