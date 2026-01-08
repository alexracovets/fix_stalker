import type { Field } from 'payload'
import { getPayload } from 'payload'
import { config } from 'node:process'
import { SanitizedConfig } from 'payload'

export const SuitsFields = (): Field[] => {
  return [
    {
      type: 'group',
      name: 'suits_group',
      label: {
        uk: 'Поля для костюмів',
        en: 'Fields for suits',
      },
      admin: {
        condition: (data) => data.type === 'suits',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'resistance',
              type: 'array',
              label: {
                uk: 'Таблиця показників',
                en: 'Indicators Table',
              },
              admin: {
                condition: (data) => data.type === 'suits',
              },
              defaultValue: async () => {
                const resistanceTable = await getPayload({
                  config: config as unknown as SanitizedConfig,
                })
                const resistanceTableData = await resistanceTable.find({
                  collection: 'resistance_table',
                  where: {
                    id: {
                      in: [6, 5, 4, 3, 2, 1],
                    },
                  },
                  depth: 0,
                })
                return resistanceTableData.docs.reverse().map((item) => ({
                  indicator: item,
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
                      relationTo: 'resistance_table',
                      required: true,
                      hasMany: false,
                      filterOptions: ({ data, siblingData }) => {
                        // Отримуємо всі вже вибрані indicator з масиву armor_table_wrapper
                        const selectedIndicators = (data?.armor_table_wrapper || [])
                          .map((item: unknown) => {
                            // Перевіряємо, чи це не поточний елемент
                            if (item === siblingData) return null
                            const typedItem = item as {
                              indicator?: { id?: string | number } | string | number
                            }
                            return typeof typedItem?.indicator === 'object'
                              ? typedItem?.indicator?.id
                              : typedItem?.indicator
                          })
                          .filter(
                            (id: string | number | null | undefined): id is string | number =>
                              id != null,
                          )
                        return {
                          id: {
                            not_in: selectedIndicators,
                          },
                        }
                      },
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
                      type: 'number',
                      min: 0,
                      max: 5,
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
          type: 'row',
          fields: [
            {
              type: 'array',
              name: 'details',
              label: {
                uk: 'Особливості костюма',
                en: 'Suit features',
              },
              labels: {
                singular: {
                  uk: 'Особливість',
                  en: 'Feature',
                },
                plural: {
                  uk: 'Особливості',
                  en: 'Features',
                },
              },
              defaultValue: async () => {
                const detaileTable = await getPayload({
                  config: config as unknown as SanitizedConfig,
                })
                const detaileTableData = await detaileTable.find({
                  collection: 'detaile_table',
                  where: {
                    id: {
                      in: [1, 2, 3],
                    },
                  },
                  depth: 0,
                })
                return detaileTableData.docs.reverse().map((item) => ({
                  indicator: item,
                  value: '0',
                }))
              },
              admin: {
                condition: (data) => data.type === 'suits',
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
                      filterOptions: ({ data, siblingData }) => {
                        // Отримуємо всі вже вибрані indicator з масиву detaile_table_wrapper
                        const selectedIndicators = (data?.detaile_table_wrapper || [])
                          .map((item: unknown) => {
                            // Перевіряємо, чи це не поточний елемент
                            if (item === siblingData) return null
                            const typedItem = item as {
                              indicator?: { id?: string | number } | string | number
                            }
                            return typeof typedItem?.indicator === 'object'
                              ? typedItem?.indicator?.id
                              : typedItem?.indicator
                          })
                          .filter(
                            (id: string | number | null | undefined): id is string | number =>
                              id != null,
                          )

                        // Виключаємо вже вибрані indicator з опцій
                        return {
                          id: {
                            not_in: selectedIndicators,
                          },
                        }
                      },
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
                      localized: true,
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
      ],
    },
  ]
}
