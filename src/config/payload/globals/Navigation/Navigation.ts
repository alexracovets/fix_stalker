import type { GlobalConfig } from 'payload'

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
          filterOptions: ({ data, siblingData }: { data: any; siblingData: any }) => {
            const selectedPageIds =
              data?.pages
                ?.map((p: any) => (typeof p.page === 'object' ? p.page.id : p.page))
                .filter(
                  (id: string) =>
                    id &&
                    id !==
                      (typeof siblingData?.page === 'object'
                        ? (siblingData?.page as any)?.id
                        : siblingData?.page),
                ) || []

            return {
              id: {
                not_in: selectedPageIds,
              },
              slug: {
                not_equals: '/',
              },
            }
          },
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
