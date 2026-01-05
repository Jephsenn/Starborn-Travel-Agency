# Adding Images to Your Website

## Sara's Headshot

### Where to Add
Place Sara's headshot photo in the `/public` folder:
- **Filename**: `sara-headshot.jpg`
- **Path**: `/public/sara-headshot.jpg`

### Photo Requirements
- **Format**: JPG, PNG, or WebP
- **Recommended size**: 500x500px (square)
- **Aspect ratio**: 1:1 (square/circular crop works best)
- **File size**: Under 100KB (optimized)
- **Quality**: Professional headshot, well-lit, friendly smile
- **Background**: Solid color or subtle background works best

### Where Sara's Photo Appears
1. **Homepage** - "Meet Sara" section (left side)
2. **About Page** - "Meet Sara, Your Travel Specialist" section (larger, featured)

### Tips for Best Results
- Use a professional headshot with good lighting
- Ensure Sara is centered in the frame
- Clean, professional background
- Warm, welcoming expression
- Business casual or professional attire

---

## Hero Images (Destination Photos)

### Directory Structure
Create a `/public/hero` folder and add these images:

```
/public/hero/
├── cruise-ship.jpg          (Homepage, grid position 1)
├── disney-castle.jpg        (Homepage, grid position 2)
├── caribbean-beach.jpg      (Homepage, grid position 3)
├── florida-sunset.jpg       (Homepage, grid position 4)
├── family-vacation.jpg      (Homepage, grid position 5)
├── luxury-resort.jpg        (Homepage, grid position 6)
├── travel-planning.jpg      (About page, position 1)
├── happy-travelers.jpg      (About page, position 2)
├── world-destinations.jpg   (About page, position 3)
├── cruise-deck.jpg          (Services page, position 1)
├── disney-experience.jpg    (Services page, position 2)
├── beach-paradise.jpg       (Services page, position 3)
├── travel-deals.jpg         (Promos page, position 1)
├── cruise-sunset.jpg        (Promos page, position 2)
├── disney-fireworks.jpg     (Promos page, position 3)
├── customer-service.jpg     (FAQ page, position 1)
├── travel-questions.jpg     (FAQ page, position 2)
├── peace-of-mind.jpg        (FAQ page, position 3)
├── planning-together.jpg    (Contact page, position 1)
├── adventure-awaits.jpg     (Contact page, position 2)
└── travel-dreams.jpg        (Contact page, position 3)
```

### Image Specifications
- **Format**: JPG (recommended) or WebP for smaller file sizes
- **Dimensions**: 1200x900px minimum, 1920x1080px ideal
- **Aspect ratio**: 4:3 or 16:9 (landscape)
- **File size**: 100-300KB each (compressed/optimized)
- **Quality**: High resolution, vibrant, professional

### Image Guidelines by Category

#### Homepage Images (6 images in 2x3 grid)
1. **Cruise Ship** - Large cruise ship at sea, dramatic angle
2. **Disney Castle** - Cinderella Castle, fireworks, or iconic Disney scene
3. **Caribbean Beach** - Turquoise water, white sand, palm trees
4. **Florida Sunset** - Beach sunset or coastal Florida scenery
5. **Family Vacation** - Happy family enjoying vacation together
6. **Luxury Resort** - Beautiful resort pool, spa, or grounds

#### About Page Images (3 images)
1. **Travel Planning** - Travel maps, planning desk, or consultation
2. **Happy Travelers** - Satisfied customers enjoying destinations
3. **World Destinations** - Globe, world map, or multiple destinations

#### Services Page Images (3 images)
1. **Cruise Deck** - View from cruise ship deck
2. **Disney Experience** - Disney park attractions or characters
3. **Beach Paradise** - Tropical beach or resort scene

#### Promotions Page Images (3 images)
1. **Travel Deals** - Exciting vacation scene showcasing value
2. **Cruise Sunset** - Cruise ship at golden hour
3. **Disney Fireworks** - Magic Kingdom or Disney cruise fireworks

#### FAQ Page Images (3 images)
1. **Customer Service** - Friendly consultation or support
2. **Travel Questions** - Travel planning or discussion
3. **Peace of Mind** - Relaxed, happy travelers

#### Contact Page Images (3 images)
1. **Planning Together** - Consultation or collaboration scene
2. **Adventure Awaits** - Exciting destination preview
3. **Travel Dreams** - Dream vacation destination

---

## How to Update Images in Code

Once you've added your images to `/public` and `/public/hero`, update the image paths in the page files:

### Example: Homepage (app/page.tsx)
```typescript
const heroImages = [
  { src: '/hero/cruise-ship.jpg', alt: 'Luxury Cruise Ship at Sea' },
  { src: '/hero/disney-castle.jpg', alt: 'Disney Castle Magic Kingdom' },
  { src: '/hero/caribbean-beach.jpg', alt: 'Caribbean Beach Paradise' },
  { src: '/hero/florida-sunset.jpg', alt: 'Florida Sunset Beach' },
  { src: '/hero/family-vacation.jpg', alt: 'Family Vacation Memories' },
  { src: '/hero/luxury-resort.jpg', alt: 'Luxury Resort Experience' },
];
```

### Example: About Page (app/about/page.tsx)
```typescript
const heroImages = [
  { src: '/hero/travel-planning.jpg', alt: 'Travel Planning Excellence' },
  { src: '/hero/happy-travelers.jpg', alt: 'Happy Travelers' },
  { src: '/hero/world-destinations.jpg', alt: 'World Destinations' },
];
```

Repeat this pattern for all pages (Services, Promos, FAQ, Contact).

---

## Image Optimization Tips

### Before Uploading
1. **Resize** - Use Photoshop, GIMP, or online tools to resize to recommended dimensions
2. **Compress** - Use TinyPNG.com or ImageOptim to reduce file size
3. **Format** - JPG for photos, PNG for logos/graphics with transparency
4. **Quality** - Balance quality vs file size (80-85% quality is usually ideal)

### Online Tools
- **TinyPNG** - https://tinypng.com (compression)
- **Squoosh** - https://squoosh.app (compression & format conversion)
- **Remove.bg** - https://remove.bg (background removal for headshots)
- **Canva** - https://canva.com (quick photo editing & resizing)

### Stock Photo Resources (if needed)
- **Unsplash** - https://unsplash.com (free, high-quality)
- **Pexels** - https://pexels.com (free)
- **Pixabay** - https://pixabay.com (free)

---

## Current Placeholder Behavior

Until you add the actual images:
- Hero sections use the banner image as a fallback
- Sara's headshot shows a gradient placeholder with a person icon
- The site is fully functional with placeholders

## Testing Your Images

After adding images:
1. Refresh the development server (it auto-reloads)
2. Check each page to verify images display correctly
3. Test on mobile devices for proper scaling
4. Verify loading speed (images should load quickly)

---

## Need Help?

If you have trouble adding images:
1. Ensure filenames match exactly (case-sensitive)
2. Verify images are in the correct folders
3. Check file formats are supported (JPG, PNG, WebP, SVG)
4. Ensure files aren't too large (under 500KB each)
5. Restart the development server if images don't appear

**The website looks great with or without custom images - the placeholders are designed to be professional and functional!**
