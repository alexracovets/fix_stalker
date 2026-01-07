import { MainPage } from '@payload-types'
import { Metadata } from 'next'

import { TemplateMainPage } from '@templates'

import { getCollection, getCollectionItem } from '@api'
import { type Locale, LOCALES } from '@constants'
import { generateMeta } from '@utils'

type PageProps = {
  params: Promise<{
    main_pages: string
    locale: Locale
  }>
}

export const revalidate = 300

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { main_pages, locale } = await params
  const page = (await getCollectionItem({
    collection: 'mainPages',
    slug: main_pages,
    depth: 4,
    locale,
  })) as MainPage

  const meta = {
    title: page?.meta?.title || '',
    description: page?.meta?.description || '',
    image: page?.meta?.image?.value || '',
  }

  return generateMeta({ ...meta, slug: page?.slug })
}

export async function generateStaticParams() {
  try {
    const results = (await getCollection({
      collection: 'mainPages',
    })) as MainPage[]

    // Генеруємо всі комбінації slug × locale
    return results.flatMap((result) =>
      LOCALES.map((locale) => ({
        main_pages: result.slug,
        locale: locale,
      })),
    )
  } catch (error) {
    console.error('Помилка при генерації статичних параметрів:', error)
    return []
  }
}

export default async function ResultPage({ params }: PageProps) {
  const { main_pages, locale } = await params
  const pageData = (await getCollectionItem({
    collection: 'mainPages',
    slug: main_pages,
    depth: 4,
    locale,
  })) as MainPage

  if (!pageData) {
    return <div>Page not found</div>
  }

  return <TemplateMainPage data={pageData} />
}
