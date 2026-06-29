import { publishedCourses } from './data.js';

export function renderCourses() {
  const grid = document.getElementById('coursesGrid');
  if (!grid) {
    return;
  }

  grid.innerHTML = publishedCourses
    .map(
      (course) => `
    <article class="published-course-card stagger-item">
      <p class="published-course-label">Published Course</p>
      <p class="published-course-provider">${course.platform}</p>
      <h3 class="published-course-title">${course.name}</h3>
      <p class="published-course-desc">${course.desc}</p>
      <p class="published-course-status">● Live on Distinction</p>
      <a href="${course.url}" class="published-course-link" target="_blank" rel="noopener noreferrer">${course.linkLabel}</a>
    </article>
  `
    )
    .join('');
}
