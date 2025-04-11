// DOM Elements
const productForm = document.getElementById('productForm');
const retailerProducts = document.getElementById('retailerProducts');
const successModal = document.getElementById('successModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const closeModal = document.querySelector('.close-modal');
const currentYearElement = document.getElementById('currentYear');

async function fetchProducts() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

async function saveProduct(newProduct) {
    try {  
        // Log it and pretend we saved it
        console.log('Saving product:', newProduct);
    
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
    
        return true;
    } catch (error) {
    console.error('Error saving product:', error);
    throw error;
    }
}


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
                    <h3>${product.name}</h4>
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

// Handle form submission
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newProduct = {
        id: Date.now(), // Simple ID generation
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        store: document.getElementById('productStore').value,
        category: document.getElementById('productCategory').value,
        image: document.getElementById('productImage').value,
        description: document.getElementById('productDescription').value,
        featured: document.getElementById('productFeatured').checked,
        lastUpdated: new Date().toISOString().split('T')[0] // YYYY-MM-DD
    };
    
    try {
        await saveProduct(newProduct);
        
        // Show success message
        modalTitle.textContent = 'Success!';
        modalMessage.textContent = `${newProduct.name} has been added to your products.`;
        successModal.style.display = 'block';
        
        // Reset form
        productForm.reset();
        
        // Reload products
        loadRetailerProducts();
    } catch (error) {
        console.error('Error saving product:', error);
        modalTitle.textContent = 'Error';
        modalMessage.textContent = 'Failed to add product. Please try again.';
        successModal.style.display = 'block';
    }
});

// Close modal
closeModal.addEventListener('click', () => {
    successModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});

// Initialize page
loadRetailerProducts();