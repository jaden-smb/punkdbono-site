import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execPromise = promisify(exec);

// Paths for video files
const videoDir = path.join(__dirname, '../public/images/videos-live');
const outputDir = path.join(__dirname, '../public/images/videos-live/optimized');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to compress a video using ffmpeg
async function compressVideo(inputPath, outputPath, options = {}) {
  const defaultOptions = {
    crf: 28,             // Compression quality (23-28 is a good range, lower = better quality)
    preset: 'medium',    // Encoding speed preset (ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow)
    resolution: null,    // Optional: '1280x720' for 720p
  };

  const settings = { ...defaultOptions, ...options };
  
  // Build ffmpeg command
  let command = `ffmpeg -i "${inputPath}" -c:v libx264 -crf ${settings.crf} -preset ${settings.preset}`;
  
  // Add resolution if specified
  if (settings.resolution) {
    command += ` -vf scale=${settings.resolution}`;
  }
  
  // Add audio codec
  command += ` -c:a aac -b:a 128k "${outputPath}"`;
  
  try {
    console.log(`Compressing: ${path.basename(inputPath)}`);
    const { stdout, stderr } = await execPromise(command);
    console.log(`Compressed: ${path.basename(outputPath)}`);
    return { success: true, file: path.basename(outputPath) };
  } catch (error) {
    console.error(`Error compressing ${path.basename(inputPath)}:`, error.message);
    return { success: false, file: path.basename(inputPath), error: error.message };
  }
}

// Function to compress all videos in a directory
async function compressAllVideos() {
  // Get all video files
  const videoFiles = fs.readdirSync(videoDir)
    .filter(file => /\.(mp4|mov|avi|mkv)$/i.test(file));
  
  console.log(`Found ${videoFiles.length} videos to compress`);
  
  const results = {
    successful: [],
    failed: []
  };
  
  // Process each video
  for (const file of videoFiles) {
    const inputPath = path.join(videoDir, file);
    const outputPath = path.join(outputDir, file);
    
    const result = await compressVideo(inputPath, outputPath);
    
    if (result.success) {
      results.successful.push(result.file);
    } else {
      results.failed.push({ file: result.file, error: result.error });
    }
  }
  
  return results;
}

// Execute the compression
compressAllVideos()
  .then(results => {
    console.log('\nCompression completed!');
    console.log(`Successfully compressed: ${results.successful.length} videos`);
    
    if (results.failed.length > 0) {
      console.log(`Failed to compress: ${results.failed.length} videos`);
      console.log('Failed videos:');
      results.failed.forEach(item => {
        console.log(`- ${item.file}: ${item.error}`);
      });
    }
  })
  .catch(err => {
    console.error('Error during video compression process:', err);
  });

// To run this script:
// 1. First install ffmpeg if not already installed:
//    sudo apt install ffmpeg
// 2. Run the script:
//    node scripts/compress-videos.js 