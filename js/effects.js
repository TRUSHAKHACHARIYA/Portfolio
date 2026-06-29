export function wrapWords(el) {
  if (!el || el.dataset.wordsWrapped) {
    return;
  }

  const html = el.innerHTML.trim();
  const parts = html.split(/(<[^>]+>)/g).filter(Boolean);

  el.innerHTML = parts
    .map((part) => {
      if (part.startsWith('<')) {
        return part;
      }
      return part
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => `<span class="word-reveal-wrap"><span class="word-reveal">${w}</span></span>`)
        .join(' ');
    })
    .join('');

  el.dataset.wordsWrapped = 'true';
}

export function revealHeroWords(delay = 300) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.word-reveal').forEach((w) => w.classList.add('visible'));
    return;
  }

  const words = document.querySelectorAll('.word-reveal');
  words.forEach((w, i) => {
    setTimeout(() => w.classList.add('visible'), delay + i * 80);
  });
}

export function initHeroTextReveal() {
  const line1 = document.getElementById('heroNameLine');
  const line2 = document.getElementById('heroSurnameLine');

  if (line1) {
    wrapWords(line1);
  }
  if (line2) {
    wrapWords(line2);
  }
}

export function renderSectionMarquees(sectionMarquees) {
  document.querySelectorAll('[data-section-marquee]').forEach((el) => {
    const index = Number(el.dataset.sectionMarquee);
    const config = sectionMarquees[index];
    if (!config) {
      return;
    }

    const doubled = [...config.items, ...config.items];
    const spans = doubled
      .map((label) => `<span>${label}</span><span class="marquee-dot">·</span>`)
      .join('');

    const direction = config.reverse ? ' reverse' : '';
    el.innerHTML = `<div class="marquee-track${direction}" style="animation-duration:${config.speed}s">${spans}</div>`;
  });
}
