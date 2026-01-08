import type { CollectionConfig } from 'payload'

export const SectionsIcons: CollectionConfig = {
  slug: 'sections_icons',
  labels: {
    singular: 'Іконка секції',
    plural: 'Іконки секцій',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'icon', 'icon_active'],
    group: 'Медіа',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Назва іконки',
      required: true,
    },
    {
      name: 'icon',
      type: 'relationship',
      relationTo: 'media',
      label: 'Іконка (пасивний стан)',
      required: true,
    },
    {
      name: 'icon_active',
      type: 'relationship',
      relationTo: 'media',
      label: 'Іконка (активний стан)',
      required: true,
    },
  ],
}
