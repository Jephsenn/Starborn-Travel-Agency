import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'trip',
  title: 'Trips',
  type: 'document',
  fields: [
    defineField({
      name: 'tripName',
      title: 'Trip Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{ type: 'client' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tripType',
      title: 'Trip Type',
      type: 'string',
      options: {
        list: [
          { title: 'Cruise', value: 'cruise' },
          { title: 'Disney', value: 'disney' },
          { title: 'Destination', value: 'destination' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Planning', value: 'planning' },
          { title: 'Booked', value: 'booked' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'planning',
    }),
    defineField({
      name: 'totalCost',
      title: 'Total Cost',
      type: 'number',
    }),
    defineField({
      name: 'depositPaid',
      title: 'Deposit Paid',
      type: 'number',
    }),
    defineField({
      name: 'balanceDue',
      title: 'Balance Due',
      type: 'number',
    }),
    defineField({
      name: 'paymentDueDate',
      title: 'Payment Due Date',
      type: 'date',
    }),
    
    // Cruise-specific fields
    defineField({
      name: 'cruiseDetails',
      title: 'Cruise Details',
      type: 'object',
      hidden: ({ parent }) => parent?.tripType !== 'cruise',
      fields: [
        { name: 'cruiseLine', title: 'Cruise Line', type: 'string' },
        { name: 'shipName', title: 'Ship Name', type: 'string' },
        { name: 'cruiseNumber', title: 'Cruise Number', type: 'string' },
        { name: 'bookingNumber', title: 'Booking Number', type: 'string' },
        { name: 'cabinNumber', title: 'Cabin Number', type: 'string' },
        { name: 'cabinType', title: 'Cabin Type', type: 'string' },
        { name: 'deckNumber', title: 'Deck Number', type: 'string' },
        { name: 'diningTime', title: 'Dining Time', type: 'string' },
        { name: 'tableNumber', title: 'Table Number', type: 'string' },
      ],
    }),
    
    // Disney-specific fields
    defineField({
      name: 'disneyDetails',
      title: 'Disney Details',
      type: 'object',
      hidden: ({ parent }) => parent?.tripType !== 'disney',
      fields: [
        { 
          name: 'park', 
          title: 'Park/Location', 
          type: 'string',
          options: {
            list: [
              { title: 'Walt Disney World', value: 'wdw' },
              { title: 'Disneyland', value: 'disneyland' },
              { title: 'Disney Cruise Line', value: 'dcl' },
              { title: 'Aulani', value: 'aulani' },
              { title: 'Adventures by Disney', value: 'abd' },
            ],
          },
        },
        { name: 'resortName', title: 'Resort Name', type: 'string' },
        { name: 'roomType', title: 'Room Type', type: 'string' },
        { name: 'confirmationNumber', title: 'Confirmation Number', type: 'string' },
        { name: 'ticketNumbers', title: 'Ticket Numbers', type: 'array', of: [{ type: 'string' }] },
        { name: 'magicBands', title: 'MagicBand Numbers', type: 'array', of: [{ type: 'string' }] },
        { name: 'diningPlan', title: 'Dining Plan', type: 'string' },
        { name: 'fastPassSelections', title: 'Genie+/Lightning Lane', type: 'text' },
      ],
    }),
    
    // Destination-specific fields
    defineField({
      name: 'destinationDetails',
      title: 'Destination Details',
      type: 'object',
      hidden: ({ parent }) => parent?.tripType !== 'destination',
      fields: [
        { name: 'destination', title: 'Destination', type: 'string' },
        { name: 'hotelName', title: 'Hotel Name', type: 'string' },
        { name: 'hotelAddress', title: 'Hotel Address', type: 'text' },
        { name: 'confirmationNumber', title: 'Confirmation Number', type: 'string' },
        { name: 'roomType', title: 'Room Type', type: 'string' },
        { name: 'flightDetails', title: 'Flight Details', type: 'array', of: [
          {
            type: 'object',
            fields: [
              { name: 'airline', title: 'Airline', type: 'string' },
              { name: 'flightNumber', title: 'Flight Number', type: 'string' },
              { name: 'confirmationCode', title: 'Confirmation Code', type: 'string' },
              { name: 'departureAirport', title: 'Departure Airport', type: 'string' },
              { name: 'arrivalAirport', title: 'Arrival Airport', type: 'string' },
              { name: 'departureTime', title: 'Departure Time', type: 'datetime' },
              { name: 'arrivalTime', title: 'Arrival Time', type: 'datetime' },
              { name: 'seatNumbers', title: 'Seat Numbers', type: 'string' },
            ],
          },
        ]},
        { name: 'carRental', title: 'Car Rental Details', type: 'object', fields: [
          { name: 'company', title: 'Company', type: 'string' },
          { name: 'confirmationNumber', title: 'Confirmation Number', type: 'string' },
          { name: 'vehicleType', title: 'Vehicle Type', type: 'string' },
          { name: 'pickupLocation', title: 'Pickup Location', type: 'string' },
          { name: 'dropoffLocation', title: 'Dropoff Location', type: 'string' },
        ]},
      ],
    }),
    
    // Custom trip fields
    defineField({
      name: 'customDetails',
      title: 'Custom Trip Details',
      type: 'object',
      hidden: ({ parent }) => parent?.tripType !== 'custom',
      fields: [
        { name: 'description', title: 'Trip Description', type: 'text' },
        { name: 'customFields', title: 'Custom Information', type: 'array', of: [
          {
            type: 'object',
            fields: [
              { name: 'label', title: 'Label', type: 'string' },
              { name: 'value', title: 'Value', type: 'text' },
            ],
          },
        ]},
      ],
    }),
    
    // Documents and files
    defineField({
      name: 'documents',
      title: 'Documents',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Document Title', type: 'string' },
            { name: 'file', title: 'File', type: 'file' },
            { name: 'notes', title: 'Notes', type: 'text' },
          ],
        },
      ],
    }),
    
    defineField({
      name: 'notes',
      title: 'Trip Notes',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      tripName: 'tripName',
      clientFirstName: 'client.firstName',
      clientLastName: 'client.lastName',
      tripType: 'tripType',
      startDate: 'startDate',
    },
    prepare(selection) {
      const { tripName, clientFirstName, clientLastName, tripType, startDate } = selection
      return {
        title: tripName,
        subtitle: `${clientFirstName} ${clientLastName} - ${tripType} - ${startDate}`,
      }
    },
  },
})
