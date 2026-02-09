/* ============================================
   PHONEHUB - MAIN JAVASCRIPT
   Website bán hàng điện thoại hiện đại
   ============================================ */

// ============================================
// INITIALIZATION & VARIABLES
// ============================================

// Đợi DOM load xong
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Khởi tạo tất cả các chức năng
    handleNavigation();
    handleScrollEffects();
    handleScrollReveal();
    handleProductFilter();
    handleCounterAnimation();
    handleMobileMenu();
    handleBackToTop();
    handleFormSubmit();
    handleAddToCart();
    handleAuthModal();
}

// ============================================
// NAVIGATION - Smooth Scroll & Active State
// ============================================

function handleNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');
    
    // Smooth scroll khi click vào menu
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Đóng mobile menu nếu đang mở
                const navMenu = document.getElementById('navMenu');
                navMenu.classList.remove('active');
                document.getElementById('mobileToggle').classList.remove('active');
                
                // Scroll mượt đến section
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Thay đổi style header khi scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavOnScroll();
    });
}

// Cập nhật active nav link khi scroll
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// SCROLL EFFECTS - Parallax & Animations
// ============================================

function handleScrollEffects() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Parallax effect cho các orb
        orbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ============================================
// SCROLL REVEAL - Fade in khi scroll vào view
// ============================================

function handleScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const revealPoint = 100;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    // Reveal ngay khi load
    revealOnScroll();
    
    // Reveal khi scroll
    window.addEventListener('scroll', revealOnScroll);
}

// ============================================
// PRODUCT FILTER - Lọc sản phẩm theo category
// ============================================

function handleProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products với animation
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    // Show card
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    // Hide card
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// COUNTER ANIMATION - Số đếm tăng dần
// ============================================

function handleCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const animateCounters = function() {
        // Chỉ chạy animation 1 lần
        if (animated) return;
        
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;
        
        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            animated = true;
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 giây
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = function() {
                    current += increment;
                    
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString('vi-VN');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString('vi-VN');
                        // Thêm dấu + cho số cuối
                        if (counter.textContent.length > 0) {
                            const lastCounter = document.querySelector('.hero-stats .stat-item:last-child .stat-number');
                            if (counter === lastCounter) {
                                counter.textContent = target + '%';
                            } else {
                                counter.textContent = target.toLocaleString('vi-VN') + '+';
                            }
                        }
                    }
                };
                
                updateCounter();
            });
        }
    };
    
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Chạy ngay khi load
}

// ============================================
// MOBILE MENU - Toggle menu trên mobile
// ============================================

function handleMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileToggle || !navMenu) return;
    
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll khi menu mở
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Đóng menu khi click ra ngoài
    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

function handleBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Show/hide button dựa vào scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top khi click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// FORM SUBMIT - Xử lý form liên hệ
// ============================================

function handleFormSubmit() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Show success message
            showNotification('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.', 'success');
            
            // Reset form
            this.reset();
            
            // Trong thực tế, bạn sẽ gửi data đến server ở đây
            console.log('Form data:', Object.fromEntries(formData));
        });
    }
    
    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Show success message
            showNotification('Đăng ký thành công! Cảm ơn bạn đã quan tâm.', 'success');
            
            // Reset form
            this.reset();
            
            console.log('Newsletter email:', email);
        });
    }
}

// ============================================
// ADD TO CART - Thêm sản phẩm vào giỏ hàng
// ============================================

let cartCount = 0;

