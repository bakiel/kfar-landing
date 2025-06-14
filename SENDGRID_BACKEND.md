# SendGrid Backend Configuration for KFAR Coming Soon Page

## Overview
This coming soon page includes a fully functional SendGrid email backend that sends automated welcome emails to users who join the waitlist.

## Features
- ✅ Secure API key management via environment variables
- ✅ Customer waitlist signup with email automation
- ✅ Personalized welcome emails with discount codes
- ✅ Fallback to localStorage if API is unavailable
- ✅ Beautiful HTML email templates

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the `deploy-coming-soon` directory:
```bash
# Copy from .env.example
cp .env.example .env
```

Then add your SendGrid API key:
```env
SENDGRID_API_KEY=SG.your_actual_api_key_here
FROM_EMAIL=hello@kfarmarket.com
PORT=8080
NODE_ENV=production
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Server
```bash
# Development
npm start

# Production (with environment variables)
NODE_ENV=production npm start
```

## API Endpoints

### POST /api/customer-waitlist
Handles customer waitlist signups and sends welcome emails.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+972501234567",
  "location": "dimona-city",
  "preferences": "fresh-produce, prepared-foods",
  "referralSource": "social-media"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Welcome to KFAR! Check your email for exclusive perks.",
  "waitlistNumber": 237
}
```

### POST /api/send-email
Generic email sending endpoint.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "User Name"
}
```

## Email Features

### Welcome Email Includes:
- Personalized greeting with user's name
- 20% discount code (unique per user)
- Early bird benefits list
- User's selected preferences (if provided)
- WhatsApp contact button (if phone provided)
- Professional KFAR branding

### Email Template Styling:
- Responsive design for all devices
- KFAR brand colors (green, gold, flame)
- Clean, modern layout
- Clear call-to-action buttons

## Security Notes

⚠️ **IMPORTANT**: Never commit the `.env` file to version control!

The SendGrid API key should be:
- Stored securely in environment variables
- Never hardcoded in the source code
- Rotated regularly for security
- Limited to necessary permissions only

## Deployment

### DigitalOcean App Platform:
1. Add environment variables in App Settings
2. Deploy the app
3. SendGrid will work automatically

### Manual Deployment:
1. Set environment variables on your server
2. Run `npm install`
3. Start with `NODE_ENV=production npm start`

## Testing

To test the email functionality:
1. Fill out the waitlist form on the coming soon page
2. Check the console for any errors
3. Verify the email was received
4. Check that localStorage backup is working

## Troubleshooting

### Email not sending:
- Check SendGrid API key is correct
- Verify FROM_EMAIL is a verified sender in SendGrid
- Check server logs for error messages
- Ensure port 443 is open for HTTPS requests

### Common Errors:
- `401 Unauthorized`: Invalid API key
- `403 Forbidden`: Sender not verified
- `429 Too Many Requests`: Rate limit exceeded
- `500 Server Error`: Check SendGrid service status

## Email Analytics

Track email performance in SendGrid dashboard:
- Open rates
- Click rates
- Bounce rates
- Unsubscribe rates

## Future Enhancements

- [ ] Add email templates for different languages
- [ ] Implement double opt-in confirmation
- [ ] Add email preference management
- [ ] Create automated follow-up sequences
- [ ] Add A/B testing for subject lines

## Support

For issues with:
- **SendGrid**: Check SendGrid documentation or support
- **Server**: Review server logs and error messages
- **Templates**: Test with different email clients

---

Last Updated: January 2025