// DOM Elements
const allProductsContainer = document.getElementById('allProducts');
const categoryFilter = document.getElementById('categoryFilter');
const storeFilter = document.getElementById('storeFilter');
const sortBy = document.getElementById('sortBy');
const closeModal = document.querySelector('.close-modal');

// URL parameters
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('search') || '';
const lastSearch = localStorage.getItem('lastSearch') || '';

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

// Display all products with filtering
async function displayAllProducts() {
    try {
        let products = await fetchProducts();
        
        // Apply search filter if exists
        if (searchQuery) {
            products = products.filter(product => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        // Apply category filter
        categoryFilter.addEventListener('change', () => {
            displayAllProducts();
        });
        
        // Apply store filter
        storeFilter.addEventListener('change', () => {
            displayAllProducts();
        });
        
        // Apply sorting
        sortBy.addEventListener('change', () => {
            displayAllProducts();
        });
        
        // Filter by category
        if (categoryFilter.value) {
            products = products.filter(product => product.category === categoryFilter.value);
        }
        
        // Filter by store
        if (storeFilter.value) {
            products = products.filter(product => product.store === storeFilter.value);
        }
        
        // Sort products
        switch (sortBy.value) {
            case 'price-asc':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                products.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                products.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
        
        // Display products
        if (products.length === 0) {
            allProductsContainer.innerHTML = '<p>No products found matching your criteria.</p>';
        } else {
            allProductsContainer.innerHTML = products.map(product => `
                <div class="product-card" data-id="${product.id}">
                    <img src="images/${product.image}" alt="${product.name}" loading="lazy">
                    <h3>${product.name}</h4>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <p class="store">${product.store}</p>
                    <p class="category">${product.category}</p>
                    <button class="view-details">View Details</button>
                    <button class="compare-btn" data-id="${product.id}">Compare</button>
                </div>
            `).join('');
            
            // Add event listeners
            document.querySelectorAll('.view-details').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.closest('.product-card').dataset.id);
                    showProductModal(productId);
                });
            });
            
            document.querySelectorAll('.compare-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.dataset.id);
                    addToComparison(productId);
                });
            });
        }
    } catch (error) {
        console.error('Error loading products:', error);
        allProductsContainer.innerHTML = '<p>Unable to load products. Please try again later.</p>';
    }
}

async function showProductModal(productId) {
    try {
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
        
        productModal.style.display = 'block';
        
        // Add to shopping list functionality
        document.querySelector('.add-to-list').addEventListener('click', () => {
            addToShoppingList(productId);
        });
    } catch (error) {
        console.error('Error loading product details:', error);
    }
}

// Close modal
closeModal.addEventListener('click', () => {
    productModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === productModal) {
        productModal.style.display = 'none';
    }
});

// Add product to comparison list
function addToComparison(productId) {
    let comparisonList = JSON.parse(localStorage.getItem('comparisonList')) || [];
    
    if (!comparisonList.includes(productId)) {
        if (comparisonList.length >= 3) {
            alert('You can compare up to 3 products at a time.');
            return;
        }
        comparisonList.push(productId);
        localStorage.setItem('comparisonList', JSON.stringify(comparisonList));
        alert('Product added to comparison!');
    } else {
        alert('This product is already in your comparison list!');
    }
}

// Initialize page
displayAllProducts();