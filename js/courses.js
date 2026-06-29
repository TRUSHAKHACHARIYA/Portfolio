import { courses } from './data.js';

function openDiscussModal(course) {
  const existing = document.getElementById('courseModal');
  if (existing) {
    existing.remove();
  }

  const modal = document.createElement('div');
  modal.id = 'courseModal';
  modal.className = 'course-modal';
  modal.innerHTML = `
    <div class="course-modal-backdrop" data-close></div>
    <div class="course-modal-panel" role="dialog" aria-labelledby="courseModalTitle">
      <button type="button" class="course-modal-close" data-close aria-label="Close">×</button>
      <p class="eyebrow">Discuss with AI</p>
      <h3 id="courseModalTitle" class="course-modal-title">${course.name}</h3>
      <p class="course-modal-sub">${course.platform} · ${course.status}</p>
      <div class="course-modal-chat">
        <div class="course-msg course-msg-user">
          <span class="course-msg-label">You</span>
          <p>I just completed a course on ${course.name}. Can you summarize the key concepts and suggest what to learn next?</p>
        </div>
        <div class="course-msg course-msg-ai">
          <span class="course-msg-label">AI Tutor</span>
          <p><strong>Key concepts:</strong> ${course.summary}</p>
          <p><strong>What to learn next:</strong> ${course.nextSteps}</p>
        </div>
      </div>
      <p class="course-modal-note">Pre-seeded educational summary · showcase of AI-assisted learning UX</p>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  modal.querySelectorAll('[data-close]').forEach((el) => {
    el.addEventListener('click', () => closeDiscussModal());
  });

  document.addEventListener('keydown', onModalKeydown);
}

function onModalKeydown(e) {
  if (e.key === 'Escape') {
    closeDiscussModal();
  }
}

function closeDiscussModal() {
  document.getElementById('courseModal')?.remove();
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onModalKeydown);
}

export function renderCourses() {
  const grid = document.getElementById('coursesGrid');
  if (!grid) {
    return;
  }

  grid.innerHTML = `
    <div class="courses-table-head" aria-hidden="true">
      <span>Course</span>
      <span>Platform</span>
      <span>Status</span>
      <span>Actions</span>
    </div>
    ${courses
      .map(
        (course) => `
      <article class="course-row stagger-item" data-course-id="${course.id}">
        <div class="course-row-name">${course.name}</div>
        <div class="course-row-platform">${course.platform}</div>
        <div class="course-row-status"><span class="status-pill status-${course.status.toLowerCase().replace(/\s+/g, '-')}">${course.status}</span></div>
        <div class="course-row-actions">
          <a href="${course.certUrl}" class="text-link course-cert-link" target="_blank" rel="noopener noreferrer">Certificate →</a>
          <button type="button" class="btn-discuss" data-discuss="${course.id}">Discuss This Topic</button>
        </div>
      </article>
    `
      )
      .join('')}
  `;

  grid.querySelectorAll('[data-discuss]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const course = courses.find((c) => c.id === btn.dataset.discuss);
      if (course) {
        openDiscussModal(course);
      }
    });
  });
}
