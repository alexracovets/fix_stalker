'use server'

import { getPayload, GlobalSlug } from 'payload'
import config from '@payload-config'

interface getGlobalProps {
  slug: GlobalSlug
  depth: number
  locale: 'uk' | 'en'
}

export const getGlobal = async ({ slug, depth, locale }: getGlobalProps) => {
  const payload = await getPayload({ config })
  const result = await payload.findGlobal({
    slug: slug,
    depth: depth,
    locale: locale,
  })

  return result
}
