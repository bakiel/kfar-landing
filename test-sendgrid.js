// Test SendGrid Email Functionality
const https = require('https');
require('dotenv').config({ path: '../.env.local' });

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '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';
const FROM_EMAIL = process.env.FROM_EMAIL || 'hello@kfarmarket.com';
const TEST_EMAIL = process.env.TEST_EMAIL || 'bakielisrael@gmail.com';

console.log('🧪 Testing SendGrid Configuration...\n');
console.log(`📧 From: ${FROM_EMAIL}`);
console.log(`📬 To: ${TEST_EMAIL}`);
console.log(`🔑 API Key: ${SENDGRID_API_KEY.substring(0, 10)}...${SENDGRID_API_KEY.substring(SENDGRID_API_KEY.length - 4)}`);
console.log('\n📤 Sending test email...\n');

const testEmailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>SendGrid Test - KFAR Marketplace</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <h1 style="color: #478c0b; text-align: center;">✅ SendGrid is Working!</h1>
    
    <div style="background-color: #fef9ef; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h2 style="color: #c23c09; margin-top: 0;">Test Results:</h2>
      <ul style="color: #3a3a1d;">
        <li>✓ SendGrid API connected successfully</li>
        <li>✓ Email templates rendering correctly</li>
        <li>✓ From address verified: ${FROM_EMAIL}</li>
        <li>✓ Test timestamp: ${new Date().toLocaleString()}</li>
      </ul>
    </div>
    
    <p style="color: #666; text-align: center; margin-top: 30px;">
      This is a test email from the KFAR Marketplace Coming Soon page.<br>
      If you received this, your SendGrid backend is configured correctly!
    </p>
    
    <div style="text-align: center; margin-top: 30px;">
      <a href="https://kfarmarket.com" style="background-color: #478c0b; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Visit KFAR Marketplace
      </a>
    </div>
    
    <p style="color: #478c0b; text-align: center; margin-top: 30px; font-weight: bold;">
      Yah Khai! HalleluYah! 🌿
    </p>
  </div>
</body>
</html>
`;

const data = JSON.stringify({
  personalizations: [{ to: [{ email: TEST_EMAIL }] }],
  from: { email: FROM_EMAIL, name: 'KFAR Marketplace' },
  subject: '🧪 SendGrid Test - KFAR Coming Soon Backend',
  content: [{ type: 'text/html', value: testEmailHTML }]
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

const req = https.request(options, (res) => {
  console.log(`📊 Response Status: ${res.statusCode}`);
  
  if (res.statusCode === 202) {
    console.log('\n✅ SUCCESS! Email sent successfully!');
    console.log(`📨 Check ${TEST_EMAIL} for the test email.`);
    console.log('\n🎯 SendGrid Backend Status: FULLY OPERATIONAL');
    console.log('\n💡 Next Steps:');
    console.log('   1. Deploy to DigitalOcean with environment variables');
    console.log('   2. Update FROM_EMAIL to match your verified sender');
    console.log('   3. Test the waitlist form on the live site');
  } else {
    console.error(`\n❌ ERROR: SendGrid returned status ${res.statusCode}`);
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.error('\n📋 Error Details:', body);
      
      // Parse common errors
      try {
        const error = JSON.parse(body);
        if (error.errors) {
          console.error('\n🔍 Specific Issues:');
          error.errors.forEach(err => {
            console.error(`   - ${err.field}: ${err.message}`);
          });
        }
      } catch (e) {
        // Not JSON, just show the body
      }
      
      console.log('\n💡 Troubleshooting Tips:');
      console.log('   - Verify your SendGrid API key is correct');
      console.log('   - Check that FROM_EMAIL is a verified sender in SendGrid');
      console.log('   - Ensure your SendGrid account is active');
      console.log('   - Check SendGrid dashboard for any account issues');
    });
  }
});

req.on('error', (error) => {
  console.error('\n❌ Network Error:', error.message);
  console.log('\n💡 Check your internet connection and try again.');
});

req.write(data);
req.end();