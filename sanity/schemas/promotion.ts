import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'promotion',
  title: 'Promotions',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Promotion Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Airfare', value: 'airfare' },
          { title: 'Cruise', value: 'cruise' },
          { title: 'Disney', value: 'disney' },
          { title: 'General', value: 'general' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discount',
      title: 'Discount/Offer',
      type: 'string',
      description: 'e.g., "Up to $200 off" or "Kids sail free"',
    }),
    defineField({
      name: 'validUntil',
      title: 'Valid Until',
      type: 'string',
      description: 'e.g., "March 31, 2026"',
    }),
    defineField({
      name: 'terms',
      title: 'Terms & Conditions',
      type: 'text',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Promotion',
      type: 'boolean',
      description: 'Show this promotion in the top banner carousel',
      initialValue: false,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Display this promotion on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      featured: 'featured',
      active: 'active',
    },
    prepare(selection) {
      const { title, category, featured, active } = selection
      return {
        title,
        subtitle: `${category}${featured ? ' • Featured' : ''}${!active ? ' • Inactive' : ''}`,
      }
    },
  },
})
