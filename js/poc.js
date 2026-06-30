import { pocProjects } from './data.js';

function pocStatusMeta(status) {
  if (status === 'in-dev') {
    return { cls: 'project-status-progress', label: '⟳ IN PROGRESS' };
  }

  return { cls: 'project-status-poc', label: '◈ POC' };
}

function renderPocCard(project) {
  const status = pocStatusMeta(project.status);
  const tagsHtml = (project.shortTags || []).map((tag) => `<span class="tech-pill">${tag}</span>`).join('');

  return `
    <article class="project-card stagger-item">
      <div class="project-meta-row">
        <span class="${status.cls}">${status.label}</span>
        <div class="project-badges"><span class="project-badge-poc">OPEN SOURCE</span></div>
      </div>
      <div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-context">${project.context}</p>
      </div>
      <p class="project-description">${project.desc}</p>
      <div class="project-tech">${tagsHtml}</div>
      <div class="project-links">
        <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      </div>
    </article>
  `;
}

export function renderPocProjects() {
  const grid = document.getElementById('pocGrid');
  if (!grid) {
    return;
  }

  grid.innerHTML = pocProjects.map(renderPocCard).join('');
}
