import { type Field, SanitizedConfig, getPayload } from 'payload'
import { config } from 'node:process'

export const AmmoFields = (): Field[] => {
  return [
    {
      type: 'group',
      name: 'ammo_group',
      label: {
        uk: 'Поля для боєприпасів',
        en: 'Fields for ammo',
      },
      admin: {
        condition: (data) => data.type === 'ammo',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'relationship',
              name: 'author_image',
              relationTo: 'media',
              label: {
                uk: 'Зображення',
                en: 'Image',
              },
              defaultValue: async () => {
                const authorImage = await getPayload({
                  config: config as unknown as SanitizedConfig,
                })
                const authorImageData = await authorImage.find({
                  collection: 'media',
                  where: {
                    alt: {
                      equals: 'brush_art',
                    },
                  },
                })
                if (authorImageData.docs.length > 0) {
                  return authorImageData.docs[0]
                }
                return null
              },
              admin: {
                width: '30%',
              },
            },
            {
              name: 'designer_name',
              type: 'text',
              label: {
                uk: 'Автор дизайну',
                en: 'Designer name',
              },
              localized: true,
              admin: {
                width: '35%',
              },
            },
            {
              label: {
                uk: 'Посилання на дизайнера',
                en: 'Link to designer',
              },
              name: 'designer_link',
              type: 'text',
              admin: {
                width: '35%',
              },
            },
          ],
        },
        {
          name: 'relation_ammo',
          type: 'relationship',
          relationTo: 'elements_pages',
          label: {
            uk: "Зв'язок з боєприпасом",
            en: 'Relation to ammo',
          },
          hasMany: true,
          admin: {
            width: '100%',
          },
          filterOptions: {
            slug: {
              like: '/weapons/%',
              not_equals: ['/weapons/tactical_kit', '/weapons/ammo'],
            },
          },
        },
        {
          label: {
            uk: 'Додаткова інформація',
            en: 'Additional information',
          },
          name: 'details',
          type: 'array',
          admin: {
            condition: (data) => data.type === 'ammo',
          },
          labels: {
            singular: {
              uk: 'Показник',
              en: 'Indicator',
            },
            plural: {
              uk: 'Покази',
              en: 'Indicators',
            },
          },
          defaultValue: async () => {
            const preset = [28, 25, 1, 3]
            const detaileTable = await getPayload({
              config: config as unknown as SanitizedConfig,
            })
            const detaileTableData = await detaileTable.find({
              collection: 'detaile_table',
              where: {
                id: {
                  in: preset,
                },
              },
            })
            const detailes = detaileTableData.docs
            return preset.map((id) => ({
              indicator: detailes.find((detail) => detail.id === id),
              value: '0',
            }))
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'indicator',
                  label: {
                    uk: 'Показник',
                    en: 'Indicator',
                  },
                  type: 'relationship',
                  relationTo: 'detaile_table',
                  required: true,
                  hasMany: false,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'value',
                  label: {
                    uk: 'Значення',
                    en: 'Value',
                  },
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'effect',
                  type: 'radio',
                  label: {
                    uk: 'Ефект',
                    en: 'Effect',
                  },
                  required: true,
                  defaultValue: 'normal',
                  options: [
                    {
                      label: {
                        uk: 'Позитивний ефект',
                        en: 'Positive effect',
                      },
                      value: 'positive',
                    },
                    {
                      label: {
                        uk: 'Негативний ефект',
                        en: 'Negative effect',
                      },
                      value: 'negative',
                    },
                    {
                      label: {
                        uk: 'Нейтрально',
                        en: 'Normal',
                      },
                      value: 'normal',
                    },
                  ],
                },
                {
                  name: 'efect_power',
                  type: 'radio',
                  label: {
                    uk: 'Сила ефекту',
                    en: 'Effect power',
                  },
                  required: true,
                  defaultValue: 'normal',
                  dbName: 'ef_pwr',
                  options: [
                    {
                      label: {
                        uk: 'Низька',
                        en: 'Low',
                      },
                      value: 'low',
                    },
                    {
                      label: {
                        uk: 'Середня',
                        en: 'Medium',
                      },
                      value: 'medium',
                    },
                    {
                      label: {
                        uk: 'Висока',
                        en: 'High',
                      },
                      value: 'high',
                    },
                    {
                      label: {
                        uk: 'Нейтрально',
                        en: 'Normal',
                      },
                      value: 'normal',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]
}
