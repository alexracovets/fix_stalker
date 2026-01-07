import type { CollectionConfig } from "payload";
import { MainPage } from "@/config/payload/payload-types";

export const MainPages: CollectionConfig = {
  slug: "mainPages",
  labels: {
    singular: "Головна сторінка",
    plural: "Головні сторінки",
  },
  admin: {
    useAsTitle: "title",
    description:
      "Тут створюються сторінки такі як Головна, Захист, Зброя, і тд. Для головної slug має бути '/'.",
    group: "Контент",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Контент",
          fields: [
            {
              label: "Заголовок",
              type: "text",
              name: "title",
              required: true,
              localized: true,
            },
            {
              label: "Підзаголовок",
              name: "sub_title",
              type: "text",
              required: true,
              localized: true,
              admin: {
                condition: (data) => data?.slug !== "/",
              },
            },
          ],
        },
        {
          label: "Конфігурація",
          fields: [
            {
              label: "Назва сторінки",
              name: "slug",
              type: "text",
              unique: true,
              required: true,
            },
            {
              name: "sections",
              label: "Відображати Секції",
              type: "relationship",
              relationTo: "sections",
              hasMany: true,
              required: false,
              admin: {
                condition: (data) => data?.slug !== "/",
              },
              filterOptions: ({ siblingData }) => {
                if (!siblingData || !(siblingData as MainPage).id) {
                  return false;
                }
                const currentMainPageId = (siblingData as MainPage).id;
                // Фільтруємо секції, які мають поточну mainPage як parent
                return {
                  parent: {
                    equals: currentMainPageId,
                  },
                };
              },
            },
          ],
        },
      ],
    },
  ],
};
