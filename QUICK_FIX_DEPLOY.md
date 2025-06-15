# 🚨 QUICK FIX - Get Forms Working NOW

## Option 1: Update Existing DigitalOcean App (Recommended)

1. **Go to your app**: https://cloud.digitalocean.com/apps/58ecdba3-e1b6-4a3a-8d48-5268572c5550

2. **Click "Settings" → "App Spec"**

3. **Click "Edit" and replace entire content with:**

```yaml
name: kfar-marketplace-coming-soon
region: fra
services:
- name: web
  environment_slug: node-js
  github:
    branch: main
    deploy_on_push: true
    repo: bakiel/kfar-landing
  http_port: 8080
  instance_count: 1
  instance_size_slug: apps-s-1vcpu-0.5gb
  routes:
  - path: /
  run_command: node server.js
  source_dir: /
domains:
- domain: kfarmarket.com
  type: PRIMARY
  zone: kfarmarket.com
```

4. **Click "Save"**

5. **Go to "Settings" → "Environment Variables"** and add:
   - `SENDGRID_API_KEY` = (copy from your .env file)
   - `ADMIN_TOKEN` = (copy from your .env file)

6. **Click "Deploy"**

## Option 2: Create New App (If Above Doesn't Work)

```bash
# If you have doctl CLI:
./deploy-now-to-do.sh

# Or manually:
1. Go to: https://cloud.digitalocean.com/apps/new
2. Choose GitHub → bakiel/kfar-landing
3. Use the app.yaml configuration
4. Add environment variables
5. Deploy
```

## Option 3: Emergency Local Testing

```bash
# Test locally with hardcoded values
node standalone-server.js

# Visit http://localhost:8080
# Forms will work and save data locally
```

## 🧪 Verify It's Working

```bash
# Check if server is running
curl https://kfarmarket.com/api/health

# Should return:
{
  "status": "ok",
  "sendgrid": "configured",
  "dataDir": "/workspace/form-data"
}
```

## 📊 Access Saved Data

```bash
curl -H "Authorization: Bearer kfar-admin-secure-2025" \
  https://kfarmarket.com/api/admin/submissions
```

## ⚡ Why Forms Aren't Working Now

- Domain is pointing to GitHub Pages (static only)
- GitHub can't run Node.js server code
- Need DigitalOcean to run the server
- Once deployed, forms will save data + send emails

## 🆘 Still Not Working?

1. Check DigitalOcean logs for errors
2. Verify environment variables are set
3. Make sure deployment completed successfully
4. Contact support with app ID: 58ecdba3-e1b6-4a3a-8d48-5268572c5550