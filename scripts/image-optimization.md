# Image Optimization Guide

To optimize the images and videos in the gallery for better performance:

## Image Compression Tools

### Option 1: Using Sharp (Node.js)
Install the Sharp library:
```bash
npm install sharp
```

Create a script to compress all images:
```javascript
// scripts/compress-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, '../public/images/band');
const outputDir = path.join(__dirname, '../public/images/band/optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all jpg files
const imageFiles = fs.readdirSync(imageDir)
  .filter(file => file.endsWith('.jpg'));

// Process each image
imageFiles.forEach(file => {
  const inputPath = path.join(imageDir, file);
  const outputPath = path.join(outputDir, file);
  
  sharp(inputPath)
    .resize(1200) // Resize to max width 1200px
    .jpeg({ quality: 80, mozjpeg: true }) // Compress with 80% quality
    .toFile(outputPath)
    .then(() => console.log(`Compressed: ${file}`))
    .catch(err => console.error(`Error processing ${file}:`, err));
});
```

### Option 2: Using imagemin (Build-time)
```bash
npm install imagemin imagemin-mozjpeg imagemin-pngquant
```

Add to your build process.

## Video Compression
For videos, use a tool like FFmpeg:

```bash
# Install FFmpeg
sudo apt install ffmpeg

# Compress a video
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 output.mp4
```

You can create a script to batch process all videos.

## After Compression
After compressing images and videos, update the file paths in your code to point to the optimized versions.

## Next Steps
1. Run the compression scripts
2. Update the file paths in your code if needed
3. Deploy the optimized assets 