// Simple mobile menu fix
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile menu fix loading...');
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    
    if (!mobileMenuBtn || !mobileMenu || !closeMobileMenu) {
        console.error('Mobile menu elements not found');
        return;
    }
    
    console.log('Mobile menu elements found');
    
    // Simple open function
    function openMobileMenu() {
        console.log('Opening mobile menu');
        mobileMenu.style.display = 'block';
        mobileMenu.classList.remove('hidden');
        mobileMenu.style.transform = 'translateX(0)';
        mobileMenu.style.transition = 'transform 0.3s ease-out';
        document.body.style.overflow = 'hidden';
    }
    
    // Simple close function
    function closeMobileMenuFunc() {
        console.log('Closing mobile menu');
        mobileMenu.style.transform = 'translateX(100%)';
        document.body.style.overflow = '';
        setTimeout(() => {
            mobileMenu.style.display = 'none';
            mobileMenu.classList.add('hidden');
        }, 300);
    }
    
    // Event listeners
    mobileMenuBtn.addEventListener('click', openMobileMenu);
    closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
    
    // Close on nav item click
    mobileMenu.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.addEventListener('click', closeMobileMenuFunc);
    });
    
    console.log('Mobile menu fix applied');
});