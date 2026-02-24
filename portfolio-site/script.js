// Hero Typing Effect
const roles = ["Automation Specialist", "CI/CD Engineer", "Cloud Architect", "Kubernetes Expert"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeRoles() {
    const heroStatus = document.querySelector('#hero .glass-card');
    if (!heroStatus) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        heroStatus.innerHTML = `$ roles --current ${currentRole.substring(0, charIndex - 1)}_`;
        charIndex--;
    } else {
        heroStatus.innerHTML = `$ roles --current ${currentRole.substring(0, charIndex + 1)}_`;
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeRoles, pauseTime);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRoles, 500);
    } else {
        setTimeout(typeRoles, isDeleting ? deletingSpeed : typingSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    typeRoles();
});

// Intersection Observer for Reveal Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Mouse-tracking glow effect
document.addEventListener('mousemove', (e) => {
    const glows = document.querySelectorAll('.bg-glow');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    glows.forEach((glow, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX * speed);
        const y = (mouseY * speed);
        glow.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Terminal-like contact form feedback
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;

        btn.innerHTML = 'Sending... [>.......]';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = 'Deployment Successful! ✓';
            btn.style.background = 'var(--accent-emerald)';
            contactForm.reset();

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))';
                btn.disabled = false;
            }, 3000);
        }, 2000);
    });
}
