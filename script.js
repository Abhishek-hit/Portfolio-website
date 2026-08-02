// nav background on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.cssText += open
      ? ''
      : 'position:fixed;top:78px;left:20px;right:20px;flex-direction:column;background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:22px;padding:12px;align-items:stretch;z-index:99;';
  });
}

// scroll-reveal for sections
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => revealObserver.observe(el));

// project filter
const filterButtons = document.querySelectorAll('.project-filter button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.style.display = show ? 'flex' : 'none';
    });
  });
});

// contact form -> mailto handoff
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cName').value;
    const email = document.getElementById('cEmail').value;
    const message = document.getElementById('cMsg').value;

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `abhisek539700@gmail.com?subject=${subject}&body=${body}`;
  });
}

// hero API response card — typed JSON, then live status + counters
const apiBody = document.getElementById('apiBody');

const apiLines = [
  { raw: '{', html: '{' },
  { raw: '  "name": "Abhishek Sharma",', html: '  <span class="k">"name"</span>: <span class="s">"Abhishek Sharma"</span>,' },
  { raw: '  "role": "Full-Stack Java Developer",', html: '  <span class="k">"role"</span>: <span class="s">"Full-Stack Java Developer"</span>,' },
  { raw: '  "location": "India, Remote-friendly",', html: '  <span class="k">"location"</span>: <span class="s">"India, Remote-friendly"</span>,' },
  { raw: '  "status": "open_to_work",', html: '  <span class="k">"status"</span>: <span class="v-ok">"open_to_work"</span>,' },
  { raw: '  "stack": ["Java", "Spring Boot", "Kafka"],', html: '  <span class="k">"stack"</span>: [<span class="s">"Java"</span>, <span class="s">"Spring Boot"</span>, <span class="s">"Kafka"</span>],' },
  { raw: '  "response_time": "< 24h"', html: '  <span class="k">"response_time"</span>: <span class="s">"&lt; 24h"</span>' },
  { raw: '}', html: '}' },
];

function typeApiLine(lineObj, container, onDone) {
  const row = document.createElement('div');
  const cursor = document.createElement('span');
  cursor.className = 'api-cursor';
  container.appendChild(row);
  container.appendChild(cursor);

  let i = 0;
  const interval = setInterval(() => {
    row.textContent = lineObj.raw.slice(0, i + 1);
    i++;
    if (i >= lineObj.raw.length) {
      clearInterval(interval);
      row.innerHTML = lineObj.html;
      cursor.remove();
      setTimeout(onDone, 60);
    }
  }, 14);
}

function animateCount(el, target, suffix, duration) {
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function playApiCard() {
  apiBody.innerHTML = '';
  let i = 0;
  function next() {
    if (i >= apiLines.length) {
      const badge = document.getElementById('statusBadge');
      badge.textContent = '200 OK · 14ms';
      badge.classList.add('ok');
      animateCount(document.getElementById('statUptime'), 99.9, '%', 1000);
      animateCount(document.getElementById('statReq'), 12480, '', 1200);
      animateCount(document.getElementById('statLatency'), 14, 'ms', 800);
      return;
    }
    typeApiLine(apiLines[i], apiBody, () => { i++; next(); });
  }
  next();
}

if (apiBody) {
  const apiObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        playApiCard();
        apiObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  apiObserver.observe(apiBody);
}

const apiCopyBtn = document.querySelector('.api-copy');
if (apiCopyBtn) {
  apiCopyBtn.addEventListener('click', () => {
    const url = document.querySelector('.api-url').textContent;
    navigator.clipboard?.writeText(`https://${url}`).catch(() => { });
    apiCopyBtn.classList.remove('fa-copy');
    apiCopyBtn.classList.add('fa-check');
    setTimeout(() => {
      apiCopyBtn.classList.remove('fa-check');
      apiCopyBtn.classList.add('fa-copy');
    }, 1400);
  });
}
