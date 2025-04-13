import { updateCartCount } from "./shopping-list-modal.js";

export function addToShoppingList(product) {
  const list = JSON.parse(localStorage.getItem('shoppingList')) || [];

  const exists = list.some(item => item.id === product.id);

  if (!exists) {
    list.push({
      id: product.id,
      name: product.name,
      price: product.price,
      // image: `./images/${product.image},`,
      image: product.image,
      store: product.store
    });
    localStorage.setItem('shoppingList', JSON.stringify(list));
    alert('Product added to your shopping list!');
  } else {
    alert('This product is already in your shopping list!');
  }
  updateCartCount();
}

export function getShoppingList() {
  return JSON.parse(localStorage.getItem('shoppingList')) || [];
}

export function removeFromShoppingList(productId) {
  let list = getShoppingList();
  list = list.filter(item => item.id !== productId);
  localStorage.setItem('shoppingList', JSON.stringify(list));
  updateCartCount();
}

export function clearShoppingList() {
  localStorage.removeItem('shoppingList');
  updateCartCount();
}

export function addToComparison(productId) {
  let list = JSON.parse(localStorage.getItem('comparisonList')) || [];
  if (list.includes(productId)) return;

  if (list.length >= 3) {
    alert('You can compare up to 3 products at a time.');
    return;
  }

  list.push(productId);
  localStorage.setItem('comparisonList', JSON.stringify(list));
}
