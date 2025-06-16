#!/usr/bin/env node

// Test script for KFAR Shop email system
// Run with: node test-email-system.js

async function testEmailSystem() {
  const baseUrl = 'https://kfarmarket.com';
  
  console.log('🧪 Testing KFAR Shop Email System\n');
  
  // Test 1: Health Check
  console.log('1️⃣ Testing API Health...');
  try {
    const healthResponse = await fetch(`${baseUrl}/api/health`);
    const health = await healthResponse.json();
    console.log('✅ API Status:', health.status);
    console.log('✅ SendGrid:', health.sendgrid);
    console.log('');
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
    console.log('');
  }
  
  // Test 2: Customer Waitlist
  console.log('2️⃣ Testing Customer Waitlist Signup...');
  const testCustomer = {
    name: 'Test Customer',
    email: 'bakielisrael@gmail.com', // Using admin email for testing
    whatsapp: '+972 3-382-2802'
  };
  
  try {
    const customerResponse = await fetch(`${baseUrl}/api/customer-waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testCustomer)
    });
    
    const customerResult = await customerResponse.json();
    if (customerResult.success) {
      console.log('✅ Customer signup successful!');
      console.log('📧 Check email for beautiful welcome message');
    } else {
      console.log('❌ Customer signup failed:', customerResult.message);
    }
    console.log('');
  } catch (error) {
    console.log('❌ Customer signup error:', error.message);
    console.log('');
  }
  
  // Test 3: Vendor Application
  console.log('3️⃣ Testing Vendor Application...');
  const testVendor = {
    firstName: 'Test',
    lastName: 'Vendor',
    businessName: 'Test Organic Farm',
    email: 'bakielisrael@gmail.com', // Using admin email for testing
    phone: '+972 8-655-5400',
    location: 'Dimona',
    businessType: 'Organic Produce',
    message: 'Testing the beautiful new email templates!'
  };
  
  try {
    const vendorResponse = await fetch(`${baseUrl}/api/vendor-signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testVendor)
    });
    
    const vendorResult = await vendorResponse.json();
    if (vendorResult.success) {
      console.log('✅ Vendor application successful!');
      console.log('📧 Check email for vendor onboarding guide');
    } else {
      console.log('❌ Vendor application failed:', vendorResult.message);
    }
    console.log('');
  } catch (error) {
    console.log('❌ Vendor application error:', error.message);
    console.log('');
  }
  
  // Test 4: Admin Access
  console.log('4️⃣ Testing Admin Access...');
  try {
    const adminResponse = await fetch(`${baseUrl}/api/admin/submissions`, {
      headers: {
        'Authorization': 'Bearer my-secure-kfar-admin-key-2025_shalom'
      }
    });
    
    if (adminResponse.ok) {
      const adminData = await adminResponse.json();
      console.log('✅ Admin access successful!');
      console.log(`📊 Total submissions: ${adminData.total}`);
      console.log(`👤 Customers: ${adminData.customers}`);
      console.log(`🏪 Vendors: ${adminData.vendors}`);
    } else {
      console.log('❌ Admin access failed:', adminResponse.status);
    }
    console.log('');
  } catch (error) {
    console.log('❌ Admin access error:', error.message);
    console.log('');
  }
  
  console.log('🎉 Email system test complete!');
  console.log('\n📌 Important Notes:');
  console.log('- All test emails are sent to bakielisrael@gmail.com');
  console.log('- Check your inbox for 4 emails (2 customer, 2 vendor)');
  console.log('- The emails should have beautiful HTML formatting');
  console.log('- If emails are in spam, mark as "Not Spam"');
  console.log('- To test with different emails, update the test data above');
}

// Run the test
testEmailSystem().catch(console.error);