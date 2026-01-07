"use server";

import {
  CollectionSlug,
  getPayload,
  SanitizedConfig,
  Where,
  Config,
  Locale,
} from "payload";
import config from "@payload-config";

interface getCollectionItemProps {
  collection: CollectionSlug;
  slug?: string;
  depth: number;
  slug_name?: boolean;
  type?: boolean;
  id?: number;
  locale?: Locale;
}

export async function getCollectionItem({
  collection,
  slug,
  depth,
  slug_name,
  type,
  id,
  locale,
}: getCollectionItemProps) {
  try {
    const resolvedConfig = (await config) as Config;
    const payload = await getPayload({
      config: resolvedConfig as SanitizedConfig,
    });
    if (id) {
      const item = await payload.find({
        collection: collection,
        where: { id: { equals: id } },
        depth: depth,
        locale: locale,
      });
      return item.docs?.[0] ?? null;
    }
    if (slug) {
      const whereFind: Where = slug_name
        ? { slug_name: { equals: slug } }
        : type
          ? { type: { equals: slug } }
          : { slug: { equals: slug } };
      const item = await payload.find({
        collection: collection,
        where: whereFind,
        depth: depth,
        locale: locale,
      });
      return item.docs?.[0] ?? null;
    }
  } catch (error) {
    console.error(
      `Помилка при отриманні елемента з slug "${slug}" з колекції "${collection}":`,
      error
    );
    return null;
  }
}
