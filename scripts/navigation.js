// Hamburguer Menu
const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('nav-menu');
const nav = document.getElementById('nav')

function toogleMenu() {
    menuButton.classList.toggle('open');

    navMenu.classList.toggle('open');
    nav.classList.toggle('open');
}

menuButton.addEventListener('click', toogleMenu);

navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        if (window.getComputedStyle(menuButton).display !== 'none') {
            toogleMenu();
        }
    }
});

function handleResize() {
    if (window.innerWidth >= 768) {
        navMenu.classList.remove('open');
        nav.classList.remove('open');
        menuButton.classList.remove('open');
    }
}

window.addEventListener('resize', handleResize);

handleResize();