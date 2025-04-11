export function addToShoppingList(productId) {
  const list = JSON.parse(localStorage.getItem('shoppingList')) || [];
  if (!list.includes(productId)) {
    list.push(productId);
    localStorage.setItem('shoppingList', JSON.stringify(list));
    alert('Product added to your shopping list!');
  } else {
    alert('This product is already in your shopping list!');
  }
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
