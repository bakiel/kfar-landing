const express = require('express');
const path = require('path');
const https = require('https');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// SendGrid configuration
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'hello@kfarshop.com';
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'bakielisrael@gmail.com';

// Email template
const getComingSoonEmailHTML = (name = 'Friend') => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KFAR Shop - Launching Soon!</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #478c0b 0%, #478c0b 60%, #f6af0d 100%); padding: 40px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 36px; font-weight: 600;">KFAR Shop</h1>
              <p style="color: #fef9ef; margin: 10px 0 0 0; font-size: 18px;">The Whole Village, In Your Hand</p>
            </td>
          </tr>
          
          <!-- Coming Soon Announcement -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #478c0b; text-align: center; font-size: 32px; margin: 0 0 20px 0;">
                🌟 We're Launching Soon! 🌟
              </h2>
              
              <p style="color: #3a3a1d; font-size: 18px; line-height: 1.6; text-align: center; margin: 0 0 30px 0;">
                Dear ${name},<br><br>
                Get ready for a revolutionary marketplace experience!<br>
                KFAR Shop is bringing the Village of Peace community to your fingertips.
              </p>
              
              <!-- CTA Section -->
              <div style="background-color: #fef9ef; padding: 30px; border-radius: 12px; text-align: center; margin: 40px 0;">
                <h3 style="color: #c23c09; margin: 0 0 15px 0;">🎉 Early Bird Special!</h3>
                <p style="color: #3a3a1d; font-size: 18px; margin: 0 0 20px 0;">
                  Join our waitlist now and get <strong>20% OFF</strong> your first order!
                </p>
                <a href="https://kfarmarket.com" 
                   style="display: inline-block; background-color: #478c0b; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 18px;">
                  Visit KFAR Shop 🌿
                </a>
              </div>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #fef9ef; padding: 30px; text-align: center; border-radius: 0 0 16px 16px;">
              <p style="color: #478c0b; margin: 0 0 10px 0; font-weight: bold;">
                Yah Khai! HalleluYah! 🌿
              </p>
              <p style="color: #666; margin: 0; font-size: 14px;">
                © 2025 KFAR Shop - Village of Peace, Dimona, Israel
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Function to send notification email to admin
const sendNotificationEmail = async (formData) => {
  const notificationHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New KFAR Shop Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #478c0b 0%, #f6af0d 100%); padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
    <h1 style="color: white; margin: 0;">🎉 New KFAR Shop Submission!</h1>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
    <h2 style="color: #478c0b; margin-top: 0;">Customer Details:</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Name:</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formData.firstName} ${formData.lastName || ''}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Email:</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formData.email}</td>
      </tr>
      ${formData.phone ? `
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Phone:</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formData.phone}</td>
      </tr>
      ` : ''}
      ${formData.location ? `
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Location:</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formData.location}</td>
      </tr>
      ` : ''}
      ${formData.preferences ? `
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Interests:</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formData.preferences}</td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Submitted:</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date().toLocaleString()}</td>
      </tr>
    </table>
  </div>
  
  <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e8; border-radius: 8px;">
    <p style="margin: 0; color: #478c0b; font-weight: bold;">
      💡 Action Required: Follow up with this customer within 24 hours for best conversion rates!
    </p>
  </div>
</body>
</html>`;

  const notificationData = JSON.stringify({
    personalizations: [{ to: [{ email: NOTIFICATION_EMAIL, name: 'KFAR Admin' }] }],
    from: { email: FROM_EMAIL, name: 'KFAR Shop System' },
    subject: `🔔 New KFAR Shop Customer: ${formData.firstName} ${formData.lastName || ''}`,
    content: [{ type: 'text/html', value: notificationHTML }]
  });

  const options = {
    hostname: 'api.sendgrid.com',
    port: 443,
    path: '/v3/mail/send',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': notificationData.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (response) => {
      if (response.statusCode === 202) {
        resolve();
      } else {
        let body = '';
        response.on('data', chunk => body += chunk);
        response.on('end', () => {
          console.error('Notification email failed:', response.statusCode, body);
          resolve(); // Don't fail the main request if notification fails
        });
      }
    });

    req.on('error', (error) => {
      console.error('Notification email error:', error);
      resolve(); // Don't fail the main request if notification fails
    });
    
    req.write(notificationData);
    req.end();
  });
};

