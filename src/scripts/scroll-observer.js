export function initScrollObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Respect prefers-reduced-motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
                return;
            }

            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animate once only
            }
        });
    }, observerOptions);

    // Find all elements to be animated
    const elements = document.querySelectorAll('.scroll-fade-in');
    elements.forEach(el => observer.observe(el));
}
