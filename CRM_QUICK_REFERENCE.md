# Travel CRM - Quick Reference Card

## 🚀 Quick Start
```bash
npm run dev
```
Then navigate to: `http://localhost:3000/crm`

## 📍 Main URLs
- **CRM Dashboard**: `/crm`
- **Sanity Studio**: `/studio`
- **Client Detail**: `/crm/clients/[id]`
- **Trip Detail**: `/crm/trips/[id]`
- **Full Itinerary**: `/crm/trips/[id]/itinerary`

## 🎯 Quick Workflow

### Creating a New Trip
1. **Create Client** (if new)
   - Go to `/studio` → Clients → Create
   - Fill name, email, phone
   - Add preferences, passport info
   - Publish

2. **Create Trip**
   - `/studio` → Trips → Create
   - Select client from dropdown
   - Choose trip type (Cruise/Disney/Destination/Custom)
   - Set dates and details
   - Publish

3. **Add Events**
   - `/studio` → Itinerary Events → Create
   - Select the trip
   - Choose event type
   - Set date, time, location
   - Mark as booked when confirmed
   - Publish

4. **Add Excursions** (Cruise only)
   - `/studio` → Excursions → Create
   - Select cruise trip
   - Enter port and date
   - Add excursion details
   - Set status (Available → Considering → Booked → Confirmed)
   - Publish

5. **Export Itinerary**
   - Go to `/crm/trips/[id]/itinerary`
   - Click "Export PDF" or "Export Image"
   - Share with client

## 📋 Trip Types & Fields

### 🚢 Cruise
- Cruise line, ship, cruise number
- Booking number, cabin number
- Deck, cabin type
- Dining time, table number
- **Excursions**: Port activities with status tracking

### 🏰 Disney
- Park (WDW, Disneyland, DCL, Aulani, ABD)
- Resort name, room type
- Confirmation number
- Ticket numbers, MagicBands
- Dining plan
- Genie+/Lightning Lane

### ✈️ Destination
- Destination location
- Hotel details, confirmation
- Flight information (multiple flights)
- Car rental details

### 🎨 Custom
- Flexible description
- Custom key-value fields

## 🎫 Event Types
| Icon | Type | Use For |
|------|------|---------|
| ✈️ | Flight | Air travel |
| 🏨 | Hotel Check-in | Arrival at hotel |
| 🚪 | Hotel Check-out | Departure from hotel |
| 🍽️ | Dining | Restaurant reservations |
| 🎯 | Activity | Tours, shows, activities |
| 🚢 | Excursion | Shore excursions |
| ⚓ | Port Day | Cruise port stops |
| 🌊 | Sea Day | Days at sea |
| 🎢 | Park Visit | Theme park days |
| 🚗 | Transportation | Transfers, car service |
| 📅 | Meeting | Appointments |
| 🌴 | Free Time | Unscheduled time |
| 📌 | Custom | Anything else |

## 🔍 Search Tips
- Type in search bar on dashboard
- Search clients by name or email
- Search trips by trip name
- Click result to navigate instantly

## 💾 Excursion Statuses
- **Available**: Option presented to client
- **Considering**: Client thinking about it
- **Booked**: Client selected, pending confirmation
- **Confirmed**: Confirmed by cruise line
- **Cancelled**: Cancelled
- **Not Selected**: Client declined

## 📤 Export Options

### PDF Export
- Professional print layout
- Multi-page support
- Perfect for email attachments
- Client can print at home

### Image Export
- High-resolution PNG
- Mobile-friendly
- Great for phone lock screens
- Easy to text/share

## ⚡ Keyboard Shortcuts (in Sanity Studio)
- `Ctrl/Cmd + S` - Save draft
- `Ctrl/Cmd + Alt + P` - Publish
- `Ctrl/Cmd + \` - Toggle sidebar
- `Ctrl/Cmd + K` - Command palette

## 💡 Pro Tips

### Organization
1. Use clear trip names: "Smith Family - Caribbean Cruise 2026"
2. Always add confirmation numbers as you get them
3. Update trip status as it progresses
4. Use notes fields for special requests

### Client Communication
1. Export itinerary early and often
2. PDF for detailed review
3. Image for quick mobile reference
4. Update after any changes

### Excursion Management
1. Add ALL excursion options as "Available"
2. Let clients narrow down by updating status
3. This creates a record of what was considered
4. Update to "Confirmed" only when cruise line confirms

### Data Entry
1. Create client first, then trips
2. Trips can have multiple events
3. Events are linked to one trip
4. Excursions are cruise-specific

## 🆘 Troubleshooting

### "No clients/trips found"
- Make sure you clicked "Publish" (not just save)
- Check you're looking at the right dataset

### Schema not appearing
- Refresh Sanity Studio
- Restart dev server
- Clear browser cache

### Export not working
- Check browser console for errors
- Try in Chrome (best compatibility)
- Make sure content is visible before exporting

### Search not working
- Wait for 300ms after typing (debounce)
- Make sure data is published
- Try exact name match first

## 📊 Useful Sanity Queries

### Find upcoming trips
```groq
*[_type == "trip" && startDate >= now()] | order(startDate asc)
```

### Get trips with balance due
```groq
*[_type == "trip" && balanceDue > 0]
```

### Find unbooked events
```groq
*[_type == "itineraryEvent" && isBooked == false]
```

See [SANITY_QUERIES.md](./SANITY_QUERIES.md) for more!

## 📚 Documentation Files
- `CRM_GUIDE.md` - Complete feature documentation
- `CRM_SETUP.md` - Step-by-step setup guide
- `CRM_IMPLEMENTATION.md` - Technical summary
- `SANITY_QUERIES.md` - Useful database queries

## 🎯 Common Tasks Checklist

### New Cruise Booking
- [ ] Create/verify client
- [ ] Create cruise trip
- [ ] Add cruise details (booking #, cabin)
- [ ] Add embarkation flight
- [ ] Add disembarkation flight
- [ ] Add cruise embark event
- [ ] Add cruise disembark event
- [ ] Research excursions for each port
- [ ] Add excursion options (status: Available)
- [ ] Wait for client selections
- [ ] Update selected excursions (status: Booked)
- [ ] Add dining reservations
- [ ] Add specialty activities
- [ ] Export itinerary for client review
- [ ] Update when confirmations received
- [ ] Final export before departure

### Disney Trip Planning
- [ ] Create client
- [ ] Create Disney trip
- [ ] Add resort reservation
- [ ] Add flight details
- [ ] Add park tickets
- [ ] Add dining reservations (180 days out)
- [ ] Add Lightning Lane selections
- [ ] Add special events (MNSSHP, etc.)
- [ ] Add MagicBand numbers
- [ ] Export itinerary

### Status Progression
```
Planning → Booked → Confirmed → In Progress → Completed
```

## 🔗 Integration Points
- Main website menu: "More" → "Travel CRM"
- Direct Sanity Studio access: `/studio`
- All "Edit in Studio" buttons link to specific records

## 💰 Financial Tracking
Track these at trip level:
- Total Cost
- Deposit Paid
- Balance Due
- Payment Due Date

Track these at event level:
- Event Cost
- Is Paid (checkbox)
- Is Booked (checkbox)

## ⚙️ System Requirements
- Node.js 18+
- Modern browser (Chrome recommended)
- Internet connection (for Sanity)

---

**Need Help?** See the full guides:
- New to system? → [CRM_SETUP.md](./CRM_SETUP.md)
- Using features? → [CRM_GUIDE.md](./CRM_GUIDE.md)
- Advanced queries? → [SANITY_QUERIES.md](./SANITY_QUERIES.md)
