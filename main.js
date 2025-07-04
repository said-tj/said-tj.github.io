// main.js

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll suave para todo el documento
  document.documentElement.style.scrollBehavior = 'smooth';

  const sections = document.querySelectorAll('section');
  const arrow = document.querySelector('.scroll-down');

  // 2. Al inicio, todas las secciones están "inactive"
  sections.forEach(sec => sec.classList.add('inactive'));

  // 3. IntersectionObserver para:
  //    • Alternar active/inactive en secciones
  //    • Mostrar/ocultar la flecha cuando pasamos del "hero"
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 3a. Desactivar todas y activar la que entra en vista
        sections.forEach(s => {
          s.classList.remove('active');
          s.classList.add('inactive');
        });
        entry.target.classList.add('active');
        entry.target.classList.remove('inactive');

        // 3b. Flecha: visible solo en el hero
        if (arrow) {
          arrow.style.opacity = (entry.target.id === 'hero' ? '1' : '0');
        }
      }
    });
  }, {
    threshold: 0.4
  });

  // 4. Observa cada sección para el efecto de scroll
  sections.forEach(sec => observer.observe(sec));

  // 5. Enlaces de nav con scroll suave
  document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 6. Ocultar la flecha inmediatamente si el usuario hace click en ella
  if (arrow) {
    arrow.addEventListener('click', () => arrow.style.opacity = '0');
  }
});