function handleAddToCart() {
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    const cartCountElement = document.querySelector('.cart-count');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product info
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.price-new').textContent;
            
            // Tăng số lượng trong giỏ
            cartCount++;
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
                
                // Animation cho cart icon
                cartCountElement.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    cartCountElement.style.transform = 'scale(1)';
                }, 300);
            }
            
            // Show notification
            showNotification(`Đã thêm "${productName}" vào giỏ hàng`, 'success');
            
            // Add animation to button
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            console.log('Added to cart:', { productName, productPrice });
        });
    });
    
    // Handle action buttons (wishlist, quick view)
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            
            // Check which action
            const svg = this.querySelector('svg');
            const isWishlist = svg.querySelector('path[d*="20.84"]'); // Heart icon
            
            if (isWishlist) {
                // Toggle wishlist
                this.classList.toggle('active');
                if (this.classList.contains('active')) {
                    svg.style.fill = '#ec4899';
                    showNotification(`Đã thêm "${productName}" vào danh sách yêu thích`, 'success');
                } else {
                    svg.style.fill = 'none';
                    showNotification(`Đã xóa "${productName}" khỏi danh sách yêu thích`, 'info');
                }
            } else {
                // Quick view
                showNotification(`Xem nhanh "${productName}"`, 'info');
                // Trong thực tế, bạn sẽ mở modal ở đây
            }
        });
    });
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        // Tạo search overlay
        const searchOverlay = document.createElement('div');
        searchOverlay.className = 'search-overlay';
        searchOverlay.innerHTML = `
            <div class="search-modal">
                <button class="search-close" aria-label="Đóng">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <input type="text" placeholder="Tìm kiếm sản phẩm..." class="search-input" autofocus>
                <div class="search-suggestions">
                    <p>Gợi ý: iPhone 15, Samsung Galaxy S24, Xiaomi 14</p>
                </div>
            </div>
        `;
        
        // Style cho search overlay
        Object.assign(searchOverlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '100px 20px',
            animation: 'fadeIn 0.3s ease-out'
        });
        
        document.body.appendChild(searchOverlay);
        
        // Handle close
        const closeBtn = searchOverlay.querySelector('.search-close');
        closeBtn.addEventListener('click', () => {
            searchOverlay.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(searchOverlay);
            }, 300);
        });
        
        // Close on outside click
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                closeBtn.click();
            }
        });
        
        // Handle search input
        const searchInput = searchOverlay.querySelector('.search-input');
        searchInput.addEventListener('input', function() {
            console.log('Searching for:', this.value);
            // Trong thực tế, bạn sẽ filter products hoặc call API ở đây
        });
    });
}

// Thêm CSS cho search modal
const searchStyles = document.createElement('style');
searchStyles.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .search-modal {
        background: white;
        padding: 2rem;
        border-radius: 20px;
        max-width: 600px;
        width: 100%;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        position: relative;
    }
    
    .search-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.05);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .search-close:hover {
        background: rgba(0, 0, 0, 0.1);
        transform: rotate(90deg);
    }
    
    .search-input {
        width: 100%;
        padding: 1.5rem;
        font-size: 1.25rem;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        margin-bottom: 1rem;
        transition: all 0.3s;
    }
    
    .search-input:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    
    .search-suggestions {
        padding: 1rem;
        background: rgba(99, 102, 241, 0.05);
        border-radius: 12px;
    }
    
    .search-suggestions p {
        margin: 0;
        color: #64748b;
        font-size: 0.875rem;
    }
