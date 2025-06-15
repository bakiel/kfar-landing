const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const fs = require('fs').promises;
const app = express();

const PORT = process.env.PORT || 8080;

// Data storage directory
const DATA_DIR = path.join(__dirname, 'form-data');

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    console.log('Created form-data directory');
  }
}

// Save form data to JSON file
async function saveFormData(type, data) {
  const timestamp = new Date().toISOString();
  const filename = `${type}-${Date.now()}.json`;
  const filepath = path.join(DATA_DIR, filename);
  
  const record = {
    type,
    timestamp,
    ...data
  };
  
  await fs.writeFile(filepath, JSON.stringify(record, null, 2));
  console.log(`Saved ${type} data to ${filename}`);
  return record;
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// CORS headers for API endpoints
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});

// Vendor signup endpoint
app.post('/api/vendor-signup', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      businessName,
      email,
      phone,
      location,
      businessType,
      message
    } = req.body;

    // Save to JSON file
    await saveFormData('vendor', req.body);

    // Prepare email to KFAR team
    const adminMsg = {
      to: process.env.NOTIFICATION_EMAIL || 'bakielisrael@gmail.com',
      from: {
        email: process.env.FROM_EMAIL || 'noreply@em6192.kfarmarket.com',
        name: 'KFAR Marketplace'
      },
      subject: `New Vendor Application: ${businessName}`,
      html: `
        <h2>New Vendor Application Received</h2>
        <h3>Vendor Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${firstName} ${lastName}</li>
          <li><strong>Business Name:</strong> ${businessName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Location:</strong> ${location}</li>
          <li><strong>Business Type:</strong> ${businessType}</li>
          <li><strong>Message:</strong> ${message || 'N/A'}</li>
        </ul>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    // Prepare confirmation email to vendor
    const vendorMsg = {
      to: email,
      from: {
        email: process.env.FROM_EMAIL || 'noreply@em6192.kfarmarket.com',
        name: 'KFAR Marketplace'
      },
      subject: 'Welcome to KFAR Marketplace - Application Received',
      html: `
        <h2>Shalom ${firstName}!</h2>
        <p>Thank you for your interest in joining KFAR Marketplace as a vendor.</p>
        <p>We've received your application for <strong>${businessName}</strong> and our team will review it shortly.</p>
        <h3>What happens next?</h3>
        <ul>
          <li>Our vendor team will review your application within 24-48 hours</li>
          <li>You'll receive an email with next steps and onboarding information</li>
          <li>We may contact you via WhatsApp at ${phone} for quick questions</li>
        </ul>
        <p>In the meantime, start preparing:</p>
        <ul>
          <li>Product photos and descriptions</li>
          <li>Pricing information</li>
          <li>Business hours and delivery preferences</li>
        </ul>
        <p>Welcome to the Village of Peace digital marketplace!</p>
        <p>Best regards,<br>The KFAR Marketplace Team</p>
      `
    };

    // Send emails
    await sgMail.send(adminMsg);
    await sgMail.send(vendorMsg);

    res.json({ success: true, message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Vendor signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit application. Please try again.' 
    });
  }
});

// Customer waitlist endpoint
app.post('/api/customer-waitlist', async (req, res) => {
  try {
    const { name, email, whatsapp } = req.body;

    // Save to JSON file
    await saveFormData('customer', req.body);

    // Prepare email to KFAR team
    const adminMsg = {
      to: process.env.NOTIFICATION_EMAIL || 'bakielisrael@gmail.com',
      from: {
        email: process.env.FROM_EMAIL || 'noreply@em6192.kfarmarket.com',
        name: 'KFAR Marketplace'
      },
      subject: `New Customer Waitlist: ${name}`,
      html: `
        <h2>New Customer Added to Waitlist</h2>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>WhatsApp:</strong> ${whatsapp || 'Not provided'}</li>
          <li><strong>Submitted:</strong> ${new Date().toLocaleString()}</li>
        </ul>
      `
    };

    // Prepare confirmation email to customer
    const customerMsg = {
      to: email,
      from: {
        email: process.env.FROM_EMAIL || 'noreply@em6192.kfarmarket.com',
        name: 'KFAR Marketplace'
      },
      subject: 'Welcome to KFAR Marketplace - You\'re on the List!',
      html: `
        <h2>Shalom ${name}!</h2>
        <p>You're officially on the KFAR Marketplace waitlist!</p>
        <p>As a founding member, you'll receive:</p>
        <ul>
          <li>🎯 Early access when we launch</li>
          <li>💰 20% lifetime discount on all orders</li>
          <li>🎁 Exclusive founding member benefits</li>
          <li>📱 Priority WhatsApp support</li>
        </ul>
        <p>We're launching soon and you'll be the first to know!</p>
        <p>Follow our journey and get sneak peeks of what's coming.</p>
        <p>Thank you for believing in the Village of Peace vision.</p>
        <p>With gratitude,<br>The KFAR Marketplace Team</p>
      `
    };

    // Send emails
    await sgMail.send(adminMsg);
    await sgMail.send(customerMsg);

    res.json({ success: true, message: 'Successfully joined waitlist!' });
  } catch (error) {
    console.error('Customer waitlist error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to join waitlist. Please try again.' 
    });
  }
});

// Admin endpoint to get all submissions (protected)
app.get('/api/admin/submissions', async (req, res) => {
  try {
    // Check admin token
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Read all JSON files from data directory
    const files = await fs.readdir(DATA_DIR);
    const submissions = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        const data = await fs.readFile(path.join(DATA_DIR, file), 'utf-8');
        submissions.push(JSON.parse(data));
      }
    }

    // Sort by timestamp (newest first)
    submissions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json({
      total: submissions.length,
      vendors: submissions.filter(s => s.type === 'vendor').length,
      customers: submissions.filter(s => s.type === 'customer').length,
      submissions
    });
  } catch (error) {
    console.error('Error reading submissions:', error);
    res.status(500).json({ error: 'Failed to read submissions' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    sendgrid: process.env.SENDGRID_API_KEY ? 'configured' : 'not configured',
    dataDir: DATA_DIR
  });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Initialize and start server
async function startServer() {
  await ensureDataDir();
  
  app.listen(PORT, () => {
    console.log(`KFAR Coming Soon page is running on port ${PORT}`);
    console.log(`SendGrid status: ${process.env.SENDGRID_API_KEY ? 'Configured' : 'Not configured - forms will not work!'}`);
    console.log(`Data directory: ${DATA_DIR}`);
  });
}

startServer();
