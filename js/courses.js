import { courses } from './data.js';

export function renderCourses() {
  const grid = document.getElementById('coursesGrid');
  if (!grid) {
    return;
  }

  grid.innerHTML = courses
    .map(
      (course) => `
    <article class="course-card stagger-item">
      <p class="course-provider">${course.platform}</p>
      <h3 class="course-title">${course.name}</h3>
      <p class="course-status">✓ ${course.status}</p>
      <a href="${course.certUrl}" class="course-link" target="_blank" rel="noopener noreferrer">${course.linkLabel || 'View Certificate ↗'}</a>
    </article>
  `
    )
    .join('');
}
