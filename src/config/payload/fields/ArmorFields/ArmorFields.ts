import type { Field } from "payload";
import { getPayload } from "payload";
import { config } from "node:process";
import { SanitizedConfig } from "payload";

export const ArmorFields = (): Field[] => {
  return [
    {
      type: "group",
      name: "armor_group",
      label: "Поля для костюмів",
      admin: {
        condition: (data) => data.type === "suits",
      },
      fields: [
        {
          label: "Показники",
          name: "resistance",
          admin: {
            condition: (data) => data.type === "suits",
          },
          type: "array",
          defaultValue: async () => {
            const resistanceTable = await getPayload({
              config: config as unknown as SanitizedConfig,
            });
            const resistanceTableData = await resistanceTable.find({
              collection: "resistance_table",
              where: {
                id: {
                  in: [6, 5, 4, 3, 2, 1],
                },
              },
              depth: 0,
            });
            return resistanceTableData.docs.reverse().map((item) => ({
              indicator: item,
              value: "0",
            }));
          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "indicator",
                  label: "Показник",
                  type: "relationship",
                  relationTo: "resistance_table",
                  required: true,
                  hasMany: false,
                  filterOptions: ({ data, siblingData }) => {
                    // Отримуємо всі вже вибрані indicator з масиву armor_table_wrapper
                    const selectedIndicators = (data?.armor_table_wrapper || [])
                      .map((item: unknown) => {
                        // Перевіряємо, чи це не поточний елемент
                        if (item === siblingData) return null;
                        const typedItem = item as {
                          indicator?:
                          | { id?: string | number }
                          | string
                          | number;
                        };
                        return typeof typedItem?.indicator === "object"
                          ? typedItem?.indicator?.id
                          : typedItem?.indicator;
                      })
                      .filter(
                        (
                          id: string | number | null | undefined
                        ): id is string | number => id != null
                      );
                    return {
                      id: {
                        not_in: selectedIndicators,
                      },
                    };
                  },
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "value",
                  label: "Значення",
                  type: "number",
                  min: 0,
                  max: 5,
                  required: true,
                  admin: {
                    width: "50%",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Деталі Елемента",
          name: "details",
          type: "array",
          defaultValue: async () => {
            const detaileTable = await getPayload({
              config: config as unknown as SanitizedConfig,
            });
            const detaileTableData = await detaileTable.find({
              collection: "detaile_table",
              where: {
                id: {
                  in: [1, 2, 3],
                },
              },
              depth: 0,
            });
            return detaileTableData.docs.reverse().map((item) => ({
              indicator: item,
              value: "0",
            }));
          },
          admin: {
            condition: (data) => data.type === "suits",
          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "indicator",
                  label: "Показник",
                  type: "relationship",
                  relationTo: "detaile_table",
                  required: true,
                  hasMany: false,
                  filterOptions: ({ data, siblingData }) => {
                    // Отримуємо всі вже вибрані indicator з масиву detaile_table_wrapper
                    const selectedIndicators = (
                      data?.detaile_table_wrapper || []
                    )
                      .map((item: unknown) => {
                        // Перевіряємо, чи це не поточний елемент
                        if (item === siblingData) return null;
                        const typedItem = item as {
                          indicator?:
                          | { id?: string | number }
                          | string
                          | number;
                        };
                        return typeof typedItem?.indicator === "object"
                          ? typedItem?.indicator?.id
                          : typedItem?.indicator;
                      })
                      .filter(
                        (
                          id: string | number | null | undefined
                        ): id is string | number => id != null
                      );

                    // Виключаємо вже вибрані indicator з опцій
                    return {
                      id: {
                        not_in: selectedIndicators,
                      },
                    };
                  },
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "value",
                  label: "Значення",
                  type: "text",
                  required: true,
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "effect",
                  type: "radio",
                  label: "Ефект",
                  required: true,
                  defaultValue: "normal",
                  options: [
                    {
                      label: "Позитивний ефект",
                      value: "positive",
                    },
                    {
                      label: "Негативний ефект",
                      value: "negative",
                    },
                    {
                      label: "Нейтрально",
                      value: "normal",
                    },
                  ],
                },
                {
                  name: "efect_power",
                  type: "radio",
                  label: "Сила ефекту",
                  required: true,
                  defaultValue: "normal",
                  dbName: "ef_pwr",
                  options: [
                    {
                      label: "Низька",
                      value: "low",
                    },
                    {
                      label: "Середня",
                      value: "medium",
                    },
                    {
                      label: "Висока",
                      value: "high",
                    },
                    {
                      label: "Нейтрально",
                      value: "normal",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
};
