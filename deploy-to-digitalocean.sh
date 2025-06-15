#!/bin/bash

# KFAR Marketplace Coming Soon - DigitalOcean Deployment Script
# This script will deploy the coming soon page with SendGrid integration

echo "🚀 KFAR Marketplace Coming Soon - Deployment Script"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "server.js" ] || [ ! -f "package.json" ]; then
    echo "❌ Error: Must run from deploy-coming-soon-1 directory"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found"
    echo "Create .env file with:"
    echo "  SENDGRID_API_KEY=your-key"
    echo "  ADMIN_TOKEN=your-admin-token"
    exit 1
fi

# Load environment variables
source .env

echo "✅ Environment variables loaded"

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: KFAR Coming Soon with SendGrid"
fi

echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Create GitHub repository:"
echo "   - Go to: https://github.com/new"
echo "   - Name: kfar-landing"
echo "   - Make it public"
echo ""
echo "2. Push to GitHub:"
echo "   git remote add origin https://github.com/bakiel/kfar-landing.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to DigitalOcean:"
echo "   - Go to: https://cloud.digitalocean.com/apps"
echo "   - Click 'Create App'"
echo "   - Choose GitHub as source"
echo "   - Select your repository"
echo "   - Use the app.yaml configuration"
echo ""
echo "4. Configure Environment Variables in DigitalOcean:"
echo "   - SENDGRID_API_KEY = (copy from .env)"
echo "   - ADMIN_TOKEN = (copy from .env)"
echo ""
echo "5. Access admin dashboard:"
echo "   https://kfarmarket.com/api/admin/submissions"
echo "   Use header: Authorization: Bearer YOUR_ADMIN_TOKEN"
echo ""
echo "✨ The server will:"
echo "   - Save all form submissions to JSON files"
echo "   - Send confirmation emails via SendGrid"
echo "   - Store data even if SendGrid fails"
echo "   - Provide admin access to all submissions"

# Make script executable
chmod +x deploy-to-digitalocean.sh