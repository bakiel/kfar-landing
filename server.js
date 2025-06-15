const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080; // DigitalOcean default

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data storage directory - simple JSON files
const DATA_DIR = path.join(__dirname, 'signup-data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log('📁 Created data directory');
}

// Initialize SendGrid if available
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('✅ SendGrid configured');
} else {
    console.warn('⚠️  SENDGRID_API_KEY not found - emails will not be sent');
}

// Helper function to save form data
function saveFormData(type, data) {
    const timestamp = new Date().toISOString();
    const filename = `${type}-${Date.now()}.json`;
    const filepath = path.join(DATA_DIR, filename);
    
    const record = {
        id: Date.now(),
        type: type,
        timestamp: timestamp,
        data: data
    };
    
    // Save individual record
    fs.writeFileSync(filepath, JSON.stringify(record, null, 2));
    
    // Also append to master list
    const masterFile = path.join(DATA_DIR, 'all-signups.json');
    let allSignups = [];
    
    if (fs.existsSync(masterFile)) {
        try {
            allSignups = JSON.parse(fs.readFileSync(masterFile, 'utf8'));
        } catch (e) {
            allSignups = [];
        }
    }
    
    allSignups.push(record);
    fs.writeFileSync(masterFile, JSON.stringify(allSignups, null, 2));
    
    console.log(`✅ Saved ${type} signup:`, data.email);
    return record;
}

// Email template for admin notifications
const createAdminNotificationEmail = (formData, type = 'Customer') => {
    return {
        to: process.env.NOTIFICATION_EMAIL || 'bakielisrael@gmail.com',
        from: process.env.FROM_EMAIL || 'noreply@kfarmarket.com',
        subject: `🎉 New KFAR ${type} Signup!`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #478c0b, #f6af0d); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 24px;">🎉 New ${type} Signup!</h1>
            </div>
            
            <div style="background: #fff; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 10px 10px;">
                <h2 style="color: #478c0b; margin-top: 0;">Details:</h2>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>📧 Email:</strong> ${formData.email}</p>
                    ${formData.firstName ? `<p><strong>👤 Name:</strong> ${formData.firstName} ${formData.lastName || ''}</p>` : ''}
                    ${formData.phone ? `<p><strong>📱 Phone:</strong> ${formData.phone}</p>` : ''}
                    ${formData.location ? `<p><strong>📍 Location:</strong> ${formData.location}</p>` : ''}
                    ${formData.businessName ? `<p><strong>🏪 Business:</strong> ${formData.businessName}</p>` : ''}
                    ${formData.products ? `<p><strong>📦 Products:</strong> ${formData.products}</p>` : ''}
                    ${formData.preferences ? `<p><strong>💚 Preferences:</strong> ${formData.preferences}</p>` : ''}
                    ${formData.referralSource ? `<p><strong>📈 Source:</strong> ${formData.referralSource}</p>` : ''}
                </div>
                
                <p style="margin: 20px 0;">Time: ${new Date().toLocaleString()}</p>
                
                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://kfarmarket.com" style="background: #478c0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View KFAR Shop</a>
                </div>
            </div>
        </div>
        `
    };
};

// Email template for customer welcome
const createWelcomeEmail = (email, name) => {
    const firstName = name || email.split('@')[0];
    
    return {
        to: email,
        from: process.env.FROM_EMAIL || 'noreply@kfarmarket.com',
        subject: '🌱 Welcome to KFAR Shop - Your 20% discount is waiting!',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #478c0b, #f6af0d); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🌱 Welcome to KFAR Shop!</h1>
                <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Where 50 years of village excellence meets modern commerce</p>
            </div>
            
            <div style="background: #fff; padding: 40px; border: 1px solid #ddd; border-radius: 0 0 10px 10px;">
                <h2 style="color: #478c0b; margin-top: 0;">Hi ${firstName}! 👋</h2>
                
                <p>Thank you for joining the KFAR Shop waitlist! You're now part of our exclusive community that celebrates 50 years of Village of Peace excellence.</p>
                
                <div style="background: linear-gradient(135deg, #cfe7c1, #fef9ef); padding: 25px; border-radius: 10px; text-align: center; margin: 30px 0;">
                    <h3 style="color: #478c0b; margin: 0 0 15px 0;">🎁 Your Early Bird Perks:</h3>
                    <div style="background: #478c0b; color: white; padding: 15px; border-radius: 8px; font-size: 20px; font-weight: bold; margin: 15px 0;">
                        20% OFF EVERYTHING
                    </div>
                    <p style="margin: 10px 0 0 0; color: #666;">Use code: <strong>KFAR20</strong> at launch</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="color: #478c0b; margin-top: 0;">What makes KFAR special:</h4>
                    <ul style="color: #555; line-height: 1.6;">
                        <li>🌱 100% plant-based community marketplace</li>
                        <li>🏛️ 50+ years of Village of Peace heritage</li>
                        <li>🌍 Authentic African Hebrew Israelite products</li>
                        <li>🥗 Fresh, organic, locally-sourced goods</li>
                        <li>🤝 Support our vibrant Dimona community</li>
                    </ul>
                </div>
                
                <p><strong>You'll be the first to know when we launch!</strong> We'll send you exclusive updates, behind-the-scenes content, and early access to our grand opening.</p>
                
                <div style="text-align: center; margin: 40px 0;">
                    <a href="https://kfarmarket.com" style="background: #478c0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Visit Our Coming Soon Page</a>
                </div>
                
                <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
                    <p>KFAR Shop - Village of Peace Community Marketplace<br>
                    Dimona, Israel | Since 1967</p>
                    <p style="margin-top: 10px;">
                        <a href="mailto:hello@kfarmarket.com" style="color: #478c0b;">hello@kfarmarket.com</a>
                    </p>
                </div>
            </div>
        </div>
        `
    };
};

