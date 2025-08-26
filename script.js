// ===== PORTFOLIO JAVASCRIPT FEATURES =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. TYPING ANIMATION FOR NAME =====
    const nameElement = document.querySelector('header h1');
    const originalName = nameElement.textContent;
    
    function typeWriter(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        // Start typing after a brief delay
        setTimeout(type, 500);
    }
    
    // Start the typing animation
    typeWriter(nameElement, originalName, 150);
    
    // ===== 2. ACTIVE NAVIGATION HIGHLIGHTING =====
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    
    function highlightActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    // ===== 3. SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for list items
                const listItems = entry.target.querySelectorAll('li');
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Apply observer to all sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Style list items for animation
        const listItems = section.querySelectorAll('li');
        listItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        observer.observe(section);
    });
    
    // ===== 4. BACK TO TOP BUTTON =====
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Style the back to top button
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-3px) scale(1.1);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        
        nav a.active {
            background-color: rgba(255, 255, 255, 0.3) !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .project-card {
            transition: all 0.3s ease;
        }
        
        .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                width: 45px;
                height: 45px;
                font-size: 18px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Back to top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== 5. ENHANCED SCROLL EFFECTS =====
    window.addEventListener('scroll', () => {
        // Highlight active navigation
        highlightActiveSection();
        
        // Show/hide back to top button
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        
        // Header background opacity on scroll
        const header = document.querySelector('header');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            header.style.backdropFilter = 'none';
        }
    });
    
    // ===== 6. SMOOTH SCROLL FOR NAVIGATION LINKS =====
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== 7. EMAIL COPY FUNCTIONALITY =====
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = emailLink.textContent;
            
            // Try to copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copied to clipboard!');
                });
            }
            
            // Also open email client
            setTimeout(() => {
                window.location.href = `mailto:${email}`;
            }, 1000);
        });
    }
    
    // ===== 8. NOTIFICATION SYSTEM =====
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // ===== 9. MOBILE MENU ENHANCEMENTS =====
    const nav = document.querySelector('nav');
    let isMenuOpen = false;
    
    // Add mobile menu styles
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 768px) {
            nav {
                max-height: ${isMenuOpen ? '300px' : '0'};
                overflow: hidden;
                transition: max-height 0.3s ease;
            }
            
            header:hover nav {
                max-height: 300px;
            }
        }
    `;
    document.head.appendChild(mobileStyles);
    
    // ===== 10. PROJECT LINK ENHANCEMENTS =====
    const projectLinks = document.querySelectorAll('#projects a');
    projectLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.05)';
            link.style.textShadow = '0 2px 4px rgba(0,0,0,0.3)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)';
            link.style.textShadow = 'none';
        });
    });
    
    // ===== 11. LOADING ANIMATION =====
    // Hide sections initially and reveal them with animation
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // ===== 12. KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', (e) => {
        // ESC key to close any modals or go to top
        if (e.key === 'Escape') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Arrow keys for section navigation
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            const currentSection = getCurrentSection();
            const nextSection = getNextSection(currentSection);
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            const currentSection = getCurrentSection();
            const prevSection = getPreviousSection(currentSection);
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    function getCurrentSection() {
        let current = null;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
                current = section;
            }
        });
        return current;
    }
    
    function getNextSection(currentSection) {
        if (!currentSection) return sections[0];
        const currentIndex = Array.from(sections).indexOf(currentSection);
        return sections[currentIndex + 1] || null;
    }
    
    function getPreviousSection(currentSection) {
        if (!currentSection) return null;
        const currentIndex = Array.from(sections).indexOf(currentSection);
        return sections[currentIndex - 1] || null;
    }
    
    // ===== WELCOME MESSAGE =====
    setTimeout(() => {
        showNotification('Welcome to my portfolio! 🚀');
    }, 2000);
    
    console.log('🎉 Portfolio JavaScript loaded successfully!');
    console.log('💡 Features loaded:');
    console.log('   ✅ Typing animation');
    console.log('   ✅ Active navigation highlighting');
    console.log('   ✅ Scroll animations');
    console.log('   ✅ Back to top button');
    console.log('   ✅ Email copy functionality');
    console.log('   ✅ Smooth scrolling');
    console.log('   ✅ Mobile enhancements');
    console.log('   ✅ Keyboard navigation (Ctrl+Arrow keys)');
});

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events for better performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}