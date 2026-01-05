# Starborn Travel Agency Website

A fully functional, production-ready website for Starborn Travel Agency built with Next.js, React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Fully Responsive Design** - Mobile-first approach with seamless desktop experience
- **Modern Tech Stack** - Next.js 14 App Router, TypeScript, Tailwind CSS
- **SEO Optimized** - Metadata configured for all pages
- **Accessible** - Semantic HTML and proper ARIA labels
- **Complete Pages**:
  - Home - Hero banner, services overview, owner highlight, promotions, testimonials, FAQ preview
  - About - Brand story, mission, values, expanded owner bio
  - Services - Detailed service breakdown with benefits
  - Promotions - Organized by category (airfare, cruises, Disney, general)
  - FAQ - Comprehensive accordion-style questions and answers
  - Contact - Google Form integration with helpful information
- **Reusable Components** - Header, Footer, PromotionCard, TestimonialCard, FAQAccordionItem
- **Data Management** - Structured data files for promotions, FAQs, and testimonials

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## 🛠️ Installation

1. Install dependencies:

```powershell
npm install
```

## 🏃 Running Locally

Start the development server:

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization

### Update Promotions

Edit `data/promotions.ts` to add, remove, or modify promotions:

```typescript
{
  id: 'unique-id',
  title: 'Promotion Title',
  description: 'Description text',
  category: 'airfare' | 'cruise' | 'disney' | 'general',
  discount: 'Up to 30% off',
  validUntil: 'Date',
  terms: 'Optional terms',
  featured: true, // Shows on homepage
}
```

### Update FAQs

Edit `data/faqs.ts`:

```typescript
{
  id: 'unique-id',
  question: 'Your question?',
  answer: 'Your detailed answer.',
}
```

### Update Testimonials

Edit `data/testimonials.ts`:

```typescript
{
  id: 'unique-id',
  name: 'Client Name',
  location: 'City, State',
  rating: 5,
  text: 'Testimonial text',
  tripType: 'Type of trip',
}
```

### Add Google Form

In `app/contact/page.tsx`, replace the placeholder with your Google Form iframe:

```tsx
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

### Update Contact Information

In `app/contact/page.tsx`, update email and phone:

```tsx
<p className="text-sm text-neutral-100">info@starborntravel.com</p>
<p className="text-sm text-neutral-100">(555) 123-4567</p>
```

### Customize Colors

Edit `tailwind.config.ts` to adjust the color scheme:

```typescript
colors: {
  primary: {
    DEFAULT: '#1E3A8A', // Your primary color
    light: '#3B82F6',
    dark: '#1E40AF',
  },
  secondary: {
    DEFAULT: '#F59E0B', // Your secondary color
    light: '#FCD34D',
    dark: '#D97706',
  },
}
```

## 📦 Building for Production

Create an optimized production build:

```powershell
npm run build
```

Test the production build locally:

```powershell
npm start
```

## 🚀 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```powershell
npm install -g vercel
```

2. Deploy:
```powershell
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will auto-detect Next.js and configure settings
6. Click "Deploy"

Your site will be live at `https://your-project.vercel.app`

### Custom Domain

1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 📁 Project Structure

```
starborn-travel-agency/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── faq/
│   │   └── page.tsx
│   ├── promos/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx (home)
├── components/
│   ├── FAQAccordionItem.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── PromotionCard.tsx
│   └── TestimonialCard.tsx
├── data/
│   ├── faqs.ts
│   ├── promotions.ts
│   └── testimonials.ts
├── public/
│   ├── Starborn_Travel_Agency_Banner.png
│   ├── Starborn_Travel_Agency_Logo.png
│   └── Starborn_Travel_Agency_Logo_plain.png
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🔧 Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Inter, Montserrat (Google Fonts)
- **Deployment**: Vercel-ready

## 📝 Environment Variables

If you need to add environment variables (e.g., for analytics, forms):

Create `.env.local`:

```env
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_FORM_ID=your-form-id
```

Access in components:
```typescript
const gaId = process.env.NEXT_PUBLIC_GA_ID;
```

## 🎯 Performance Optimizations

- Image optimization via Next.js Image component
- Font optimization with `next/font`
- Automatic code splitting
- Static generation where possible
- Minimal JavaScript bundles

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Future Enhancements

Potential additions you might consider:

- Blog section for travel tips
- Client portal for trip management
- Real-time availability checking
- Newsletter signup integration
- Social media feed integration
- Live chat widget
- Google Analytics integration
- Review/rating system integration

## 📄 License

All rights reserved - Starborn Travel Agency

## 🆘 Support

For technical support or questions about the website, refer to the Next.js documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

---

Built with ❤️ for Starborn Travel Agency
