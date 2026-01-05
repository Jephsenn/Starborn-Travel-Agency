# Customization Guide

This guide shows you how to customize content, styling, and functionality of your Starborn Travel Agency website.

## 📝 Content Updates

### Adding/Editing Promotions

File: `data/promotions.ts`

```typescript
export const promotions: Promotion[] = [
  {
    id: 'promo-1', // Unique identifier
    title: 'Spring Break Flights - Save Up to $200',
    description: 'Book your spring break getaway early and save!',
    category: 'airfare', // 'airfare' | 'cruise' | 'disney' | 'general'
    discount: 'Up to $200 off',
    validUntil: 'March 31, 2026',
    terms: 'Optional terms and conditions',
    featured: true, // Shows on homepage if true
  },
  // Add more promotions here
];
```

**To add a promotion:**
1. Copy an existing promotion object
2. Change the `id` to something unique
3. Update all other fields
4. Set `featured: true` if you want it on the homepage

**Categories:**
- `airfare` - Flight deals
- `cruise` - Cruise promotions  
- `disney` - Disney vacation specials
- `general` - All other travel deals

### Adding/Editing FAQs

File: `data/faqs.ts`

```typescript
export const faqs: FAQItem[] = [
  {
    id: 'faq-1', // Unique identifier
    question: 'How much does it cost to use a travel agent?',
    answer: 'Our services are completely free for you! We earn commission...',
  },
  // Add more FAQs here
];
```

### Adding/Editing Testimonials

File: `data/testimonials.ts`

```typescript
export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Jennifer M.',
    location: 'Tampa, FL', // Optional
    rating: 5, // 1-5
    text: 'Sara planned our family vacation...',
    tripType: 'Disney Vacation', // Optional
  },
];
```

### Homepage Content

File: `app/page.tsx`

**Promo Bar (top of page):**
```typescript
<div className="bg-secondary text-white py-2 text-center">
  <p className="text-sm md:text-base font-medium">
    🌟 Your custom message here <Link href="/promos">View Deals</Link>
  </p>
</div>
```

**Hero Section:**
```typescript
<h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
  Your Journey Begins Here // Change headline
</h1>
<p className="text-xl md:text-2xl mb-8 text-neutral-100">
  Personalized travel planning... // Change subheadline
</p>
```

### About Page Content

File: `app/about/page.tsx`

**Update Sara's bio** - Find the section starting with "Meet Sara, Your Travel Specialist" and edit the text.

**Update specialties** - Edit the list items in the "Specialties" section.

### Services Page

File: `app/services/page.tsx`

The services are defined in an array. To add/edit a service:

```typescript
const services = [
  {
    id: 'custom-itineraries',
    title: 'Custom Itineraries',
    icon: (...), // SVG icon code
    description: 'Your service description',
    benefits: [
      'Benefit 1',
      'Benefit 2',
      // Add more benefits
    ],
  },
];
```

### Contact Information

File: `app/contact/page.tsx`

**Email:**
```typescript
<p className="text-sm text-neutral-100">info@starborntravel.com</p>
// Change to your email
```

**Phone:**
```typescript
<p className="text-sm text-neutral-100">(555) 123-4567</p>
// Change to your phone number
```

**Business Hours:**
```typescript
<p className="text-xs text-neutral-200 mt-1">Mon-Fri: 9am-6pm EST</p>
```

### Adding Google Form

File: `app/contact/page.tsx`

1. Create your Google Form
2. Click "Send" → Select `< >` (Embed HTML)
3. Copy the iframe code
4. Replace the placeholder in the contact page:

```tsx
// Remove the placeholder div and add:
<iframe 
  src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true" 
  width="100%" 
  height="600" 
  frameBorder="0"
  className="rounded-lg"
>
  Loading…
</iframe>
```

## 🎨 Styling & Design

### Color Scheme

File: `tailwind.config.ts`

