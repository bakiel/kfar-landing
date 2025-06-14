#!/bin/bash

echo "🚀 Deploying KFAR Landing Page to GitHub..."
echo "======================================"

cd /Users/mac/Downloads/kfar-final/deploy-coming-soon-1

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Are you in the right directory?"
    exit 1
fi

# Remove existing origin if it exists
git remote remove origin 2>/dev/null || true

# Add origin
echo "📡 Adding GitHub remote..."
git remote add origin https://github.com/bakiel/kfar-landing.git

# Try to push using different methods
echo "📤 Attempting to push to GitHub..."

# Method 1: Try with gh CLI if available
if command -v gh &> /dev/null; then
    echo "Using GitHub CLI..."
    gh repo clone bakiel/kfar-landing temp-repo --clone=false 2>/dev/null || true
    git push -f origin main 2>&1 | tee push-result.txt
    
    if grep -q "Authentication failed" push-result.txt; then
        echo ""
        echo "⚠️  Authentication required. Running gh auth login..."
        gh auth login
        git push -f origin main
    fi
else
    # Method 2: Direct push
    echo "Using direct git push..."
    git push -f origin main
fi

echo ""
echo "✅ Deployment attempt complete!"
echo ""
echo "Next steps:"
echo "1. Check https://github.com/bakiel/kfar-landing"
echo "2. If the push failed, you may need to:"
echo "   - Run 'gh auth login' to authenticate with GitHub"
echo "   - Or use a Personal Access Token"
echo ""
echo "Files ready to deploy:"
ls -la index.html server.js package.json
