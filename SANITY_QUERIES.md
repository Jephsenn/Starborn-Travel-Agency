# Useful Sanity Queries for CRM

These queries can be run in Sanity Studio's "Vision" tool (usually found in the top menu).

## Client Queries

### Get all clients sorted by last name
```groq
*[_type == "client"] | order(lastName asc) {
  _id,
  firstName,
  lastName,
  email,
  phone
}
```

### Find clients with upcoming trips
```groq
*[_type == "client"] {
  _id,
  firstName,
  lastName,
  email,
  "trips": *[_type == "trip" && references(^._id) && startDate > now()] {
    tripName,
    startDate,
    endDate,
    status
  }
}[count(trips) > 0]
```

### Find clients without passport information
```groq
*[_type == "client" && !defined(passportNumber)] {
  firstName,
  lastName,
  email
}
```

## Trip Queries

### Get all trips with client information
```groq
*[_type == "trip"] | order(startDate desc) {
  _id,
  tripName,
  tripType,
  startDate,
  endDate,
  status,
  "client": client->{
    firstName,
    lastName,
    email
  }
}
```

### Find trips by status
```groq
*[_type == "trip" && status == "confirmed"] {
  tripName,
  startDate,
  "client": client->{firstName, lastName}
}
```

### Get upcoming trips (next 30 days)
```groq
*[_type == "trip" && startDate >= now() && startDate <= dateTime(now()) + 60*60*24*30] | order(startDate asc) {
  tripName,
  startDate,
  tripType,
  "client": client->{firstName, lastName},
  "daysUntil": round((dateTime(startDate) - dateTime(now())) / (60*60*24))
}
```

### Find cruises with incomplete details
```groq
*[_type == "trip" && tripType == "cruise" && !defined(cruiseDetails.bookingNumber)] {
  tripName,
  "client": client->{firstName, lastName},
  startDate
}
```

### Get trips with outstanding balance
```groq
*[_type == "trip" && defined(balanceDue) && balanceDue > 0] {
  tripName,
  "client": client->{firstName, lastName, email},
  totalCost,
  depositPaid,
  balanceDue,
  paymentDueDate
}
```

## Itinerary Event Queries

### Get all events for a specific trip
```groq
*[_type == "itineraryEvent" && trip._ref == "TRIP_ID_HERE"] | order(date asc, startTime asc) {
  title,
  eventType,
  date,
  startTime,
  location,
  isBooked
}
```

### Find unbooked events
```groq
*[_type == "itineraryEvent" && isBooked == false] {
  title,
  eventType,
  date,
  "trip": trip->{tripName, "client": client->{firstName, lastName}}
}
```

### Get all dining reservations
```groq
*[_type == "itineraryEvent" && eventType == "dining"] | order(date asc) {
  title,
  date,
  startTime,
  location,
  confirmationNumber,
  "trip": trip->{tripName, "client": client->{firstName, lastName}}
}
```

### Find events with confirmation numbers
```groq
*[_type == "itineraryEvent" && defined(confirmationNumber)] {
  title,
  eventType,
  confirmationNumber,
  "trip": trip->{tripName}
}
```

## Excursion Queries

### Get all excursions by status
```groq
*[_type == "excursion"] {
  "status": status,
  "count": count(*[_type == "excursion" && status == ^.status])
} | order(status asc)
```

### Find booked/confirmed excursions
```groq
*[_type == "excursion" && status in ["booked", "confirmed"]] | order(date asc) {
  excursionName,
  port,
  date,
  departureTime,
  cost,
  numberOfParticipants,
  "totalCost": cost * numberOfParticipants,
  "trip": trip->{tripName, "client": client->{firstName, lastName}}
}
```

### Get excursions by port
```groq
*[_type == "excursion"] | order(port asc, date asc) {
  port,
  date,
  excursionName,
  status,
  "trip": trip->{tripName, "client": client->{firstName, lastName}}
}
```

### Find expensive excursions (over $100)
```groq
*[_type == "excursion" && cost > 100] | order(cost desc) {
  excursionName,
  port,
  cost,
  status,
  "trip": trip->{tripName}
}
```

## Complex/Analytical Queries

