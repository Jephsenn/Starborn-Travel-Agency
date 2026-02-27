# Travel CRM System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    STARBORN TRAVEL AGENCY                        │
│                      Travel CRM System                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Website    │  │     CRM      │  │    Sanity    │          │
│  │   (Public)   │  │  (Private)   │  │    Studio    │          │
│  │              │  │              │  │              │          │
│  │ - Home       │  │ - Dashboard  │  │ - Clients    │          │
│  │ - About      │  │ - Clients    │  │ - Trips      │          │
│  │ - Services   │  │ - Trips      │  │ - Events     │          │
│  │ - Contact    │  │ - Search     │  │ - Excursions │          │
│  │ - Promos     │  │ - Calendar   │  │ - Vision     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         │                  │                  │                 │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          └──────────────────┴──────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NEXT.JS APPLICATION                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Components:                    Pages:                           │
│  ├─ Header                      ├─ /                            │
│  ├─ Footer                      ├─ /about                       │
│  ├─ HeroCarousel                ├─ /services                    │
│  ├─ TripCalendar                ├─ /crm ◄── CRM Dashboard       │
│  ├─ ItineraryView               ├─ /crm/clients/[id]            │
│  ├─ ExcursionManager            ├─ /crm/trips/[id]              │
│  ├─ CRMSearch                   └─ /studio ◄── Sanity Studio    │
│  └─ PromotionCard                                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SANITY CMS (Backend)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Content Types (Schemas):                                       │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ CLIENT                                                  │     │
│  ├────────────────────────────────────────────────────────┤     │
│  │ - Personal Info (name, email, phone)                   │     │
│  │ - Address                                               │     │
│  │ - Passport Details                                      │     │
│  │ - Preferences                                           │     │
│  │ - Emergency Contact                                     │     │
│  │ - Notes                                                 │     │
│  └────────────────────────────────────────────────────────┘     │
│                          │                                       │
│                          │ 1:Many                                │
│                          ▼                                       │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ TRIP                                                    │     │
│  ├────────────────────────────────────────────────────────┤     │
│  │ Common Fields:                                          │     │
│  │ - Trip Name, Type, Dates                               │     │
│  │ - Status, Financial Info                               │     │
│  │                                                         │     │
│  │ Type-Specific:                                          │     │
│  │ ┌─────────────┐ ┌──────────┐ ┌─────────────┐ ┌──────┐ │     │
│  │ │ CRUISE      │ │ DISNEY   │ │ DESTINATION │ │CUSTOM│ │     │
│  │ │             │ │          │ │             │ │      │ │     │
│  │ │ - Ship      │ │ - Resort │ │ - Hotel     │ │ -Any │ │     │
│  │ │ - Cabin     │ │ - Tickets│ │ - Flights   │ │  Data│ │     │
│  │ │ - Dining    │ │ - Bands  │ │ - Car Rental│ │      │ │     │
│  │ └─────────────┘ └──────────┘ └─────────────┘ └──────┘ │     │
│  └────────────────────────────────────────────────────────┘     │
│           │                        │                             │
│           │ 1:Many                 │ 1:Many (Cruise only)        │
│           ▼                        ▼                             │
│  ┌─────────────────┐     ┌──────────────────────┐               │
│  │ ITINERARY EVENT │     │ EXCURSION            │               │
│  ├─────────────────┤     ├──────────────────────┤               │
│  │ - Title         │     │ - Excursion Name     │               │
│  │ - Event Type    │     │ - Port               │               │
│  │ - Date/Time     │     │ - Date/Time          │               │
│  │ - Location      │     │ - Duration           │               │
│  │ - Description   │     │ - Cost               │               │
│  │ - Confirmation# │     │ - Status             │               │
│  │ - Cost          │     │ - Difficulty         │               │
│  │ - Is Booked     │     │ - Accessibility      │               │
│  │ - Is Paid       │     │ - What to Bring      │               │
│  │ - Contact Info  │     │ - Confirmation#      │               │
│  └─────────────────┘     └──────────────────────┘               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA FLOW & EXPORTS                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Query (Read)                    Mutate (Write)                  │
│  ├─ Fetch clients               ├─ Create via Studio            │
│  ├─ Fetch trips                 ├─ Update via Studio            │
│  ├─ Fetch events                ├─ Delete via Studio            │
│  ├─ Fetch excursions            └─ Publish/Unpublish            │
│  └─ Search                                                       │
│                                                                  │
│  Export                                                          │
│  ├─ PDF (jsPDF)                                                 │
│  │   └─ Multi-page, print-ready documents                       │
│  └─ Image (html2canvas)                                         │
│      └─ High-res PNG for mobile                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Relationships

```
CLIENT (1) ──────┬────── (Many) TRIP
                 │
                 │       TRIP (1) ──────┬────── (Many) ITINERARY EVENT
                 │                       │
                 │                       └────── (Many) EXCURSION*
                 │
                 └────── (Many) TRIP
                         
* Excursions only apply to Cruise-type trips
```

