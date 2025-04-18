// === Modern ES Module Implementation ===

// 1. Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// 2. Floating Particles (Canvas-based)
class ParticleSystem {
    constructor() {
        this.canvas = document.querySelector('.particles-js');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.colors = ['rgba(15, 240, 252, 0.5)', 'rgba(150, 0, 255, 0.5)'];
        
        this.init();
        this.animate();
        window.addEventListener('resize', this.resize.bind(this));
    }
    
    init() {
        this.resize();
        this.particles = [];
        
        const particleCount = Math.floor(window.innerWidth / 10);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            });
        }
    }
    
    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0 || p.x > this.width) p.speedX *= -1;
            if (p.y < 0 || p.y > this.height) p.speedY *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
        });
        
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    
    // 3. Glass card hover effects
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${(y - rect.height/2) / 20}deg)
                rotateY(${(x - rect.width/2) / -20}deg)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // 4. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
