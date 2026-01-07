import type { CollectionConfig } from "payload";

export const Video: CollectionConfig = {
  slug: "video",
  labels: {
    singular: "Відео",
    plural: "Відео",
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "createdAt"],
    group: "Медіа",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Альтернативний текст",
      admin: {
        description: "Опис відео для доступності",
      },
    },
    {
      name: "title",
      type: "text",
      label: "Назва відео",
    },
    {
      name: "description",
      type: "textarea",
      label: "Опис відео",
    },
  ],
  upload: {
    staticDir: "video",
    mimeTypes: ["video/*"],
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        crop: "center",
      },
    ],
    adminThumbnail: "thumbnail",
  },
};
