// Hamburguer Menu
const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('nav');

menuButton.addEventListener('click', () => {
    // Toggle class for menu animation
    menuButton.classList.toggle('open');
    
    // Toggle class for menu visibility
    navMenu.classList.toggle('open');
});
