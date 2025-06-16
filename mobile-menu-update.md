# Mobile Menu Update Instructions

## 1. CSS Changes to Add (in <style> section before </style>)

```css
/* Enhanced Mobile Menu Styles */
.mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9998;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.mobile-menu-overlay.active {
    opacity: 1;
    visibility: visible;
}

#mobileMenu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    z-index: 99999 !important;
    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

#mobileMenu.active {
    right: 0;
}

/* Hamburger Animation */
.hamburger {
    width: 30px;
    height: 30px;
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.hamburger span {
    display: block;
    position: absolute;
    width: 25px;
    height: 2px;
    background: currentColor;
    transition: all 0.3s ease;
    border-radius: 1px;
}

.hamburger span:nth-child(1) {
    top: 8px;
}

.hamburger span:nth-child(2) {
    top: 14px;
}

.hamburger span:nth-child(3) {
    top: 20px;
}

.hamburger.active span:nth-child(1) {
    transform: rotate(-45deg);
    top: 14px;
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(45deg);
    top: 14px;
}

/* Hide everything when menu is open */
body.menu-open {
    overflow: hidden;
}

body.menu-open .hero-section,
body.menu-open main {
    filter: blur(5px);
    opacity: 0.3;
    pointer-events: none;
}

/* Ensure mobile menu is only for mobile */
@media (min-width: 768px) {
    #mobileMenu,
    .mobile-menu-overlay {
        display: none !important;
    }
    
    body.menu-open .hero-section,
    body.menu-open main {
        filter: none;
        opacity: 1;
        pointer-events: auto;
    }
}

/* Ensure desktop menu shows on desktop */
@media (max-width: 767px) {
    .md\\:flex {
        display: none !important;
    }
}
```

## 2. HTML Changes

### Replace the mobile menu button:
```html
<!-- Mobile menu button -->
<button class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors hamburger" id="mobileMenuBtn">
    <span></span>
    <span></span>
    <span></span>
</button>
```

### Add mobile menu overlay (right after the nav closing tag):
```html
<!-- Mobile Menu Overlay -->
<div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>

<!-- Enhanced Mobile menu -->
<div class="fixed bg-white z-50 overflow-hidden" id="mobileMenu" style="position: fixed; top: 0; right: -100%; width: 100%; height: 100vh; transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);">
```

### Update the close button in mobile menu:
```html
<button id="closeMobileMenu" class="p-2 rounded-lg hover:bg-white/50 transition-colors hamburger active">
    <span></span>
    <span></span>
    <span></span>
</button>
```

## 3. JavaScript Changes

Replace the mobile menu JavaScript section with:

```javascript
// Enhanced Mobile Menu Functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

function openMobileMenu() {
    if (!mobileMenu || !mobileMenuOverlay) return;
    
    // Only open on mobile
    if (window.innerWidth >= 768) return;
    
    mobileMenu.classList.add('active');
    mobileMenu.style.right = '0';
    mobileMenuOverlay.classList.add('active');
    mobileMenuBtn.classList.add('active');
    document.body.classList.add('menu-open');
    
    // Ensure z-index is high enough
    mobileMenu.style.zIndex = '99999';
    mobileMenuOverlay.style.zIndex = '99998';
}

function closeMobileMenuFunc() {
    if (!mobileMenu || !mobileMenuOverlay) return;
    
    mobileMenu.classList.remove('active');
    mobileMenu.style.right = '-100%';
    mobileMenuOverlay.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    document.body.classList.remove('menu-open');
}

function toggleMobileMenu() {
    if (!mobileMenu) return;
    
    if (mobileMenu.classList.contains('active')) {
        closeMobileMenuFunc();
    } else {
        openMobileMenu();
    }
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

if (closeMobileMenu) {
    closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenuFunc);
}

// Close mobile menu on link click
if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenuFunc);
    });
}

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        closeMobileMenuFunc();
    }
});

// Prevent scroll when menu is open
let scrollPosition = 0;
function lockScroll() {
    scrollPosition = window.pageYOffset;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
}

function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
}
```

### Add initialization code (after countdown timer initialization):
```javascript
// Initialize mobile menu state
if (mobileMenu) {
    mobileMenu.style.right = '-100%';
    mobileMenu.classList.remove('active');
}
if (mobileMenuOverlay) {
    mobileMenuOverlay.classList.remove('active');
}
if (document.body.classList.contains('menu-open')) {
    document.body.classList.remove('menu-open');
}
```

## 4. Contact Information Update

Find the contact section in the footer and update with:

```html
<li>Dimona, Israel</li>
<li>Phone: +972 8-655-5400 (Dimona)</li>
<li>Phone: +972 3-382-2802 (Business)</li>
<li>Email: info@kfarmarket.com</li>
```