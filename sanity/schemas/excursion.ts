import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'excursion',
  title: 'Excursions',
  type: 'document',
  fields: [
    defineField({
      name: 'trip',
      title: 'Trip',
      type: 'reference',
      to: [{ type: 'trip' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'port',
      title: 'Port/Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excursionName',
      title: 'Excursion Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excursionCode',
      title: 'Excursion Code',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., 4 hours, Full day',
    }),
    defineField({
      name: 'departureTime',
      title: 'Departure Time',
      type: 'string',
    }),
    defineField({
      name: 'returnTime',
      title: 'Return Time',
      type: 'string',
    }),
    defineField({
      name: 'meetingLocation',
      title: 'Meeting Location',
      type: 'string',
    }),
    defineField({
      name: 'cost',
      title: 'Cost per Person',
      type: 'number',
    }),
    defineField({
      name: 'numberOfParticipants',
      title: 'Number of Participants',
      type: 'number',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available Option', value: 'available' },
          { title: 'Client Considering', value: 'considering' },
          { title: 'Booked', value: 'booked' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Not Selected', value: 'not_selected' },
        ],
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'confirmationNumber',
      title: 'Confirmation Number',
      type: 'string',
    }),
    defineField({
      name: 'difficultyLevel',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'easy' },
          { title: 'Moderate', value: 'moderate' },
          { title: 'Strenuous', value: 'strenuous' },
        ],
      },
    }),
    defineField({
      name: 'wheelchairAccessible',
      title: 'Wheelchair Accessible',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'includesMeals',
      title: 'Includes Meals',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'whatToBring',
      title: 'What to Bring',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      excursionName: 'excursionName',
      port: 'port',
      date: 'date',
      status: 'status',
    },
    prepare(selection) {
      const { excursionName, port, date, status } = selection
      return {
        title: excursionName,
        subtitle: `${port} - ${date} - ${status}`,
      }
    },
  },
})
