// Portfolio Front-end Developer - JavaScript

// DOM Elements
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const currentYear = document.getElementById('current-year');
const revealElements = document.querySelectorAll('.reveal');
const skillBars = document.querySelectorAll('.skill-progress');
const skillPercentElements = document.querySelectorAll('.skill-percent');
const statNumbers = document.querySelectorAll('.stat-number');

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// Header scroll effect
window.addEventListener('scroll', () => {
    // Add scrolled class to header when page is scrolled
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    // Trigger reveal animations
    triggerRevealAnimations();
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Function to update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Function to trigger reveal animations on scroll
function triggerRevealAnimations() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
            
            // If element is a skill bar, animate it
            if (element.classList.contains('skill')) {
                const skillProgress = element.querySelector('.skill-progress');
                const skillPercent = element.querySelector('.skill-percent');
                const percent = skillProgress.getAttribute('data-percent');
                
                setTimeout(() => {
                    skillProgress.style.width = `${percent}%`;
                    
                    // Animate counter for skill percentage
                    animateCounter(skillPercent, 0, parseInt(percent), 1500);
                }, 300);
            }
            
            // If element is a stat number, animate it
            if (element.classList.contains('stat-item')) {
                const statNumber = element.querySelector('.stat-number');
                const target = parseInt(statNumber.getAttribute('data-count'));
                
                setTimeout(() => {
                    animateCounter(statNumber, 0, target, 2000);
                }, 300);
            }
        }
    });
}

// Function to animate counters (numbers counting up)
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize reveal animations on page load
window.addEventListener('load', () => {
    triggerRevealAnimations();
    
    // Add fade-in animation to hero elements with delays
    const heroElements = document.querySelectorAll('.fade-in');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'rotateY(180deg) scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'rotateY(0deg) scale(1)';
    });
});

// Add typing effect to hero headline (simulated)
const heroHeadline = document.querySelector('.hero-headline');
const originalText = heroHeadline.innerHTML;
const words = ['Developer', 'Designer'];
let currentWordIndex = 0;

function typeEffect() {
    const currentWord = words[currentWordIndex];
    const nextWordIndex = (currentWordIndex + 1) % words.length;
    const nextWord = words[nextWordIndex];
    
    // Find and replace the word in the original HTML
    const newHTML = originalText.replace(
        `<span class="highlight">${currentWord}</span>`,
        `<span class="highlight">${nextWord}</span>`
    );
    
    heroHeadline.innerHTML = newHTML;
    currentWordIndex = nextWordIndex;
}

// Change the highlighted word every 3 seconds
setInterval(typeEffect, 3000);

// Add parallax effect to floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
});

// Add click effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            position: absolute;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
        `;
        
        this.appendChild(ripple);
        
        // Remove ripple element after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);