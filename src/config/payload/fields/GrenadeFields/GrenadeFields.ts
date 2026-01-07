import { type Field, SanitizedConfig, getPayload } from "payload";
import { config } from "node:process";

export const GrenadeFields = (): Field[] => {
  return [
    {
      type: "group",
      name: "grenade_group",
      label: "Поля для гранати",
      admin: {
        condition: (data) => data.type === "grenade",
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
          label: "Додаткова інформація",
          name: "details",
          type: "array",
          admin: {
            condition: (data) => data.type === "grenade",
          },
          labels: {
            singular: "Показник",
            plural: "Покази",
          },
          defaultValue: async () => {
            const preset = [24, 25, 1, 3];
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
