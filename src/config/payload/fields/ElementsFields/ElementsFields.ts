import {
  BoldFeature,
  ItalicFeature,
  ParagraphFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Field } from 'payload'

export const ElementsFields = (): Field[] => {
  return [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: {
            uk: 'Тип Сторінки',
            en: 'Page type',
          },
          options: [
            {
              label: {
                uk: 'Костюми',
                en: 'Suits',
              },
              value: 'suits',
            },
            {
              label: {
                uk: 'Маски',
                en: 'Masks',
              },
              value: 'masks',
            },
            {
              label: {
                uk: 'Комбінована броня',
                en: 'Exosuits',
              },
              value: 'exosuits',
            },
            {
              label: {
                uk: 'Предмети',
                en: 'Objects',
              },
              value: 'objects',
            },
            {
              label: {
                uk: 'Пістолет',
                en: 'Pistol',
              },
              value: 'pistols',
            },
            {
              label: {
                uk: 'Штурмова гвинтівка',
                en: 'Automatic',
              },
              value: 'automatic',
            },
            {
              label: {
                uk: 'Дробовик',
                en: 'Shotgun',
              },
              value: 'shotgun',
            },
            { label: 'Кулемет', value: 'machine_gun' },
            {
              label: {
                uk: 'Граната',
                en: 'Grenade',
              },
              value: 'grenade',
            },
            {
              label: {
                uk: 'Снайперська зброя',
                en: 'Sniper',
              },
              value: 'sniper',
            },
            {
              label: {
                uk: 'Тактичний обвіс',
                en: 'Tactical kit',
              },
              value: 'tactical_kit',
            },
            {
              label: {
                uk: 'Боєприпас',
                en: 'Ammo',
              },
              value: 'ammo',
            },
          ],
          defaultValue: 'suits',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'aside_image',
          type: 'relationship',
          relationTo: 'media',
          label: {
            uk: 'Зображення для Aside',
            en: 'Aside image',
          },
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          label: {
            uk: 'Зображення сторінки',
            en: 'Page image',
          },
          relationTo: 'media',
          name: 'image',
          type: 'upload',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          label: {
            uk: 'Заголовок',
            en: 'Title',
          },
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            width: '50%',
          },
        },
        {
          label: {
            uk: 'Підзаголовок',
            en: 'Subtitle',
          },
          name: 'sub_title',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          label: {
            uk: 'Опис сторінки',
            en: 'Page description',
          },
          name: 'description',
          type: 'richText',
          localized: true,
          editor: lexicalEditor({
            features: [ParagraphFeature(), BoldFeature(), ItalicFeature()],
          }),
        },
      ],
    },
  ]
}
