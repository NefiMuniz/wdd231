// retailers.js
import { fetchProducts, saveProduct } from './product-service.js';
import { showProductModal, setupModalCloseEvents } from './modal.js';
import { setupShoppingListModal, updateCartCount } from './shopping-list-modal.js';

// DOM Elements
const productForm = document.getElementById('productForm');
const retailerProducts = document.getElementById('retailerProducts');
const successModal = document.getElementById('successModal');
const currentYearElement = document.getElementById('currentYear');

setupModalCloseEvents(successModal);

// Load retailer's products
async function loadRetailerProducts() {
    try {
        const products = await fetchProducts();
        const storeName = "";

        const storeProducts = products.filter(product => product.store === storeName);

        if (storeProducts.length === 0) {
            retailerProducts.innerHTML = '<p>Login to see your products.</p>';
        } else {
            retailerProducts.innerHTML = storeProducts.map(product => `
                <div class="product-item">
                    <h3>${product.name}</h3>
                    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>Last Updated:</strong> ${product.lastUpdated || 'N/A'}</p>
                    <button class="edit-btn" data-id="${product.id}">Edit</button>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading products:', error);
        retailerProducts.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
}

// Form submit handler
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newProduct = {
        id: Date.now(),
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        store: document.getElementById('productStore').value,
        category: document.getElementById('productCategory').value,
        image: document.getElementById('productImage').value,
        description: document.getElementById('productDescription').value,
        featured: document.getElementById('productFeatured').checked,
        lastUpdated: new Date().toISOString().split('T')[0]
    };

    try {
        await saveProduct(newProduct);
        showProductModal(successModal, 'Success!', `${newProduct.name} has been added to your products.`);
        productForm.reset();
        loadRetailerProducts();
    } catch (error) {
        console.error('Error saving product:', error);
        showProductModal(successModal, 'Error', 'Failed to add product. Please try again.');
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () =>{
  loadRetailerProducts();
  setupShoppingListModal();
  updateCartCount();
});