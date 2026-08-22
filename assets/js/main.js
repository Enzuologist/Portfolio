(() => {
  const menuButton = document.querySelector('.menu-button');
  const menu = document.querySelector('.nav-links');
  const links = [...document.querySelectorAll('.nav-links a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menu?.classList.toggle('is-open', !isOpen);
  });

  links.forEach(link => link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menu?.classList.remove('is-open');
  }));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => link.removeAttribute('aria-current'));
        document.querySelector(`.nav-links a[href="#${entry.target.id}"]`)?.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }

  document.querySelector('#current-year').textContent = new Date().getFullYear();
})();
