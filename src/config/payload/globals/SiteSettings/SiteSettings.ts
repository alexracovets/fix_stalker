import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: {
    uk: 'Налаштування сайту',
    en: 'Site Settings',
  },
  admin: {
    description: {
      uk: 'Глобальні налаштування сайту',
      en: 'Global site settings',
    },
  },
  fields: [
    {
      name: 'logo',
      type: 'group',
      label: {
        uk: 'Логотип',
        en: 'Logo',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'subtitle',
              type: 'text',
              label: {
                uk: 'Підзаголовок',
                en: 'Subtitle',
              },
              required: true,
              localized: true,
              admin: {
                width: '50%',
              },
            },
            {
              relationTo: 'media' as const,
              name: 'logo',
              type: 'relationship',
              label: {
                uk: 'Логотип',
                en: 'Logo',
              },
              required: true,
              hasMany: false,
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'home_video',
      type: 'group',
      label: {
        uk: 'Відео на головній сторінці',
        en: 'Video on home page',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              relationTo: 'media',
              name: 'video',
              type: 'relationship',
              label: {
                uk: 'Відео на головній сторінці',
                en: 'Video on home page',
              },
              required: true,
              hasMany: false,
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'aside',
      type: 'group',
      label: {
        uk: 'Бокова панель',
        en: 'Aside panel',
      },
      fields: [
        {
          name: 'aside_search',
          type: 'group',
          label: {
            uk: 'Пошук',
            en: 'Search',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'search_name',
                  type: 'text',
                  label: {
                    uk: 'Назва поля',
                    en: 'Field name',
                  },
                  required: true,
                  localized: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'search_image',
                  type: 'relationship',
                  label: {
                    uk: 'Зображення поля',
                    en: 'Field image',
                  },
                  required: true,
                  relationTo: 'media',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'aside_filter',
          type: 'group',
          label: {
            uk: 'Фільтр',
            en: 'Filter',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'filter_name',
                  type: 'text',
                  label: {
                    uk: 'Текст фільтру',
                    en: 'Filter text',
                  },
                  required: true,
                  localized: true,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'filter_image',
                  type: 'relationship',
                  relationTo: 'media',
                  label: {
                    uk: 'Зображення фільтру',
                    en: 'Filter image',
                  },
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'filter_image_active',
                  type: 'relationship',
                  relationTo: 'media',
                  label: {
                    uk: 'Зображення фільтру (активний стан)',
                    en: 'Filter image (active state)',
                  },
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'signal',
      type: 'group',
      label: {
        uk: "Сигнал зв'язку",
        en: 'Signal contact',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'signal_name',
              type: 'text',
              label: {
                uk: "Текст сигналу зв'язку",
                en: 'Signal contact text',
              },
              required: true,
              localized: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'signal_offline',
              type: 'text',
              label: {
                uk: "Текст сигналу зв'язку (офлайн)",
                en: 'Signal contact text (offline)',
              },
              localized: true,
              required: true,
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
  ],
}
