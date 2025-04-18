// Initialize on all pages
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${Math.random() * 4}px;
            height: ${Math.random() * 4}px;
            animation-duration: ${Math.random() * 30 + 10}s;
        `;
        container.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', initParticles);
