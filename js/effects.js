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

export function initHorizontalProjects() {
  const wrap = document.getElementById('projectsScroll');
  if (!wrap) {
    return;
  }

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  wrap.addEventListener('mousedown', (e) => {
    isDown = true;
    wrap.classList.add('grabbing');
    startX = e.pageX - wrap.offsetLeft;
    scrollLeft = wrap.scrollLeft;
  });

  wrap.addEventListener('mouseleave', () => {
    isDown = false;
    wrap.classList.remove('grabbing');
  });

  wrap.addEventListener('mouseup', () => {
    isDown = false;
    wrap.classList.remove('grabbing');
  });

  wrap.addEventListener('mousemove', (e) => {
    if (!isDown) {
      return;
    }
    e.preventDefault();
    const x = e.pageX - wrap.offsetLeft;
    const walk = (x - startX) * 1.5;
    wrap.scrollLeft = scrollLeft - walk;
  });

  if (window.matchMedia('(min-width: 768px)').matches) {
    wrap.addEventListener(
      'wheel',
      (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          wrap.scrollLeft += e.deltaY * 1.2;
        }
      },
      { passive: false }
    );
  }
}

export function initProjectPreviews() {
  document.querySelectorAll('.project-card[data-preview]').forEach((card) => {
    const src = card.dataset.preview;
    if (!src) {
      return;
    }

    let img = card.querySelector('.project-preview-img');
    if (!img) {
      img = document.createElement('img');
      img.className = 'project-preview-img';
      img.loading = 'lazy';
      img.alt = `${card.dataset.title || 'Project'} preview`;
      card.insertBefore(img, card.firstChild);
    }

    img.src = src;
    img.onerror = () => {
      img.style.display = 'none';
    };
  });
}
