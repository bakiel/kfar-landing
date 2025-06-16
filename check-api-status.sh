#!/bin/bash

echo "🔍 KFAR Coming Soon - API Status Check"
echo "======================================"
echo ""

# Check if server is running locally
echo "1. Checking local server..."
if curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
    echo "✅ Local server is running on port 8080"
    HEALTH=$(curl -s http://localhost:8080/api/health)
    echo "   Health check: $HEALTH"
else
    echo "❌ Local server is not running"
    echo "   Run: npm start"
fi

echo ""
echo "2. Checking production site..."
if curl -s https://kfarmarket.com/api/health > /dev/null 2>&1; then
    echo "✅ Production site is accessible"
    PROD_HEALTH=$(curl -s https://kfarmarket.com/api/health)
    echo "   Health check: $PROD_HEALTH"
else
    echo "⚠️  Production site API not accessible"
    echo "   This might be normal if not deployed yet"
fi

echo ""
echo "3. Environment Variables Required:"
echo "   - SENDGRID_API_KEY: ${SENDGRID_API_KEY:+✅ Set}${SENDGRID_API_KEY:-❌ Not set}"
echo "   - FROM_EMAIL: ${FROM_EMAIL:-noreply@em6192.kfarmarket.com}"
echo "   - NOTIFICATION_EMAIL: ${NOTIFICATION_EMAIL:-bakielisrael@gmail.com}"
echo "   - ADMIN_TOKEN: ${ADMIN_TOKEN:+✅ Set}${ADMIN_TOKEN:-❌ Not set}"

echo ""
echo "4. DigitalOcean Deployment Commands:"
echo "   Deploy: doctl apps create-deployment <app-id>"
echo "   Logs: doctl apps logs <app-id>"
echo "   List apps: doctl apps list"

echo ""
echo "5. Test Form Submissions:"
echo "   Customer: curl -X POST http://localhost:8080/api/customer-waitlist \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"name\":\"Test User\",\"email\":\"test@example.com\"}'"
echo ""
echo "   Vendor: curl -X POST http://localhost:8080/api/vendor-signup \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"firstName\":\"Test\",\"lastName\":\"Vendor\",\"businessName\":\"Test Shop\",\"email\":\"vendor@example.com\",\"phone\":\"+972-123456789\",\"location\":\"Dimona\",\"businessType\":\"Food\"}'"

echo ""
echo "Done! 🎉"