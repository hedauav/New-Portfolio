document.addEventListener('DOMContentLoaded', function() {
    // Particles.js initialization
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#6c63ff' },
                shape: { type: 'circle', stroke: { width: 0, color: '#000000' }, polygon: { nb_sides: 5 } },
                opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
                size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
                line_linked: { enable: true, distance: 150, color: '#6c63ff', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
            },
            retina_detect: true
        });
    }

    // Navigation menu toggle
    const hamburger = document.querySelector(".hamburger");
    const navBar = document.querySelector(".nav-bar");
    
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navBar.classList.toggle("active");
    });

    // Close menu when clicking on a nav item
    document.querySelectorAll(".nav-bar ul li a").forEach(n => 
        n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navBar.classList.remove("active");
        })
    );

    // Sticky header
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-bar ul li a");

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
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

    window.addEventListener('scroll', updateActiveLink);

    // Back to top button
    const backToTop = document.querySelector(".back-to-top");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.classList.add("active");
        } else {
            backToTop.classList.remove("active");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Theme toggle
    const themeToggle = document.querySelector(".theme-toggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
    });

    // Check for saved theme preference
    if (localStorage.getItem("dark-mode") === "true") {
        document.body.classList.add("dark-mode");
    }

    // Typing animation
    const typedTextSpan = document.querySelector(".typed-text");
    const cursor = document.querySelector(".cursor");
    const words = ["Web Developer", "UI/UX Designer", "Freelancer", "Creative Thinker"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function typeEffect() {
        isEnd = false;
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typedTextSpan.textContent = currentChar;
        
        if (!isDeleting && charIndex < currentWord.length) {
            // Typing
            charIndex++;
            setTimeout(typeEffect, 100);
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            charIndex--;
            setTimeout(typeEffect, 50);
        } else {
            // Change word
            isEnd = true;
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(typeEffect, isDeleting ? 1000 : 1200);
        }
    }

    if (typedTextSpan) {
        setTimeout(typeEffect, 1000);
    }

    // Scroll reveal animation
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const revealTop = reveals[i].getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (revealTop < windowHeight - revealPoint) {
                reveals[i].classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Initial check

    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-per');
        skillBars.forEach(skillBar => {
            const percentage = skillBar.getAttribute('per');
            skillBar.style.width = percentage;
        });
    }

    // Animate circular progress
    function animateCircularProgress() {
        const circles = document.querySelectorAll('.progress-ring-circle-fill');
        const circumference = 2 * Math.PI * 50; // r = 50
        
        circles.forEach(circle => {
            const percent = circle.dataset.percent;
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference;
            
            setTimeout(() => {
                circle.style.strokeDashoffset = offset;
            }, 500);
        });
    }

    // Intersection Observer for skill animations
    const skillsSection = document.querySelector('#skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                animateCircularProgress();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Simple validation checks
            if (nameInput.value.trim() === '') {
                highlightInvalid(nameInput);
                isValid = false;
            } else {
                removeHighlight(nameInput);
            }
            
            if (emailInput.value.trim() === '' || !isEmailValid(emailInput.value)) {
                highlightInvalid(emailInput);
                isValid = false;
            } else {
                removeHighlight(emailInput);
            }
            
            if (subjectInput.value.trim() === '') {
                highlightInvalid(subjectInput);
                isValid = false;
            } else {
                removeHighlight(subjectInput);
            }
            
            if (messageInput.value.trim() === '') {
                highlightInvalid(messageInput);
                isValid = false;
            } else {
                removeHighlight(messageInput);
            }
            
            // If the form is valid, you would normally submit it here
            if (isValid) {
                alert('Message sent successfully!');
                contactForm.reset();
            }
        });
    }

    function isEmailValid(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function highlightInvalid(element) {
        element.style.borderColor = 'red';
    }

    function removeHighlight(element) {
        element.style.borderColor = '';
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (emailInput.value.trim() === '' || !isEmailValid(emailInput.value)) {
                highlightInvalid(emailInput);
            } else {
                removeHighlight(emailInput);
                alert('Subscribed successfully!');
                newsletterForm.reset();
            }
        });
    }
});