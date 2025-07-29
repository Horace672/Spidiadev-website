// Enhanced JavaScript for SPIDIA website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS only if not already initialized
    if (typeof AOS !== 'undefined' && !document.querySelector('[data-aos]').classList.contains('aos-init')) {
        AOS.init({ 
            once: true,
            duration: 800,
            easing: 'ease-out-cubic',
            offset: 100
        });
    }

    // Hero text cycling animation
    function initHeroTextCycling() {
        const heroSpans = document.querySelectorAll('.hero-title span');
        if (heroSpans.length >= 3) {
            const texts = [
                ['Créer.', 'text-gradient-artistic'],
                ['Inspirer.', 'text-outline'],
                ['Impressionner.', 'text-shadow-glow']
            ];
            let currentIndex = 0;

            function cycleText() {
                heroSpans.forEach((span, index) => {
                    span.style.opacity = '0';
                    span.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        const newTextIndex = (currentIndex + index) % texts.length;
                        span.textContent = texts[newTextIndex][0];
                        span.className = texts[newTextIndex][1];
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    }, 300);
                });

                currentIndex = (currentIndex + 1) % texts.length;
            }

            // Initial setup
            heroSpans.forEach(span => {
                span.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });

            // Start cycling every 4 seconds
            setInterval(cycleText, 4000);
        }
    }

    // Enhanced magnetic buttons
    function initMagneticButtons() {
        const magneticElements = document.querySelectorAll('.btn-primary, .accent-btn, .btn-3d-primary, .service-card, .glass-card');

        magneticElements.forEach(element => {
            element.addEventListener('mouseenter', function(e) {
                this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });

            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;

                const intensity = this.classList.contains('service-card') || this.classList.contains('glass-card') ? 5 : 8;

                requestAnimationFrame(() => {
                    this.style.transform = `translate(${deltaX * intensity}px, ${deltaY * intensity}px) scale(1.02)`;
                });
            });

            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    // Enhanced parallax effect
    function initParallaxEffect() {
        let ticking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-element, .hero-section img');

            parallaxElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });

            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    // Enhanced intersection observer for staggered animations
    function initStaggeredAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-slide-up');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for staggered animation
        document.querySelectorAll('.service-card, .testimonial-card, .portfolio-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn, #burger-btn');
    const mobileMenu = document.querySelector('.mobile-menu, #mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');

            // Toggle hamburger icon
            const icon = this.querySelector('svg path');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
                } else {
                    icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
                }
            }
        });

        // Close mobile menu when clicking on nav links
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('svg path');
                if (icon) {
                    icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
                }
            });
        });
    }

    // Enhanced FAQ functionality
    document.querySelectorAll('.faq-toggle').forEach((btn) => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('svg');
            const isOpen = !content.classList.contains('hidden');

            // Close all other FAQ items
            document.querySelectorAll('.faq-content').forEach(c => {
                c.classList.add('hidden');
                c.style.maxHeight = null;
            });
            document.querySelectorAll('.faq-toggle svg').forEach(i => {
                i.classList.remove('rotate-45');
            });

            // Open clicked item if it was closed
            if (!isOpen) {
                content.classList.remove('hidden');
                icon.classList.add('rotate-45');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.custom-navbar, header');

    if (navbar) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            }

            lastScrollTop = scrollTop;
        }, { passive: true });
    }

    // Calculator functionality
    function updateCalculator() {
        const siteType = document.getElementById('siteType');
        const pageCount = document.getElementById('pageCount');
        const designType = document.getElementById('designType');
        const deliveryTime = document.getElementById('deliveryTime');
        const featureCheckboxes = document.querySelectorAll('.feature-checkbox');

        if (!siteType) return;

        const basePrice = parseInt(siteType.selectedOptions[0].getAttribute('data-price')) || 0;
        const designPrice = parseInt(designType.selectedOptions[0].getAttribute('data-price')) || 0;
        const deliveryPrice = deliveryTime ? parseInt(deliveryTime.selectedOptions[0].getAttribute('data-price')) || 0 : 0;

        const pageValue = parseInt(pageCount.value) || 1;
        let pagePrice = 0;
        if (pageValue > 5) {
            pagePrice = (pageValue - 5) * 15000;
        }

        let featuresPrice = 0;
        featureCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                featuresPrice += parseInt(checkbox.getAttribute('data-price')) || 0;
            }
        });

        const total = basePrice + pagePrice + designPrice + featuresPrice + deliveryPrice;

        function formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
        }

        document.getElementById('basePrice').textContent = formatPrice(basePrice);
        document.getElementById('pagePrice').textContent = formatPrice(pagePrice);
        document.getElementById('designPrice').textContent = formatPrice(designPrice);
        document.getElementById('featuresPrice').textContent = formatPrice(featuresPrice);
        document.getElementById('deliveryPrice').textContent = formatPrice(deliveryPrice);
        document.getElementById('totalPrice').textContent = formatPrice(total);

        document.getElementById('pageCountValue').textContent = pageValue;
        document.getElementById('pageCountDisplay').textContent = pageValue;

        updateRecapitulatif();
    }

    function updateRecapitulatif() {
        const siteType = document.getElementById('siteType');
        const pageCount = document.getElementById('pageCount');
        const designType = document.getElementById('designType');
        const deliveryTime = document.getElementById('deliveryTime');
        const featureCheckboxes = document.querySelectorAll('.feature-checkbox');

        if (!siteType) return;

        const selectedSite = siteType.options[siteType.selectedIndex].text;
        const selectedPages = pageCount.value;
        const selectedDesign = designType.options[designType.selectedIndex].text;
        const selectedDelivery = deliveryTime.options[deliveryTime.selectedIndex].text;

        let selectedFeatures = [];
        featureCheckboxes.forEach(cb => {
            if (cb.checked) {
                const label = cb.closest('label').querySelector('span.text-sm');
                selectedFeatures.push(label?.innerText || 'Fonction');
            }
        });

        const recapElements = {
            recapSiteType: document.getElementById('recapSiteType'),
            recapPageCount: document.getElementById('recapPageCount'),
            recapDesign: document.getElementById('recapDesign'),
            recapDelivery: document.getElementById('recapDelivery'),
            recapFeatures: document.getElementById('recapFeatures'),
            recapTotal: document.getElementById('recapTotal')
        };

        if (recapElements.recapSiteType) recapElements.recapSiteType.textContent = selectedSite;
        if (recapElements.recapPageCount) recapElements.recapPageCount.textContent = selectedPages + ' pages';
        if (recapElements.recapDesign) recapElements.recapDesign.textContent = selectedDesign;
        if (recapElements.recapDelivery) recapElements.recapDelivery.textContent = selectedDelivery;
        if (recapElements.recapFeatures) recapElements.recapFeatures.textContent = selectedFeatures.length > 0 ? selectedFeatures.join(', ') : 'Aucune';

        const totalText = document.getElementById('totalPrice');
        if (totalText && recapElements.recapTotal) {
            recapElements.recapTotal.textContent = totalText.textContent;
        }
    }

    // Initialize calculator events
    ['siteType', 'pageCount', 'designType', 'deliveryTime'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', updateCalculator);
            element.addEventListener('input', updateCalculator);
        }
    });

    // Initialize all enhanced features
    initHeroTextCycling();
    initMagneticButtons();
    initParallaxEffect();
    initStaggeredAnimations();
    updateCalculator();

    // Scroll progress indicator
    window.addEventListener('scroll', () => {
        const scroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scroll / height) * 100;
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    }, { passive: true });

    // Form validation
    function verifierChampsFormulaire() {
        const nom = document.getElementById('nom')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const telephone = document.getElementById('telephone')?.value.trim();
        const entreprise = document.getElementById('entreprise')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        const bouton = document.getElementById('whatsapp-submit');

        const tousRemplis = [nom, email, telephone, entreprise, message].every(champ => champ && champ.length >= 2);

        if (bouton) {
            bouton.disabled = !tousRemplis;
            bouton.classList.toggle("opacity-50", !tousRemplis);
            bouton.classList.toggle("cursor-not-allowed", !tousRemplis);
        }
    }

    ['nom', 'email', 'telephone', 'entreprise', 'message'].forEach(id => {
        const champ = document.getElementById(id);
        if (champ) {
            champ.addEventListener('input', verifierChampsFormulaire);
        }
    });

    verifierChampsFormulaire();
});