```typescript
colors: {
  primary: {
    DEFAULT: '#1E3A8A', // Main brand color (deep blue)
    light: '#3B82F6',   // Lighter variant
    dark: '#1E40AF',    // Darker variant
  },
  secondary: {
    DEFAULT: '#F59E0B', // Accent color (gold/amber)
    light: '#FCD34D',
    dark: '#D97706',
  },
  accent: {
    DEFAULT: '#8B5CF6', // Alternate accent (purple)
    light: '#A78BFA',
    dark: '#7C3AED',
  },
}
```

**How to use in components:**
- `className="bg-primary"` - Background
- `className="text-primary"` - Text color
- `className="border-primary"` - Border color
- `className="hover:bg-primary-dark"` - Hover state

### Fonts

File: `tailwind.config.ts`

```typescript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],      // Body text
  display: ['Montserrat', 'sans-serif'],           // Headings
},
```

To change fonts:
1. Update `tailwind.config.ts` with new font names
2. Update `app/layout.tsx` to import from `next/font/google`

```typescript
// In app/layout.tsx
import { YourFont } from 'next/font/google';

const yourFont = YourFont({ 
  subsets: ['latin'],
  variable: '--font-your-font',
});
```

### Button Styles

File: `app/globals.css`

Pre-defined button classes:
- `btn-primary` - Primary action button (blue)
- `btn-secondary` - Secondary button (gold)
- `btn-outline` - Outlined button

To customize:
```css
.btn-primary {
  @apply bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg;
}
```

### Spacing & Layout

**Section Padding:**
```typescript
className="section-padding" // Adds py-16 px-4
```

**Container:**
```typescript
className="container-custom" // Centers content with padding
className="container-custom max-w-4xl" // Centered with max width
```

**Headings:**
- `heading-xl` - Extra large (hero sections)
- `heading-lg` - Large (page titles)
- `heading-md` - Medium (section titles)
- `heading-sm` - Small (subsections)

## 🖼️ Images & Assets

### Adding Sara's Headshot

1. Save Sara's professional headshot as `sara-headshot.jpg`
2. Place in `/public` folder
3. The photo will automatically appear on:
   - Homepage "Meet Sara" section
   - About page featured bio section
4. **Recommended specs:**
   - Square crop (1:1 ratio)
   - 500x500px minimum
   - Professional, well-lit photo
   - Under 100KB file size

See **IMAGE_GUIDE.md** for detailed instructions.

### Replacing Hero Images

The website uses dynamic image grids for visual interest:
- **Homepage**: 6 images (2 rows × 3 columns)
- **Other pages**: 3 images (1 row × 3 columns)

**To add hero images:**
1. Create `/public/hero/` folder
2. Add your destination photos (see IMAGE_GUIDE.md for filenames)
3. Update image paths in each page file

**Example - Homepage (`app/page.tsx`):**
```typescript
const heroImages = [
  { src: '/hero/cruise-ship.jpg', alt: 'Luxury Cruise Ship' },
  { src: '/hero/disney-castle.jpg', alt: 'Disney Castle' },
  { src: '/hero/caribbean-beach.jpg', alt: 'Caribbean Beach' },
  { src: '/hero/florida-sunset.jpg', alt: 'Florida Sunset' },
  { src: '/hero/family-vacation.jpg', alt: 'Family Vacation' },
  { src: '/hero/luxury-resort.jpg', alt: 'Luxury Resort' },
];
```

**Required images by page:**
- Homepage: cruise, Disney, Caribbean, Florida, family, resort (6 total)
- About: travel planning, happy travelers, destinations (3 total)
- Services: cruise deck, Disney experience, beach (3 total)
- Promos: deals, cruise sunset, Disney fireworks (3 total)
- FAQ: customer service, questions, peace of mind (3 total)
- Contact: planning, adventure, dreams (3 total)

**Currently using:** Banner image as placeholder for all grids

### Replacing Logo

