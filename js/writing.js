import { writingPosts, siteConfig } from './data.js';

function renderWritingLinks(post) {
  if (post.mediumUrl) {
    return `<a href="${post.mediumUrl}" class="published-course-link" target="_blank" rel="noopener noreferrer">Read on Medium ↗</a>`;
  }

  return `<a href="${siteConfig.mediumUrl}" class="published-course-link" id="mediumProfileLink" target="_blank" rel="noopener noreferrer">Read on Medium ↗</a>`;
}

export function renderWriting() {
  const grid = document.getElementById('writingGrid');
  if (!grid) {
    return;
  }

  grid.innerHTML = writingPosts
    .map(
      (post) => `
    <article class="published-course-card stagger-item">
      <p class="published-course-label">Writing</p>
      <p class="published-course-provider">${post.platform}</p>
      <h3 class="published-course-title">${post.title}</h3>
      <p class="published-course-desc">${post.desc}</p>
      <p class="published-course-status">● ${post.status}</p>
      ${renderWritingLinks(post)}
    </article>
  `
    )
    .join('');
}