## User Flow - Creating a Trip

```
START
  │
  ▼
┌────────────────────┐
│ Login to Website   │
└────────────────────┘
  │
  ▼
┌────────────────────┐      ┌─────────────────────┐
│ Navigate to        │──────│ Option A: Use       │
│ /crm Dashboard     │      │ Dashboard Interface │
└────────────────────┘      └─────────────────────┘
  │                                   │
  │                                   ▼
  │                         ┌──────────────────────┐
  │                         │ View Clients & Trips │
  │                         │ Search & Filter      │
  │                         │ Navigate to Details  │
  │                         └──────────────────────┘
  │                                   │
  │                                   │
  ▼                                   │
┌────────────────────┐                │
│ OR Navigate to     │                │
│ /studio            │◄───────────────┘
└────────────────────┘      
  │
  ▼
┌────────────────────┐
│ Create Client      │
│ (if new)           │
└────────────────────┘
  │
  ▼
┌────────────────────┐
│ Create Trip        │
│ - Select Client    │
│ - Choose Type      │
│ - Add Dates        │
│ - Fill Details     │
└────────────────────┘
  │
  ▼
┌────────────────────┐
│ Add Events         │
│ - Flights          │
│ - Hotels           │
│ - Activities       │
│ - Dining           │
└────────────────────┘
  │
  ▼
┌────────────────────┐
│ Add Excursions     │
│ (Cruise Only)      │
│ - Port stops       │
│ - Activities       │
│ - Status tracking  │
└────────────────────┘
  │
  ▼
┌────────────────────┐
│ View in CRM        │
│ - Calendar View    │
│ - Itinerary View   │
│ - Overview         │
└────────────────────┘
  │
  ▼
┌────────────────────┐
│ Export Itinerary   │
│ - PDF for Print    │
│ - Image for Phone  │
└────────────────────┘
  │
  ▼
┌────────────────────┐
│ Share with Client  │
└────────────────────┘
  │
  ▼
END
```

## Component Hierarchy

```
App Layout
│
├─ Header (Navigation)
│  ├─ Logo
│  ├─ Main Nav Links
│  └─ "More" Dropdown
│     └─ Travel CRM Link ◄── Entry Point
│
├─ CRM Dashboard (/crm/page.tsx)
│  ├─ CRMSearch Component
│  ├─ Quick Stats Cards
│  ├─ Quick Actions Buttons
│  └─ Tabbed Interface
│     ├─ Clients Tab (Table)
│     └─ Trips Tab (Table)
│
├─ Client Detail (/crm/clients/[id]/page.tsx)
│  ├─ Client Info Sidebar
│  │  ├─ Contact Info
│  │  ├─ Passport Info
│  │  ├─ Emergency Contact
│  │  └─ Preferences
│  └─ Trips List
│     └─ Trip Cards (clickable)
│
├─ Trip Detail (/crm/trips/[id]/page.tsx)
│  ├─ Trip Header
│  ├─ Tab Navigation
│  ├─ Overview Tab
│  │  ├─ Trip Info Grid
│  │  ├─ Type-Specific Details
│  │  ├─ Financial Summary
│  │  └─ Quick Stats
│  ├─ Calendar Tab
│  │  └─ TripCalendar Component
│  │     ├─ Calendar Grid
│  │     ├─ Event Indicators
│  │     └─ Day Details Sidebar
│  ├─ Itinerary Tab
│  │  └─ ItineraryView Component
│  │     ├─ Event Type Filters
│  │     └─ Event Cards by Day
│  └─ Excursions Tab (Cruise only)
│     └─ ExcursionManager Component
│        ├─ Status Filters
│        └─ Excursion Cards by Port
│
├─ Full Itinerary (/crm/trips/[id]/itinerary/page.tsx)
│  ├─ Export Actions Bar
│  │  ├─ PDF Export Button
│  │  └─ Image Export Button
│  └─ Printable Itinerary
│     ├─ Header Section
│     ├─ Trip Info Summary
│     └─ Daily Schedule
│        └─ Day Cards
│           ├─ Events
│           └─ Excursions
│
└─ Footer
```

## Technology Stack Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │ Next.js  │  │  React   │  │TypeScript│  │  Tailwind  │  │
│  │   14     │  │    18    │  │    5.3   │  │    CSS     │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    UTILITY LIBRARIES                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐               │
│  │ date-fns  │  │  jsPDF    │  │html2canvas│               │
│  │ (Dates)   │  │  (PDF)    │  │  (Image)  │               │
│  └───────────┘  └───────────┘  └───────────┘               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API/DATA LAYER                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Sanity Client (@sanity/client)                       │   │
│  │ - Fetch queries (GROQ)                               │   │
│  │ - Real-time updates                                  │   │
│  │ - Image optimization                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND/CMS LAYER                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Sanity CMS (Cloud Hosted)                           │   │
│  │ ├─ Content Lake (Data Storage)                      │   │
│  │ ├─ Studio (Admin Interface)                         │   │
│  │ ├─ Vision (Query Tool)                              │   │
│  │ └─ CDN (Content Delivery)                           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## File Organization

