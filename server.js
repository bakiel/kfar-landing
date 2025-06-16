const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const fs = require('fs').promises;
const { customerWelcomeEmail, vendorWelcomeEmail, adminNotificationEmail } = require('./enhanced-autoresponder-emails');
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

    // Prepare emails using enhanced templates
    const adminEmail = adminNotificationEmail('vendor', req.body);
    const adminMsg = {
      to: process.env.NOTIFICATION_EMAIL || 'bakielisrael@gmail.com',
      from: {
        email: process.env.FROM_EMAIL || 'noreply@em6192.kfarmarket.com',
        name: 'KFAR Shop'
      },
      ...adminEmail
    };

    const vendorEmail = vendorWelcomeEmail(firstName, businessName);
    const vendorMsg = {
      to: email,
      from: {
        email: process.env.FROM_EMAIL || 'noreply@em6192.kfarmarket.com',
        name: 'KFAR Shop'
      },
      ...vendorEmail
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

    // Prepare emails using enhanced templates
    const adminEmail = adminNotificationEmail('customer', req.body);
    const adminMsg = {
      to: process.env.NOTIFICATION_EMAIL || 'bakielisrael@gmail.com',
      from: {
        email: process.env.FROM_EMAIL || 'noreply@em6192.kfarmarket.com',
        name: 'KFAR Shop'
      },
      ...adminEmail
    };

    const customerEmail = customerWelcomeEmail(name);
    const customerMsg = {
      to: email,
      from: {
        email: process.env.FROM_EMAIL || 'noreply@em6192.kfarmarket.com',
        name: 'KFAR Shop'
      },
      ...customerEmail
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
