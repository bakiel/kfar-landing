// Quick fix to update FROM address to reduce spam

const fs = require('fs');
const path = require('path');

// Read server.js
const serverPath = path.join(__dirname, 'server.js');
let serverContent = fs.readFileSync(serverPath, 'utf8');

// Replace noreply@ with hello@
serverContent = serverContent.replace(
  /noreply@em6192\.kfarmarket\.com/g,
  'hello@kfarmarket.com'
);

// Write back
fs.writeFileSync(serverPath, serverContent);

console.log('✅ Updated FROM address to hello@kfarmarket.com');
console.log('📧 This will help reduce spam scoring');
console.log('');
console.log('🔥 Next Steps:');
console.log('1. Commit and push this change');
console.log('2. Go to SendGrid → Settings → Sender Authentication');
console.log('3. Authenticate kfarmarket.com domain');
console.log('4. Add the DNS records to DigitalOcean');
console.log('');
console.log('👉 For immediate relief:');
console.log('- Tell users to check spam folder');
console.log('- Ask them to mark as "Not Spam"');
console.log('- Add hello@kfarmarket.com to contacts');