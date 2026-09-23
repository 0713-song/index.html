const cursor = document.querySelector('.cursor-glow');
const interactive = document.querySelectorAll('a, button');
const menuButton = document.querySelector('.menu-button');

window.addEventListener('pointermove', (event) => {
  if (!cursor) return;
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

interactive.forEach((element) => {
  element.addEventListener('mouseenter', () => cursor?.classList.add('is-hover'));
  element.addEventListener('mouseleave', () => cursor?.classList.remove('is-hover'));
});

menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  document.body.classList.toggle('menu-open', !expanded);
  if (!expanded) document.querySelector('#contents')?.scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.contents-item').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

document.querySelectorAll('.timeline-entry').forEach((entry) => {
  const toggleEntry = () => {
    const expanded = entry.getAttribute('aria-expanded') === 'true';
    entry.setAttribute('aria-expanded', String(!expanded));
    entry.classList.toggle('is-open', !expanded);
  };

  entry.addEventListener('click', toggleEntry);
  entry.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleEntry();
    }
  });
});

const planningMarquee = document.querySelector('.planning-marquee');
const planningTrack = document.querySelector('#planning-track');
const planningButtons = document.querySelectorAll('[data-planning-direction]');

const getTransformX = (element) => {
  const transform = window.getComputedStyle(element).transform;
  if (transform === 'none') return 0;
  return Number.parseFloat(transform.match(/matrix\([^,]+,\s*[^,]+,\s*[^,]+,\s*[^,]+,\s*([^,]+)/)?.[1] || 0);
};

planningButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!planningMarquee || !planningTrack) return;

    const currentX = getTransformX(planningTrack);
    const firstCard = planningTrack.querySelector('.planning-card');
    const gap = Number.parseFloat(window.getComputedStyle(firstCard.parentElement).gap) || 0;
    const step = firstCard.getBoundingClientRect().width + gap;
    const direction = button.dataset.planningDirection === 'next' ? -1 : 1;
    const halfTrack = planningTrack.scrollWidth / 2;
    let nextX = currentX + direction * step;

    if (nextX < -halfTrack) nextX += halfTrack;
    if (nextX > 0) nextX -= halfTrack;
    planningMarquee.classList.add('is-manual');
    planningTrack.style.transform = `translateX(${nextX}px)`;
  });
});

const bookButtons = document.querySelectorAll('.book[data-book]');

bookButtons.forEach((book) => {
  book.addEventListener('click', () => {
    bookButtons.forEach((item) => {
      const isSelected = item === book;
      item.classList.toggle('is-selected', isSelected);
      item.setAttribute('aria-current', isSelected ? 'true' : 'false');
    });
  });
});
