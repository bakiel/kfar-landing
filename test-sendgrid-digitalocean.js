#!/usr/bin/env node

const sgMail = require('@sendgrid/mail');

// Test SendGrid configuration
async function testSendGrid() {
    console.log('🔍 Testing SendGrid Configuration for DigitalOcean...\n');
    
    // Check if API key is set
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
        console.error('❌ SENDGRID_API_KEY not found in environment variables');
        console.log('\nTo fix on DigitalOcean:');
        console.log('1. Go to your DigitalOcean App Platform dashboard');
        console.log('2. Click on your app (kfar-marketplace-coming-soon)');
        console.log('3. Go to Settings > Environment Variables');
        console.log('4. Add SENDGRID_API_KEY with value: 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');
        console.log('5. Save and redeploy');
        return;
    }
    
    console.log('✅ SendGrid API Key found');
    console.log(`   Key starts with: ${apiKey.substring(0, 10)}...`);
    
    // Set the API key
    sgMail.setApiKey(apiKey);
    
    // Check other environment variables
    const fromEmail = process.env.FROM_EMAIL || 'noreply@em6192.kfarmarket.com';
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'bakielisrael@gmail.com';
    
    console.log(`\n📧 Email Configuration:`);
    console.log(`   From Email: ${fromEmail}`);
    console.log(`   Notification Email: ${notificationEmail}`);
    
    // Test sending an email
    console.log('\n📤 Sending test email...');
    
    const msg = {
        to: notificationEmail,
        from: {
            email: fromEmail,
            name: 'KFAR Shop Test'
        },
        subject: 'SendGrid Test - DigitalOcean Deployment',
        text: 'This is a test email to verify SendGrid is working on DigitalOcean.',
        html: `
            <h2>SendGrid Configuration Test</h2>
            <p>This email confirms that SendGrid is properly configured on your DigitalOcean deployment.</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
            <h3>Next Steps:</h3>
            <ul>
                <li>✅ SendGrid API is working</li>
                <li>✅ Emails can be sent from ${fromEmail}</li>
                <li>✅ Forms on the coming soon page should work</li>
            </ul>
            <p>If you received this email, your SendGrid integration is working correctly!</p>
        `
    };
    
    try {
        const response = await sgMail.send(msg);
        console.log('✅ Test email sent successfully!');
        console.log(`   Status Code: ${response[0].statusCode}`);
        console.log(`   Check ${notificationEmail} for the test email`);
        
        console.log('\n🎉 SendGrid is properly configured and working!');
        console.log('\n📝 Form endpoints available:');
        console.log('   POST /api/vendor-signup     - For vendor applications');
        console.log('   POST /api/customer-waitlist - For customer signups');
        console.log('   GET  /api/health           - Check server status');
        
    } catch (error) {
        console.error('❌ Failed to send test email');
        console.error(`   Error: ${error.message}`);
        
        if (error.response) {
            console.error(`   Response: ${JSON.stringify(error.response.body)}`);
        }
        
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Verify the API key is correct');
        console.log('2. Check if the from email domain is verified in SendGrid');
        console.log('3. Ensure SendGrid account is active and not suspended');
        console.log('4. Check DigitalOcean logs: doctl apps logs <app-id>');
    }
}

// Run the test
testSendGrid().catch(console.error);