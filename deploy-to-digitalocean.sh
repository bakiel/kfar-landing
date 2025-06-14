#!/bin/bash

echo "🚀 Deploying KFAR Landing Page to DigitalOcean..."
echo "=============================================="

# Check if doctl is installed
if ! command -v doctl &> /dev/null; then
    echo "❌ doctl CLI not found. Installing..."
    brew install doctl
fi

# Authenticate if needed
echo "📡 Checking DigitalOcean authentication..."
doctl auth list &> /dev/null || doctl auth init

# Get the app ID if it exists
echo "🔍 Looking for existing KFAR app..."
APP_ID=$(doctl apps list --format ID,Spec.Name --no-header | grep "kfar-marketplace" | awk '{print $1}')

if [ -z "$APP_ID" ]; then
    echo "📦 Creating new DigitalOcean app..."
    doctl apps create --spec app.yaml --wait
else
    echo "🔄 Updating existing app (ID: $APP_ID)..."
    doctl apps update $APP_ID --spec app.yaml --wait
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📱 Your app should be available at:"
echo "   - Temporary URL: Check DigitalOcean dashboard"
echo "   - Domain: https://kfarmarket.com"
echo ""
echo "To get the temporary URL, run:"
echo "doctl apps list --format DefaultIngress"