1. Add new logo to `/public` folder
2. Update references in:
   - `components/Header.tsx`
   - `components/Footer.tsx`

```typescript
// In Header.tsx
<Image
  src="/Your_New_Logo.png"
  alt="Your Business Name"
  width={200}
  height={60}
/>
```

### Replacing Banner

1. Add new banner to `/public` folder
2. Update in `app/page.tsx`:

```typescript
<Image
  src="/Your_New_Banner.png"
  alt="Your banner alt text"
  fill
  className="object-cover"
  priority
/>
```

**Recommended sizes:**
- Logo: 400x120px (PNG with transparency)
- Logo Plain: 400x120px (white/monochrome version)
- Banner: 1920x600px (high quality JPG/PNG)

### Adding New Images

1. Place in `/public` folder
2. Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/your-image.jpg"
  alt="Description"
  width={800}
  height={600}
  className="rounded-lg"
/>
```

## 📱 Navigation

### Adding a New Page

1. Create folder in `/app` directory
2. Create `page.tsx` inside the folder
3. Add to navigation in `components/Header.tsx`:

```typescript
const navLinks = [
  // ... existing links
  { href: '/new-page', label: 'New Page' },
];
```

4. Add to footer in `components/Footer.tsx` if desired

### Removing a Page

1. Delete the page folder from `/app`
2. Remove from `navLinks` in `components/Header.tsx`
3. Remove from footer links if present

## 🔧 Advanced Customization

### Adding Social Media Links

In `components/Footer.tsx`, add a social media section:

```typescript
<div className="flex space-x-4 justify-center">
  <a href="https://facebook.com/yourpage" className="text-white hover:text-secondary">
    <svg className="w-6 h-6">...</svg>
  </a>
  {/* Add more social icons */}
</div>
```

### Adding a Blog Section

1. Create `app/blog/page.tsx` for blog listing
2. Create `app/blog/[slug]/page.tsx` for individual posts
3. Add blog data file `data/blog-posts.ts`
4. Create `components/BlogCard.tsx` component

### Changing Layout Structure

File: `app/layout.tsx`

This controls the overall page structure. You can:
- Add announcement bars
- Modify header/footer placement
- Add sidebar navigation
- Include global scripts

### SEO & Metadata

Each page has metadata at the top:

```typescript
export const metadata: Metadata = {
  title: 'Page Title | Starborn Travel Agency',
  description: 'Page description for search engines',
  keywords: ['travel', 'vacation', 'planning'],
};
```

Update these for better SEO.

## 🚀 Performance Tips

### Image Optimization
- Always use Next.js `Image` component
- Provide `width` and `height` props
- Use `priority` for above-fold images

### Loading States
Add loading indicators for better UX:

```typescript
// app/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

### Error Handling
Add custom error pages:

```typescript
// app/error.tsx
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

## 📊 Analytics Integration

### Google Analytics

1. Get GA4 tracking ID
2. Create `app/GoogleAnalytics.tsx`:

```typescript
export function GoogleAnalytics({ ga_id }) {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga_id}`} />
      <script dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ga_id}');
        `,
      }} />
    </>
  );
}
```

3. Add to `app/layout.tsx`

## 💡 Best Practices

1. **Always test locally** before deploying:
   ```powershell
   npm run build
   npm start
   ```

2. **Backup before major changes:**
   - Commit to git regularly
   - Keep a copy of working code

3. **Mobile-first approach:**
   - Test on mobile devices
   - Use responsive classes (`md:`, `lg:`)

4. **Accessibility:**
   - Include alt text on images
   - Use semantic HTML
   - Maintain color contrast

5. **Keep data files organized:**
   - One file per data type
   - Use TypeScript interfaces
   - Add comments for clarity

---

Need help? Check the [Next.js Documentation](https://nextjs.org/docs) or [Tailwind CSS Docs](https://tailwindcss.com/docs).
