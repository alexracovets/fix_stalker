import { Metadata } from 'next'
import { Locale } from 'payload'

import { MainPage } from '@payload-types'

import { TemplateHome } from '@templates'

import { getCollectionItem, getGlobal } from '@api'
import { generateMeta } from '@utils'

type PageProps = {
  params: Promise<{
    locale: Locale
  }>
}

export const revalidate = 60

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
  return [{ locale: 'en' }, { locale: 'uk' }]
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
