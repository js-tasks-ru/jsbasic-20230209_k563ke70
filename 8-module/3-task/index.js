export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {return}

    const index = this.cartItems.findIndex(item => item.product.id === product.id)
    if(index !== -1) {
      this.cartItems[index].count++
      this.onProductUpdate(this.cartItems[index])
    } else {
      this.cartItems.push({product: product, count: 1})
      this.onProductUpdate(this.cartItems.at(-1))
    }
  }

  updateProductCount(productId, amount) {
    const index = this.cartItems.findIndex(item => item.product.id === productId)
    if(index === -1) {return}
    
    const product = this.cartItems[index]
    product.count += amount
    if (product.count === 0) {
      this.cartItems.splice(index, 1)
    }
    this.onProductUpdate(this.cartItems[index])
  }

  isEmpty() {
    return this.cartItems[0] ? false : true
  }

  getTotalCount() {
    return this.cartItems.reduce((acc, item) => acc + item.count, 0)
  }

  getTotalPrice() {
    return this.cartItems.reduce((acc, item) => acc + item.product.price * item.count, 0)
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}

