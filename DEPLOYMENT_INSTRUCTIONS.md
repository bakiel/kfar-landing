# KFAR Marketplace Coming Soon - Deployment Instructions

## 🚀 Quick Deployment to DigitalOcean (5 minutes)

### Option 1: Deploy via DigitalOcean Web Interface (Recommended)

1. **Open DigitalOcean App Platform**
   - Go to: https://cloud.digitalocean.com/apps
   - Click the blue "Create App" button

2. **Choose Deployment Method**
   - Select "DigitalOcean App Platform"
   - Choose "Deploy a static site"
   - Click "GitHub" (even though we'll use upload)

3. **Upload Your Files**
   - When asked for repository, click "Skip for now"
   - Choose "Upload your code"
   - Upload the `deploy-coming-soon` folder as a ZIP file

4. **Configure Your App**
   - App name: `kfar-marketplace-coming-soon`
   - Region: Frankfurt (fra) - closest to Israel
   - Click "Next"

5. **Add Your Domain**
   - Add domain: `kfarmarket.com`
   - Add domain: `www.kfarmarket.com`
   - DigitalOcean will provide DNS instructions

6. **Deploy**
   - Review and click "Create Resources"
   - Your site will be live in 2-3 minutes!

### Option 2: Deploy via Spaces (Alternative)

If you prefer using DigitalOcean Spaces for static hosting:

1. Create a Space in Frankfurt region
2. Upload the contents of `deploy-coming-soon` folder
3. Enable CDN and static website hosting
4. Point your domain to the Space

## 📁 What's Included

- `index.html` - Your complete coming soon page with:
  - Beautiful countdown timer
  - Vendor signup form
  - Customer waitlist form
  - Mobile responsive design
  - All forms save to localStorage

## 🌐 After Deployment

1. **Test your site**: https://kfarmarket.com
2. **Share with vendors**: Send them directly to the vendor signup section
3. **Monitor signups**: Check browser console for form submissions

## 📊 Form Data

Since forms save to localStorage, you can:
1. Visit your deployed site
2. Open browser DevTools (F12)
3. Go to Application → Local Storage
4. Export vendor and customer signups

## 🆘 Need Help?

The coming soon page is completely self-contained and requires no backend. It will work immediately after deployment!

---
Deployment prepared: Saturday, June 14, 2025