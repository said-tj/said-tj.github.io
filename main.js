// main.js
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  
  // Inicialmente todas “inactive”
  sections.forEach(sec => sec.classList.add('inactive'));
  // Marca la primera como “active”
  if (sections[0]) {
    sections[0].classList.add('active');
    sections[0].classList.remove('inactive');
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Apaga todas
        sections.forEach(s => {
          s.classList.remove('active');
          s.classList.add('inactive');
        });
        // Enciende la que entra en vista
        entry.target.classList.add('active');
        entry.target.classList.remove('inactive');
      }
    });
  }, {
    threshold: 0.6  // Cada sección “intersecta” cuando el 60% de su altura está visible
  });

  sections.forEach(sec => observer.observe(sec));
});