// API endpoint for customer waitlist
app.post('/api/customer-waitlist', async (req, res) => {
  // Log submission data for debugging
  console.log('\n🎉 New KFAR Shop submission received:');
  console.log('=====================================');
  console.log('Time:', new Date().toLocaleString());
  console.log('Data:', req.body);
  console.log('=====================================\n');

  if (!SENDGRID_API_KEY) {
    console.log('⚠️ SendGrid not configured, using fallback mode');
    return res.json({ 
      success: true, 
      message: 'Thank you for joining KFAR Shop! We\'ll notify you when we launch.',
      waitlistNumber: Math.floor(Math.random() * 500) + 100,
      note: 'Email service will be available soon'
    });
  }

  const { firstName, lastName, email, phone, location, preferences, referralSource } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({ error: 'Email and first name are required' });
  }

  // Enhanced email template for waitlist
  const waitlistEmailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to KFAR Shop!</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #478c0b 0%, #478c0b 60%, #f6af0d 100%); padding: 40px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 36px; font-weight: 600;">Welcome to KFAR!</h1>
              <p style="color: #fef9ef; margin: 10px 0 0 0; font-size: 18px;">You're officially on the waitlist!</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #478c0b; font-size: 24px; margin: 0 0 20px 0;">
                Thank you, ${firstName}! 🌟
              </h2>
              
              <p style="color: #3a3a1d; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                You're among the first to know when KFAR Shop launches! As a thank you for your early support, you'll receive:
              </p>
              
              <!-- Benefits -->
              <div style="background-color: #fef9ef; padding: 25px; border-radius: 12px; margin: 20px 0;">
                <h3 style="color: #c23c09; margin: 0 0 15px 0;">🎉 Your Early Bird Benefits:</h3>
                <ul style="color: #3a3a1d; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 10px;"><strong>20% OFF</strong> your first order</li>
                  <li style="margin-bottom: 10px;">Exclusive access <strong>24 hours before</strong> public launch</li>
                  <li style="margin-bottom: 10px;">Free delivery on your first 3 orders</li>
                  <li style="margin-bottom: 10px;">Special vendor offers & promotions</li>
                  <li>Priority customer support</li>
                </ul>
              </div>
              
              ${preferences ? `
              <p style="color: #3a3a1d; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                <strong>We noted your interests:</strong> ${preferences}<br>
                We'll make sure to notify you about relevant products and offers!
              </p>
              ` : ''}
              
              <!-- What's Next -->
              <div style="border-top: 2px solid #cfe7c1; border-bottom: 2px solid #cfe7c1; padding: 20px 0; margin: 30px 0;">
                <h3 style="color: #478c0b; margin: 0 0 15px 0;">📅 What Happens Next?</h3>
                <ol style="color: #3a3a1d; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 10px;">We'll send you exclusive updates as we prepare to launch</li>
                  <li style="margin-bottom: 10px;">24 hours before launch, you'll get your special access link</li>
                  <li style="margin-bottom: 10px;">Use your 20% discount code: <strong style="color: #c23c09;">EARLY${Math.random().toString(36).substring(2, 8).toUpperCase()}</strong></li>
                  <li>Start shopping from 50+ years of Village of Peace excellence!</li>
                </ol>
              </div>
              
              <!-- Stay Connected -->
              <div style="text-align: center; margin: 30px 0;">
                <h3 style="color: #478c0b; margin: 0 0 15px 0;">Stay Connected</h3>
                <p style="color: #3a3a1d; margin: 0 0 20px 0;">Join our community for updates and sneak peeks:</p>
                
                ${phone ? `
                <a href="https://wa.me/972507990372" 
                   style="display: inline-block; background-color: #25D366; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 0 10px;">
                  <i class="fab fa-whatsapp"></i> WhatsApp Updates
                </a>
                ` : ''}
                
                <a href="https://kfarmarket.com" 
                   style="display: inline-block; background-color: #478c0b; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 0 10px;">
                  Visit Our Site
                </a>
              </div>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #fef9ef; padding: 30px; text-align: center; border-radius: 0 0 16px 16px;">
              <p style="color: #478c0b; margin: 0 0 10px 0; font-weight: bold;">
                Yah Khai! HalleluYah! 🌿
              </p>
              <p style="color: #666; margin: 0 0 20px 0; font-size: 14px;">
                © 2025 KFAR Shop - Village of Peace, Dimona, Israel
              </p>
              <p style="color: #666; margin: 0; font-size: 12px;">
                <a href="https://kfarmarket.com/unsubscribe" style="color: #666;">Unsubscribe</a> | 
                <a href="https://kfarmarket.com/privacy" style="color: #666;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const data = JSON.stringify({
    personalizations: [{ to: [{ email, name: `${firstName} ${lastName || ''}`.trim() }] }],
    from: { email: FROM_EMAIL, name: 'KFAR Shop' },
    subject: '🎉 Welcome to KFAR Shop - You\'re on the list!',
    content: [{ type: 'text/html', value: waitlistEmailHTML }]
  });

  const options = {
    hostname: 'api.sendgrid.com',
    port: 443,
    path: '/v3/mail/send',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  try {
    await new Promise((resolve, reject) => {
      const req = https.request(options, (response) => {
        if (response.statusCode === 202) {
          resolve();
        } else {
          let body = '';
          response.on('data', chunk => body += chunk);
          response.on('end', () => {
            reject(new Error(`SendGrid error: ${response.statusCode} - ${body}`));
          });
        }
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });

    // Send notification email to admin (don't wait for it)
    sendNotificationEmail({ firstName, lastName, email, phone, location, preferences, referralSource })
      .catch(error => console.error('Failed to send notification:', error));

    res.json({ 
      success: true, 
      message: 'Welcome to KFAR! Check your email for exclusive perks.',
      waitlistNumber: Math.floor(Math.random() * 500) + 100 // Random waitlist position
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send welcome email' });
  }
});

// API endpoint to send email
app.post('/api/send-email', async (req, res) => {
  if (!SENDGRID_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const data = JSON.stringify({
    personalizations: [{ to: [{ email, name }] }],
    from: { email: FROM_EMAIL, name: 'KFAR Shop' },
    subject: '🌟 KFAR Shop - Launching Soon! Be the First to Know',
    content: [{ type: 'text/html', value: getComingSoonEmailHTML(name) }]
  });

  const options = {
    hostname: 'api.sendgrid.com',
    port: 443,
    path: '/v3/mail/send',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  try {
    await new Promise((resolve, reject) => {
      const req = https.request(options, (response) => {
        if (response.statusCode === 202) {
          resolve();
        } else {
          let body = '';
          response.on('data', chunk => body += chunk);
          response.on('end', () => {
            reject(new Error(`SendGrid error: ${response.statusCode} - ${body}`));
          });
        }
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });

    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`KFAR Shop Coming Soon page is running on port ${PORT}`);
  console.log(`SendGrid configured: ${SENDGRID_API_KEY ? 'YES' : 'NO'}`);
});
