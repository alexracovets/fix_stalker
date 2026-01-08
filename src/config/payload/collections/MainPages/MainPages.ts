import type { CollectionConfig } from 'payload'
import { MainPage } from '@/config/payload/payload-types'

export const MainPages: CollectionConfig = {
  slug: 'mainPages',
  labels: {
    singular: {
      uk: 'Головна сторінка',
      en: 'Main page',
    },
    plural: {
      uk: 'Головні сторінки',
      en: 'Main pages',
    },
  },
  admin: {
    useAsTitle: 'title',
    description: {
      uk: 'Тут створюються сторінки такі як Головна, Захист, Зброя, і тд. Для головної slug має бути "/".',
      en: 'Here you create pages such as Main, Protection, Weapon, etc. For the main slug, it must be "/"',
    },
    group: {
      uk: 'Контент',
      en: 'Content',
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            uk: 'Контент',
            en: 'Content',
          },
          fields: [
            {
              label: {
                uk: 'Заголовок',
                en: 'Title',
              },
              type: 'text',
              name: 'title',
              required: true,
              localized: true,
            },
            {
              label: {
                uk: 'Підзаголовок',
                en: 'Subtitle',
              },
              name: 'sub_title',
              type: 'text',
              required: true,
              localized: true,
              admin: {
                condition: (data) => data?.slug !== '/',
              },
            },
          ],
        },
        {
          label: {
            uk: 'Конфігурація',
            en: 'Configuration',
          },
          fields: [
            {
              label: {
                uk: 'Назва сторінки',
                en: 'Page name',
              },
              name: 'slug',
              type: 'text',
              unique: true,
              required: true,
            },
            {
              name: 'sections',
              label: {
                uk: 'Відображати Секції',
                en: 'Display sections',
              },
              type: 'relationship',
              relationTo: 'sections',
              hasMany: true,
              required: false,
              admin: {
                condition: (data) => data?.slug !== '/',
              },
              filterOptions: ({ siblingData }) => {
                if (!siblingData || !(siblingData as MainPage).id) {
                  return false
                }
                const currentMainPageId = (siblingData as MainPage).id
                return {
                  parent: {
                    equals: currentMainPageId,
                  },
                }
              },
            },
          ],
        },
      ],
    },
  ],
}
