# KFAR Shop Coming Soon Page

A modern, responsive coming soon page for KFAR Shop - the digital marketplace for the Village of Peace community.

![KFAR Shop Logo](images/logos/kfar_logo_main.png)

## Features
- ✅ Beautiful responsive design with KFAR branding
- ✅ Customer waitlist signup form
- ✅ SendGrid email integration for automated welcome emails
- ✅ Vendor application form
- ✅ Local storage backup for form submissions
- ✅ Mobile-optimized interface

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file (copy from `.env.example`):
```env
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=hello@kfarshop.com
PORT=8080
```

### 3. Run the Server
```bash
npm start
```

### 4. Test the Form
Open http://localhost:8080/test-form.html to test:
- SendGrid email functionality
- Form submission
- Local storage backup
- Server status

Or use the automated test script:
```bash
./start-and-test.sh
```

## Files Structure
- `index.html` - Main coming soon page with forms
- `server.js` - Express server with SendGrid integration
- `test-form.html` - Form testing interface
- `test-sendgrid.js` - SendGrid configuration test
- `package.json` - Node.js dependencies
- `Dockerfile` - Container configuration for deployment
- `images/` - All branding images including new KFAR logo

## Deployment

### GitHub Pages (Static Only)
The page is deployed at: https://github.com/bakiel/kfar-landing

### DigitalOcean App Platform (With Email Backend)
1. Connect your GitHub repository
2. Set environment variables in App Settings
3. Deploy as a Node.js app

## Testing Checklist
- [ ] Logo displays correctly
- [ ] Form submission works
- [ ] Email is sent via SendGrid
- [ ] Data saves to local storage
- [ ] Mobile responsive design
- [ ] All vendor showcases load

## Support
For issues or questions:
- Email: info@kfarshop.com
- WhatsApp: +972-50-799-0372

---
© 2025 KFAR Shop - Village of Peace Digital Commerce