#!/usr/bin/env node

const http = require('http');

console.log('🧪 Testing KFAR Shop Form Submission...');
console.log('======================================');

const testData = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  phone: '+1234567890',
  location: 'Dimona, Israel',
  preferences: 'Organic produce, Health products',
  referralSource: 'Friend recommendation'
};

const postData = JSON.stringify(testData);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/customer-waitlist',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('📝 Submitting test form data...');
console.log('Data:', testData);

const req = http.request(options, (res) => {
  console.log(`\n📈 Response Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('\n✅ Response:', response);
      
      if (response.success) {
        console.log('\n🎉 SUCCESS! Form submission working correctly');
        console.log(`🎫 Waitlist number: ${response.waitlistNumber}`);
        console.log(`💌 Message: ${response.message}`);
        
        if (response.note) {
          console.log(`📝 Note: ${response.note}`);
        }
      } else {
        console.log('\n❌ Form submission failed');
      }
    } catch (error) {
      console.error('\n❌ Failed to parse response:', data);
    }
    
    console.log('\n======================================');
    console.log('🏁 Test completed');
  });
});

req.on('error', (error) => {
  console.error('\n❌ Request Error:', error.message);
  console.log('\n🔧 Make sure the server is running on port 3000');
});

req.write(postData);
req.end();