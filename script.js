// النقط المنتشرة
const particlesContainer = document.getElementById('particles');
const particleCount = window.innerWidth < 700 ? 25 : 50;

for (let i = 0; i < particleCount; i++) {
  const p = document.createElement('div');

  p.classList.add('particle');

  const size = Math.random() * 3 + 2;

  p.style.width = `${size}px`;
  p.style.height = `${size}px`;
  p.style.top = `${Math.random() * 100}%`;
  p.style.left = `${Math.random() * 100}%`;
  p.style.opacity = Math.random() * 0.6 + 0.2;

  particlesContainer.appendChild(p);
}

function animateSingleParticle(p) {
  const duration = Math.random() * 15 + 10;
  const moveX = (Math.random() - 0.5) * 60;
  const moveY = (Math.random() - 0.5) * 60;

  p.style.transition = `transform ${duration}s ease-in-out`;
  p.style.transform = `translate(${moveX}px, ${moveY}px)`;

  setTimeout(() => animateSingleParticle(p), duration * 1000);
}

setTimeout(() => {
  document.querySelectorAll('.particle').forEach(animateSingleParticle);
}, 300);


// عداد الأرقام
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
}, {
  threshold: 0.5
});

const statsSection = document.querySelector('.stats');

if (statsSection) {
  statsObserver.observe(statsSection);
}


// سلايدر الـ Work
const workSlider = document.getElementById('workSlider');
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');

if (workSlider && arrowLeft && arrowRight) {

  const scrollAmount = 340;

  arrowRight.addEventListener('click', () => {
    workSlider.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  arrowLeft.addEventListener('click', () => {
    workSlider.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

}


// فورم التواصل
const contactForm = document.getElementById('contactForm');
const YOUR_EMAIL = "sayednona01@gmail.com";

if (contactForm) {

  contactForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const name = document.getElementById('fromName').value;
    const email = document.getElementById('fromEmail').value;
    const message = document.getElementById('fromMessage').value;

    const subject = `New project inquiry from ${name}`;

    const body =
      `Name: ${name}%0A` +
      `Email: ${email}%0A%0A` +
      `Message:%0A${message}`;

    const gmailLink =
      `https://mail.google.com/mail/?view=cm&fs=1&to=${YOUR_EMAIL}&su=${encodeURIComponent(subject)}&body=${body}`;

    window.open(gmailLink, '_blank');

  });

}


// الروبوت
const robotIcon = document.getElementById('robotIcon');
const robotBubble = document.getElementById('robotBubble');
const bubbleClose = document.getElementById('bubbleClose');

setTimeout(() => {
  if (robotBubble) {
    robotBubble.classList.add('hidden');
  }
}, 9500);

if (bubbleClose) {

  bubbleClose.addEventListener('click', (e) => {

    e.stopPropagation();

    robotBubble.classList.add('hidden');

  });

}

if (robotIcon) {

  robotIcon.addEventListener('click', () => {

    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });

    if (robotBubble) {
      robotBubble.classList.add('hidden');
    }

  });

}


// Navbar: مؤشر متحرك + تتبع السكرول
const navbar = document.getElementById('navbar');
const navIndicator = document.getElementById('navIndicator');
const navLinks = document.querySelectorAll('.nav-link');
const navLinksContainer = document.querySelector('.nav-links');

function moveIndicator(link) {

  if (!link || !navIndicator || !navLinksContainer) {
    return;
  }

  const containerRect = navLinksContainer.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();

  const offsetX =
    linkRect.left - containerRect.left - 10;

  navIndicator.style.width = `${linkRect.width}px`;

  navIndicator.style.transform =
    `translateX(${offsetX}px)`;
}

window.addEventListener('load', () => {
  moveIndicator(
    document.querySelector('.nav-link.active')
  );
});

navLinks.forEach(link => {

  link.addEventListener('click', () => {

    navLinks.forEach(l =>
      l.classList.remove('active')
    );

    link.classList.add('active');

    moveIndicator(link);

  });

});

window.addEventListener('scroll', () => {

  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

});

const sections = document.querySelectorAll('section[id]');

const navScrollObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      const id = entry.target.getAttribute('id');

      const matchingLink =
        document.querySelector(
          `.nav-link[data-section="${id}"]`
        );

      if (matchingLink) {

        navLinks.forEach(l =>
          l.classList.remove('active')
        );

        matchingLink.classList.add('active');

        moveIndicator(matchingLink);

      }

    }

  });

}, {
  threshold: 0.4,
  rootMargin: '-80px 0px -50% 0px'
});

sections.forEach(section =>
  navScrollObserver.observe(section)
);

window.addEventListener('resize', () => {

  moveIndicator(
    document.querySelector('.nav-link.active')
  );

});


// Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }

  });

}, {
  threshold: 0.15
});

document.querySelector('.hero-text')?.classList.add('reveal-left');
document.querySelector('.hero-image')?.classList.add('reveal-right');

document.querySelectorAll('.stat-item')
  .forEach(el => el.classList.add('reveal', 'reveal-scale'));

document.querySelector('.skills-header')
  ?.classList.add('reveal');

document.querySelectorAll('.skill-item')
  .forEach(el => el.classList.add('reveal'));

document.querySelector('.why-header')
  ?.classList.add('reveal');

document.querySelectorAll('.why-item.align-left')
  .forEach(el => el.classList.add('reveal-left'));

document.querySelectorAll('.why-item.align-right')
  .forEach(el => el.classList.add('reveal-right'));

document.querySelector('.work-header')
  ?.classList.add('reveal');

document.querySelectorAll('.work-card')
  .forEach(el => el.classList.add('reveal', 'reveal-scale'));

document.querySelector('.contact-card')
  ?.classList.add('reveal', 'reveal-scale');

document.querySelectorAll(
  '.reveal,.reveal-left,.reveal-right,.reveal-scale'
).forEach(el => revealObserver.observe(el));


// Cursor Glow (كمبيوتر بس)
if (window.innerWidth > 900) {

  const cursorGlow = document.createElement('div');

  cursorGlow.classList.add('cursor-glow');

  document.body.appendChild(cursorGlow);

  window.addEventListener('mousemove', (e) => {

    cursorGlow.style.transform =
      `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;

  });

}


// Why-Me: إضاءة تتبع الماوس
document.querySelectorAll('.why-item').forEach(item => {

  item.addEventListener('mousemove', (e) => {

    const rect = item.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left) / rect.width) * 100;

    const y =
      ((e.clientY - rect.top) / rect.height) * 100;

    item.style.setProperty('--x', `${x}%`);
    item.style.setProperty('--y', `${y}%`);

  });

});

const workSlider = document.querySelector('.work-slider');
const arrowRight = document.getElementById('arrowRight');

if (workSlider && arrowRight) {
  arrowRight.addEventListener('click', () => {
    workSlider.scrollBy({
      left: 344,
      behavior: 'smooth'
    });
  });
}