// Global functions for HTML onclick handlers
function envoyerWhatsApp() {
    const nom = document.getElementById('nom')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const telephone = document.getElementById('telephone')?.value.trim();
    const entreprise = document.getElementById('entreprise')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!nom || !email || !telephone || !entreprise || !message) {
        alert("Veuillez remplir tous les champs avant d'envoyer votre message.");
        return;
    }

    const texteFinal = `
Bonjour, je m'appelle ${nom}. Voici mon email : ${email}, mon numéro : ${telephone}, et le nom de mon entreprise est "${entreprise}".

Voici la configuration de mon site :
${message}

Pouvons-nous en discuter plus en profondeur ?
    `.trim();

    const numeroWhatsApp = "22951252514";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texteFinal)}`;

    window.open(url, '_blank');
}

function reporterConfigurationVersFormulaire() {
    const siteType = document.getElementById('siteType');
    const pageCount = document.getElementById('pageCount');
    const designType = document.getElementById('designType');
    const deliveryTime = document.getElementById('deliveryTime');
    const features = document.querySelectorAll('.feature-checkbox');

    if (!siteType) return;

    const selectedSite = siteType.options[siteType.selectedIndex].text;
    const selectedPages = pageCount.value;
    const selectedDesign = designType.options[designType.selectedIndex].text;
    const selectedDelivery = deliveryTime.options[deliveryTime.selectedIndex].text;

    let selectedFeatures = [];
    features.forEach(f => {
        if (f.checked) {
            const label = f.closest('label').querySelector('span.text-sm');
            selectedFeatures.push(label?.innerText || "Fonctionnalité");
        }
    });

    let resume = `🧩 Configuration du site :\n`;
    resume += `• Type de site : ${selectedSite}\n`;
    resume += `• Nombre de pages : ${selectedPages}\n`;
    resume += `• Design : ${selectedDesign}\n`;
    resume += `• Délai de livraison : ${selectedDelivery}\n`;
    if (selectedFeatures.length > 0) {
        resume += `• Fonctionnalités : ${selectedFeatures.join(', ')}\n`;
    }

    const total = document.getElementById('totalPrice')?.textContent;
    if (total) {
        resume += `• Coût total estimé : ${total}`;
    }

    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        messageTextarea.value = resume;
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
}

function envoyerVersWhatsApp(e) {
    e.preventDefault();
    envoyerWhatsApp();
}