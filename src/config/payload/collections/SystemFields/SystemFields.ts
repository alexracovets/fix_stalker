import type { CollectionConfig } from 'payload'

import { AsideSearchFields } from '@fields'

export const SystemFields: CollectionConfig = {
  slug: 'system-fields',
  labels: {
    singular: 'UI System',
    plural: 'UI System',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'type',
    group: 'Додатково',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'Тип Поля',
      options: [
        { label: 'Aside Search', value: 'search_aside' },
        { label: 'Home Logo', value: 'home_logo' },
      ],
      defaultValue: 'search_aside',
    },
    {
      type: 'row',
      fields: [...AsideSearchFields()],
    },
  ],
}
