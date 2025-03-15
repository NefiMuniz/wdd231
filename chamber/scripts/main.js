// Hamburger Menu Functionality
const hamburgerBtn = document.getElementById('hamburgerBtn');
const primaryNav = document.getElementById('primaryNav');

hamburgerBtn.addEventListener('click', () => {
  primaryNav.classList.toggle('active');
  hamburgerBtn.classList.toggle('open');
});