# KFAR Shop - Forms & Data Verification Guide

## Current Status

### ✅ Forms ARE Working!
I tested both forms and they're returning success responses:
- Customer Waitlist: `{"success":true,"message":"Successfully joined waitlist!"}`
- Vendor Signup: `{"success":true,"message":"Application submitted successfully!"}`

### 📊 Where Data is Stored

1. **Server-Side (Primary Storage)**
   - Location: `/workspace/form-data/` on DigitalOcean
   - Format: Individual JSON files for each submission
   - Naming: `customer-[timestamp].json` or `vendor-[timestamp].json`

2. **Client-Side (Backup)**
   - localStorage keys:
     - `kfar_vendor_applications`
     - `kfar_customer_waitlist`
   - Note: This only captures submissions made from that browser

3. **Email Notifications**
   - Every submission sends 2 emails:
     - Confirmation to the user
     - Notification to bakielisrael@gmail.com

## How to Verify Forms are Working

### Method 1: Check Your Email
Every form submission sends an email to `bakielisrael@gmail.com` with:
- Vendor: "New Vendor Application: [Business Name]"
- Customer: "New Customer Waitlist: [Name]"

### Method 2: Test the Forms Live
1. Go to https://kfarmarket.com
2. Fill out the customer form (email capture)
3. Fill out the vendor form ("Become a Vendor")
4. Check your email for notifications

### Method 3: Use the Export Tool
Open `/export-lists.html` in your browser to see localStorage data

### Method 4: API Admin Access
Once ADMIN_TOKEN is configured in DigitalOcean:
```bash
curl -H "Authorization: Bearer my-secure-kfar-admin-key-2025_shalom" \
  https://kfarmarket.com/api/admin/submissions
```

## Setting Up Admin Access

In DigitalOcean Dashboard:
1. Go to Apps → kfar-landing-page → Settings
2. Under "Environment Variables", add:
   - Key: `ADMIN_TOKEN`
   - Value: `my-secure-kfar-admin-key-2025_shalom`
   - Type: SECRET
3. Save and let the app redeploy

## Data Collection Summary

When someone submits a form:
1. ✅ Data saved to server (JSON file)
2. ✅ Confirmation email sent to user
3. ✅ Notification email sent to you
4. ✅ Data saved to localStorage (browser)
5. ✅ Success message shown to user

## Current Metrics
- API Status: ✅ Working
- SendGrid: ✅ Configured
- Data Directory: `/workspace/form-data`
- Email Notifications: bakielisrael@gmail.com

The forms ARE collecting data successfully!