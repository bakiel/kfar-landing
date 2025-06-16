# Quick DNS Fix Guide - Point kfarmarket.com to DigitalOcean

## Current Problem:
- kfarmarket.com → GitHub Pages (no backend)
- kfar-landing-page-ijdce.ondigitalocean.app → DigitalOcean (has backend)

## Solution - Update DNS Records:

### Option 1: At Your Domain Registrar

1. **Log into your domain registrar** (where you bought kfarmarket.com)

2. **Delete these A records:**
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

3. **Add ONE CNAME record:**
   ```
   Type: CNAME
   Name: @ (or blank)
   Value: kfar-landing-page-ijdce.ondigitalocean.app
   TTL: 300 (5 minutes)
   ```

4. **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: kfar-landing-page-ijdce.ondigitalocean.app
   TTL: 300
   ```

### Option 2: Use DigitalOcean Nameservers

1. **At your domain registrar, change nameservers to:**
   ```
   ns1.digitalocean.com
   ns2.digitalocean.com
   ns3.digitalocean.com
   ```

2. **In DigitalOcean:**
   - Go to Networking → Domains
   - Add kfarmarket.com
   - It will auto-configure the records

## Timeline:
- DNS changes: 5 minutes to 48 hours (usually within 1 hour)
- SSL certificate: Automatic once DNS propagates

## Test Progress:
```bash
# Check if DNS has updated
nslookup kfarmarket.com

# Should eventually show:
# kfarmarket.com is an alias for kfar-landing-page-ijdce.ondigitalocean.app
```

## Once DNS Updates:
✅ kfarmarket.com will have:
- Working countdown timer
- Working mobile menu  
- Correct "KFAR Shop" branding
- Working forms with SendGrid
- SSL certificate
- Everything working properly!