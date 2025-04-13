import { fetchProducts } from './product-service.js';
import { showProductModal, setupModalCloseEvents } from './modal.js';
import { addToComparison } from './storage.js';
import { setupShoppingListModal, updateCartCount } from './shopping-list-modal.js';

const container = document.getElementById('allProducts');
const categoryFilter = document.getElementById('categoryFilter');
const storeFilter = document.getElementById('storeFilter');
const sortBy = document.getElementById('sortBy');
const search = new URLSearchParams(window.location.search).get('search') || '';

async function displayAllProducts() {
  let products = await fetchProducts();

  // Filters
  if (search) {
    products = products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (categoryFilter.value)
    products = products.filter(p => p.category === categoryFilter.value);

  if (storeFilter.value)
    products = products.filter(p => p.store === storeFilter.value);

  switch (sortBy.value) {
    case 'price-asc': products.sort((a, b) => a.price - b.price); break;
    case 'price-desc': products.sort((a, b) => b.price - a.price); break;
    case 'name-asc': products.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'name-desc': products.sort((a, b) => b.name.localeCompare(a.name)); break;
  }

  if (!products.length) {
    container.innerHTML = '<p>No products found matching your criteria.</p>';
    return;
  }

  container.innerHTML = products.map(p => `
    <div class="product-card" data-id="${p.id}">
      <img src="images/${p.image}" alt="${p.name}" loading="lazy">
      <h3>${p.name}</h3>
      <p class="price">$${p.price.toFixed(2)}</p>
      <p class="store">${p.store}</p>
      <p class="category">${p.category}</p>
      <button class="view-details">View Details</button>
      <button class="compare-btn" data-id="${p.id}">Compare</button>
    </div>
  `).join('');

  document.querySelectorAll('.view-details').forEach(btn =>
    btn.addEventListener('click', e =>
      showProductModal(parseInt(e.target.closest('.product-card').dataset.id))
    )
  );

  document.querySelectorAll('.compare-btn').forEach(btn =>
    btn.addEventListener('click', e =>
      addToComparison(parseInt(e.target.dataset.id))
    )
  );
}

categoryFilter.addEventListener('change', displayAllProducts);
storeFilter.addEventListener('change', displayAllProducts);
sortBy.addEventListener('change', displayAllProducts);

document.addEventListener('DOMContentLoaded', () =>{
  displayAllProducts();
  setupModalCloseEvents();
  setupShoppingListModal();
  updateCartCount();
});
