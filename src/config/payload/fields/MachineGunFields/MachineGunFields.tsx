import { type Field, SanitizedConfig, getPayload } from "payload";
import { config } from "node:process";

export const MachineGunFields = (): Field[] => {
  return [
    {
      type: "group",
      name: "machine_gun_group",
      label: "Поля для кулемета",
      admin: {
        condition: (data) => data.type === "machine_gun",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              type: "relationship",
              name: "author_image",
              relationTo: "media",
              label: "Зображення",
              defaultValue: async () => {
                const authorImage = await getPayload({
                  config: config as unknown as SanitizedConfig,
                });
                const authorImageData = await authorImage.find({
                  collection: "media",
                  where: {
                    alt: {
                      equals: "brush_art",
                    },
                  },
                });
                if (authorImageData.docs.length > 0) {
                  return authorImageData.docs[0];
                }
                return null;
              },
              admin: {
                width: "30%",
              },
            },
            {
              label: "Автор дизайну",
              name: "designer_name",
              type: "text",
              admin: {
                width: "35%",
              },
            },
            {
              label: "Посилання",
              name: "designer_link",
              type: "text",
              admin: {
                width: "35%",
              },
            },
          ],
        },
        {
          name: "resistance",
          admin: {
            condition: (data) => data.type === "machine_gun",
          },
          type: "array",
          label: "Показники зброї",
          labels: {
            singular: "Показник",
            plural: "Покази",
          },
          defaultValue: async () => {
            const preset = [7, 8, 9, 10, 11];
            const resistanceTable = await getPayload({
              config: config as unknown as SanitizedConfig,
            });
            const resistanceTableData = await resistanceTable.find({
              collection: "resistance_table",
              where: {
                id: {
                  in: preset,
                },
              },
            });
            const resistances = resistanceTableData.docs;
            return preset.map((id) => ({
              indicator: resistances.find((resistance) => resistance.id === id),
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
          label: "Додаткова інформація",
          name: "details",
          type: "array",
          admin: {
            condition: (data) => data.type === "machine_gun",
          },
          labels: {
            singular: "Показник",
            plural: "Покази",
          },
          defaultValue: async () => {
            const preset = [22, 17, 18, 19, 20, 1, 3];
            const detaileTable = await getPayload({
              config: config as unknown as SanitizedConfig,
            });
            const detaileTableData = await detaileTable.find({
              collection: "detaile_table",
              where: {
                id: {
                  in: preset,
                },
              },
            });
            const detailes = detaileTableData.docs;
            return preset.map((id) => ({
              indicator: detailes.find((detail) => detail.id === id),
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
                  relationTo: "detaile_table",
                  required: true,
                  hasMany: false,
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
