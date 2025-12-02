#!/bin/bash

echo "🚀 Building site for Bluehost deployment..."

# Clean previous builds
rm -rf out/
rm -rf .next/

# Build the site
npm run build

echo "✅ Build complete!"
echo "📁 Files ready in 'out' folder"
echo "📋 Next steps:"
echo "1. Zip the 'out' folder contents"
echo "2. Upload to your Bluehost public_html folder via cPanel File Manager"
echo "3. Extract the files directly into public_html (not in a subfolder)"
echo "4. Your site will be live at your domain!"