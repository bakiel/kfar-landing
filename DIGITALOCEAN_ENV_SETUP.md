# DigitalOcean Environment Variables Setup

## Required Environment Variables

You need to add these in DigitalOcean Dashboard:
**Apps → kfar-landing-page → Settings → Environment Variables**

### 1. ADMIN_TOKEN (Missing - Add This!)
- **Key**: `ADMIN_TOKEN`
- **Value**: `my-secure-kfar-admin-key-2025_shalom`
- **Type**: SECRET
- **Scope**: RUN_TIME

### 2. SENDGRID_API_KEY (Check if exists)
- **Key**: `SENDGRID_API_KEY`
- **Value**: Your SendGrid API key
- **Type**: SECRET
- **Scope**: RUN_TIME

### 3. FROM_EMAIL
- **Key**: `FROM_EMAIL`
- **Value**: `noreply@kfarmarket.com`
- **Scope**: RUN_TIME

### 4. NOTIFICATION_EMAIL
- **Key**: `NOTIFICATION_EMAIL`
- **Value**: `bakielisrael@gmail.com`
- **Scope**: RUN_TIME

## How to Add in DigitalOcean:

1. Go to: https://cloud.digitalocean.com/apps
2. Click on your app: `kfar-landing-page`
3. Click "Settings" tab
4. Scroll to "App-Level Environment Variables"
5. Click "Edit"
6. Add each variable above
7. Click "Save"
8. App will automatically redeploy (5-10 minutes)

## To Verify After Deployment:

```bash
# Check if admin access works
curl -H "Authorization: Bearer my-secure-kfar-admin-key-2025_shalom" \
  https://kfarmarket.com/api/admin/submissions

# Should return data, not "Unauthorized"
```