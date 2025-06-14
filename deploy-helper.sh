#!/bin/bash

# KFAR Marketplace Coming Soon - Deployment Helper
# This script helps with various deployment options

echo "🌟 KFAR Marketplace Deployment Helper 🌟"
echo "======================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get current directory
DEPLOY_DIR="/Users/mac/Downloads/kfar-final/deploy-coming-soon"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Main menu
show_menu() {
    echo "Choose your deployment method:"
    echo ""
    echo "1) 🌐 Open DigitalOcean Spaces (Simplest)"
    echo "2) 🐙 Setup GitHub Repository" 
    echo "3) 📦 Create deployment package (ZIP)"
    echo "4) 🖥️  Start local preview server"
    echo "5) 📋 Show deployment checklist"
    echo "6) 🚪 Exit"
    echo ""
    read -p "Enter your choice (1-6): " choice
}

# Handle menu selection
handle_choice() {
    case $choice in
        1)
            echo -e "${BLUE}Opening DigitalOcean Spaces...${NC}"
            open "https://cloud.digitalocean.com/spaces/new"
            echo ""
            echo -e "${GREEN}Steps to follow:${NC}"
            echo "1. Create a new Space named 'kfar-marketplace'"
            echo "2. Choose Frankfurt (fra1) region"
            echo "3. Enable 'Static Website Hosting'"
            echo "4. Set index document to: index.html"
            echo "5. Upload all files from: $DEPLOY_DIR"
            echo ""
            read -p "Press Enter to open the deployment folder..."
            open "$DEPLOY_DIR"
            ;;
            
        2)
            echo -e "${BLUE}Setting up GitHub repository...${NC}"
            cd "$DEPLOY_DIR"
            
            if command_exists gh; then
                echo "GitHub CLI detected. Creating repository..."
                read -p "Enter repository name (default: kfar-marketplace-coming-soon): " repo_name
                repo_name=${repo_name:-kfar-marketplace-coming-soon}
                
                gh repo create "$repo_name" --public --source . --remote origin --push
                echo -e "${GREEN}Repository created and pushed!${NC}"
                echo "Repository URL: https://github.com/$(gh api user -q .login)/$repo_name"
            else
                echo -e "${YELLOW}GitHub CLI not found. Opening GitHub...${NC}"
                open "https://github.com/new"
                echo ""
                echo "After creating the repository, run these commands:"
                echo ""
                echo "cd $DEPLOY_DIR"
                echo "git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git"
                echo "git branch -M main"
                echo "git push -u origin main"
            fi
            ;;
            
        3)
            echo -e "${BLUE}Creating deployment package...${NC}"
            cd "$DEPLOY_DIR"
            
            # Create zip file excluding git and other unnecessary files
            zip_name="kfar-marketplace-deploy-$(date +%Y%m%d-%H%M%S).zip"
            zip -r "../$zip_name" . -x "*.git*" "*.DS_Store" "*.sh" "*.md"
            
            echo -e "${GREEN}Deployment package created!${NC}"
            echo "Location: $(dirname "$DEPLOY_DIR")/$zip_name"
            echo "Size: $(du -h "../$zip_name" | cut -f1)"
            
            # Open folder containing the zip
            open "$(dirname "$DEPLOY_DIR")"
            ;;
            
        4)
            echo -e "${BLUE}Starting local preview server...${NC}"
            cd "$DEPLOY_DIR"
            
            # Check if Python is available
            if command_exists python3; then
                echo -e "${GREEN}Starting Python HTTP server on port 8000...${NC}"
                echo "Preview URL: http://localhost:8000"
                echo "Press Ctrl+C to stop the server"
                echo ""
                
                # Open browser after a short delay
                (sleep 2 && open "http://localhost:8000") &
                
                # Start server
                python3 -m http.server 8000
            else
                echo -e "${YELLOW}Python not found. Opening index.html directly...${NC}"
                open "$DEPLOY_DIR/index.html"
            fi
            ;;
            
        5)
            echo -e "${BLUE}Deployment Checklist:${NC}"
            echo ""
            echo "✅ Files prepared in: $DEPLOY_DIR"
            echo "✅ Git repository initialized"
            echo "✅ All assets optimized"
            echo ""
            echo -e "${YELLOW}Pre-deployment checks:${NC}"
            echo "[ ] Test site locally"
            echo "[ ] Verify all images load"
            echo "[ ] Test forms work"
            echo "[ ] Check mobile responsiveness"
            echo ""
            echo -e "${GREEN}Deployment options:${NC}"
            echo "1. DigitalOcean Spaces - $5/month, CDN included"
            echo "2. DigitalOcean App Platform - $5/month, auto-deploy from Git"
            echo "3. GitHub Pages - Free, requires GitHub account"
            echo ""
            echo -e "${BLUE}After deployment:${NC}"
            echo "[ ] Configure custom domain (kfarmarket.com)"
            echo "[ ] Set up SSL certificate"
            echo "[ ] Test form submissions"
            echo "[ ] Share with vendors"
            ;;
            
        6)
            echo -e "${GREEN}Good luck with your deployment! 🚀${NC}"
            exit 0
            ;;
            
        *)
            echo -e "${YELLOW}Invalid choice. Please try again.${NC}"
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
    echo ""
}

# Main loop
while true; do
    clear
    show_menu
    handle_choice
done
