# Image Optimization Guide

Your images are loading slowly because they're large PNG files. Here's how to optimize them:

## Quick Wins (Already Applied)

✅ **Blur Placeholders** - Images now show a subtle blur while loading
✅ **Quality Reduction** - Reduced from 100% to 85% quality (imperceptible difference)
✅ **Lazy Loading** - Non-priority carousel images load only when needed
✅ **Modern Formats** - Next.js now serves AVIF/WebP automatically

## Optional: Further Optimization

If images are still slow, you can convert them to WebP format for even better compression:

### Option 1: Automatic Script (Recommended)

1. Install Sharp (image processing library):
   ```bash
   npm install --save-dev sharp
   ```

2. Run the optimization script:
   ```bash
   node scripts/optimize-images.js
   ```

3. Review the optimized images in `public/images-optimized/`

4. If satisfied, replace the original images:
   ```bash
   # Backup originals
   mv public/images public/images-backup
   # Use optimized versions
   mv public/images-optimized public/images
   ```

5. Update image paths to use .webp extension in your pages

### Option 2: Manual Online Tools

Use free online tools like:
- [TinyPNG](https://tinypng.com/) - Drag & drop PNG compression
- [Squoosh](https://squoosh.app/) - Google's image optimizer
- [CloudConvert](https://cloudconvert.com/) - Batch convert to WebP

### Expected Results

- PNG → WebP conversion typically saves **60-80%** file size
- Faster page loads, especially on mobile
- Better SEO and user experience

## Tips

- Hero images should be under 200KB each after optimization
- Use WebP format when possible (better compression than PNG/JPG)
- Next.js automatically serves the best format based on browser support
