import type { Field } from "payload";

export const HomeVideo = (): Field => {
  return {
    relationTo: "video",
    name: "video",
    type: "relationship",
    label: "Відео на головній сторінці",
    required: true,
    hasMany: false,
    admin: {
      condition: (data) => data.slug === "",
    },
  };
};
