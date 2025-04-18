// ======================
// MAIN PORTFOLIO SCRIPTS
// ======================

// 1. Particle Background System
function initParticles() {
  const container = document.createElement('div');
  container.id = 'particles-js';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  `;
  document.body.prepend(container);

  for (let i = 0; i < 80; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 5 + 1}px;
      height: ${Math.random() * 5 + 1}px;
      background: rgba(15, 240, 252, ${Math.random() * 0.3});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 20 + 10}s linear infinite;
      filter: blur(${Math.random() * 2}px);
    `;
    container.appendChild(particle);
  }

  // Add to CSS dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      to { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); }
    }
  `;
  document.head.appendChild(style);
}

// 2. Glass Card Hover Effects
function setupCardInteractions() {
  const cards = document.querySelectorAll('.glass-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      card.style.transform = `
        perspective(1000px)
        rotateX(${(y - centerY) / 15}deg)
        rotateY(${(centerX - x) / 15}deg)
      `;
      card.style.boxShadow = `
        ${(x - centerX) / 5}px ${(y - centerY) / 5}px 30px rgba(15, 240, 252, 0.2)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
  });
}

// 3. Modal/Popup System
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modals = document.querySelectorAll('.modal');
  const closeBtns = document.querySelectorAll('.modal-close');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.dataset.modal;
      document.getElementById(modalId).classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

// 4. Navigation Smooth Scrolling
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
}

// 5. Voice Command System
function initVoiceControl() {
  const voiceBtn = document.getElementById('voice-btn');
  if (!('webkitSpeechRecognition' in window) || !voiceBtn) return;

  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  voiceBtn.addEventListener('click', () => {
    recognition.start();
    voiceBtn.classList.add('listening');
    voiceBtn.innerHTML = '🎤 Listening...';
  });

  recognition.onresult = (e) => {
    const command = e.results[0][0].transcript.toLowerCase();
    if (command.includes('about')) navigateTo('about.html');
    if (command.includes('health')) navigateTo('health.html');
    if (command.includes('skills')) navigateTo('skills.html');
    // Add more commands
  };

  recognition.onend = () => {
    voiceBtn.classList.remove('listening');
    voiceBtn.innerHTML = '🎤 Voice Control';
  };
}

// Helper function for voice navigation
function navigateTo(page) {
  window.location.href = page;
}

// 6. Page Load Animations
function animatePageLoad() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 150 * i);
  });
}

// ======================
// INITIALIZE EVERYTHING
// ======================
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  setupCardInteractions();
  initModals();
  setupSmoothScrolling();
  initVoiceControl();
  animatePageLoad();
});
