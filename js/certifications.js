import { certifications } from './data.js';

function renderModules(modules) {
  if (!modules?.length) {
    return '';
  }

  const items = modules
    .map(
      (module) => `
      <li class="cert-module">
        <span class="cert-module-name">${module.name}</span>
        <a href="${module.verifyUrl}" class="cert-link cert-module-link" target="_blank" rel="noopener noreferrer">Verify ↗</a>
      </li>
    `
    )
    .join('');

  return `<ul class="cert-modules">${items}</ul>`;
}

export function renderCertifications() {
  const grid = document.getElementById('certificationsGrid');
  if (!grid) {
    return;
  }

  grid.innerHTML = certifications
    .map((cert) => {
      const featuredClass = cert.featured ? ' cert-card-featured' : '';
      const featuredLabel = cert.featured
        ? `<p class="cert-featured-label">${cert.featuredLabel || 'Primary Certification'}</p>`
        : '';
      const linkHtml = cert.verifyUrl
        ? `<a href="${cert.verifyUrl}" class="cert-link" target="_blank" rel="noopener noreferrer">${cert.linkLabel || 'Verify Certificate ↗'}</a>`
        : '';
      const modulesHtml = renderModules(cert.modules);

      return `
    <article class="cert-card stagger-item${featuredClass}">
      ${featuredLabel}
      <p class="cert-issuer">${cert.issuer}</p>
      <h3 class="cert-title">${cert.name}</h3>
      <p class="cert-status">✓ ${cert.status}</p>
      ${modulesHtml}
      ${linkHtml}
    </article>
  `;
    })
    .join('');
}
