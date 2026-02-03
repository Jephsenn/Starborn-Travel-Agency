const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  try {
    const files = fs.readdirSync(inputDir);
    const imageFiles = files.filter(file => 
      /\.(png|jpg|jpeg)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to optimize...`);

    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

      console.log(`Optimizing ${file}...`);

      await sharp(inputPath)
        .resize(2000, 2000, { // Max 2000px on longest side
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 85 }) // Convert to WebP with 85% quality
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath).size;
      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

      console.log(`✓ ${file} -> ${path.basename(outputPath)} (${savings}% smaller)`);
    }

    console.log('\n✨ All images optimized!');
    console.log(`📁 Optimized images saved to: ${outputDir}`);
    console.log('\nNext steps:');
    console.log('1. Review the optimized images in the images-optimized folder');
    console.log('2. If satisfied, replace the images folder with images-optimized');
    console.log('3. Update your page.tsx files to use .webp extensions');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();
