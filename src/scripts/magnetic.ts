export function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.use-magnetic');

    magneticElements.forEach((el) => {
        // Cast to HTMLElement to access offset properties safely
        const htmlEl = el as HTMLElement;

        htmlEl.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = htmlEl.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Calculate translation (scale down the movement)
            const moveX = x * 0.2;
            const moveY = y * 0.2;

            htmlEl.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        htmlEl.addEventListener('mouseleave', () => {
            htmlEl.style.transform = 'translate(0px, 0px)';
            // Smoothly return to center
            htmlEl.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        htmlEl.addEventListener('mouseenter', () => {
            // Remove transition while moving so it sticks to pointer instantly
            htmlEl.style.transition = 'none';
        });
    });
}
