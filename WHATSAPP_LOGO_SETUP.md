# WhatsApp Share Logo Setup Instructions

## Step 1: Save the Logo Image

1. Save the KFAR logo image (with Africa map and green leaves) as: `kfar-logo-share.png`
2. Recommended dimensions: 1200x630 pixels (for optimal sharing)
3. File size: Keep under 300KB

## Step 2: Upload to Your Server

Upload the logo to the root directory of your DigitalOcean app:
- Location: `/kfar-logo-share.png` (same level as index.html)

## Step 3: What I've Already Done

✅ Added Open Graph meta tags to index.html:
- `og:image` set to `https://kfarmarket.com/kfar-logo-share.png`
- Added proper dimensions (1200x630)
- Added Twitter card meta tags
- Added WhatsApp-specific tags

## Step 4: Deploy the Changes

1. Place the `kfar-logo-share.png` file in the deploy-coming-soon-1 directory
2. Commit and push:
```bash
git add kfar-logo-share.png index.html
git commit -m "Add WhatsApp share logo with Open Graph tags"
git push origin main
```

## Step 5: Test the Share Preview

After deployment (5-10 minutes):

1. **WhatsApp Desktop/Web:**
   - Copy: https://kfarmarket.com
   - Paste in WhatsApp chat
   - Wait for preview to load

2. **Clear WhatsApp Cache (if needed):**
   - Add a parameter: https://kfarmarket.com?v=2
   - Or use WhatsApp's link preview debugger

3. **Facebook Debugger (optional):**
   - Visit: https://developers.facebook.com/tools/debug/
   - Enter: https://kfarmarket.com
   - Click "Scrape Again" to refresh cache

## How It Will Look

When someone shares https://kfarmarket.com on WhatsApp, they'll see:
- **Image:** KFAR logo with Africa map and green leaves
- **Title:** "KFAR Shop - The Future of Community Commerce"
- **Description:** "Join the digital revolution of the world's first 100% vegan community..."

## Troubleshooting

If the logo doesn't appear:
1. Check if the file exists: https://kfarmarket.com/kfar-logo-share.png
2. Ensure the image is properly uploaded
3. Clear WhatsApp cache by adding ?v=3, ?v=4, etc.
4. Wait 5-10 minutes for caches to update

The meta tags are already configured and waiting for the logo file!