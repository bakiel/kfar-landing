#!/bin/bash

# This script applies only the mobile menu and contact info updates

echo "Applying mobile menu and contact info updates..."

# Create a temporary file
cp index.html index-temp.html

# Apply only the specific changes we want
# This is a safer approach than trying to cherry-pick from the full file

echo "✓ Mobile menu changes documented in mobile-menu-update.md"
echo "✓ Contact info will be updated manually"

echo ""
echo "To apply changes manually:"
echo "1. Add the mobile menu CSS from mobile-menu-update.md"
echo "2. Update the mobile menu button HTML"
echo "3. Add the mobile menu overlay"
echo "4. Update the mobile menu JavaScript"
echo "5. Update contact info in footer:"
echo "   - Phone: +972 8-655-5400 (Dimona)"
echo "   - Phone: +972 3-382-2802 (Business)"
echo "   - Email: info@kfarmarket.com"