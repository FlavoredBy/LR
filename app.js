// League Rematch Website JavaScript

// Discord URL
const DISCORD_URL = 'https://discord.gg/LeagueRematch';

// Redirect to Discord function - make it globally available
window.redirectToDiscord = function() {
    window.open(DISCORD_URL, '_blank');
};

// Ensure function is available immediately
function redirectToDiscord() {
    window.open(DISCORD_URL, '_blank');
}

// Document ready handler
document.addEventListener('DOMContentLoaded', function() {
    // Ensure Discord buttons work
    const discordButtons = document.querySelectorAll('[onclick*="redirectToDiscord"]');
    discordButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            redirectToDiscord();
        });
    });

    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav__link:not(.nav__link--discord)');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#discord') {
                redirectToDiscord();
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle Discord navigation link
    const discordNavLink = document.querySelector('.nav__link--discord');
    if (discordNavLink) {
        discordNavLink.addEventListener('click', function(e) {
            e.preventDefault();
            redirectToDiscord();
        });
    }

    // Additional event listeners for all Discord-related elements
    const allDiscordLinks = document.querySelectorAll('a[href*="discord.gg"], .btn--hero, .btn--secondary');
    allDiscordLinks.forEach(element => {
        element.addEventListener('click', function(e) {
            if (this.classList.contains('btn--hero') || this.classList.contains('btn--secondary')) {
                e.preventDefault();
                redirectToDiscord();
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe tournament cards
    const tournamentCards = document.querySelectorAll('.tournament-card');
    tournamentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe prize cards
    const prizeCards = document.querySelectorAll('.prize-card');
    prizeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add counter animation for stats
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target.toString().includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    };

    // Animate counters when they come into view
    const statNumbers = document.querySelectorAll('.stat-card__number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const numericValue = parseInt(text.replace(/\D/g, ''));
                
                // Reset and animate
                target.textContent = '0';
                setTimeout(() => {
                    animateCounter(target, numericValue);
                }, 300);
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Add parallax effect to hero background
    const heroBackground = document.querySelector('.hero__background');
    const heroParticles = document.querySelector('.hero__particles');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
        
        if (heroParticles) {
            heroParticles.style.transform = `translateY(${rate * 0.3}px)`;
        }
    });

    // Add hover effects to tournament cards
    tournamentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add dynamic glow effect to hero title
    const heroTitle = document.querySelector('.hero__title-main');
    if (heroTitle) {
        setInterval(() => {
            const glowIntensity = Math.sin(Date.now() * 0.003) * 0.5 + 0.5;
            const glowColor = `rgba(255, 215, 0, ${0.5 + glowIntensity * 0.3})`;
            heroTitle.style.textShadow = `0 0 ${20 + glowIntensity * 30}px ${glowColor}`;
        }, 50);
    }

    // Add floating animation to prize icons
    const prizeIcons = document.querySelectorAll('.prize-card__icon');
    prizeIcons.forEach((icon, index) => {
        icon.style.animation = `bounce 2s infinite ${index * 0.2}s`;
    });

    // Add sparkle effect to hero section
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.position = 'absolute';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.background = Math.random() > 0.5 ? '#FFD700' : '#305CDE';
        sparkle.style.borderRadius = '50%';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animation = 'sparkleFloat 3s linear infinite';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1';
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 3000);
        }
    }

    // Create sparkles periodically
    setInterval(createSparkle, 500);

    // Add CSS for sparkle animation
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleFloat {
            0% {
                opacity: 0;
                transform: translateY(0) scale(0);
            }
            50% {
                opacity: 1;
                transform: translateY(-50px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(0);
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            overflow: hidden;
            position: relative;
        }
    `;
    document.head.appendChild(sparkleStyle);

    // Add loading animation
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);

    console.log('🎮 League Rematch loaded successfully!');
    console.log('🔗 Discord: ' + DISCORD_URL);
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust hero height on mobile
    const hero = document.querySelector('.hero');
    if (window.innerWidth <= 768 && hero) {
        hero.style.minHeight = '100vh';
    }
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, {passive: true});
}

// Error handling for Discord redirect
window.addEventListener('error', function(e) {
    console.error('League Rematch Error:', e.error);
});

// Add performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(function() {
        // Preload Discord link
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = '//discord.gg';
        document.head.appendChild(link);
    });
}