// Fix for mobile menu overlapping issues
// Add this script to the end of index.html before </body>

// Improved mobile menu handling
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    const openMenuBtn = document.querySelector('[onclick*="toggleMobileMenu"]');
    const closeMenuBtn = document.getElementById('closeMobileMenu');
    const header = document.getElementById('header');
    const body = document.body;
    
    // Fix z-index hierarchy
    if (mobileMenu) {
        mobileMenu.style.zIndex = '9999'; // Highest z-index
    }
    
    // Improved open menu function
    function openMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('hidden');
            // Prevent body scroll when menu is open
            body.style.overflow = 'hidden';
            // Add backdrop
            const backdrop = document.createElement('div');
            backdrop.id = 'menuBackdrop';
            backdrop.className = 'fixed inset-0 bg-black/50 z-[9998]';
            backdrop.onclick = closeMobileMenu;
            body.appendChild(backdrop);
        }
    }
    
    // Improved close menu function
    function closeMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            // Re-enable body scroll
            body.style.overflow = '';
            // Remove backdrop
            const backdrop = document.getElementById('menuBackdrop');
            if (backdrop) {
                backdrop.remove();
            }
        }
    }
    
    // Replace existing toggle function
    window.toggleMobileMenu = function() {
        if (mobileMenu.classList.contains('hidden')) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    };
    
    // Add event listeners
    if (closeMenuBtn) {
        closeMenuBtn.onclick = closeMobileMenu;
    }
    
    // Close menu when clicking on nav items
    const navItems = mobileMenu.querySelectorAll('.mobile-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Fix mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        /* Mobile menu improvements */
        #mobileMenu {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 9999 !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
        }
        
        /* Ensure no overlap with header */
        #header {
            z-index: 100 !important;
        }
        
        /* Smooth transitions */
        #mobileMenu {
            transition: transform 0.3s ease-in-out;
        }
        
        #mobileMenu.hidden {
            transform: translateX(100%);
            display: block !important;
        }
        
        #mobileMenu:not(.hidden) {
            transform: translateX(0);
        }
        
        /* Better touch targets for mobile */
        .mobile-nav-item {
            min-height: 48px;
            display: flex;
            align-items: center;
        }
        
        /* Prevent scroll when menu open */
        body.menu-open {
            overflow: hidden;
            position: fixed;
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});