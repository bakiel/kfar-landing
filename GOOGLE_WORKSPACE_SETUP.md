# Google Workspace Email Setup for KFAR Shop

## Why Google Workspace?

### Benefits:
- ✅ Professional email addresses (info@kfarmarket.com)
- ✅ Better email deliverability (no spam issues)
- ✅ 30GB storage per user
- ✅ Google Calendar, Drive, Meet included
- ✅ Mobile apps for email on the go

### Cost:
- Business Starter: $6/user/month
- Business Standard: $12/user/month (recommended)

## Setup Steps:

### 1. Sign Up for Google Workspace
1. Go to: https://workspace.google.com
2. Click "Get Started"
3. Enter business name: "KFAR Shop"
4. Choose number of employees: "Just you"

### 2. Verify Domain (kfarmarket.com)
1. Google will guide you through domain verification
2. Add a TXT record to your DNS (they'll show you how)
3. Takes 10-30 minutes to verify

### 3. Create Email Addresses
- info@kfarmarket.com (main contact)
- orders@kfarmarket.com (for order notifications)
- noreply@kfarmarket.com (for automated emails)

### 4. Update Your Forms to Use Google SMTP

Replace SendGrid with Google Workspace SMTP:
```javascript
// In server.js, replace SendGrid setup with:
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'info@kfarmarket.com',
    pass: 'your-app-specific-password' // Generate in Google Security settings
  }
});

// Send email
await transporter.sendMail({
  from: 'KFAR Shop <info@kfarmarket.com>',
  to: customerEmail,
  subject: 'Welcome to KFAR Shop!',
  html: emailContent
});
```

### 5. DNS Records to Add

In your DNS settings, add:
```
# MX Records (for receiving email)
Priority 1: ASPMX.L.GOOGLE.COM
Priority 5: ALT1.ASPMX.L.GOOGLE.COM
Priority 5: ALT2.ASPMX.L.GOOGLE.COM
Priority 10: ALT3.ASPMX.L.GOOGLE.COM
Priority 10: ALT4.ASPMX.L.GOOGLE.COM

# SPF Record (for sending)
TXT: "v=spf1 include:_spf.google.com ~all"

# DKIM (Google will provide this after setup)
```

## Hybrid Approach (Recommended)

### Use Google Workspace for:
- Professional email addresses
- Customer communication
- Team collaboration

### Keep SendGrid for:
- Bulk marketing emails (when you have 1000+ subscribers)
- Automated transactional emails at scale
- Email campaigns

## Cost Comparison:
- **Google Workspace**: $6-12/month (includes everything)
- **SendGrid**: Free up to 100/day, then $19.95/month
- **Recommended**: Start with Google Workspace only

## Migration Plan:

1. **Week 1**: Set up Google Workspace
2. **Week 2**: Update forms to use Google SMTP
3. **Week 3**: Test thoroughly
4. **Week 4**: Disable SendGrid if not needed

## Benefits for KFAR Shop:
- ✅ No more spam issues
- ✅ Professional appearance
- ✅ Reliable email delivery
- ✅ Easy to manage
- ✅ Mobile access
- ✅ Calendar for vendor appointments
- ✅ Drive for storing vendor documents

## Quick Start:
1. Sign up: https://workspace.google.com
2. Use promo code for free trial (usually 14 days)
3. Set up takes about 1 hour
4. Emails working immediately after DNS propagation