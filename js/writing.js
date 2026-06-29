import { writingFeatured, siteConfig } from './data.js';

export function renderWriting() {
  const grid = document.getElementById('writingGrid');
  if (!grid) {
    return;
  }

  grid.innerHTML = `
    <article class="published-course-card stagger-item">
      <p class="published-course-label">Writing</p>
      <p class="published-course-provider">${writingFeatured.platform}</p>
      <h3 class="published-course-title">${writingFeatured.title}</h3>
      <p class="published-course-desc">${writingFeatured.desc}</p>
      <p class="published-course-status">● ${writingFeatured.status}</p>
      <a href="${writingFeatured.url || siteConfig.mediumUrl}" class="published-course-link" id="mediumProfileLink" target="_blank" rel="noopener noreferrer">${writingFeatured.linkLabel}</a>
    </article>
  `;
}
