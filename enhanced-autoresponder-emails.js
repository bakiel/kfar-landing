// Enhanced autoresponder email templates for KFAR Shop

// Customer Welcome Email Template
const customerWelcomeEmail = (name) => ({
  subject: '🌿 Welcome to KFAR Shop - You\'re Part of Something Special!',
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f8f9fa;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #478c0b 0%, #5ea410 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .tagline {
      font-size: 16px;
      opacity: 0.9;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 24px;
      color: #478c0b;
      margin-bottom: 20px;
    }
    .benefits {
      background: #f0f8e8;
      border-radius: 10px;
      padding: 30px;
      margin: 30px 0;
    }
    .benefit-item {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    .benefit-icon {
      font-size: 24px;
      margin-right: 15px;
    }
    .cta {
      background: #478c0b;
      color: white;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 50px;
      display: inline-block;
      margin: 20px 0;
      font-weight: bold;
    }
    .countdown-box {
      background: #fff3cd;
      border: 2px solid #f6af0d;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      margin: 30px 0;
    }
    .social-links {
      text-align: center;
      padding: 30px;
      background: #f8f9fa;
    }
    .social-links a {
      display: inline-block;
      margin: 0 10px;
      color: #478c0b;
      text-decoration: none;
    }
    .footer {
      background: #2c3e50;
      color: white;
      padding: 30px;
      text-align: center;
      font-size: 14px;
    }
    .footer a {
      color: #5ea410;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🌿 KFAR Shop</div>
      <div class="tagline">The Whole Village, In Your Hand</div>
    </div>
    
    <div class="content">
      <h1 class="greeting">Shalom ${name}! 🎉</h1>
      
      <p>Welcome to the KFAR Shop family! You're now part of an exclusive group of early supporters who believe in our vision of bringing the Village of Peace to the digital world.</p>
      
      <div class="benefits">
        <h2 style="color: #478c0b; margin-top: 0;">🎁 Your Founding Member Benefits:</h2>
        
        <div class="benefit-item">
          <span class="benefit-icon">🎯</span>
          <div>
            <strong>Early Access</strong><br>
            Be first to shop when we launch
          </div>
        </div>
        
        <div class="benefit-item">
          <span class="benefit-icon">💰</span>
          <div>
            <strong>20% Lifetime Discount</strong><br>
            Exclusive savings on every order, forever
          </div>
        </div>
        
        <div class="benefit-item">
          <span class="benefit-icon">📱</span>
          <div>
            <strong>Priority WhatsApp Support</strong><br>
            Direct line to our customer care team
          </div>
        </div>
        
        <div class="benefit-item">
          <span class="benefit-icon">🎁</span>
          <div>
            <strong>Special Launch Surprises</strong><br>
            Exclusive gifts for our founding members
          </div>
        </div>
      </div>
      
      <div class="countdown-box">
        <h3 style="margin-top: 0;">⏰ We're Launching Soon!</h3>
        <p>You'll receive an exclusive notification 24 hours before we go live.</p>
        <p style="font-size: 18px; font-weight: bold; color: #f6af0d;">Get Ready for Something Amazing!</p>
      </div>
      
      <h3>What's Coming:</h3>
      <ul>
        <li>🥗 Fresh, organic produce from our gardens</li>
        <li>🍞 Artisanal vegan baked goods</li>
        <li>🧆 Authentic plant-based Israeli cuisine</li>
        <li>🎨 Handcrafted products from our community</li>
        <li>💚 100% vegan, 100% love</li>
      </ul>
      
      <center>
        <a href="https://kfarmarket.com" class="cta">Visit Coming Soon Page</a>
      </center>
      
      <p><strong>Stay Connected:</strong><br>
      Follow our journey as we prepare to launch. We'll share behind-the-scenes updates, vendor spotlights, and sneak peeks of what's coming.</p>
    </div>
    
    <div class="social-links">
      <p style="margin-bottom: 15px;"><strong>Connect With Us</strong></p>
      <a href="#">📘 Facebook</a>
      <a href="#">📷 Instagram</a>
      <a href="#">📱 WhatsApp</a>
    </div>
    
    <div class="footer">
      <p>📍 Dimona, Israel | 📞 +972 8-655-5400 | 📧 info@kfarmarket.com</p>
      <p style="margin-top: 20px;">© 2025 KFAR Shop - Village of Peace Digital Commerce</p>
      <p style="margin-top: 10px; font-size: 12px;">
        You're receiving this because you joined our waitlist at kfarmarket.com<br>
        <a href="#">Unsubscribe</a> | <a href="#">Update Preferences</a>
      </p>
    </div>
  </div>
</body>
</html>
  `
});

// Vendor Welcome Email Template
const vendorWelcomeEmail = (firstName, businessName) => ({
  subject: `🌟 ${businessName} - Welcome to KFAR Shop Vendor Family!`,
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f8f9fa;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #f6af0d 0%, #ffc107 100%);
      color: #333;
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .tagline {
      font-size: 16px;
      opacity: 0.8;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 24px;
      color: #f6af0d;
      margin-bottom: 20px;
    }
    .timeline {
      background: #fef9ef;
      border-left: 4px solid #f6af0d;
      padding: 20px;
      margin: 30px 0;
    }
    .timeline-item {
      margin-bottom: 20px;
      padding-left: 20px;
      position: relative;
    }
    .timeline-item::before {
      content: '●';
      position: absolute;
      left: -7px;
      color: #f6af0d;
      font-size: 20px;
    }
    .checklist {
      background: #f0f8e8;
      border-radius: 10px;
      padding: 30px;
      margin: 30px 0;
    }
    .checklist-item {
      margin-bottom: 10px;
      padding-left: 25px;
      position: relative;
    }
    .checklist-item::before {
      content: '☐';
      position: absolute;
      left: 0;
      font-size: 18px;
    }
    .cta {
      background: #f6af0d;
      color: #333;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 50px;
      display: inline-block;
      margin: 20px 0;
      font-weight: bold;
    }
    .vendor-benefits {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 30px 0;
    }
    .benefit-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
    }
    .benefit-icon {
      font-size: 36px;
      margin-bottom: 10px;
    }
    .footer {
      background: #2c3e50;
      color: white;
      padding: 30px;
      text-align: center;
      font-size: 14px;
    }
    .footer a {
      color: #f6af0d;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🏪 KFAR Shop Vendors</div>
      <div class="tagline">Building Community Commerce Together</div>
    </div>
    
    <div class="content">
      <h1 class="greeting">Welcome ${firstName}! 🎊</h1>
      
      <p>Congratulations on taking the first step to join KFAR Shop as a vendor! We're thrilled to have <strong>${businessName}</strong> as part of our growing community marketplace.</p>
      
      <div class="timeline">
        <h3 style="margin-top: 0; color: #f6af0d;">📅 Your Onboarding Timeline</h3>
        
        <div class="timeline-item">
          <strong>Next 24-48 hours</strong><br>
          Our vendor team will review your application
        </div>
        
        <div class="timeline-item">
          <strong>Within 3 days</strong><br>
          You'll receive onboarding materials and vendor guidelines
        </div>
        
        <div class="timeline-item">
          <strong>Week 1</strong><br>
          Setup call with our vendor success team
        </div>
        
        <div class="timeline-item">
          <strong>Week 2</strong><br>
          Product listing and store setup
        </div>
      </div>
      
      <div class="checklist">
        <h3 style="margin-top: 0; color: #478c0b;">✅ Start Preparing Now:</h3>
        
        <div class="checklist-item">Product photos (high quality, well-lit)</div>
        <div class="checklist-item">Product descriptions and ingredients</div>
        <div class="checklist-item">Pricing information</div>
        <div class="checklist-item">Business hours and delivery preferences</div>
        <div class="checklist-item">Bank account details for payments</div>
        <div class="checklist-item">Any certifications (organic, kosher, etc.)</div>
      </div>
      
      <h3>Why KFAR Shop is Different:</h3>
      
      <div class="vendor-benefits">
        <div class="benefit-card">
          <div class="benefit-icon">💰</div>
          <strong>85% Revenue Share</strong><br>
          Industry-leading vendor split
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon">🚚</div>
          <strong>Shared Delivery</strong><br>
          Cost-effective logistics
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon">📱</div>
          <strong>Tech Support</strong><br>
          We handle the digital complexity
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon">🌟</div>
          <strong>Community First</strong><br>
          Built by vendors, for vendors
        </div>
      </div>
      
      <p><strong>Important:</strong> We'll contact you via WhatsApp at the number you provided for quick questions and updates. Please ensure your WhatsApp is active.</p>
      
      <center>
        <a href="https://kfarmarket.com" class="cta">Visit KFAR Shop</a>
      </center>
      
      <p style="background: #e8f5e9; padding: 20px; border-radius: 10px; margin-top: 30px;">
        <strong>🌿 Our Commitment:</strong><br>
        KFAR Shop is 100% vegan, reflecting the values of the Village of Peace. All products must be plant-based and align with our community standards.
      </p>
    </div>
    
    <div class="footer">
      <p><strong>Vendor Support Team</strong><br>
      📞 +972 8-655-5400 | 📱 WhatsApp: +972 3-382-2802<br>
      📧 vendors@kfarmarket.com</p>
      
      <p style="margin-top: 20px;">© 2025 KFAR Shop - Village of Peace Digital Commerce</p>
      <p style="margin-top: 10px; font-size: 12px;">
        You're receiving this because you applied to become a vendor at kfarmarket.com<br>
        <a href="#">Unsubscribe</a> | <a href="#">Update Preferences</a>
      </p>
    </div>
  </div>
</body>
</html>
  `
});

// Admin notification email template
const adminNotificationEmail = (type, data) => {
  const isVendor = type === 'vendor';
  const emoji = isVendor ? '🏪' : '👤';
  const title = isVendor ? 'New Vendor Application' : 'New Customer Signup';
  
  return {
    subject: `${emoji} ${title} - ${isVendor ? data.businessName : data.name}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      border-bottom: 3px solid #478c0b;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    h1 {
      color: #478c0b;
      margin: 0;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .data-table td {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .data-table td:first-child {
      font-weight: bold;
      width: 30%;
      color: #666;
    }
    .timestamp {
      background: #f8f9fa;
      padding: 10px;
      border-radius: 5px;
      margin: 20px 0;
      text-align: center;
    }
    .actions {
      background: #e8f5e9;
      padding: 20px;
      border-radius: 5px;
      margin-top: 30px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      margin: 5px;
      background: #478c0b;
      color: white;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${emoji} ${title}</h1>
    </div>
    
    <table class="data-table">
      ${isVendor ? `
        <tr>
          <td>Business Name:</td>
          <td>${data.businessName}</td>
        </tr>
        <tr>
          <td>Contact Name:</td>
          <td>${data.firstName} ${data.lastName}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
          <td>Phone:</td>
          <td><a href="tel:${data.phone}">${data.phone}</a></td>
        </tr>
        <tr>
          <td>Location:</td>
          <td>${data.location}</td>
        </tr>
        <tr>
          <td>Business Type:</td>
          <td>${data.businessType}</td>
        </tr>
        ${data.message ? `
        <tr>
          <td>Message:</td>
          <td>${data.message}</td>
        </tr>
        ` : ''}
      ` : `
        <tr>
          <td>Name:</td>
          <td>${data.name}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
          <td>WhatsApp:</td>
          <td>${data.whatsapp || 'Not provided'}</td>
        </tr>
      `}
    </table>
    
    <div class="timestamp">
      Submitted: ${new Date().toLocaleString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
    </div>
    
    <div class="actions">
      <h3 style="margin-top: 0;">Quick Actions:</h3>
      ${isVendor ? `
        <p>✅ Review application and prepare onboarding materials<br>
        ✅ Schedule welcome call within 48 hours<br>
        ✅ Add to vendor CRM system</p>
        
        <a href="https://kfarmarket.com/api/admin/submissions" class="button">View All Applications</a>
        <a href="mailto:${data.email}" class="button">Reply to Vendor</a>
      ` : `
        <p>✅ Customer automatically added to marketing list<br>
        ✅ Welcome email sent<br>
        ✅ Will receive launch notification</p>
        
        <a href="https://kfarmarket.com/api/admin/submissions" class="button">View All Signups</a>
      `}
    </div>
  </div>
</body>
</html>
    `
  };
};

module.exports = {
  customerWelcomeEmail,
  vendorWelcomeEmail,
  adminNotificationEmail
};