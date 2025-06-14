#!/bin/bash

# KFAR Marketplace Automated Deployment Script
# Uses GitHub CLI and DigitalOcean tools

set -e  # Exit on any error

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  KFAR Marketplace - Automated Deployment 🚀   ${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Configuration
PROJECT_DIR="/Users/mac/Downloads/kfar-final/deploy-coming-soon"
REPO_NAME="kfar-marketplace-coming-soon"
GITHUB_USERNAME=""

# Step 1: GitHub Authentication
echo -e "${YELLOW}Step 1: GitHub Setup${NC}"
echo "------------------------"

# Check if gh is authenticated
if ! gh auth status &>/dev/null; then
    echo -e "${YELLOW}GitHub CLI not authenticated. Let's fix that...${NC}"
    echo ""
    echo "You'll need to:"
    echo "1. Press Enter to authenticate with GitHub"
    echo "2. Choose 'GitHub.com'"
    echo "3. Choose 'HTTPS' protocol"
    echo "4. Authenticate with browser"
    echo ""
    read -p "Press Enter to start GitHub authentication..."
    gh auth login
else
    echo -e "${GREEN}✓ GitHub CLI already authenticated${NC}"
fi

# Get GitHub username
GITHUB_USERNAME=$(gh api user -q .login)
echo -e "${GREEN}✓ GitHub user: $GITHUB_USERNAME${NC}"

# Step 2: Create GitHub Repository
echo ""
echo -e "${YELLOW}Step 2: Creating GitHub Repository${NC}"
echo "-----------------------------------"

cd "$PROJECT_DIR"

# Check if remote already exists
if git remote get-url origin &>/dev/null; then
    echo -e "${YELLOW}Repository already has a remote. Removing old remote...${NC}"
    git remote remove origin
fi

# Create repository using gh CLI
echo "Creating repository: $REPO_NAME"
if gh repo create "$REPO_NAME" --public --source . --remote origin; then
    echo -e "${GREEN}✓ Repository created successfully!${NC}"
    REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo -e "${GREEN}Repository URL: $REPO_URL${NC}"
else
    echo -e "${RED}Failed to create repository. It might already exist.${NC}"
    echo "Trying to add existing repository as remote..."
    REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    git remote add origin "$REPO_URL"
fi

# Push to GitHub
echo ""
echo -e "${YELLOW}Pushing code to GitHub...${NC}"
git branch -M main
if git push -u origin main; then
    echo -e "${GREEN}✓ Code pushed successfully!${NC}"
else
    echo -e "${YELLOW}Push failed. Trying force push...${NC}"
    git push -u origin main --force
fi

# Step 3: DigitalOcean Deployment Options
echo ""
echo -e "${YELLOW}Step 3: DigitalOcean Deployment${NC}"
echo "--------------------------------"

# Create DigitalOcean configuration file
cat > "$PROJECT_DIR/.do/app.yaml" << 'EOF'
name: kfar-marketplace
region: fra
features:
  - buildpack-stack=ubuntu-22
static_sites:
  - name: coming-soon
    github:
      repo: GITHUB_USERNAME/REPO_NAME
      branch: main
      deploy_on_push: true
    source_dir: /
    index_document: index.html
    error_document: index.html
    routes:
      - path: /
EOF

# Replace placeholders
sed -i.bak "s/GITHUB_USERNAME/$GITHUB_USERNAME/g" "$PROJECT_DIR/.do/app.yaml"
sed -i.bak "s/REPO_NAME/$REPO_NAME/g" "$PROJECT_DIR/.do/app.yaml"
rm "$PROJECT_DIR/.do/app.yaml.bak"

echo -e "${GREEN}✓ DigitalOcean app.yaml created${NC}"

# Commit and push the .do directory
git add .do/app.yaml
git commit -m "Add DigitalOcean App Platform configuration" || true
git push

echo ""
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}       DEPLOYMENT PREPARATION COMPLETE! 🎉      ${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo -e "${BLUE}Your code is now on GitHub at:${NC}"
echo -e "${GREEN}$REPO_URL${NC}"
echo ""
echo -e "${YELLOW}Next Steps for DigitalOcean:${NC}"
echo ""
echo "1. Open DigitalOcean App Platform:"
echo -e "   ${BLUE}https://cloud.digitalocean.com/apps${NC}"
echo ""
echo "2. Click 'Create App'"
echo ""
echo "3. Choose 'GitHub' and authorize DigitalOcean"
echo ""
echo "4. Select repository: ${GREEN}$REPO_NAME${NC}"
echo ""
echo "5. Review and deploy (it will auto-detect as static site)"
echo ""
echo -e "${YELLOW}Alternative: Use DigitalOcean Spaces (No GitHub connection needed)${NC}"
echo -e "   ${BLUE}https://cloud.digitalocean.com/spaces/new${NC}"
echo ""
echo -e "${GREEN}Your site files are ready at: $PROJECT_DIR${NC}"
echo ""

# Offer to open browsers
read -p "Press Enter to open DigitalOcean App Platform in your browser..."
open "https://cloud.digitalocean.com/apps/new?repo=https://github.com/$GITHUB_USERNAME/$REPO_NAME"

echo ""
read -p "Also open GitHub repository? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    open "$REPO_URL"
fi

echo ""
echo -e "${GREEN}Good luck with your deployment! 🚀${NC}"
