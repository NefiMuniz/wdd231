export async function fetchProducts() {
  try {
    const response = await fetch('data/products.json');
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (err) {
    console.error('Error fetching products:', err);
    return [];
  }
}

export async function saveProduct(newProduct) {
  try {
      console.log('Saving product:', newProduct);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
  } catch (error) {
      console.error('Error saving product:', error);
      throw error;
  }
}