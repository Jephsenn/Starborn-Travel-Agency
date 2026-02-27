import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'client',
  title: 'Clients',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        { name: 'street', title: 'Street', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'state', title: 'State', type: 'string' },
        { name: 'zipCode', title: 'Zip Code', type: 'string' },
        { name: 'country', title: 'Country', type: 'string' },
      ],
    }),
    defineField({
      name: 'dateOfBirth',
      title: 'Date of Birth',
      type: 'date',
    }),
    defineField({
      name: 'passportNumber',
      title: 'Passport Number',
      type: 'string',
    }),
    defineField({
      name: 'passportExpiry',
      title: 'Passport Expiry Date',
      type: 'date',
    }),
    defineField({
      name: 'preferences',
      title: 'Travel Preferences',
      type: 'text',
      description: 'Dietary restrictions, accessibility needs, room preferences, etc.',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Private notes about the client',
    }),
    defineField({
      name: 'emergencyContact',
      title: 'Emergency Contact',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'relationship', title: 'Relationship', type: 'string' },
        { name: 'phone', title: 'Phone', type: 'string' },
      ],
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
    },
    prepare(selection) {
      const { firstName, lastName, email } = selection
      return {
        title: `${firstName} ${lastName}`,
        subtitle: email,
      }
    },
  },
})
