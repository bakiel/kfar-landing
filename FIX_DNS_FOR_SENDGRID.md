# Fix DNS to Enable SendGrid Email

## Current Problem
- kfarmarket.com points to GitHub Pages (static hosting)
- Your Node.js server with SendGrid is on DigitalOcean App Platform
- Forms can't send emails because they're not reaching your Node.js server

## Solution

### Step 1: Find Your DigitalOcean App URL
1. Log into [DigitalOcean](https://cloud.digitalocean.com)
2. Go to "Apps" in the left sidebar
3. Find your app (should be named something like "kfar-marketplace-coming-soon")
4. Copy the app URL (looks like: `https://something.ondigitalocean.app`)

### Step 2: Test Your App
Test if SendGrid works on the DigitalOcean URL:
```bash
# Replace with your actual app URL
curl https://YOUR-APP.ondigitalocean.app/api/health
```

### Step 3: Update DNS Records

#### Remove Current GitHub Pages Records:
- A records pointing to: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- CNAME record (if any) pointing to: username.github.io

#### Add DigitalOcean Records:
1. Go to your domain registrar (where you bought kfarmarket.com)
2. Update DNS settings:
   - Add CNAME record: `@` or `www` → `YOUR-APP.ondigitalocean.app`
   
OR

3. Use DigitalOcean's nameservers:
   - Change nameservers to:
     - ns1.digitalocean.com
     - ns2.digitalocean.com
     - ns3.digitalocean.com

### Step 4: Configure Domain in DigitalOcean
1. In your App settings
2. Go to "Domains" 
3. Add `kfarmarket.com`
4. DigitalOcean will handle SSL certificate

## Quick Test (Use Your DigitalOcean URL Now)
While waiting for DNS to update, test forms directly:

```bash
# Test customer signup
curl -X POST https://YOUR-APP.ondigitalocean.app/api/customer-waitlist \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Test Customer",
    "email": "bakielisrael@gmail.com"
  }'
```

## Alternative: Keep GitHub Pages
If you want to keep using GitHub Pages for the frontend:
1. Deploy just the API to DigitalOcean
2. Update form actions in index.html to use full DigitalOcean URL:
   ```javascript
   fetch('https://YOUR-APP.ondigitalocean.app/api/vendor-signup', ...)
   ```

## Expected Timeline
- DNS changes: 5 minutes to 48 hours
- SSL certificate: Automatic once DNS propagates
- SendGrid emails: Will work immediately on DigitalOcean URL