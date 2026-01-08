import { CollectionConfig } from 'payload'

export const DetaileTable: CollectionConfig = {
  slug: 'detaile_table',
  labels: {
    singular: {
      uk: 'Таблиця Деталів',
      en: 'Detaile table',
    },
    plural: {
      uk: 'Таблиці Деталів',
      en: 'Detaile tables',
    },
  },
  admin: {
    useAsTitle: 'title',
    group: {
      uk: 'Додатково',
      en: 'Additional',
    },
  },
  fields: [
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      label: {
        uk: 'Зображення',
        en: 'Image',
      },
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: {
        uk: 'Назва',
        en: 'Title',
      },
      localized: true,
      required: true,
    },
  ],
}
