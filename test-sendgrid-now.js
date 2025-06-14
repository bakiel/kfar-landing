#!/usr/bin/env node

require('dotenv').config();
const https = require('https');

console.log('🧪 Testing SendGrid API Connection...');
console.log('================================');

// Test email data
const testEmail = {
  personalizations: [
    {
      to: [{ email: 'test@example.com', name: 'Test User' }],
      subject: 'KFAR Shop - Form Test Email'
    }
  ],
  from: {
    email: process.env.FROM_EMAIL || 'noreply@kfarmarket.com',
    name: 'KFAR Shop Team'
  },
  content: [
    {
      type: 'text/html',
      value: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">🎉 KFAR Shop Form Test</h2>
          <p>This is a test email from the KFAR Shop coming soon form.</p>
          <p><strong>Status:</strong> ✅ SendGrid integration working!</p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            This is an automated test email from KFAR Shop.<br>
            Sent: ${new Date().toLocaleString()}
          </p>
        </div>
      `
    }
  ]
};

const postData = JSON.stringify(testEmail);

const options = {
  hostname: 'api.sendgrid.com',
  port: 443,
  path: '/v3/mail/send',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('📧 Sending test email...');
console.log(`📨 From: ${process.env.FROM_EMAIL}`);
console.log(`🔑 API Key: ${process.env.SENDGRID_API_KEY?.substring(0, 15)}...`);
console.log(`📧 Notification Email: ${process.env.NOTIFICATION_EMAIL}`);

const req = https.request(options, (res) => {
  console.log(`\n📈 Response Status: ${res.statusCode}`);
  console.log(`📋 Response Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 202) {
      console.log('\n✅ SUCCESS! Email sent successfully');
      console.log('🎯 Form is ready for client testing');
    } else {
      console.log('\n❌ FAILED! Email not sent');
      console.log('📋 Response data:', data);
    }
    
    console.log('\n================================');
    console.log('🏁 Test completed');
  });
});

req.on('error', (error) => {
  console.error('\n❌ Request Error:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('1. Check internet connection');
  console.log('2. Verify SendGrid API key');
  console.log('3. Check environment variables');
});

req.write(postData);
req.end();