// Vendor welcome email template
const createVendorWelcomeEmail = (vendorData) => {
    return {
        to: vendorData.email,
        from: process.env.FROM_EMAIL || 'noreply@kfarmarket.com',
        subject: '🎉 Welcome to KFAR Shop - Your Vendor Application Received!',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #478c0b, #f6af0d); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🏪 Welcome ${vendorData.businessName}!</h1>
                <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Your KFAR vendor journey begins now</p>
            </div>
            
            <div style="background: #fff; padding: 40px; border: 1px solid #ddd; border-radius: 0 0 10px 10px;">
                <h2 style="color: #478c0b; margin-top: 0;">Hi ${vendorData.firstName}! 👋</h2>
                
                <p>Thank you for applying to become a vendor at KFAR Shop! We're excited to review your application.</p>
                
                <div style="background: #cfe7c1; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h3 style="color: #478c0b; margin-top: 0;">What happens next:</h3>
                    <ul style="color: #555; line-height: 1.8;">
                        <li>📞 We'll call you at <strong>${vendorData.phone}</strong> within 24 hours</li>
                        <li>📋 We'll discuss your product lineup and pricing</li>
                        <li>🎯 We'll set up your vendor profile</li>
                        <li>🚀 You'll be ready to sell when we launch!</li>
                    </ul>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="color: #478c0b; margin-top: 0;">Your application summary:</h4>
                    <p><strong>Business:</strong> ${vendorData.businessName}</p>
                    <p><strong>Products:</strong> ${vendorData.products || 'To be discussed'}</p>
                    <p><strong>Ready by:</strong> ${vendorData.readyDate || 'ASAP'}</p>
                </div>
                
                <p style="text-align: center; margin-top: 30px;">
                    <strong>Questions?</strong> Reply to this email or call us!
                </p>
            </div>
        </div>
        `
    };
};

// Main subscribe endpoint - handles all form types
app.post('/api/subscribe', async (req, res) => {
    try {
        const { email, firstName, lastName, phone, location, preferences, referralSource } = req.body;
        
        if (!email || !email.includes('@')) {
            return res.status(400).json({ 
                success: false, 
                message: 'Valid email is required' 
            });
        }

        console.log('📧 New form submission:', { email, firstName, lastName });

        const formData = { email, firstName, lastName, phone, location, preferences, referralSource };
        
        // Save data first - this always works
        const saved = saveFormData('subscribe', formData);
        
        // Send emails if SendGrid is configured
        let emailsSent = false;
        if (process.env.SENDGRID_API_KEY) {
            try {
                // Send admin notification
                await sgMail.send(createAdminNotificationEmail(formData));
                console.log('✅ Admin notification sent');

                // Send welcome email to customer
                await sgMail.send(createWelcomeEmail(email, firstName));
                console.log('✅ Welcome email sent to', email);
                emailsSent = true;

            } catch (emailError) {
                console.error('❌ Email error:', emailError.message);
            }
        }

        // Generate a waitlist number
        const waitlistNumber = Math.floor(Math.random() * 1000) + 100;

        res.json({
            success: true,
            message: emailsSent ? 'Welcome to KFAR! Check your email for exclusive perks.' : 'Thank you for subscribing!',
            waitlistNumber: waitlistNumber,
            id: saved.id
        });

    } catch (error) {
        console.error('❌ Server error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.'
        });
    }
});

// Customer waitlist endpoint
app.post('/api/customer-waitlist', async (req, res) => {
    try {
        const customerData = req.body;
        console.log('📧 New customer waitlist signup:', customerData);

        if (!customerData.email || !customerData.email.includes('@')) {
            return res.status(400).json({ 
                success: false, 
                message: 'Valid email is required' 
            });
        }

        // Save data
        const saved = saveFormData('customer', customerData);
        const waitlistNumber = saved.id % 1000;

        // Send emails if SendGrid is configured
        if (process.env.SENDGRID_API_KEY) {
            try {
                await sgMail.send(createAdminNotificationEmail(customerData, 'Customer'));
                await sgMail.send(createWelcomeEmail(customerData.email, customerData.firstName));
                console.log('✅ Customer emails sent');
            } catch (emailError) {
                console.error('❌ Email error:', emailError.message);
            }
        }

        res.json({
            success: true,
            message: 'Welcome to KFAR! Check your email for exclusive perks.',
            waitlistNumber: waitlistNumber
        });

    } catch (error) {
        console.error('❌ Server error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.'
        });
    }
});

// Vendor application endpoint
app.post('/api/send-vendor-email', async (req, res) => {
    try {
        const vendorData = req.body;
        console.log('📧 New vendor application:', vendorData);

        if (!vendorData.email || !vendorData.email.includes('@')) {
            return res.status(400).json({ 
                success: false, 
                message: 'Valid email is required' 
            });
        }

        // Save data
        const saved = saveFormData('vendor', vendorData);

        // Send emails if SendGrid is configured
        if (process.env.SENDGRID_API_KEY) {
            try {
                await sgMail.send(createAdminNotificationEmail(vendorData, 'Vendor'));
                await sgMail.send(createVendorWelcomeEmail(vendorData));
                console.log('✅ Vendor emails sent');
            } catch (emailError) {
                console.error('❌ Email error:', emailError.message);
            }
        }

        res.json({
            success: true,
            message: 'Vendor application received! We\'ll contact you within 24 hours.',
            id: saved.id
        });

    } catch (error) {
        console.error('❌ Server error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.'
        });
    }
});

// Admin endpoint to view all submissions
app.get('/api/admin/submissions', (req, res) => {
    const adminToken = req.headers.authorization;
    if (adminToken !== `Bearer ${process.env.ADMIN_TOKEN || 'kfar-admin-2025'}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const masterFile = path.join(DATA_DIR, 'all-signups.json');
    
    if (fs.existsSync(masterFile)) {
        const data = JSON.parse(fs.readFileSync(masterFile, 'utf8'));
        
        // Group by type
        const byType = {
            subscribe: data.filter(d => d.type === 'subscribe'),
            customer: data.filter(d => d.type === 'customer'),
            vendor: data.filter(d => d.type === 'vendor')
        };
        
        res.json({
            success: true,
            total: data.length,
            breakdown: {
                subscribers: byType.subscribe.length,
                customers: byType.customer.length,
                vendors: byType.vendor.length
            },
            submissions: data.reverse() // Most recent first
        });
    } else {
        res.json({
            success: true,
            total: 0,
            breakdown: { subscribers: 0, customers: 0, vendors: 0 },
            submissions: []
        });
    }
});

