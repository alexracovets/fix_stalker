import type { Field } from 'payload'

export const PageConfigFields = (): Field[] => {
  return [
    {
      name: 'slug_name',
      label: {
        uk: 'Назва сторінки (slug)',
        en: 'Page name (slug)',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'parent',
      label: {
        uk: 'Батьківська сторінка',
        en: 'Parent page',
      },
      type: 'relationship',
      relationTo: 'sections',
      hasMany: false,
    },
  ]
}
