import { Section } from "@/config/payload/payload-types";
import type { CollectionConfig } from "payload";

export const Sections: CollectionConfig = {
  slug: "sections",
  labels: {
    singular: "Секція",
    plural: "Секції",
  },
  admin: {
    useAsTitle: "title",
    description:
      "Тут створюються сторінки такі як Костюми, Маски, Пістолети, і тд. Які будуть відображатися в головних сторінках.",
    group: "Контент",
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data.slug_name && data.parent) {
          const parentPage = await req.payload.findByID({
            collection: "mainPages",
            id: data.parent,
          });

          data.slug = `/${parentPage.slug}/${data.slug_name}`;
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc, req, previousDoc }) => {
        if (doc.parent !== previousDoc?.parent) {
          const newSlug = doc.slug;
          const sections = await req.payload.find({
            collection: "mainPages",
            where: {
              sections: {
                contains: doc.id,
              },
            },
          });

          for (const section of sections.docs) {
            const currentElementIds =
              section.sections?.map((element: number | Section) =>
                typeof element === "object" ? element.id : element
              ) || [];

            let updatedSections = currentElementIds;

            const shouldKeepInSection =
              newSlug && newSlug.startsWith(section.slug + "/");

            if (!shouldKeepInSection) {
              updatedSections = currentElementIds.filter(
                (elementId: number) => elementId !== doc.id
              );
            }

            await req.payload.update({
              collection: "mainPages",
              id: section.id,
              data: {
                sections: updatedSections,
              },
            });
          }
        }
      },
    ],
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
              name: "title",
              type: "text",
              required: true,
              localized: true,
            },
            {
              label: "Підзаголовок",
              name: "sub_title",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "icons",
              label: "Іконки",
              type: "relationship",
              relationTo: "sections_icons",
              hasMany: false,
              required: true,
            },
          ],
        },
        {
          label: "Конфігурація",
          fields: [
            {
              name: "slug_name",
              label: "Назва сторінки",
              type: "text",
              required: true,
              unique: true,
            },
            {
              name: "slug",
              type: "text",
              required: true,
              admin: {
                hidden: true,
              },
            },
            {
              name: "parent",
              label: "Батьківська сторінка",
              type: "relationship",
              relationTo: "mainPages",
              hasMany: false,
              filterOptions: {
                slug: {
                  not_equals: "/",
                },
              },
            },
            {
              name: "elements",
              label: "Відображати Елементи",
              type: "relationship",
              relationTo: "elements_pages",
              hasMany: true,
              required: false,
              filterOptions: ({ siblingData }) => {
                if (!siblingData || !(siblingData as Section).slug) {
                  return false;
                }
                return {
                  slug: {
                    like: `${(siblingData as Section).slug}/%`,
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
