# Fix WWW SSL Certificate Issue

## Problem
- https://kfarmarket.com ✅ Works perfectly
- https://www.kfarmarket.com ❌ SSL error (ERR_SSL_VERSION_OR_CIPHER_MISMATCH)

## Solution

### Option 1: Add www Domain in DigitalOcean (Recommended)

1. **Go to DigitalOcean Dashboard**
   - Navigate to Apps → kfar-landing-page
   - Click "Settings" tab
   - Scroll to "Domains" section

2. **Add www subdomain**
   - Click "Add Domain"
   - Enter: `www.kfarmarket.com`
   - Click "Add Domain"

3. **DigitalOcean will:**
   - Automatically provision SSL certificate for www
   - Handle the redirect properly
   - This usually takes 5-10 minutes

### Option 2: Create Redirect Rule (If Option 1 Doesn't Work)

In your domain registrar (not DigitalOcean):
1. Keep the CNAME record for www → kfar-landing-page-ijdce.ondigitalocean.app
2. Add a redirect rule: www.kfarmarket.com → kfarmarket.com

### Option 3: Use Cloudflare Page Rules

Since you're using Cloudflare (I can see from the headers):

1. **Login to Cloudflare Dashboard**
2. **Go to Page Rules**
3. **Create a Page Rule:**
   - URL: `www.kfarmarket.com/*`
   - Setting: Forwarding URL (301)
   - Destination: `https://kfarmarket.com/$1`

## Quick Fix for Users

Tell users to use: **https://kfarmarket.com** (without www)

## Testing After Fix

```bash
# Test both domains
curl -I https://kfarmarket.com
curl -I https://www.kfarmarket.com

# Check SSL certificate
openssl s_client -connect www.kfarmarket.com:443 -servername www.kfarmarket.com
```

## Why This Happens

DigitalOcean App Platform needs to know about each domain/subdomain to provision SSL certificates. The certificate for kfarmarket.com doesn't automatically cover www.kfarmarket.com unless explicitly configured.