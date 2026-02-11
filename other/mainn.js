// ==================== CUSTOM CURSOR ====================
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursorFollower');
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hover effects for cursor
        const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card, .skill-card, .contact-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });
        
        // ==================== SCROLL PROGRESS ====================
        const scrollProgress = document.getElementById('scrollProgress');
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });
        
        // ==================== SCROLL REVEAL ====================
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
        
        // ==================== NAVIGATION ====================
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.getAttribute('data-section');
                document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        // ==================== FORM VALIDATION ====================
        document.querySelector('.contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields!');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address!');
                return;
            }
            
            alert('Thank you for your message! I will get back to you soon.');
            e.target.reset();
        });
        
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // ==================== SMOOTH SCROLL ====================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // ==================== PARALLAX EFFECT ====================
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const floatItems = document.querySelectorAll('.float-item');
            floatItems.forEach((item, index) => {
                const speed = 0.1 + index * 0.05;
                item.style.transform = `translateY(${-scrolled * speed}px)`;
            });
        });
        
        // ==================== COUNTER ANIMATION ====================
        const stats = document.querySelectorAll('.stat-number');
        let statsAnimated = false;
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    stats.forEach(stat => {
                        const target = stat.textContent;
                        const num = parseInt(target);
                        animateCounter(stat, 0, num, 2000);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(document.querySelector('.stats'));
        
        function animateCounter(element, start, end, duration) {
            const range = end;
            const increment = range / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= range) {
                    element.textContent = end + '+';
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + '+';
                }
            }, 16);
        }
        
        // ==================== PORTFOLIO HOVER EFFECTS ====================
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
        
        // ==================== LOADING ANIMATION ====================
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
        
        // ==================== ANIMATED PARTICLES ====================
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;
            const colors = [
                'rgba(102, 126, 234, 0.3)',
                'rgba(118, 75, 162, 0.3)',
                'rgba(240, 147, 251, 0.3)',
                'rgba(79, 172, 254, 0.3)',
                'rgba(0, 242, 254, 0.3)'
            ];
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = Math.random() * 100 + 50;
                const startX = Math.random() * window.innerWidth;
                const startY = Math.random() * window.innerHeight;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const duration = Math.random() * 10 + 10;
                const delay = Math.random() * 5;
                
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = startX + 'px';
                particle.style.top = startY + 'px';
                particle.style.background = `radial-gradient(circle, ${color}, transparent)`;
                particle.style.animationDuration = duration + 's';
                particle.style.animationDelay = delay + 's';
                particle.style.filter = 'blur(' + (Math.random() * 30 + 20) + 'px)';
                
                particlesContainer.appendChild(particle);
            }
        }
        
        createParticles();
        
        // Recreate particles on window resize
        window.addEventListener('resize', () => {
            const particlesContainer = document.getElementById('particles');
            particlesContainer.innerHTML = '';
            createParticles();
        });
        
        // ==================== NAVIGATION TOGGLE ====================
        const navToggle = document.getElementById('navToggle');
        const nav = document.querySelector('.nav');
        const navBtns = document.querySelectorAll('.nav-btn');
        let navVisible = true;
        
        // Animate nav buttons on load
        window.addEventListener('load', () => {
            navBtns.forEach((btn, index) => {
                setTimeout(() => {
                    btn.classList.add('animate-in');
                }, 100 + index * 100);
            });
        });
        
        navToggle.addEventListener('click', () => {
            navVisible = !navVisible;
            if (navVisible) {
                nav.classList.remove('hidden');
                navToggle.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';
                // Animate buttons in
                navBtns.forEach((btn, index) => {
                    btn.classList.remove('animate-out');
                    btn.classList.add('animate-in');
                    btn.style.animationDelay = (index * 0.08) + 's';
                });
            } else {
                nav.classList.add('hidden');
                navToggle.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';
                // Animate buttons out
                navBtns.forEach((btn, index) => {
                    btn.classList.remove('animate-in');
                    btn.classList.add('animate-out');
                    btn.style.animationDelay = (navBtns.length - 1 - index) * 0.08 + 's';
                });
            }
        });