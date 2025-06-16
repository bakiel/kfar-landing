// IMMEDIATE MENU FIX - Run this in console or add to page
(function() {
    console.log('🚨 EMERGENCY MENU FIX ACTIVATED');
    
    // Wait for page to be ready
    function fixMenu() {
        const btn = document.getElementById('mobileMenuBtn');
        const menu = document.getElementById('mobileMenu');
        const close = document.getElementById('closeMobileMenu');
        
        if (!btn || !menu || !close) {
            console.error('Elements not found, retrying...');
            setTimeout(fixMenu, 100);
            return;
        }
        
        console.log('✅ Elements found, applying fix...');
        
        // COMPLETELY OVERRIDE THE MENU
        menu.id = 'mobileMenu-old';
        
        // Create brand new menu
        const newMenu = document.createElement('div');
        newMenu.id = 'mobileMenu';
        newMenu.innerHTML = menu.innerHTML;
        newMenu.style.cssText = `
            display: none;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: white !important;
            z-index: 2147483647 !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
        `;
        
        // Add to body
        document.body.appendChild(newMenu);
        
        // Hide old menu
        menu.style.display = 'none !important';
        
        // New click handlers
        btn.onclick = null;
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            console.log('MENU BUTTON CLICKED');
            newMenu.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Also log to page
            const msg = document.createElement('div');
            msg.textContent = 'MENU OPENED';
            msg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:green;color:white;padding:20px;z-index:9999999;';
            document.body.appendChild(msg);
            setTimeout(() => msg.remove(), 1000);
        }, true);
        
        // Close button
        const newClose = newMenu.querySelector('#closeMobileMenu');
        if (newClose) {
            newClose.onclick = null;
            newClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                console.log('CLOSE BUTTON CLICKED');
                newMenu.style.display = 'none';
                document.body.style.overflow = '';
            }, true);
        }
        
        console.log('🎯 FIX COMPLETE - Try clicking menu button now');
    }
    
    // Run immediately
    fixMenu();
})();