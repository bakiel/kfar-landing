#!/usr/bin/env node

// Update DNS records to point kfarmarket.com to DigitalOcean app
// Usage: DIGITALOCEAN_API_TOKEN=your-token node update-dns-to-do.js

const https = require('https');

const DOMAIN = 'kfarmarket.com';
const DO_APP_URL = 'kfar-landing-page-ijdce.ondigitalocean.app';
const API_TOKEN = process.env.DIGITALOCEAN_API_TOKEN;

if (!API_TOKEN) {
  console.error('❌ Please set DIGITALOCEAN_API_TOKEN environment variable');
  console.error('Example: DIGITALOCEAN_API_TOKEN=your-token node update-dns-to-do.js');
  process.exit(1);
}

// Helper function for API requests
function doRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.digitalocean.com',
      port: 443,
      path: `/v2${path}`,
      method: method,
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body ? JSON.parse(body) : {});
        } else {
          reject(new Error(`API Error ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function updateDNS() {
  try {
    console.log('🌐 Updating DNS for kfarmarket.com...\n');

    // First, check if domain exists in DigitalOcean
    console.log('1️⃣ Checking if domain exists in DigitalOcean...');
    try {
      await doRequest('GET', `/domains/${DOMAIN}`);
      console.log('✅ Domain found in DigitalOcean');
    } catch (err) {
      if (err.message.includes('404')) {
        console.log('📝 Domain not found, creating it...');
        await doRequest('POST', '/domains', { name: DOMAIN });
        console.log('✅ Domain created');
      } else {
        throw err;
      }
    }

    // Get existing records
    console.log('\n2️⃣ Getting existing DNS records...');
    const { domain_records } = await doRequest('GET', `/domains/${DOMAIN}/records`);
    
    // Delete old A records pointing to GitHub Pages
    console.log('\n3️⃣ Removing old GitHub Pages A records...');
    const githubIPs = ['185.199.108.153', '185.199.109.153', '185.199.110.153', '185.199.111.153'];
    
    for (const record of domain_records) {
      if (record.type === 'A' && (githubIPs.includes(record.data) || record.name === '@')) {
        console.log(`   Deleting A record: ${record.data}`);
        await doRequest('DELETE', `/domains/${DOMAIN}/records/${record.id}`);
      }
      // Also remove any existing CNAME for @ or www
      if (record.type === 'CNAME' && (record.name === '@' || record.name === 'www')) {
        console.log(`   Deleting CNAME record: ${record.name}`);
        await doRequest('DELETE', `/domains/${DOMAIN}/records/${record.id}`);
      }
    }

    // Add new CNAME record pointing to DigitalOcean app
    console.log('\n4️⃣ Adding new DNS records...');
    
    // For root domain, we need to use ALIAS (which DO represents as A record with special data)
    console.log(`   Creating ALIAS record for @ -> ${DO_APP_URL}`);
    await doRequest('POST', `/domains/${DOMAIN}/records`, {
      type: 'CNAME',
      name: '@',
      data: `${DO_APP_URL}.`,
      ttl: 300
    });

    // For www subdomain
    console.log(`   Creating CNAME record for www -> ${DO_APP_URL}`);
    await doRequest('POST', `/domains/${DOMAIN}/records`, {
      type: 'CNAME',
      name: 'www',
      data: `${DO_APP_URL}.`,
      ttl: 300
    });

    console.log('\n✅ DNS update complete!\n');
    console.log('📌 Important: DNS propagation can take 5 minutes to 48 hours');
    console.log('📌 Your SSL certificate will be provisioned automatically once DNS propagates\n');
    
    console.log('🔍 Check propagation status:');
    console.log(`   nslookup ${DOMAIN}`);
    console.log(`   dig ${DOMAIN}\n`);
    
    console.log('🌐 Your site will soon be live at:');
    console.log(`   https://${DOMAIN}`);
    console.log(`   https://www.${DOMAIN}\n`);

  } catch (error) {
    console.error('❌ Error updating DNS:', error.message);
    
    if (error.message.includes('401')) {
      console.error('\n🔑 Authentication failed. Please check your DIGITALOCEAN_API_TOKEN');
    } else if (error.message.includes('403')) {
      console.error('\n🚫 Permission denied. Make sure your token has write access to domains');
    }
    
    process.exit(1);
  }
}

// Show current status first
async function checkCurrentDNS() {
  console.log('📊 Current DNS Status:\n');
  
  const dns = require('dns').promises;
  
  try {
    const ips = await dns.resolve4(DOMAIN);
    console.log(`A records for ${DOMAIN}:`);
    ips.forEach(ip => console.log(`   ${ip}`));
    
    if (ips.some(ip => ip.startsWith('185.199.'))) {
      console.log('   ⚠️  Currently pointing to GitHub Pages');
    }
  } catch (err) {
    console.log(`   ❌ Could not resolve ${DOMAIN}`);
  }
  
  console.log('');
}

// Main execution
(async () => {
  console.log('🚀 KFAR Market DNS Update Tool\n');
  
  await checkCurrentDNS();
  
  // Important notice
  console.log('⚠️  IMPORTANT: Make sure your domain registrar\'s nameservers are set to:');
  console.log('   ns1.digitalocean.com');
  console.log('   ns2.digitalocean.com');
  console.log('   ns3.digitalocean.com\n');
  
  console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
  
  setTimeout(() => {
    updateDNS();
  }, 5000);
})();