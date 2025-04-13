import { fetchProducts } from './productService.js';
import { showProductModal, setupModalCloseEvents } from './modal.js';
import { setupShoppingListModal, updateCartCount } from './shoppingListModal.js';

async function displayFeaturedProducts() {
  const allProducts = await fetchProducts();
  const featured = allProducts.filter(p => p.featured);

  const randomDeals = [];
  while (randomDeals.length < 3 && featured.length > 0) {
    const index = Math.floor(Math.random() * featured.length);
    randomDeals.push(featured.splice(index, 1)[0]);
  }

  const container = document.getElementById('featuredProducts');
  if (randomDeals.length === 0) {
    container.innerHTML = '<p>No featured deals available at the moment.</p>';
    return;
  }

  container.innerHTML = randomDeals.map(product => `
    <div class="product-card" data-id="${product.id}">
      <img src="images/${product.image}" alt="${product.name}" loading="lazy">
      <div class="product-info">
        <h4>${product.name}</h4>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p class="store">${product.store}</p>
        <button class="view-details">View Details</button>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', e => {
      if (!e.target.classList.contains('view-details')) return;
      const id = parseInt(card.dataset.id);
      showProductModal(id);
    });
  });
}

document.addEventListener('DOMContentLoaded', () =>{
  displayFeaturedProducts();
  setupModalCloseEvents();
  setupShoppingListModal();
  updateCartCount();
});
