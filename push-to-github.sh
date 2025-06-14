#!/bin/bash

# Script to push KFAR landing page to GitHub

echo "🚀 Pushing KFAR landing page to GitHub..."

# Initialize git if not already
if [ ! -d ".git" ]; then
    git init
    git remote add origin https://github.com/bakiel/kfar-landing.git
fi

# Add all files
git add .

# Commit with timestamp
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "Update landing page with SendGrid forms - $TIMESTAMP"

# Force push to main branch to ensure client sees correct version
git push -f origin main

echo "✅ Push complete! The correct landing page is now live."
echo "🔗 Check: https://github.com/bakiel/kfar-landing"
