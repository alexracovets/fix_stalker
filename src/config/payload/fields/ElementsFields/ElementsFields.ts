import {
  BoldFeature,
  ItalicFeature,
  ParagraphFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { Field } from "payload";

export const ElementsFields = (): Field[] => {
  return [
    {
      type: "row",
      fields: [
        {
          name: "type",
          type: "select",
          label: "Тип Сторінки",
          options: [
            { label: "Костюми", value: "suits" },
            { label: "Маски", value: "masks" },
            { label: "Комбінована броня", value: "exosuits" },
            { label: "Предмети", value: "objects" },
            { label: "Пістолет", value: "pistols" },
            { label: "Штурмова гвинтівка", value: "automatic" },
            { label: "Дробовик", value: "shotgun" },
            { label: "Кулемет", value: "machine_gun" },
            { label: "Граната", value: "grenade" },
            { label: "Снайперська зброя", value: "sniper" },
            { label: "Тактичний обвіс", value: "tactical_kit" },
            { label: "Боєприпас", value: "ammo" },
          ],
          defaultValue: "suits",
          admin: {
            width: "40%",
          },
        },
        {
          name: "aside_image",
          type: "relationship",
          relationTo: "media",
          label: "Зображення для Aside",
          required: true,
          admin: {
            width: "60%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          label: "Зображення",
          relationTo: "media",
          name: "image",
          type: "upload",
          required: true,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          label: "Заголовок",
          name: "title",
          type: "text",
          required: true,
          localized: true,
          admin: {
            width: "50%",
          },
        },
        {
          label: "Підзаголовок",
          name: "sub_title",
          type: "text",
          required: true,
          localized: true,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          label: "Опис сторінки",
          name: "description",
          type: "richText",
          localized: true,
          editor: lexicalEditor({
            features: [ParagraphFeature(), BoldFeature(), ItalicFeature()],
          }),
        },
      ],
    },
  ];
};
