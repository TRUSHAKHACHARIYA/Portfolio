import { writingPosts, siteConfig } from './data.js';

export function renderWriting() {
  const grid = document.getElementById('writingGrid');
  const profileLink = document.getElementById('mediumProfileLink');
  if (profileLink) {
    profileLink.href = siteConfig.mediumUrl;
  }

  if (!grid) {
    return;
  }

  grid.innerHTML = writingPosts
    .map(
      (post) => `
    <article class="writing-card stagger-item">
      <h3 class="writing-card-title">${post.title}</h3>
      <p class="writing-card-excerpt">${post.excerpt}</p>
      <div class="writing-card-meta">
        <span>${post.source} · ${post.date}</span>
        <a href="${post.url}" class="writing-card-link" target="_blank" rel="noopener noreferrer">Read →</a>
      </div>
    </article>
  `
    )
    .join('');
}
