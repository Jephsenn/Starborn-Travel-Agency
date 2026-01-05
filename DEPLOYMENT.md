# Vercel Deployment Guide

## Quick Deploy (Recommended)

### Via Vercel Dashboard

1. **Push to GitHub** (if you haven't already)
   ```powershell
   git init
   git add .
   git commit -m "Initial commit - Starborn Travel Agency website"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"
   - Your site goes live in ~2 minutes!

### Via Vercel CLI

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project directory
cd "c:\Users\heatw\Desktop\Code Projects\Starborn Travel Agency"

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name? starborn-travel-agency
# - Directory? ./
# - Override settings? No

# For production deployment
vercel --prod
```

## Post-Deployment Checklist

### 1. Add Google Form
- [ ] Create a Google Form for contact requests
- [ ] Get the embed URL
- [ ] Update `app/contact/page.tsx` with the iframe code

### 2. Update Contact Information
- [ ] Replace placeholder email in `app/contact/page.tsx`
- [ ] Replace placeholder phone number
- [ ] Update business hours if different

### 3. Add Custom Domain (Optional)
- [ ] Go to Vercel project settings
- [ ] Click "Domains"
- [ ] Add your custom domain
- [ ] Update DNS records as instructed

### 4. Configure Analytics (Optional)
- [ ] Set up Vercel Analytics (built-in, free)
- [ ] Or add Google Analytics
- [ ] Or add other tracking tools

### 5. Test Everything
- [ ] Test all navigation links
- [ ] Verify all images load correctly
- [ ] Test contact form submission
- [ ] Check mobile responsiveness
- [ ] Test on different browsers

## Environment Variables (if needed)

If you need environment variables:

1. Go to Vercel project settings
2. Navigate to "Environment Variables"
3. Add your variables:
   - `NEXT_PUBLIC_GA_ID` - Google Analytics ID
   - `NEXT_PUBLIC_GTM_ID` - Google Tag Manager ID
   - Any other public or private variables

## Automatic Deployments

Once connected to GitHub:
- Every push to `main` branch automatically deploys to production
- Pull requests create preview deployments
- You get a unique URL for each deployment

## Custom Domain Setup

### Add Domain in Vercel

1. Project Settings → Domains
2. Enter your domain (e.g., `starborntravel.com`)
3. Vercel provides DNS configuration

### Update DNS Records

**Option A: Using Vercel Nameservers** (Easiest)
1. Copy nameservers from Vercel
2. Update at your domain registrar
3. Wait for propagation (5min - 48hrs)

**Option B: Using A/CNAME Records**
1. Add A record: `@` → `76.76.21.21`
2. Add CNAME: `www` → `cname.vercel-dns.com`
3. Wait for verification

## Performance Optimization

Your site is already optimized with:
- ✅ Static page generation
- ✅ Image optimization
- ✅ Font optimization
- ✅ Code splitting
- ✅ Compression

Additional optimizations:
- Enable Vercel Analytics (free)
- Set up Web Vitals monitoring
- Configure CDN caching

## Monitoring & Maintenance

### Vercel Dashboard
- Monitor deployment status
- View analytics
- Check error logs
- Review performance metrics

### Regular Updates
```powershell
# Pull latest Next.js updates
npm update next react react-dom

# Check for other updates
npm outdated

# Update all packages (carefully)
npm update
```

## Troubleshooting

### Build Fails
1. Check build logs in Vercel
2. Verify `npm run build` works locally
3. Check for TypeScript errors

### Images Not Loading
1. Verify images are in `/public` folder
2. Check image paths are correct
3. Ensure Next.js Image component is used

### 404 Errors
1. Verify page files exist in `/app` directory
2. Check routing structure
3. Review Next.js App Router docs

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Support](https://vercel.com/support)

---

Your website is production-ready and optimized for Vercel deployment!
