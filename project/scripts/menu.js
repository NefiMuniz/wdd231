document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  hamburger.addEventListener('click', function() {
      // Toggle menu visibility
      navLinks.classList.toggle('active');
      
      // Toggle hamburger animation
      this.classList.toggle('open');
      
      // Prevent body scroll when menu is open
      if (navLinks.classList.contains('active')) {
          body.style.overflow = 'hidden';
      } else {
          body.style.overflow = '';
      }
  });

  // Close menu when clicking on a link (for mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function() {
          if (window.innerWidth < 768) {
              navLinks.classList.remove('active');
              hamburger.classList.remove('open');
              body.style.overflow = '';
          }
      });
  });
});