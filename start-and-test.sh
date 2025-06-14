#!/bin/bash

echo "🚀 Starting KFAR Shop Server..."
echo "================================"

# Start the server in background
npm start &
SERVER_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 3

# Open the test page
echo "🌐 Opening test page..."
open http://localhost:8080/test-form.html

echo ""
echo "✅ Server is running!"
echo "================================"
echo "📋 Test URLs:"
echo "- Main page: http://localhost:8080"
echo "- Test form: http://localhost:8080/test-form.html"
echo ""
echo "🛑 To stop the server, press Ctrl+C"
echo ""

# Wait for user to stop
wait $SERVER_PID