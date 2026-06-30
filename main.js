/* ==================== TYPED TEXT ==================== */
const phrases = [
  'Software Engineer',
  'Full-Stack Developer',
  'iOS Developer',
  'Backend Developer',
  'Agile Team Player',
];

let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = phrases[phraseIdx];
  if (deleting) {
    typedEl.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; setTimeout(type, 400); return; }
    setTimeout(type, 50);
  } else {
    typedEl.textContent = current.substring(0, charIdx++);
    if (charIdx > current.length) { deleting = true; setTimeout(type, 1800); return; }
    setTimeout(type, 90);
  }
}
type();

/* ==================== NAVBAR SCROLL ==================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

/* ==================== ACTIVE NAV LINK ==================== */
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

/* ==================== HAMBURGER ==================== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ==================== SCROLL REVEAL ==================== */
const revealEls = document.querySelectorAll(
  '.glass-card, .section-label, .section-title, .about-text h2, .about-text p, .contact-sub, .hero-stats, .timeline-item'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i * 0.04) + 's';
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

/* ==================== SMOOTH HOVER ON PROJECT CARDS ==================== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ==================== PARTICLE DOTS (hero) ==================== */
(function () {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;z-index:0;pointer-events:none;opacity:0.35;';
  document.querySelector('.hero-bg').appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W, H, dots = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 60; i++) {
    dots.push({ x: Math.random() * 1920, y: Math.random() * 1080, r: Math.random() * 1.5 + 0.3, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 });
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
      if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = '#6366f1'; ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ==================== REGION SWITCHER LOGIC ==================== */
const regionData = {
  AU: {
    name: 'Zi You Lim',
    firstName: 'Zi You',
    lastName: 'Lim',
    phone: '+61 472 681 061',
    tel: 'tel:+61472681061',
    copyright: '© 2026 Zi You Lim'
  },
  MY: {
    name: 'Lim Zi You',
    firstName: 'Lim',
    lastName: 'Zi You',
    phone: '+60 12 938 2782',
    tel: 'tel:+60129382782',
    copyright: '© 2026 Lim Zi You'
  }
};

const regionSwitch = document.getElementById('region-switch');
if (regionSwitch) {
  const btns = regionSwitch.querySelectorAll('.region-btn');
  const heroNameEl = document.getElementById('hero-name');
  const aboutNameEl = document.getElementById('about-name');
  const footerCopyEl = document.getElementById('footer-copy');
  const contactPhoneEl = document.getElementById('contact-phone');
  const contactPhoneVal = document.getElementById('contact-phone-value');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const region = btn.getAttribute('data-region');
      
      // Update active button state
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const data = regionData[region];
      if (data) {
        // Dynamically update document title
        document.title = `${data.name} – Software Engineering Portfolio`;

        // Update name outputs
        if (heroNameEl) {
          heroNameEl.innerHTML = `${data.firstName} <span class="gradient-text">${data.lastName}</span>`;
        }
        if (aboutNameEl) {
          aboutNameEl.textContent = data.name;
        }
        if (footerCopyEl) {
          footerCopyEl.textContent = data.copyright;
        }
        // Update contact number link & values
        if (contactPhoneEl) {
          contactPhoneEl.setAttribute('href', data.tel);
        }
        if (contactPhoneVal) {
          contactPhoneVal.textContent = data.phone;
        }
      }
    });
  });
}

