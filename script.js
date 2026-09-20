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
