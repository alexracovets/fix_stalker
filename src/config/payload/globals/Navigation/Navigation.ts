import type { FilterOptions, GlobalConfig } from 'payload'
import type { Navigation as NavigationType } from '@payload-types'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: {
    uk: 'Навігація',
    en: 'Navigation',
  },
  admin: {
    description: {
      uk: 'Глобальна навігація',
      en: 'Global navigation',
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      label: {
        uk: 'Назва',
        en: 'Title',
      },
    },
    {
      name: 'pages',
      type: 'array',
      required: true,
      label: {
        uk: 'Сторінки',
        en: 'Pages',
      },
      labels: {
        singular: {
          uk: 'Сторінка',
          en: 'Page',
        },
        plural: {
          uk: 'Сторінки',
          en: 'Pages',
        },
      },
      fields: [
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'mainPages',
          filterOptions: (({ data, siblingData }) => {
            const sibling = siblingData as NavigationType['pages'][number] | undefined
            const currentIdValue =
              typeof sibling?.page === 'object' ? sibling.page?.id : sibling?.page
            const currentId =
              typeof currentIdValue === 'string' ? Number(currentIdValue) : currentIdValue

            const selectedPageIds =
              (data as NavigationType | undefined)?.pages
                ?.map((pageItem: NavigationType['pages'][number]) => {
                  const idValue =
                    typeof pageItem.page === 'object' ? pageItem.page?.id : pageItem.page
                  return typeof idValue === 'string' ? Number(idValue) : idValue
                })
                .filter((id): id is number => Number.isFinite(id) && id !== currentId) || []

            return {
              id: {
                not_in: selectedPageIds,
              },
              slug: {
                not_equals: '/',
              },
            }
          }) satisfies FilterOptions,
          label: {
            uk: 'Сторінка',
            en: 'Page',
          },
          required: true,
        },
      ],
    },
  ],
}
