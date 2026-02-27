# Travel CRM System

A comprehensive Customer Relationship Management system built with Next.js and Sanity CMS for managing clients and their travel itineraries.

## Features

### Client Management
- **Client Profiles**: Store detailed client information including:
  - Contact details (name, email, phone)
  - Address information
  - Passport details
  - Travel preferences
  - Emergency contacts
  - Internal notes

### Trip Management
Support for **four trip types**, each with specialized fields:

#### 1. Cruise Trips
- Cruise line and ship information
- Booking and cruise numbers
- Cabin details (number, type, deck)
- Dining arrangements
- **Excursion Management**:
  - Track shore excursions by port
  - Multiple status levels (available, considering, booked, confirmed)
  - Detailed excursion information (duration, times, cost, difficulty)
  - Client selection narrowing

#### 2. Disney Trips
- Park/location selection (WDW, Disneyland, DCL, Aulani, ABD)
- Resort and room details
- Ticket and MagicBand numbers
- Dining plan information
- Genie+/Lightning Lane selections

#### 3. Destination Trips
- Hotel information
- Flight details (multiple flights supported)
- Car rental information
- General destination details

#### 4. Custom Trips
- Flexible custom fields
- Adaptable for any trip type

### Calendar & Scheduling
- **Visual Calendar View**: Month-style calendar showing all trip days
- **Day-by-Day Planning**: View and manage events for each day
- **Event Types**:
  - Flights
  - Hotel check-in/check-out
  - Dining reservations
  - Activities and tours
  - Excursions
  - Port/Sea days
  - Park visits
  - Transportation
  - Free time
  - Custom events

### Itinerary Features
- **Detailed Event Information**:
  - Event times and locations
  - Confirmation numbers
  - Cost tracking
  - Booking and payment status
  - Contact information
  - Notes and descriptions

- **Filtering**: Filter events by type
- **Expandable Details**: Click to view full event information
- **Day Grouping**: Automatically organized by date

### Export Capabilities
- **PDF Export**: Print-ready itinerary in PDF format
- **Image Export**: Save itinerary as PNG for mobile devices
- Beautiful formatted layout with:
  - Trip header with key information
  - Day-by-day breakdown
  - Event icons and details
  - Professional branding

### Financial Tracking
- Total trip cost
- Deposit tracking
- Balance due
- Payment due dates

## Access & Navigation

### For Travel Agents (Your Girlfriend)
1. Navigate to the **Travel CRM** from the "More" menu in the main navigation
2. Dashboard shows:
   - Total clients and trips
   - Active and upcoming trips
   - Quick actions for adding clients/trips
3. Access Sanity Studio at `/studio` for full editing capabilities

### CRM Pages
- `/crm` - Main dashboard
- `/crm/clients/[id]` - Individual client details
- `/crm/trips/[id]` - Trip management with tabs:
  - Overview: Trip details and financial information
  - Calendar: Visual calendar with events
  - Itinerary: Detailed event list
  - Excursions: (Cruise trips only) Manage shore excursions
- `/crm/trips/[id]/itinerary` - Full printable itinerary with export options

## Using Sanity Studio

### Adding Data
1. **Add a Client**:
   - Go to Sanity Studio (`/studio`)
   - Click "Clients" in the left sidebar
   - Click "Create" button
   - Fill in client information
   - Save

2. **Create a Trip**:
   - In Sanity Studio, click "Trips"
   - Click "Create"
   - Select the client
   - Choose trip type (Cruise, Disney, Destination, or Custom)
   - Fill in dates and trip details
   - Type-specific fields will appear based on your selection
   - Save

3. **Add Events to Itinerary**:
   - In Sanity Studio, click "Itinerary Events"
   - Click "Create"
   - Select the trip this event belongs to
   - Choose event type
   - Fill in date, time, and details
   - Mark as booked/paid when confirmed
   - Save

4. **Add Excursions** (for Cruise trips):
   - In Sanity Studio, click "Excursions"
   - Click "Create"
   - Select the cruise trip
   - Enter port and date
   - Add excursion details
   - Set status:
     - **Available**: Option presented to client
     - **Considering**: Client is thinking about it
     - **Booked**: Client has selected it
     - **Confirmed**: Confirmed by cruise line
     - **Not Selected**: Client declined
   - Save

### Quick Actions from CRM
- Most pages have "Edit in Studio" buttons that open Sanity Studio directly to that item
- "Add Event" and "Add Excursion" buttons link to pre-filled creation forms

## Workflow Example

### Planning a Caribbean Cruise

1. **Create Client**:
   - Add client John & Jane Smith
   - Include passport info, preferences, emergency contact

2. **Create Trip**:
   - Trip type: Cruise
   - Add cruise line (Royal Caribbean), ship (Harmony of the Seas)
   - Add booking number and cabin details
   - Set dates: March 15-22, 2026

3. **Add Initial Events**:
   - Flight to Miami (March 15, 8:00 AM)
   - Cruise embarkation (March 15, 2:00 PM)
   - Cruise disembarkation (March 22, 8:00 AM)
   - Return flight (March 22, 2:00 PM)

4. **Add Port Days & Excursions**:
   - March 17: Cozumel port day
     - Add excursion options: Snorkeling, Mayan Ruins, Beach day
     - Mark their selections as "Considering"
     - Once decided, update to "Booked"
   - March 18: Grand Cayman
   - March 19: Jamaica
   - March 16, 20, 21: Sea days

5. **Add Dining & Activities**:
   - Specialty dining reservations
   - Spa appointments
   - Show reservations

6. **Share Itinerary**:
   - Go to full itinerary view
   - Export as PDF for clients to print
   - Export as image for them to save on phone

## Tips for Your Girlfriend

### Best Practices
1. **Start with the Client**: Always create the client profile first
2. **Use Confirmation Numbers**: Add these as you receive them from vendors
3. **Update Statuses**: Keep trip status current (Planning → Booked → Confirmed → In Progress → Completed)
4. **Add Details Gradually**: You don't need all information upfront - update as you go
5. **Use Notes Fields**: Great for special requests, dietary restrictions, or important reminders
6. **Excursion Management**: 
   - Add ALL excursion options as "Available"
   - Let clients narrow down by updating status
   - This creates a record of what was considered

### Client Communication
- Export itineraries at any stage to share progress
- PDF for email attachments
- Image for text messages or client's phone lock screen

### Organization
- Use the dashboard to see at-a-glance what needs attention
- Filter trips by status to focus on active bookings
- Calendar view helps identify scheduling conflicts

## Technical Details

### Schemas
- **Client**: Client profiles and information
- **Trip**: Main trip records with type-specific fields
- **Itinerary Event**: Individual events within trips
- **Excursion**: Cruise excursions with detailed tracking

### Tech Stack
- **Frontend**: Next.js 14, React, TypeScript
- **CMS**: Sanity CMS
- **Styling**: Tailwind CSS
- **Calendar**: date-fns for date manipulation
- **Export**: jsPDF (PDF), html2canvas (images)

## Support

For questions or issues, refer to the main [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) or Sanity documentation at https://www.sanity.io/docs

## Future Enhancements

Potential features to add:
- Email notifications for upcoming trips
- Client portal for self-service itinerary viewing
- Integration with booking systems
- Automated payment reminders
- Trip templates for common packages
- Multi-traveler support (families/groups)
- Document upload and storage
- Calendar export (iCal format)
