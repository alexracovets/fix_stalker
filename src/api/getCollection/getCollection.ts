'use server'

import { CollectionSlug, Config, getPayload, SanitizedConfig } from 'payload'
import { type Locale } from '@constants'
import config from '@payload-config'

interface getCollectionProps {
  collection: CollectionSlug
  locale?: Locale
}

export async function getCollection({ collection, locale }: getCollectionProps) {
  try {
    const resolvedConfig = (await config) as Config
    const payload = await getPayload({ config: resolvedConfig as SanitizedConfig })
    const collectionData = await payload.find({
      collection: collection,
      limit: -1,
      locale: locale,
    })

    return collectionData.docs
  } catch (error) {
    console.error(`Помилка при отриманні колекції "${collection}":`, error)
    return []
  }
}
