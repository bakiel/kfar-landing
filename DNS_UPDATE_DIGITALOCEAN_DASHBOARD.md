# DNS Update Guide - DigitalOcean Dashboard

## Current Status
- ✅ Your app is deployed at: https://kfar-landing-page-ijdce.ondigitalocean.app
- ❌ kfarmarket.com is pointing to GitHub Pages
- 🎯 Goal: Point kfarmarket.com to your DigitalOcean app

## Step 1: Add Domain to Your App

1. **In DigitalOcean Dashboard:**
   - Go to Apps → kfar-landing-page
   - Click "Settings" tab
   - Scroll to "Domains" section
   - Click "Add Domain"
   - Enter: `kfarmarket.com`
   - Click "Add Domain"

2. **DigitalOcean will show you DNS records to add**

## Step 2: Update DNS at Your Domain Registrar

### If your domain uses DigitalOcean nameservers:

1. **Go to Networking → Domains in DigitalOcean**
2. **Delete these A records:**
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

3. **Add CNAME record:**
   - Type: CNAME
   - Hostname: @
   - Will Direct To: kfar-landing-page-ijdce.ondigitalocean.app.
   - TTL: 300

4. **Add www CNAME:**
   - Type: CNAME
   - Hostname: www
   - Will Direct To: kfar-landing-page-ijdce.ondigitalocean.app.
   - TTL: 300

### If your domain uses external registrar (GoDaddy, Namecheap, etc):

1. **Login to your domain registrar**
2. **Find DNS Management**
3. **Delete A records pointing to:**
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

4. **Add CNAME record:**
   - Type: CNAME
   - Name: @ (or leave blank)
   - Points to: kfar-landing-page-ijdce.ondigitalocean.app
   - TTL: 300

5. **Add www CNAME:**
   - Type: CNAME
   - Name: www
   - Points to: kfar-landing-page-ijdce.ondigitalocean.app
   - TTL: 300

## Step 3: Wait for Propagation

- DNS changes: 5 minutes to 48 hours
- SSL certificate: Automatic after DNS updates

## Step 4: Test

```bash
# Check DNS propagation
nslookup kfarmarket.com

# Should show:
# kfarmarket.com is an alias for kfar-landing-page-ijdce.ondigitalocean.app
```

## Need Help?

1. **Check nameservers first:**
   ```bash
   dig NS kfarmarket.com
   ```
   
   Should show either:
   - Your registrar's nameservers, OR
   - ns1.digitalocean.com, ns2.digitalocean.com, ns3.digitalocean.com

2. **If using DigitalOcean nameservers but domain not working:**
   - Make sure domain is added in Networking → Domains
   - Make sure correct records exist

3. **If SSL not working after DNS updates:**
   - Go to Apps → Settings → Domains
   - Click "Force HTTPS"
   - Wait 10 minutes for certificate provisioning