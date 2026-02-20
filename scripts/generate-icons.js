import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// SVG Logo content
const svgLogo = `
<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="50%" stop-color="#09090b"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    
    <linearGradient id="main-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="50%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    
    <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>
    
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <filter id="outer-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
      </feMerge>
    </filter>
  </defs>
  
  <rect x="20" y="20" width="472" height="472" rx="80" fill="url(#bg-gradient)" stroke="rgba(255,255,255,0.15)" stroke-width="3"/>
  <rect x="30" y="30" width="452" height="452" rx="75" fill="none" stroke="url(#main-gradient)" stroke-width="2" opacity="0.3" filter="url(#outer-glow)"/>
  
  <g opacity="0.05">
    <defs>
      <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="1"/>
      </pattern>
    </defs>
    <rect x="40" y="40" width="432" height="432" rx="70" fill="url(#grid)"/>
  </g>
  
  <circle cx="256" cy="256" r="200" stroke="url(#accent-gradient)" stroke-width="4" fill="none" opacity="0.5" filter="url(#glow)"/>
  
  <path d="M 140 280 C 140 280, 180 200, 256 200 C 332 200, 372 280, 372 280" 
        stroke="url(#main-gradient)" stroke-width="24" stroke-linecap="round" fill="none" filter="url(#glow)"/>
  
  <path d="M 120 320 C 120 320, 170 240, 256 240 C 342 240, 392 320, 392 320" 
        stroke="url(#accent-gradient)" stroke-width="14" stroke-linecap="round" fill="none" opacity="0.6" filter="url(#glow)"/>
  
  <circle cx="256" cy="180" r="45" fill="url(#main-gradient)" filter="url(#glow)" opacity="0.9"/>
  <circle cx="256" cy="180" r="32" fill="url(#accent-gradient)"/>
  <circle cx="244" cy="168" r="12" fill="rgba(255,255,255,0.6)"/>
  
  <circle cx="256" cy="100" r="12" fill="url(#accent-gradient)" filter="url(#glow)"/>
  <circle cx="325" cy="140" r="10" fill="url(#accent-gradient)" filter="url(#glow)" opacity="0.8"/>
  <circle cx="187" cy="140" r="10" fill="url(#accent-gradient)" filter="url(#glow)" opacity="0.8"/>
  
  <path d="M 80 80 L 120 80 M 80 80 L 80 120" stroke="url(#accent-gradient)" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>
  <path d="M 432 80 L 392 80 M 432 80 L 432 120" stroke="url(#accent-gradient)" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>
  <path d="M 80 432 L 120 432 M 80 432 L 80 392" stroke="url(#accent-gradient)" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>
  <path d="M 432 432 L 392 432 M 432 432 L 432 392" stroke="url(#accent-gradient)" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>
  
  <ellipse cx="256" cy="400" rx="180" ry="60" fill="url(#main-gradient)" opacity="0.15" filter="url(#glow)"/>
</svg>
`;

async function generateIcons() {
  try {
    console.log('🎨 Generating PWA icons...');
    
    // Convert SVG to PNG buffer
    const svgBuffer = Buffer.from(svgLogo);
    
    // Generate 192x192 icon
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(join(publicDir, 'pwa-192.png'));
    console.log('✅ Generated pwa-192.png');
    
    // Generate 512x512 icon
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(join(publicDir, 'pwa-512.png'));
    console.log('✅ Generated pwa-512.png');
    
    console.log('\n🎉 All icons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    process.exit(1);
  }
}

generateIcons();
