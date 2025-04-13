// shoppingListModal.js
import { getShoppingList, removeFromShoppingList, clearShoppingList } from './storage.js';

let shoppingModal;
let shoppingListContent;

function createModalIfNotExists() {
  if (!shoppingModal) {
    const modalHTML = `
      <div class="modal" id="shoppingListModal">
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <h3>Your Shopping List</h3>
          <div class="modal-body" id="shoppingListContent"></div>
          <div class="shopping-list-actions">
            <button id="printShoppingList">Print List</button>
            <button id="clearShoppingList">Clear All</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
}
    
export function setupShoppingListModal() {
  createModalIfNotExists();

  shoppingModal = document.getElementById('shoppingListModal');
  shoppingListContent = document.getElementById('shoppingListContent');
  const openShoppingListBtn = document.getElementById('openShoppingList');

  if (!shoppingModal || !shoppingListContent) {
    console.error('Shopping list modal elements not found');
    return;
  }

  // Open modal button event
  openShoppingListBtn?.addEventListener('click', showShoppingList);

  // Modal close events
  document.querySelector('#shoppingListModal .close-modal')?.addEventListener('click', () => {
    shoppingModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === shoppingModal) {
      shoppingModal.style.display = 'none';
    }
  });

  // Print button
  document.getElementById('printShoppingList')?.addEventListener('click', printShoppingList);

  // Clear button
  document.getElementById('clearShoppingList')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your shopping list?')) {
      clearShoppingList();
      showShoppingList(); // Refresh the view
    }
  });
}

function showShoppingList() {
  const list = getShoppingList();
  if (!shoppingListContent || !shoppingModal) return;
  
  if (list.length === 0) {
    shoppingListContent.innerHTML = '<p>Your shopping list is empty.</p>';
  } else {
    shoppingListContent.innerHTML = `
      <ul class="shopping-list">
        ${list.map(item => `
          <li>
            <img src="images/${item.image}" alt=${item.name} loading="lazy">
            <div>
              <h4>${item.name}</h4>
              <p>$${item.price.toFixed(2)} - ${item.store}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">×</button>
          </li>
        `).join('')}
      </ul>
      <div class="shopping-list-total">
        <strong>Total: $${list.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</strong>
      </div>
    `;

    // Add remove event listeners
    shoppingListContent.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id);
        removeFromShoppingList(productId);
        showShoppingList();
        updateCartCount();
      });
    });
  }

  shoppingModal.style.display = 'block';
}

export function updateCartCount() {
  const countElement = document.getElementById('shoppingListCount');
  if (countElement) {
    const list = getShoppingList();
    countElement.textContent = list.length;
    countElement.style.display = list.length > 0 ? 'flex' : 'none';
  }
}

function printShoppingList() {
  const list = getShoppingList();
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Shopping List</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #333; }
          ul { list-style: none; padding: 0; }
          li { margin-bottom: 10px; display: flex; align-items: center; }
          img { width: 50px; height: 50px; margin-right: 10px; }
          .total { font-weight: bold; margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>Shopping List</h1>
        <ul>
          ${list.map(item => `
            <li>
              <img src="images/${item.image}" alt="${item.name}">
              <div>
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)} - ${item.store}</p>
              </div>
            </li>
          `).join('')}
        </ul>
        <div class="total">
          Total: $${list.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}