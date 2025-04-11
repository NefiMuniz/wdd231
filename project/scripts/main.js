// DOM Elements
const featuredProductsContainer = document.getElementById('featuredProducts');
const productModal = document.getElementById('productModal');
const modalProductName = document.getElementById('modalProductName');
const modalProductDetails = document.getElementById('modalProductDetails');
const closeModal = document.querySelector('.close-modal');
const currentYearElement = document.getElementById('currentYear');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

// Fetch and display featured products
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

async function displayFeaturedProducts() {
    try {
        const products = await fetchProducts();
        const featuredProducts = products.filter(product => product.featured);
        
        const randomDeals = [];
        while (randomDeals.length < 3) {
          const randomIndex = Math.floor(Math.random() * 3);
          randomDeals.push(featuredProducts[randomIndex]);
          featuredProducts.splice(randomIndex, 1);
        }
        
        const featuredProductsContainer = document.getElementById('featuredProducts');

        if (randomDeals.length === 0) {
          featuredProductsContainer.innerHTML = '<p>No featured deals available at the moment.</p>';
          return;
        }
        
        featuredProductsContainer.innerHTML = randomDeals.map(product => `
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
        
        // Add event listeners to product cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('view-details')) return;
                const productId = parseInt(card.dataset.id);
                showProductModal(productId);
            });
        });
    } catch (error) {
        console.error('Error loading featured products:', error);
        featuredProductsContainer.innerHTML = '<p>Unable to load featured products. Please try again later.</p>';
    }
}

// Show product modal
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

// Add product to shopping list in localStorage
function addToShoppingList(productId) {
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    
    if (!shoppingList.includes(productId)) {
        shoppingList.push(productId);
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        alert('Product added to your shopping list!');
    } else {
        alert('This product is already in your shopping list!');
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

// Initialize page
displayFeaturedProducts();