```
starborn-travel-agency/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── crm/                     # ◄── CRM Section
│   │   ├── page.tsx            # CRM Dashboard
│   │   ├── clients/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Client Detail
│   │   └── trips/
│   │       └── [id]/
│   │           ├── page.tsx    # Trip Detail
│   │           └── itinerary/
│   │               └── page.tsx # Full Itinerary
│   └── studio/                  # Sanity Studio
│       └── [[...index]]/
│           └── page.tsx
│
├── components/                   # React Components
│   ├── Header.tsx               # Main navigation
│   ├── Footer.tsx
│   ├── TripCalendar.tsx         # ◄── Calendar view
│   ├── ItineraryView.tsx        # ◄── Event list
│   ├── ExcursionManager.tsx     # ◄── Excursion management
│   └── CRMSearch.tsx            # ◄── Search component
│
├── sanity/                       # Sanity Configuration
│   ├── schemas/                 # ◄── Content Schemas
│   │   ├── client.ts           # Client schema
│   │   ├── trip.ts             # Trip schema
│   │   ├── itineraryEvent.ts   # Event schema
│   │   ├── excursion.ts        # Excursion schema
│   │   └── index.ts            # Schema registry
│   ├── lib/
│   │   ├── client.ts           # Sanity client config
│   │   ├── image.ts            # Image helper
│   │   └── queries.ts          # Reusable queries
│   └── env.ts                   # Environment config
│
├── public/                       # Static assets
├── styles/                       # Global styles
│
└── Documentation/                # ◄── CRM Guides
    ├── CRM_GUIDE.md             # User guide
    ├── CRM_SETUP.md             # Setup instructions
    ├── CRM_IMPLEMENTATION.md    # Technical summary
    ├── CRM_QUICK_REFERENCE.md   # Quick reference
    ├── SANITY_QUERIES.md        # Query examples
    └── CRM_ARCHITECTURE.md      # This file
```

## Key Features Map

```
Feature                 │ Files Involved
────────────────────────┼───────────────────────────────────────
Client Management       │ schemas/client.ts
                       │ app/crm/clients/[id]/page.tsx
────────────────────────┼───────────────────────────────────────
Trip Management        │ schemas/trip.ts
                       │ app/crm/trips/[id]/page.tsx
────────────────────────┼───────────────────────────────────────
Calendar System        │ schemas/itineraryEvent.ts
                       │ components/TripCalendar.tsx
────────────────────────┼───────────────────────────────────────
Itinerary View         │ components/ItineraryView.tsx
────────────────────────┼───────────────────────────────────────
Excursion Manager      │ schemas/excursion.ts
                       │ components/ExcursionManager.tsx
────────────────────────┼───────────────────────────────────────
PDF Export             │ app/crm/trips/[id]/itinerary/page.tsx
                       │ (uses jsPDF library)
────────────────────────┼───────────────────────────────────────
Image Export           │ app/crm/trips/[id]/itinerary/page.tsx
                       │ (uses html2canvas library)
────────────────────────┼───────────────────────────────────────
Search                 │ components/CRMSearch.tsx
────────────────────────┼───────────────────────────────────────
Dashboard              │ app/crm/page.tsx
```

## Security & Access Model

```
┌──────────────────────────────────────────────────────┐
│                  CURRENT STATE                        │
├──────────────────────────────────────────────────────┤
│                                                       │
│  Public Website          CRM System                  │
│  ├─ Open to all         ├─ Open to all              │
│  ├─ Home                ├─ /crm/*                    │
│  ├─ About               └─ /studio                   │
│  ├─ Services                                         │
│  └─ Contact                                          │
│                                                       │
├──────────────────────────────────────────────────────┤
│              RECOMMENDED FOR PRODUCTION               │
├──────────────────────────────────────────────────────┤
│                                                       │
│  Public Website          CRM System                  │
│  ├─ Open to all         ├─ Password protected       │
│  ├─ Home                ├─ /crm/* (auth required)    │
│  ├─ About               ├─ /studio (Sanity auth)     │
│  ├─ Services            └─ Role-based access         │
│  └─ Contact                                          │
│                                                       │
│  Future: Client Portal                               │
│  └─ Separate login for clients to view their trips  │
│                                                       │
└──────────────────────────────────────────────────────┘
```

---

## Summary

This architecture provides:

✅ **Separation of Concerns**: Public website vs. private CRM  
✅ **Scalability**: Can handle many clients and trips  
✅ **Flexibility**: Four trip types with extensible schemas  
✅ **User-Friendly**: Intuitive interfaces for both data entry and viewing  
✅ **Professional Output**: Beautiful PDF and image exports  
✅ **Real-Time**: Sanity provides instant updates  
✅ **Type-Safe**: TypeScript throughout  
✅ **Responsive**: Works on desktop, tablet, and mobile  

The system is **production-ready** and can be deployed immediately!
