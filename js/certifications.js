import { certifications } from './data.js';

export function renderCertifications() {
  const grid = document.getElementById('certificationsGrid');
  if (!grid) {
    return;
  }

  grid.innerHTML = certifications
    .map((cert) => {
      const featuredClass = cert.featured ? ' cert-card-featured' : '';
      const linkHtml = cert.credlyUrl
        ? `<a href="${cert.credlyUrl}" class="cert-link" target="_blank" rel="noopener noreferrer">Verify on Credly ↗</a>`
        : '';

      return `
    <article class="cert-card stagger-item${featuredClass}">
      ${cert.featured ? '<p class="cert-featured-label">Primary Certification</p>' : ''}
      <p class="cert-issuer">${cert.issuer}</p>
      <h3 class="cert-title">${cert.name}</h3>
      <p class="cert-status">✓ ${cert.status}</p>
      ${linkHtml}
    </article>
  `;
    })
    .join('');
}
