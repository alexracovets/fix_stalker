import type { Field } from "payload";

export const PageConfigFields = (): Field[] => {
  return [
    {
      name: "slug_name",
      label: "Назва сторінки(slug)",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "parent",
      label: "Батьківська сторінка",
      type: "relationship",
      relationTo: "sections",
      hasMany: false,
    },
  ];
};
