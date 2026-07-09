// ---------- mobile nav ----------
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

// ---------- scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ---------- waveform toggle ----------
(function initWaveform() {
  const bars = document.querySelector('[data-wf-bars]');
  const buttons = document.querySelectorAll('[data-wf-btn]');
  const caption = document.querySelector('[data-wf-caption]');
  if (!bars) return;

  const BAR_COUNT = 56;
  for (let i = 0; i < BAR_COUNT; i++) {
    const bar = document.createElement('i');
    bars.appendChild(bar);
  }
  const barEls = bars.querySelectorAll('i');

  function rawHeights() {
    return Array.from({ length: BAR_COUNT }, () => 8 + Math.random() * 82);
  }
  function cleanHeights() {
    return Array.from({ length: BAR_COUNT }, (_, i) => {
      const wave = Math.sin(i / BAR_COUNT * Math.PI * 3) * 22;
      return 40 + wave + (Math.random() * 8 - 4);
    });
  }

  function render(heights) {
    barEls.forEach((bar, i) => { bar.style.height = Math.max(6, heights[i]) + '%'; });
  }

  render(rawHeights());

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const clean = btn.dataset.wfBtn === 'clean';
      render(clean ? cleanHeights() : rawHeights());
      if (caption) {
        caption.textContent = clean
          ? 'Leveled, de-noised, and balanced. This is the version listeners actually hear.'
          : 'This is what comes in raw, before anything gets touched: background noise, uneven levels, the occasional mic bump.';
      }
    });
  });
})();
