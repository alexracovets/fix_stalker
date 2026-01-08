import { Section } from '@/config/payload/payload-types'
import type { CollectionConfig } from 'payload'

export const Sections: CollectionConfig = {
  slug: 'sections',
  labels: {
    singular: {
      uk: 'Секція',
      en: 'Section',
    },
    plural: {
      uk: 'Секції',
      en: 'Sections',
    },
  },
  admin: {
    useAsTitle: 'title',
    description: {
      uk: 'Тут створюються сторінки такі як Костюми, Маски, Пістолети, і тд. Які будуть відображатися в головних сторінках.',
      en: 'Here you create pages such as suits, masks, pistols, etc. Which will be displayed on the main pages.',
    },
    group: {
      uk: 'Контент',
      en: 'Content',
    },
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data.slug_name && data.parent) {
          const parentPage = await req.payload.findByID({
            collection: 'mainPages',
            id: data.parent,
          })

          data.slug = `/${parentPage.slug}/${data.slug_name}`
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, req, previousDoc }) => {
        if (doc.parent !== previousDoc?.parent) {
          const newSlug = doc.slug
          const sections = await req.payload.find({
            collection: 'mainPages',
            where: {
              sections: {
                contains: doc.id,
              },
            },
          })

          for (const section of sections.docs) {
            const currentElementIds =
              section.sections?.map((element: number | Section) =>
                typeof element === 'object' ? element.id : element,
              ) || []

            let updatedSections = currentElementIds

            const shouldKeepInSection = newSlug && newSlug.startsWith(section.slug + '/')

            if (!shouldKeepInSection) {
              updatedSections = currentElementIds.filter(
                (elementId: number) => elementId !== doc.id,
              )
            }

            await req.payload.update({
              collection: 'mainPages',
              id: section.id,
              data: {
                sections: updatedSections,
              },
            })
          }
        }
      },
    ],
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
              name: 'title',
              type: 'text',
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
            },
            {
              name: 'icons',
              label: {
                uk: 'Іконка секції',
                en: 'Section icon',
              },
              type: 'relationship',
              relationTo: 'sections_icons',
              hasMany: false,
              required: true,
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
              name: 'slug_name',
              label: {
                uk: 'Назва сторінки (slug)',
                en: 'Page name (slug)',
              },
              type: 'text',
              required: true,
              unique: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              admin: {
                hidden: true,
              },
            },
            {
              name: 'parent',
              label: {
                uk: 'Батьківська сторінка',
                en: 'Parent page',
              },
              type: 'relationship',
              relationTo: 'mainPages',
              hasMany: false,
              filterOptions: {
                slug: {
                  not_equals: '/',
                },
              },
            },
            {
              name: 'elements',
              label: {
                uk: 'Відображати Елементи',
                en: 'Display elements',
              },
              type: 'relationship',
              relationTo: 'elements_pages',
              hasMany: true,
              required: false,
              filterOptions: ({ siblingData }) => {
                if (!siblingData || !(siblingData as Section).slug) {
                  return false
                }
                return {
                  slug: {
                    like: `${(siblingData as Section).slug}/%`,
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
