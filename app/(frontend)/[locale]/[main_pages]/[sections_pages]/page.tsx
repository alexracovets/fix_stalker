import { Metadata } from 'next'

import { Section } from '@payload-types'

import { getCollection, getCollectionItem } from '@api'
import { type Locale, LOCALES } from '@constants'
import { TemplateSectionPage } from '@templates'
import { generateMeta } from '@utils'

type PageProps = {
  params: Promise<{
    sections_pages: string
    locale: Locale
  }>
}

export const revalidate = 300

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sections_pages, locale } = await params
  const page = (await getCollectionItem({
    collection: 'sections',
    slug: sections_pages,
    slug_name: true,
    depth: 4,
    locale,
  })) as Section

  const meta = {
    title: page?.meta?.title || '',
    description: page?.meta?.description || '',
    image: page?.meta?.image?.value || '',
  }

  return generateMeta({ ...meta, slug: page?.slug, locale })
}

export async function generateStaticParams() {
  try {
    const results = (await getCollection({
      collection: 'sections',
    })) as Section[]

    return results.flatMap((result) =>
      LOCALES.map((locale) => ({
        sections_pages: result.slug_name,
        locale: locale,
      })),
    )
  } catch (error) {
    console.error('Помилка при генерації статичних параметрів:', error)
    return []
  }
}

export default async function ResultPage({ params }: PageProps) {
  const { sections_pages, locale } = await params
  const pageData = (await getCollectionItem({
    collection: 'sections',
    slug: sections_pages,
    slug_name: true,
    depth: 4,
    locale,
  })) as Section

  if (!pageData) {
    return <div>Page not found</div>
  }

  return <TemplateSectionPage data={pageData} />
}