// Export endpoint for CSV download
app.get('/api/admin/export', (req, res) => {
    const adminToken = req.headers.authorization;
    if (adminToken !== `Bearer ${process.env.ADMIN_TOKEN || 'kfar-admin-2025'}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const masterFile = path.join(DATA_DIR, 'all-signups.json');
    
    if (!fs.existsSync(masterFile)) {
        return res.status(404).json({ error: 'No data to export' });
    }

    const data = JSON.parse(fs.readFileSync(masterFile, 'utf8'));
    
    // Create CSV
    const csvLines = ['Type,Email,First Name,Last Name,Phone,Business,Location,Products,Timestamp'];
    
    data.forEach(record => {
        const d = record.data;
        const line = [
            record.type,
            d.email || '',
            d.firstName || '',
            d.lastName || '',
            d.phone || '',
            d.businessName || '',
            d.location || '',
            d.products || '',
            record.timestamp
        ].map(field => `"${field}"`).join(',');
        
        csvLines.push(line);
    });
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="kfar-signups-${Date.now()}.csv"`);
    res.send(csvLines.join('\n'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    const masterFile = path.join(DATA_DIR, 'all-signups.json');
    let signupCount = 0;
    
    if (fs.existsSync(masterFile)) {
        try {
            const data = JSON.parse(fs.readFileSync(masterFile, 'utf8'));
            signupCount = data.length;
        } catch (e) {}
    }
    
    res.json({ 
        status: 'ok', 
        port: PORT,
        sendgrid: !!process.env.SENDGRID_API_KEY,
        dataStorage: 'JSON files',
        totalSignups: signupCount,
        time: new Date().toISOString()
    });
});

// Debug route to check files
app.get('/debug/files', (req, res) => {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
    res.json({
        dataDir: DATA_DIR,
        fileCount: files.length,
        files: files.slice(-10) // Last 10 files
    });
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve main page
app.get('/', (req, res) => {
    // Check if we have main.html
    const mainHtml = path.join(__dirname, 'main.html');
    if (fs.existsSync(mainHtml)) {
        res.sendFile(mainHtml);
    } else {
        // Serve embedded HTML
        res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KFAR Shop - Coming Soon | Village of Peace Marketplace</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* Custom gradient animation */
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .gradient-bg {
            background: linear-gradient(-45deg, #478c0b, #f6af0d, #c23c09, #3a3a1d);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        K
                    </div>
                    <span class="ml-3 text-xl font-bold">KFAR Shop</span>
                </div>
                <span class="text-sm text-gray-600">Since 1967</span>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="gradient-bg text-white py-20">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <h1 class="text-5xl md:text-6xl font-bold mb-6">
                Welcome to KFAR Shop
            </h1>
            <p class="text-xl mb-8 opacity-90">
                The Village of Peace Digital Marketplace
            </p>
            <div class="flex justify-center gap-4 mb-8">
                <div class="bg-white/20 backdrop-blur rounded-lg p-4">
                    <div class="text-3xl font-bold" id="days">15</div>
                    <div class="text-sm">Days</div>
                </div>
                <div class="bg-white/20 backdrop-blur rounded-lg p-4">
                    <div class="text-3xl font-bold" id="hours">10</div>
                    <div class="text-sm">Hours</div>
                </div>
                <div class="bg-white/20 backdrop-blur rounded-lg p-4">
                    <div class="text-3xl font-bold" id="minutes">30</div>
                    <div class="text-sm">Minutes</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-16">
        <!-- Form Section -->
        <div class="max-w-md mx-auto -mt-32 relative z-10">
            <div class="bg-white rounded-lg shadow-xl p-8">
                <h2 class="text-2xl font-bold mb-2 text-center">Get 20% Off at Launch!</h2>
                <p class="text-gray-600 text-center mb-6">Join our waitlist for exclusive deals</p>
                
                <form id="signupForm" class="space-y-4">
                    <input type="email" name="email" required
                           placeholder="Your email address"
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <input type="text" name="firstName"
                           placeholder="First name (optional)"
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <input type="text" name="lastName"
                           placeholder="Last name (optional)"
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <button type="submit" 
                            class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                        Join Waitlist
                    </button>
                </form>
                <p class="text-sm text-gray-500 mt-4 text-center">
                    No spam. Unsubscribe anytime.
                </p>
            </div>
        </div>

        <!-- Features -->
        <div class="grid md:grid-cols-3 gap-8 mt-20">
            <div class="text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-leaf text-green-600 text-2xl"></i>
                </div>
                <h3 class="font-semibold mb-2">100% Plant-Based</h3>
                <p class="text-gray-600">Authentic vegan products from our community</p>
            </div>
            <div class="text-center">
                <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-users text-yellow-600 text-2xl"></i>
                </div>
                <h3 class="font-semibold mb-2">50+ Years Heritage</h3>
                <p class="text-gray-600">Village of Peace excellence since 1967</p>
            </div>
            <div class="text-center">
                <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-truck text-orange-600 text-2xl"></i>
                </div>
                <h3 class="font-semibold mb-2">Fresh Delivery</h3>
                <p class="text-gray-600">From our farms to your table</p>
            </div>
        </div>

        <!-- Vendor CTA -->
        <div class="bg-gray-100 rounded-lg p-8 mt-16 text-center">
            <h3 class="text-2xl font-bold mb-4">Are you a vendor?</h3>
            <p class="text-gray-600 mb-6">Join our marketplace and reach thousands of customers</p>
            <button onclick="window.location.href='#vendor'" class="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                Apply to Sell
            </button>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8 mt-16">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <p>© 2025 KFAR Shop - Village of Peace Community Marketplace</p>
            <p class="mt-2 text-gray-400">Dimona, Israel | hello@kfarmarket.com</p>
        </div>
    </footer>

    <!-- Success Modal -->
    <div id="successModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-md mx-4">
            <div class="text-center">
                <i class="fas fa-check-circle text-green-600 text-5xl mb-4"></i>
                <h3 class="text-2xl font-bold mb-2">Success!</h3>
                <p class="text-gray-600 mb-4" id="successMessage">You're on the waitlist! Check your email for confirmation.</p>
                <button onclick="closeModal()" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                    Close
                </button>
            </div>
        </div>
    </div>

    <script>
        // Countdown timer
        function updateCountdown() {
            const launch = new Date('2025-02-15').getTime();
            const now = new Date().getTime();
            const diff = launch - now;
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            
            document.getElementById('days').textContent = days > 0 ? days : 0;
            document.getElementById('hours').textContent = hours > 0 ? hours : 0;
            document.getElementById('minutes').textContent = minutes > 0 ? minutes : 0;
        }
        
        setInterval(updateCountdown, 60000);
        updateCountdown();
        
        // Form submission
        document.getElementById('signupForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const button = e.target.querySelector('button[type="submit"]');
            button.disabled = true;
            button.textContent = 'Submitting...';
            
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            try {
                const response = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    document.getElementById('successMessage').textContent = result.message;
                    document.getElementById('successModal').style.display = 'flex';
                    e.target.reset();
                } else {
                    alert(result.message || 'Please try again');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Thanks for signing up! We\'ll be in touch.');
                e.target.reset();
            } finally {
                button.disabled = false;
                button.textContent = 'Join Waitlist';
            }
        });
        
        function closeModal() {
            document.getElementById('successModal').style.display = 'none';
        }
    </script>
</body>
</html>
        `);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`
🚀 KFAR Enhanced Server Running!
================================
Port: ${PORT}
URL: http://localhost:${PORT}
Data Storage: JSON files in /signup-data
SendGrid: ${process.env.SENDGRID_API_KEY ? '✅ Configured' : '❌ Not configured (but data still saved!)'}

Features:
✅ All form data saved to JSON files
✅ Email validation on all endpoints
✅ Beautiful HTML email templates
✅ Admin dashboard with CSV export
✅ Works even if SendGrid fails

Endpoints:
- POST /api/subscribe (general signups)
- POST /api/customer-waitlist
- POST /api/send-vendor-email
- GET /api/admin/submissions (needs auth)
- GET /api/admin/export (CSV download)
- GET /health (status check)

Admin access:
Header: Authorization: Bearer ${process.env.ADMIN_TOKEN || 'kfar-admin-2025'}
================================
    `);
});