`;
document.head.appendChild(searchStyles);

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy loading cho images (nếu có)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// AUTH MODAL - Đăng nhập/Đăng ký
// ============================================

function handleAuthModal() {
    const authModal = document.getElementById('authModal');
    const loginBtn = document.getElementById('loginBtn');
    const authClose = document.getElementById('authClose');
    const authOverlay = document.getElementById('authOverlay');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const switchFormLinks = document.querySelectorAll('.switch-form');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    // Mở modal đăng nhập
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            showLoginForm();
        });
    }
    
    // Đóng modal
    const closeModal = function() {
        authModal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (authClose) {
        authClose.addEventListener('click', closeModal);
    }
    
    if (authOverlay) {
        authOverlay.addEventListener('click', closeModal);
    }
    
    // Đóng modal khi nhấn ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && authModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Chuyển đổi giữa form đăng nhập và đăng ký
    switchFormLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            
            if (target === 'register') {
                showRegisterForm();
            } else {
                showLoginForm();
            }
        });
    });
    
    function showLoginForm() {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }
    
    function showRegisterForm() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
    
    // Toggle hiển thị mật khẩu
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                `;
            } else {
                input.type = 'password';
                this.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                `;
            }
        });
    });
    
    // Xử lý form đăng nhập
    const loginFormElement = document.getElementById('loginFormElement');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Trong thực tế, bạn sẽ gửi data đến server
            console.log('Login:', { email, password, rememberMe });
            
            // Show success message
            showNotification('Đăng nhập thành công! Chào mừng bạn quay trở lại.', 'success');
            
            // Update UI - thay nút đăng nhập thành tên user
            if (loginBtn) {
                loginBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>Xin chào</span>
                `;
            }
            
            // Đóng modal
            closeModal();
            
            // Reset form
            this.reset();
        });
    }
    
    // Xử lý form đăng ký
    const registerFormElement = document.getElementById('registerFormElement');
    if (registerFormElement) {
        registerFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const phone = document.getElementById('registerPhone').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            
            // Validate mật khẩu
            if (password !== confirmPassword) {
                showNotification('Mật khẩu xác nhận không khớp!', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
                return;
            }
            
            // Trong thực tế, bạn sẽ gửi data đến server
            console.log('Register:', { name, email, phone, password });
            
            // Show success message
            showNotification('Đăng ký thành công! Chào mừng bạn đến với PhoneHub.', 'success');
            
            // Chuyển sang form đăng nhập
            setTimeout(() => {
                showLoginForm();
                showNotification('Vui lòng đăng nhập để tiếp tục.', 'info');
            }, 2000);
            
            // Reset form
            this.reset();
        });
    }
    
    // Xử lý đăng nhập bằng social
    const socialBtns = document.querySelectorAll('.btn-social');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('btn-google') ? 'Google' : 'Facebook';
            showNotification(`Đang kết nối với ${provider}...`, 'info');
            
            // Trong thực tế, bạn sẽ redirect đến OAuth provider
            console.log('Social login with:', provider);
        });
    });
    
    // Xử lý quên mật khẩu
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            
            if (!email) {
                showNotification('Vui lòng nhập email để khôi phục mật khẩu.', 'info');
                return;
            }
            
            showNotification('Link khôi phục mật khẩu đã được gửi đến email của bạn.', 'success');
            console.log('Password reset for:', email);
        });
    }
}

// ============================================
// NOTIFICATION - Hiển thị thông báo (cập nhật để hỗ trợ nhiều type)
// ============================================

function showNotification(message, type = 'info') {
    // Tạo notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Icon dựa trên type
    let icon = '';
    switch(type) {
        case 'success':
            icon = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
            `;
            break;
        case 'error':
            icon = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            `;
            break;
        default:
            icon = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            `;
    }
    
    notification.innerHTML = `
        <div class="notification-content">
            ${icon}
            <p>${message}</p>
        </div>
    `;
    
    // Style cho notification
    const bgColors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#6366f1'
    };
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: bgColors[type] || bgColors.info,
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: '99999',
        animation: 'slideInRight 0.3s ease-out',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        maxWidth: '400px'
    });
    
    // Thêm vào body
    document.body.appendChild(notification);
    
    // Tự động xóa sau 3 giây
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🎉 PhoneHub Website ', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cWebsite bán hàng điện thoại hiện đại', 'color: #64748b; font-size: 14px;');
console.log('%c✨ Developed with ❤️', 'color: #ec4899; font-size: 12px;');
console.log('');

// Thêm CSS animation cho notification
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content svg {
        flex-shrink: 0;
    }
    
    .notification-content p {
        margin: 0;
        color: white;
        font-size: 0.875rem;
        line-height: 1.5;
    }
`;
document.head.appendChild(notificationStyles);

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// ============================================
// END OF FILE
// ============================================