import { fetchProducts } from './productService.js';
import { addToShoppingList } from './storage.js';

const modal = document.getElementById('productModal');
const modalProductName = document.getElementById('modalProductName');
const modalProductDetails = document.getElementById('modalProductDetails');

export async function showProductModal(productId) {
  const products = await fetchProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  modalProductName.textContent = product.name;
  modalProductDetails.innerHTML = `
    <img src="images/${product.image}" alt="${product.name}" loading="lazy">
    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
    <p><strong>Store:</strong> ${product.store}</p>
    <p><strong>Category:</strong> ${product.category}</p>
    <p><strong>Description:</strong> ${product.description}</p>
    <button class="add-to-list" data-id="${product.id}">Add to Shopping List</button>
  `;

  modal.style.display = 'block';

  document.querySelector('.add-to-list').addEventListener('click', () => {
    addToShoppingList(product);
  });
}

// Close modal
export function setupModalCloseEvents() {
  const closeModal = document.querySelector('.close-modal');

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}
