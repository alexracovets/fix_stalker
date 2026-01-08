import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: {
      uk: 'Медіа',
      en: 'Media',
    },
    plural: {
      uk: 'Медіа файли',
      en: 'Media files',
    },
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt'],
    group: {
      uk: 'Медіа',
      en: 'Media',
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: {
        uk: 'Альтернативний текст',
        en: 'Alternative text',
      },
    },
  ],
  upload: true,
}
