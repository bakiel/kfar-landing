# SendGrid Setup for KFAR Coming Soon Page

## ✅ Current Status
- SendGrid API is configured and ready
- Both vendor and customer forms are connected to the backend
- Email templates are set up for automatic notifications

## 🔧 DigitalOcean Configuration

To enable SendGrid on your DigitalOcean deployment:

1. **Log into DigitalOcean App Platform**
   - Go to your app: `kfar-marketplace-coming-soon`
   - Navigate to Settings > Environment Variables

2. **Add the following environment variables:**
   ```
   SENDGRID_API_KEY = [Your SendGrid API Key]
   ADMIN_TOKEN = [Create a secure admin token]
   ```

3. **The following are already configured in app.yaml:**
   - FROM_EMAIL: noreply@em6192.kfarmarket.com
   - NOTIFICATION_EMAIL: bakielisrael@gmail.com
   - NODE_ENV: production

## 📧 How It Works

### Customer Waitlist Form
- **Endpoint:** POST `/api/customer-waitlist`
- **Sends two emails:**
  1. Notification to admin (bakielisrael@gmail.com)
  2. Welcome email to customer with founding member benefits

### Vendor Application Form
- **Endpoint:** POST `/api/vendor-signup`
- **Sends two emails:**
  1. Detailed application to admin
  2. Confirmation email to vendor with next steps

### Data Backup
- All form submissions are saved to `form-data/` directory as JSON files
- Even if email fails, data is preserved locally

## 🧪 Testing

1. **Test locally:**
   ```bash
   npm start
   # Visit http://localhost:8080
   ```

2. **Check API health:**
   ```bash
   ./check-api-status.sh
   ```

3. **Test SendGrid:**
   ```bash
   node test-sendgrid-digitalocean.js
   ```

## 🚀 Deployment

The app will automatically deploy when you push to GitHub:
```bash
git push origin main
```

Or manually deploy:
```bash
doctl apps create-deployment <app-id>
```

## 📊 Admin Access

View all submissions (requires ADMIN_TOKEN):
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  https://kfarmarket.com/api/admin/submissions
```

## ⚠️ Important Notes

- Never commit API keys to Git
- SendGrid requires domain verification for production use
- The `from` email domain should match your verified domain
- Check DigitalOcean logs if emails aren't sending: `doctl apps logs <app-id>`