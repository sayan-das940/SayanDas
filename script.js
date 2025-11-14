// Toggle Menu
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('active');
        navbar.classList.toggle('active');
    };
}

// Scroll Sections Active Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {
    // Active link highlighting
    sections.forEach(section => {
        const top = window.scrollY;
        const offset = section.offsetTop - 150;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const activeLink = document.querySelector(`.navbar a[href*="${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            });
        }
    });

    // Sticky Header
    const header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }

    // Remove toggle icon and navbar when scrolling
    if (menuIcon && navbar) {
        menuIcon.classList.remove('active');
        navbar.classList.remove('active');
    }
    
    // Check skills animation on scroll
    checkSkillsAnimation();
    scrollReveal();
};

// Typed Text Animation
if (document.querySelector('.multiple-text')) {
    const typed = new Typed('.multiple-text', {
        strings: ['Full Stack Developer', 'Web Designer', 'UI/UX Enthusiast','Graphic Designer','Full Stack Developer'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: false
    });
}

// Enhanced Skill Bars Animation
const skillBars = document.querySelectorAll('.skill-progress');

// Track if skills have been animated
let skillsAnimated = false;

// Create percentage indicators
function createPercentageIndicators() {
    skillBars.forEach((bar) => {
        const percentage = document.createElement('span');
        percentage.className = 'skill-percentage';
        percentage.textContent = '0%';
        bar.parentElement.appendChild(percentage);
    });
}

// Animate skill bars with progressing effect
function animateSkillBars() {
    skillBars.forEach((bar) => {
        const skillValue = bar.getAttribute('data-width');
        const percentageElement = bar.parentElement.querySelector('.skill-percentage');
        const skillHeader = bar.closest('.skill').querySelector('h4 span');
        
        // Reset to initial state
        bar.style.width = '0%';
        bar.classList.remove('completed', 'animating');
        
        if (percentageElement) {
            percentageElement.textContent = '0%';
        }
        
        // Add animating class after a small delay
        setTimeout(() => {
            bar.classList.add('animating');
            
            // Animate the width
            setTimeout(() => {
                bar.style.width = skillValue + '%';
            }, 100);
            
            // Animate the percentage counter
            let currentPercent = 0;
            const targetPercent = parseInt(skillValue);
            const duration = 2000; // 2 seconds
            const increment = targetPercent / (duration / 50); // Update every 50ms
            
            const counter = setInterval(() => {
                currentPercent += increment;
                if (currentPercent >= targetPercent) {
                    currentPercent = targetPercent;
                    clearInterval(counter);
                    
                    // Add completed class when animation finishes
                    setTimeout(() => {
                        bar.classList.remove('animating');
                        bar.classList.add('completed');
                    }, 500);
                }
                
                if (percentageElement) {
                    percentageElement.textContent = Math.round(currentPercent) + '%';
                }
                
                // Also update the text in the skill header
                if (skillHeader) {
                    skillHeader.textContent = Math.round(currentPercent) + '%';
                }
                
            }, 50);
        }, 300);
    });
}

// Check if element is in viewport
function isInViewport(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Check if skills should be animated
function checkSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    if (skillsSection && isInViewport(skillsSection) && !skillsAnimated) {
        animateSkillBars();
        skillsAnimated = true;
    }
}

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Close navbar when clicking on a link (for mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuIcon && navbar) {
            menuIcon.classList.remove('active');
            navbar.classList.remove('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Scroll reveal animation
function scrollReveal() {
    const elements = document.querySelectorAll('.home-content, .heading, .home-img, .about-img, .skills-box, .project-box, .contact-form');
    
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('active');
        }
    });
}

// Add active class for scroll reveal
const revealElements = document.querySelectorAll('.home-content, .heading, .home-img, .about-img, .skills-box, .project-box, .contact-form');
revealElements.forEach(element => {
    element.classList.add('scroll-reveal');
});

// Download CV button functionality
const downloadBtn = document.querySelector('.btn[href="#"]');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('CV download functionality would be implemented here!');
        // You can replace this with actual download logic:
        // window.open('path-to-your-cv.pdf', '_blank');
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create percentage indicators
    createPercentageIndicators();
    
    // Initial check for scroll reveal
    scrollReveal();
    
    // Initial check for skills animation
    checkSkillsAnimation();
    
    // Test skills animation (remove this line in production)
    // setTimeout(() => animateSkillBars(), 1000);
});

// Force skills animation for testing (uncomment to test immediately)
// setTimeout(() => {
//     if (!skillsAnimated) {
//         animateSkillBars();
//         skillsAnimated = true;
//     }
// }, 1000);