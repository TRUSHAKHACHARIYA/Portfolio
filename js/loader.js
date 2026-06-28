export function initLoader(onComplete) {
  const loader = document.getElementById('loader');
  if (!loader) {
    onComplete?.();
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loader.remove();
    onComplete?.();
    return;
  }

  const fill = document.getElementById('loader-bar-fill');
  const pctEl = document.getElementById('loader-pct');
  let pct = 0;

  const interval = setInterval(() => {
    pct += Math.random() * 18;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);
      if (fill) {
        fill.style.width = '100%';
      }
      if (pctEl) {
        pctEl.textContent = '100%';
      }
      setTimeout(() => {
        loader.classList.add('done');
        setTimeout(() => {
          loader.remove();
          onComplete?.();
        }, 1000);
      }, 300);
      return;
    }
    if (fill) {
      fill.style.width = `${Math.min(pct, 100)}%`;
    }
    if (pctEl) {
      pctEl.textContent = `${Math.floor(Math.min(pct, 100))}%`;
    }
  }, 60);
}
