import { MainPage } from '@payload-types'
import { Metadata } from 'next'

import { TemplateHome } from '@templates'

import { type Locale, LOCALES } from '@constants'
import { getCollectionItem } from '@api'
import { generateMeta } from '@utils'

type PageProps = {
  params: Promise<{
    locale: Locale
  }>
}

export const revalidate = 300

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const page = (await getCollectionItem({
    collection: 'mainPages',
    slug: '/',
    depth: 4,
    locale,
  })) as MainPage

  const meta = {
    title: page?.meta?.title || '',
    description: page?.meta?.description || '',
    image: page?.meta?.image?.value || '',
  }

  return generateMeta({ ...meta, slug: '/', locale })
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const pageData = (await getCollectionItem({
    collection: 'mainPages',
    slug: '/',
    depth: 4,
    locale,
  })) as MainPage

  if (!pageData) {
    return <div>Page not found</div>
  }

  return <TemplateHome />
}
