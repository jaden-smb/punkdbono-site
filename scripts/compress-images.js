const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Paths for band photos
const bandImageDir = path.join(__dirname, '../public/images/band');
const bandOutputDir = path.join(__dirname, '../public/images/band/optimized');

// Ensure output directories exist
if (!fs.existsSync(bandOutputDir)) {
  fs.mkdirSync(bandOutputDir, { recursive: true });
}

// Function to compress images in a directory
async function compressImages(sourceDir, outputDir, options = {}) {
  const defaultOptions = {
    maxWidth: 1200,
    quality: 80,
    format: 'jpeg'
  };
  
  const settings = { ...defaultOptions, ...options };
  
  // Get all image files
  const imageFiles = fs.readdirSync(sourceDir)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file));
  
  console.log(`Found ${imageFiles.length} images in ${sourceDir}`);
  
  // Process each image
  for (const file of imageFiles) {
    const inputPath = path.join(sourceDir, file);
    const outputPath = path.join(outputDir, file);
    
    try {
      let processor = sharp(inputPath).resize(settings.maxWidth);
      
      if (settings.format === 'jpeg') {
        processor = processor.jpeg({ quality: settings.quality, mozjpeg: true });
      } else if (settings.format === 'png') {
        processor = processor.png({ quality: settings.quality });
      }
      
      await processor.toFile(outputPath);
      console.log(`Compressed: ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

// Compress band photos
compressImages(bandImageDir, bandOutputDir)
  .then(() => {
    console.log('All band images compressed successfully');
  })
  .catch(err => {
    console.error('Error during compression:', err);
  });

// To run this script, execute:
// node scripts/compress-images.js 