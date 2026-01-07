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
  ],
}
