// Particle Background Effect
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4}px;
        height: ${Math.random() * 4}px;
        background: white;
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5};
        animation: float ${5 + Math.random() * 10}s linear infinite;
    `;
    particlesContainer.appendChild(particle);
}

// Typewriter Effect (Optional)
const typewriterText = "Innovate. Create. Elevate.";
let i = 0;
const typewriter = document.querySelector('.typewriter');

function type() {
    if (i < typewriterText.length) {
        typewriter.textContent += typewriterText.charAt(i);
        i++;
        setTimeout(type, 100);
    }
}
type();
