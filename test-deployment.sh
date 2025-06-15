#!/bin/bash

echo "🧪 Testing KFAR Coming Soon Deployment"
echo "====================================="
echo ""

# Test health endpoint
echo "1️⃣ Testing server health..."
HEALTH=$(curl -s https://kfarmarket.com/api/health)

if [[ $HEALTH == *"sendgrid"* ]]; then
    echo "✅ Server is running!"
    echo "$HEALTH" | json_pp
else
    echo "❌ Server not running yet. Still showing static site."
    echo "   Please complete DigitalOcean deployment steps."
    exit 1
fi

echo ""
echo "2️⃣ Testing form submission..."
RESPONSE=$(curl -s -X POST https://kfarmarket.com/api/vendor-signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "Deployment",
    "businessName": "Test Business",
    "email": "test@example.com",
    "phone": "+1234567890",
    "location": "Tel Aviv",
    "businessType": "Food"
  }')

if [[ $RESPONSE == *"success"* ]]; then
    echo "✅ Form submission working!"
    echo "$RESPONSE" | json_pp
else
    echo "❌ Form submission failed"
    echo "$RESPONSE"
fi

echo ""
echo "3️⃣ Testing admin endpoint..."
ADMIN=$(curl -s -H "Authorization: Bearer kfar-admin-secure-2025" \
  https://kfarmarket.com/api/admin/submissions)

if [[ $ADMIN == *"submissions"* ]]; then
    echo "✅ Admin endpoint working!"
    echo "Total submissions: $(echo $ADMIN | grep -o '"total":[0-9]*' | grep -o '[0-9]*')"
else
    echo "❌ Admin endpoint not accessible"
fi

echo ""
echo "✅ Deployment verification complete!"