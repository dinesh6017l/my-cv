/* ================================================
   CV Template — Interactive JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ——————————————————————————————————
    // 1. Dark / Light Theme Toggle
    // ——————————————————————————————————
    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('cv-theme');

    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeBtn.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('cv-theme', next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        const icon = themeBtn.querySelector('i');
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    // ——————————————————————————————————
    // 2. Print / Download
    // ——————————————————————————————————
    document.getElementById('print-btn').addEventListener('click', () => {
        window.print();
    });

    // ——————————————————————————————————
    // 3. Scroll-to-top button
    // ——————————————————————————————————
    const scrollBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ——————————————————————————————————
    // 4. Animate skill bars on scroll
    // ——————————————————————————————————
    const skillFills = document.querySelectorAll('.skill-fill');
    let skillsAnimated = false;

    function animateSkills() {
        if (skillsAnimated) return;
        const container = document.querySelector('.skills-container');
        if (!container) return;
        const rect = container.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            skillFills.forEach((bar, i) => {
                setTimeout(() => {
                    bar.style.width = bar.dataset.width + '%';
                }, i * 120);
            });
            skillsAnimated = true;
        }
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Run on load in case already in view

    // ——————————————————————————————————
    // 5. Intersection Observer for sections
    // ——————————————————————————————————
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => observer.observe(section));

    // ——————————————————————————————————
    // 6. Staggered entrance for timeline items
    // ——————————————————————————————————
    const timelineItems = document.querySelectorAll('.timeline-item');
    const tlObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                tlObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
        tlObserver.observe(item);
    });

    // ——————————————————————————————————
    // 7. Staggered entrance for project & cert cards
    // ——————————————————————————————————
    const cards = document.querySelectorAll('.project-card, .cert-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
        cardObserver.observe(card);
    });

    // ——————————————————————————————————
    // 8. Typing effect on the job title
    // ——————————————————————————————————
    const titleEl = document.querySelector('.title');
    if (titleEl) {
        const originalText = titleEl.textContent;
        titleEl.textContent = '';
        let charIndex = 0;
        function typeChar() {
            if (charIndex < originalText.length) {
                titleEl.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 50 + Math.random() * 40);
            }
        }
        setTimeout(typeChar, 600);
    }

    // ——————————————————————————————————
    // 9. Smooth parallax on sidebar photo
    // ——————————————————————————————————
    const photo = document.querySelector('.profile-photo');
    if (photo && window.innerWidth > 900) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            photo.style.transform = `translateY(${y * 0.08}px) scale(${1 - y * 0.0002})`;
        });
    }
});
