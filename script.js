// توليد النقط الصغيرة المنتشرة في الخلفية
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');

  const size = Math.random() * 3 + 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  particle.style.top = `${Math.random() * 100}%`;
  particle.style.left = `${Math.random() * 100}%`;

  particle.style.opacity = Math.random() * 0.6 + 0.2;

  particlesContainer.appendChild(particle);
}

// عدّاد الأرقام المتحرك (Count Up Animation)
const statNumbers = document.querySelectorAll('.stat-number');

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const span = el.querySelector('span');
  const plusText = span ? span.outerHTML : '';
  let current = 0;
  const duration = 1500;
  const stepTime = Math.max(Math.floor(duration / target), 20);

  const timer = setInterval(() => {
    current++;
    el.innerHTML = current + plusText;
    if (current >= target) {
      clearInterval(timer);
    }
  }, stepTime);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statNumbers.forEach(num => animateCount(num));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// سلايدر قسم الـ Work
const workSlider = document.getElementById('workSlider');
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');

if (workSlider && arrowLeft && arrowRight) {
  const scrollAmount = 410;

  arrowRight.addEventListener('click', () => {
    workSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  arrowLeft.addEventListener('click', () => {
    workSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
}

// فورم التواصل - بيفتح جيميل برسالة جاهزة
const contactForm = document.getElementById('contactForm');
const YOUR_EMAIL = "sayednona01@gmail.com";

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('fromName').value;
    const email = document.getElementById('fromEmail').value;
    const message = document.getElementById('fromMessage').value;

    const subject = `New project inquiry from ${name}`;
    const body = `Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${YOUR_EMAIL}&su=${encodeURIComponent(subject)}&body=${body}`;

    window.open(gmailLink, '_blank');
  });
}

// ============================= 
// SCROLL REVEAL ANIMATION
// =============================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

// نضيف كلاس reveal لكل العناصر المهمة تلقائيًا
function initScrollReveal() {
  // Hero
  document.querySelector('.hero-text')?.classList.add('reveal-left');
  document.querySelector('.hero-image')?.classList.add('reveal-right');

  // Stats
  document.querySelectorAll('.stat-item').forEach(el => el.classList.add('reveal', 'reveal-scale'));

  // Skills header + items
  document.querySelector('.skills-header')?.classList.add('reveal');
  document.querySelectorAll('.skill-item').forEach(el => el.classList.add('reveal'));

  // Why me
  document.querySelector('.why-header')?.classList.add('reveal');
  document.querySelectorAll('.why-item.align-left').forEach(el => el.classList.add('reveal-left'));
  document.querySelectorAll('.why-item.align-right').forEach(el => el.classList.add('reveal-right'));

  // Work
  document.querySelector('.work-header')?.classList.add('reveal');
  document.querySelectorAll('.work-card').forEach(el => el.classList.add('reveal', 'reveal-scale'));

  // Contact
  document.querySelector('.contact-card')?.classList.add('reveal', 'reveal-scale');

  // نراقب كل العناصر دي
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });
}
initScrollReveal();

// ============================= 
// CUSTOM CURSOR GLOW
// =============================
const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

window.addEventListener('mousemove', (e) => {
  cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
});

// ============================= 
// PARALLAX خفيف على صورة الهيرو مع حركة الماوس
// =============================
const heroImage = document.querySelector('.hero-image');

if (heroImage) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroImage.style.setProperty('--parallax-x', `${x}px`);
    heroImage.style.setProperty('--parallax-y', `${y}px`);
    heroImage.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// ============================= 
// حركة النقط العشوائية في الخلفية (Drift)
// =============================
function animateParticles() {
  const allParticles = document.querySelectorAll('.particle');
  allParticles.forEach(p => {
    const duration = Math.random() * 15 + 10; // بين 10 و 25 ثانية
    const moveX = (Math.random() - 0.5) * 60;
    const moveY = (Math.random() - 0.5) * 60;

    p.style.transition = `transform ${duration}s ease-in-out`;
    p.style.transform = `translate(${moveX}px, ${moveY}px)`;

    // بعد ما تخلص الحركة، نحدد اتجاه جديد عشوائي وتكرر
    setTimeout(() => animateSingleParticle(p), duration * 1000);
  });
}

function animateSingleParticle(p) {
  const duration = Math.random() * 15 + 10;
  const moveX = (Math.random() - 0.5) * 60;
  const moveY = (Math.random() - 0.5) * 60;

  p.style.transition = `transform ${duration}s ease-in-out`;
  p.style.transform = `translate(${moveX}px, ${moveY}px)`;

  setTimeout(() => animateSingleParticle(p), duration * 1000);
}

// نستنى شوية بعد توليد النقط عشان نضمن إنها اتضافت في الـ DOM
setTimeout(animateParticles, 300);

// ============================= 
// NAVBAR: مؤشر متحرك + تفاعل مع السكرول + تتبع القسم الحالي
// =============================
const navbar = document.getElementById('navbar');
const navIndicator = document.getElementById('navIndicator');
const navLinks = document.querySelectorAll('.nav-link');
const navLinksContainer = document.querySelector('.nav-links');

// تحريك المؤشر تحت رابط معين
function moveIndicator(link) {
  if (!link || !navIndicator) return;
  const containerRect = navLinksContainer.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const offsetX = linkRect.left - containerRect.left - 12; // 12 = padding الكونتينر
  navIndicator.style.width = `${linkRect.width}px`;
  navIndicator.style.transform = `translateX(${offsetX}px)`;
}

// نحط المؤشر أول مرة تحت أول رابط بعد ما الصفحة تحمل
window.addEventListener('load', () => {
  const activeLink = document.querySelector('.nav-link.active');
  moveIndicator(activeLink);
});

// عند الدوس على أي رابط، نحرك المؤشر وننقل الـ active
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    moveIndicator(link);
  });
});

// تصغير الـ Navbar وتغيير خلفيته أثناء النزول بالسكرول
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// تحديث الرابط الفعّال تلقائي حسب القسم الظاهر في الشاشة أثناء السكرول
const sections = document.querySelectorAll('section[id]');

const navScrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (matchingLink) {
        navLinks.forEach(l => l.classList.remove('active'));
        matchingLink.classList.add('active');
        moveIndicator(matchingLink);
      }
    }
  });
}, { threshold: 0.4, rootMargin: '-80px 0px -50% 0px' });

sections.forEach(section => navScrollObserver.observe(section));

// إعادة ضبط المؤشر لو حجم الشاشة اتغير
window.addEventListener('resize', () => {
  const activeLink = document.querySelector('.nav-link.active');
  moveIndicator(activeLink);
});

// Why-Me: إضاءة تتبع الماوس جوا كل كارت
document.querySelectorAll('.why-item').forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    item.style.setProperty('--x', `${x}%`);
    item.style.setProperty('--y', `${y}%`);
  });
});