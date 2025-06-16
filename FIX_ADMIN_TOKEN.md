# 🔐 Fix Admin Token Issue

## Problem
The ADMIN_TOKEN environment variable in DigitalOcean might not match what's in the code.

## Solution Steps

### 1. Generate New Secure Token
```bash
# Generate a new secure token
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Update DigitalOcean Environment
1. Go to DigitalOcean Dashboard
2. Click on your app "kfar-marketplace-coming-soon"
3. Go to Settings → App-Level Environment Variables
4. Click "Edit" next to ADMIN_TOKEN
5. Replace with new token (or use simple one for testing: `kfar-admin-2025`)
6. Click "Save"
7. Wait for app to redeploy (2-3 minutes)

### 3. Test New Token
Use this URL with your new token:
```
https://kfarmarket.com/check-data.html
```

### 4. Alternative: Use Simple Token
For easier testing, update to a simple token:
- Token: `kfar-admin-2025`
- Easy to remember and type

## Quick Test Script
```javascript
// Save as test-admin.js
const token = 'YOUR_NEW_TOKEN_HERE';
fetch('https://kfarmarket.com/api/admin/submissions', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```