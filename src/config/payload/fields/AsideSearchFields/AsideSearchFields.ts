import type { Field } from "payload";

export const AsideSearchFields = (): Field[] => {
  return [
    {
      name: "group_search_aside",
      type: "group",
      label: "Пошук Aside",
      admin: {
        condition: (data) => data.type === "search_aside",
        width: "100%",
      },
      fields: [
        {
          type: "row",
          admin: {
            width: "100%",
          },
          fields: [
            {
              name: "search_name",
              type: "text",
              label: "Назва Поля",
              required: true,
              admin: {
                width: "50%",
              },
            },
            {
              name: "search_image",
              type: "relationship",
              relationTo: "media",
              label: "Зображення поля",
              required: true,
              admin: {
                width: "50%",
              },
            },
          ],
        },
        {
          type: "row",
          admin: {
            width: "100%",
          },
          fields: [
            {
              name: "filter_name",
              type: "text",
              label: "Текст фільтру",
              required: true,
              admin: {
                width: "100%",
              },
            },
            {
              name: "filter_image",
              type: "relationship",
              relationTo: "media",
              label: "Зображення фільтру",
              required: true,
              admin: {
                width: "50%",
              },
            },
            {
              name: "filter_image_active",
              type: "relationship",
              relationTo: "media",
              label: "Зображення фільтру (активний стан)",
              required: true,
              admin: {
                width: "50%",
              },
            },
          ],
        },
      ],
    },
  ];
};
