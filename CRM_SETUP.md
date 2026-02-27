# CRM Setup Instructions

## Initial Setup

### 1. Start the Development Server
```bash
npm run dev
```

The site will be available at http://localhost:3000

### 2. Access Sanity Studio
Navigate to http://localhost:3000/studio

If this is your first time:
1. You'll be prompted to log in with your Sanity account
2. Once logged in, the studio will initialize with all the new CRM schemas

### 3. Verify Schemas Are Loaded
In Sanity Studio, you should see these document types in the left sidebar:
- ✅ Clients
- ✅ Trips  
- ✅ Itinerary Events
- ✅ Excursions
- ✅ Promotions (existing)

If you don't see them, try:
1. Refresh the page (Ctrl+R or Cmd+R)
2. Clear browser cache
3. Restart the dev server

## Creating Your First Client & Trip

### Step 1: Create a Test Client
1. In Sanity Studio, click **"Clients"** in the left sidebar
2. Click the **"Create"** button (top right, or the + icon)
3. Fill in the required fields:
   - **First Name**: Test
   - **Last Name**: Client
   - **Email**: test@example.com
4. Optionally add:
   - Phone number
   - Address
   - Passport info
   - Travel preferences
   - Emergency contact
5. Click **"Publish"**

### Step 2: Create a Test Trip
1. In Sanity Studio, click **"Trips"** in the left sidebar
2. Click **"Create"**
3. Fill in the required fields:
   - **Trip Name**: Caribbean Cruise Adventure
   - **Client**: Select your test client from the dropdown
   - **Trip Type**: Choose "Cruise"
   - **Start Date**: Choose a date (e.g., 2026-06-15)
   - **End Date**: Choose an end date (e.g., 2026-06-22)
   - **Status**: Select "Planning"
4. Notice that **Cruise Details** section appears (because you selected "Cruise")
5. Fill in cruise details:
   - Cruise Line: Royal Caribbean
   - Ship Name: Harmony of the Seas
   - Booking Number: RC12345
   - Cabin Number: 8234
6. Click **"Publish"**

### Step 3: Add an Itinerary Event
1. In Sanity Studio, click **"Itinerary Events"**
2. Click **"Create"**
3. Fill in:
   - **Trip**: Select your test trip
   - **Event Title**: Flight to Miami
   - **Event Type**: Flight
   - **Date**: Same as trip start date
   - **Start Time**: 08:00 AM
   - **Location**: John Wayne Airport
   - **Is Booked**: Toggle to true
4. Click **"Publish"**

### Step 4: Add an Excursion (for Cruise)
1. In Sanity Studio, click **"Excursions"**
2. Click **"Create"**
3. Fill in:
   - **Trip**: Select your cruise trip
   - **Port**: Cozumel, Mexico
   - **Date**: Pick a date during your cruise
   - **Excursion Name**: Snorkeling at Paradise Reef
   - **Duration**: 4 hours
   - **Departure Time**: 09:00 AM
   - **Cost**: 89
   - **Status**: Considering
4. Click **"Publish"**

## Viewing in the CRM

### Access the CRM Dashboard
1. Navigate to http://localhost:3000/crm
2. You should see:
   - Your test client in the client list
   - Your test trip in the recent trips
   - Dashboard statistics updated

### View Client Details
1. Click on your test client's name
2. You'll see:
   - All client information
   - List of their trips
   - Option to create new trips

### View Trip Details
1. Click on your test trip
2. Explore the tabs:
   - **Overview**: See trip details and cruise information
   - **Calendar**: Visual calendar with your flight event
   - **Itinerary**: List view of events
   - **Excursions**: Your snorkeling excursion

### Export Itinerary
1. From the trip detail page, click **"View Full Itinerary"**
2. You'll see a beautiful formatted itinerary
3. Try the export buttons:
   - **Export PDF**: Downloads a printable PDF
   - **Export Image**: Downloads a PNG image

## Common Tasks

### Adding More Event Types
Create different event types to see the variety:
- Hotel check-in/check-out
- Dining reservations
- Activities
- Port days
- Sea days

### Testing Different Trip Types

#### Disney Trip
1. Create new trip with Type: "Disney"
2. Notice Disney-specific fields appear:
   - Park selection
   - Resort name
   - Ticket numbers
   - MagicBand numbers
   - Dining plan

#### Destination Trip
1. Create new trip with Type: "Destination"
2. Notice destination fields appear:
   - Hotel information
   - Flight details
   - Car rental

#### Custom Trip
1. Create new trip with Type: "Custom"
2. Use custom fields for anything else

### Searching
On the CRM dashboard, use the search bar to find:
- Clients by name or email
- Trips by trip name

## Tips for Production Use

### Best Practices
1. **Always create the client first** before creating trips
2. **Use clear, descriptive trip names** (e.g., "Smith Family - Disney World 2026")
3. **Update statuses** as trips progress
4. **Add confirmation numbers** as you receive them
5. **Use notes fields** for important reminders

### Data Organization
- **Clients**: One per person or family (your choice)
- **Trips**: One per vacation/journey
- **Events**: Individual activities within a trip
- **Excursions**: Specifically for cruise port activities

### Security Note
The CRM is currently open to anyone with the URL. For production use, you should:
1. Add authentication (e.g., NextAuth.js)
2. Protect the `/crm` routes
3. Consider Sanity's user roles and permissions

## Troubleshooting

### "No clients found" or "No trips found"
- Make sure you've published (not just saved as draft) in Sanity Studio
- Check that your Sanity project ID and dataset are correctly configured in `sanity/env.ts`

### Schema changes not appearing
- Refresh Sanity Studio
- Restart the dev server

### Images/exports not working
- Make sure html2canvas and jspdf packages are installed
- Check browser console for errors
- Try in a different browser (Chrome recommended)

### Sanity Studio won't load
- Check that you're logged into Sanity
- Verify your project credentials in `sanity/env.ts`
- Check network tab for API errors

## Next Steps

Once comfortable with the basics:
1. Create real client data
2. Set up actual upcoming trips
3. Customize the schemas in `/sanity/schemas/` if needed
4. Add more event types or excursion options
5. Customize the export templates to match your branding

For questions, refer to:
- [CRM_GUIDE.md](./CRM_GUIDE.md) - Full feature documentation
- [Sanity Documentation](https://www.sanity.io/docs)
