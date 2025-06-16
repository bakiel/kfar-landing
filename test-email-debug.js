const sgMail = require('@sendgrid/mail');

// Test SendGrid configuration
async function testSendGrid() {
  console.log('🔍 Testing SendGrid Configuration...\n');
  
  // Check if API key exists
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error('❌ SENDGRID_API_KEY not found in environment variables');
    return;
  }
  
  console.log('✅ API Key found:', apiKey.substring(0, 10) + '...');
  
  // Initialize SendGrid
  sgMail.setApiKey(apiKey);
  
  // Test email
  const msg = {
    to: 'bakielisrael@gmail.com',
    from: {
      email: process.env.FROM_EMAIL || 'noreply@em6192.kfarmarket.com',
      name: 'KFAR Shop Test'
    },
    subject: 'SendGrid Test - KFAR Shop',
    text: 'This is a test email to verify SendGrid is working correctly.',
    html: `
      <h2>SendGrid Test Email</h2>
      <p>This test was sent at: ${new Date().toLocaleString()}</p>
      <p>If you receive this, SendGrid is working correctly!</p>
      <hr>
      <p>Environment:</p>
      <ul>
        <li>FROM_EMAIL: ${process.env.FROM_EMAIL || 'not set'}</li>
        <li>NOTIFICATION_EMAIL: ${process.env.NOTIFICATION_EMAIL || 'not set'}</li>
      </ul>
    `
  };
  
  try {
    console.log('📧 Sending test email to:', msg.to);
    console.log('📤 From:', msg.from.email);
    
    const response = await sgMail.send(msg);
    console.log('\n✅ Email sent successfully!');
    console.log('Response:', response[0].statusCode);
    console.log('Headers:', response[0].headers);
  } catch (error) {
    console.error('\n❌ Error sending email:');
    console.error(error.message);
    
    if (error.response) {
      console.error('\nAPI Response:', error.response.body);
    }
  }
}

// Run test
testSendGrid();