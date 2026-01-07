import { Roboto_Condensed, Roboto, Rethink_Sans } from 'next/font/google'
import localFont from 'next/font/local'

export const roboto_condensed = Roboto_Condensed({
  weight: ['500', '600'],
  variable: '--font-roboto_condensed',
  style: ['normal'],
  subsets: ['cyrillic'],
  display: 'swap',
})

export const roboto = Roboto({
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  style: ['normal'],
  subsets: ['cyrillic'],
  display: 'swap',
})

export const rethink_sans = Rethink_Sans({
  weight: ['800'],
  variable: '--font-rethink_sans',
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const calibri = localFont({
  src: [
    {
      path: './fonts/calibri/calibri.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-calibri',
})

export const stalker = localFont({
  src: [
    {
      path: './fonts/stalker/stalker.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-stalker',
})
