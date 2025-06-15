#!/bin/bash

echo "🧪 Testing KFAR Coming Soon locally..."
echo "====================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the server in background
echo "🚀 Starting server..."
node server.js &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Test health endpoint
echo ""
echo "🏥 Testing health endpoint..."
curl -s http://localhost:8080/api/health | json_pp

# Test form submission (without actual SendGrid)
echo ""
echo "📝 Testing vendor signup (dry run)..."
curl -X POST http://localhost:8080/api/vendor-signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "businessName": "Test Business",
    "email": "test@example.com",
    "phone": "+1234567890",
    "location": "Tel Aviv",
    "businessType": "Food",
    "message": "Testing the form"
  }' | json_pp

echo ""
echo "✅ Test complete. Server running on http://localhost:8080"
echo "Press Ctrl+C to stop the server"

# Keep server running
wait $SERVER_PID