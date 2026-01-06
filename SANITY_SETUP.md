# Sanity CMS Admin Panel Setup Guide

## What Sara Can Manage
Sara can now manage the following content through a user-friendly admin interface:
- ✅ **Promotions** - Add, edit, delete travel deals
- ✅ **Categories** - Organize by Airfare, Cruise, Disney, or General
- ✅ **Featured Promotions** - Control which deals appear in the top banner carousel
- ✅ **Active/Inactive** - Hide promotions without deleting them

## Setup Steps

### 1. Create a Sanity Account (One-time setup)

1. Go to https://www.sanity.io/
2. Click "Get Started" and sign up (free account)
3. Once logged in, click "Create New Project"
4. Choose:
   - **Project Name**: "Starborn Travel Agency"
   - **Dataset**: "production"
   - **Template**: Skip (we already have the schema)

### 2. Get Your Project Credentials

After creating the project:
1. You'll see your **Project ID** on the dashboard
2. Copy this Project ID

### 3. Add Credentials to Your Website

1. Create a file named `.env.local` in your project root (same folder as package.json)
2. Add this content (replace `your-project-id-here` with your actual Project ID):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 4. Start the Development Server

Run this command:
```bash
npm run dev
```

### 5. Access the Admin Panel

Open your browser and go to:
```
http://localhost:3000/studio
```

You'll be prompted to log in with your Sanity account.

## How Sara Uses the Admin Panel

### Adding a New Promotion

1. Go to `http://localhost:3000/studio` (or `https://yoursite.com/studio` when deployed)
2. Click the "+" button or "Create New Document"
3. Select "Promotions"
4. Fill in the fields:
   - **Promotion Title**: e.g., "Spring Break Flight Sale"
   - **Description**: Details about the promotion
   - **Category**: Choose Airfare, Cruise, Disney, or General
   - **Discount/Offer**: e.g., "Up to $200 off"
   - **Valid Until**: Expiration date (e.g., "March 31, 2026")
   - **Terms & Conditions**: Any fine print
   - **Featured Promotion**: Toggle ON to show in top banner carousel
   - **Active**: Toggle ON to display on website
5. Click "Publish"

### Editing a Promotion

1. Click on any promotion in the list
2. Make your changes
3. Click "Publish" to save

### Deleting a Promotion

- **Option 1 (Recommended)**: Toggle "Active" to OFF - hides it but keeps the data
- **Option 2**: Click the three dots menu → Delete (permanently removes it)

### Featured Promotions

- Promotions marked as "Featured" appear in the rotating banner at the top of the homepage
- You can have multiple featured promotions - they'll rotate automatically every 4 seconds

## Deployment Notes

When you deploy to Vercel:

1. Add the same environment variables in Vercel:
   - Go to your Vercel project → Settings → Environment Variables
   - Add `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - Add `NEXT_PUBLIC_SANITY_DATASET` = production
   - Add `NEXT_PUBLIC_SANITY_API_VERSION` = 2024-01-01

2. Sara can access the admin panel at: `https://yoursite.com/studio`

## Sanity Studio Features

- **Auto-save**: Changes are saved as you type
- **Version History**: See previous versions and restore them
- **Collaboration**: Multiple people can edit (if you add more users)
- **Mobile Friendly**: Sara can manage content from phone/tablet
- **Preview**: See changes before publishing

## Adding More Users

To give Sara her own login:
1. Go to https://sanity.io/manage
2. Select your project
3. Go to "Settings" → "Members"
4. Click "Invite Member"
5. Enter Sara's email
6. Choose role: "Administrator" (full access)

## Free Tier Limits

Sanity's free plan includes:
- ✅ Unlimited API requests
- ✅ 3 users
- ✅ 10GB bandwidth/month
- ✅ 500MB assets storage

This is more than enough for a travel agency website.

## Support

If you need help:
- Sanity Docs: https://www.sanity.io/docs
- Community: https://www.sanity.io/exchange/community
