import { CollectionConfig } from "payload";

export const DetaileTable: CollectionConfig = {
  slug: "detaile_table",
  labels: {
    singular: "Таблиця Деталів",
    plural: "Таблиці Деталів",
  },
  admin: {
    useAsTitle: "title",
    group: "Додатково",
  },
  fields: [
    {
      name: "image",
      type: "relationship",
      relationTo: "media",
      label: "Зображення",
      required: true,
    },
    {
      name: "title",
      type: "text",
      label: "Назва",
      required: true,
    },
  ],
};