### Client trip summary with statistics
```groq
*[_type == "client"] {
  firstName,
  lastName,
  email,
  "totalTrips": count(*[_type == "trip" && references(^._id)]),
  "upcomingTrips": count(*[_type == "trip" && references(^._id) && startDate > now()]),
  "completedTrips": count(*[_type == "trip" && references(^._id) && status == "completed"]),
  "trips": *[_type == "trip" && references(^._id)] | order(startDate desc)[0...5] {
    tripName,
    tripType,
    startDate,
    status
  }
}[totalTrips > 0] | order(totalTrips desc)
```

### Trip revenue summary
```groq
{
  "totalRevenue": sum(*[_type == "trip" && defined(totalCost)].totalCost),
  "totalDeposits": sum(*[_type == "trip" && defined(depositPaid)].depositPaid),
  "totalOutstanding": sum(*[_type == "trip" && defined(balanceDue)].balanceDue),
  "tripCount": count(*[_type == "trip"]),
  "averageTripCost": round(sum(*[_type == "trip" && defined(totalCost)].totalCost) / count(*[_type == "trip" && defined(totalCost)]))
}
```

### Trip type breakdown
```groq
{
  "cruise": count(*[_type == "trip" && tripType == "cruise"]),
  "disney": count(*[_type == "trip" && tripType == "disney"]),
  "destination": count(*[_type == "trip" && tripType == "destination"]),
  "custom": count(*[_type == "trip" && tripType == "custom"]),
  "total": count(*[_type == "trip"])
}
```

### Complete trip details with all related data
```groq
*[_type == "trip" && _id == "TRIP_ID_HERE"][0] {
  ...,
  "client": client->{
    firstName,
    lastName,
    email,
    phone,
    preferences
  },
  "events": *[_type == "itineraryEvent" && references(^._id)] | order(date asc, startTime asc) {
    title,
    eventType,
    date,
    startTime,
    endTime,
    location,
    isBooked,
    confirmationNumber
  },
  "excursions": *[_type == "excursion" && references(^._id)] | order(date asc) {
    excursionName,
    port,
    date,
    status,
    cost
  },
  "eventCount": count(*[_type == "itineraryEvent" && references(^._id)]),
  "excursionCount": count(*[_type == "excursion" && references(^._id)]),
  "bookedEventCount": count(*[_type == "itineraryEvent" && references(^._id) && isBooked == true])
}
```

### Trips needing attention (incomplete information)
```groq
*[_type == "trip" && status in ["planning", "booked"] && (
  !defined(totalCost) ||
  count(*[_type == "itineraryEvent" && references(^._id)]) == 0
)] {
  tripName,
  status,
  startDate,
  "client": client->{firstName, lastName},
  "hasCost": defined(totalCost),
  "eventCount": count(*[_type == "itineraryEvent" && references(^._id)]),
  "issues": select(
    !defined(totalCost) && count(*[_type == "itineraryEvent" && references(^._id)]) == 0 => "Missing cost and events",
    !defined(totalCost) => "Missing cost",
    count(*[_type == "itineraryEvent" && references(^._id)]) == 0 => "No events added",
    "Unknown"
  )
}
```

### Monthly booking calendar
```groq
*[_type == "trip" && defined(startDate)] {
  "month": dateTime(startDate).toDate()[0...7],
  tripName,
  tripType,
  startDate,
  "client": client->{firstName, lastName}
} | order(month asc, startDate asc)
```

## How to Use These Queries

1. Open Sanity Studio
2. Click on "Vision" in the top menu (looks like a query icon)
3. Paste any query into the query editor
4. Click "Fetch" or press Ctrl+Enter (Cmd+Enter on Mac)
5. View results in JSON format

### Tips
- Replace `TRIP_ID_HERE` with an actual trip ID from your data
- Replace `CLIENT_ID_HERE` with an actual client ID
- Modify date ranges as needed
- Use `[0...10]` to limit results (shows first 10)
- Add more fields to the projection as needed

### Export Results
- Click the "Result" tab to see formatted JSON
- Use the download button to save as JSON file
- Copy results for use in spreadsheets or reports

## Using Results

These queries are useful for:
- **Reporting**: Monthly revenue, trip counts, client statistics
- **Data Quality**: Finding incomplete records
- **Client Communication**: Identifying upcoming trips needing attention
- **Operations**: Tracking unbooked events, missing confirmations
- **Analytics**: Understanding business trends and patterns
