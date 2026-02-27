import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'itineraryEvent',
  title: 'Itinerary Events',
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
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Flight', value: 'flight' },
          { title: 'Hotel Check-in', value: 'hotel_checkin' },
          { title: 'Hotel Check-out', value: 'hotel_checkout' },
          { title: 'Dining Reservation', value: 'dining' },
          { title: 'Activity/Tour', value: 'activity' },
          { title: 'Excursion', value: 'excursion' },
          { title: 'Port Day', value: 'port_day' },
          { title: 'Sea Day', value: 'sea_day' },
          { title: 'Park Visit', value: 'park_visit' },
          { title: 'Transportation', value: 'transportation' },
          { title: 'Meeting/Appointment', value: 'meeting' },
          { title: 'Free Time', value: 'free_time' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
      description: 'e.g., 09:00 AM',
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'string',
      description: 'e.g., 05:00 PM',
    }),
    defineField({
      name: 'allDay',
      title: 'All Day Event',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'confirmationNumber',
      title: 'Confirmation Number',
      type: 'string',
    }),
    defineField({
      name: 'cost',
      title: 'Cost',
      type: 'number',
    }),
    defineField({
      name: 'isPaid',
      title: 'Is Paid',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isBooked',
      title: 'Is Booked',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'name', title: 'Contact Name', type: 'string' },
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'website', title: 'Website', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eventType: 'eventType',
      date: 'date',
      startTime: 'startTime',
    },
    prepare(selection) {
      const { title, eventType, date, startTime } = selection
      return {
        title: title,
        subtitle: `${eventType} - ${date} ${startTime || ''}`,
      }
    },
  },
})
