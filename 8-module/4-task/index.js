import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if (!product) {return}

    const index = this.cartItems.findIndex(item => item.product === product)
    if(index !== -1) {
      this.cartItems[index].count++
      this.onProductUpdate(this.cartItems[index])
    } else {
      this.cartItems.push({product: product, count: 1})
      this.onProductUpdate(this.cartItems.at(-1))
    }
  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    const index = this.cartItems.findIndex(item => item.product.id === productId)
    if(index === -1) {return}
    
    const product = this.cartItems[index]
    product.count += amount
    if (product.count === 0) {
      this.cartItems.splice(index, 1)
    }
    // this.onProductUpdate(this.cartItems[index])
    this.onProductUpdate(product)
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems[0] ? false : true
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.reduce((acc, item) => acc + item.count, 0)
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.reduce((acc, item) => acc + item.product.price * item.count, 0)
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код
    this.modal = new Modal()
    const innerCart = document.createElement('div')

    this.cartItems.forEach(item => {
      innerCart.append(this.renderProduct(item.product, item.count))
    })
    innerCart.append(this.renderOrderForm())
  
    this.modal.setBody(innerCart)
    this.modal.setTitle('Your order')
    this.modal.open()

    const modalBody = document.querySelector('.modal__body')
    modalBody.innerHTML = innerCart.outerHTML
    this.modalBody = document.querySelector('.modal__body > div')
    this.modalBody.onclick = this.changeCount
    this.modalBody.querySelector('form').onsubmit = this.onSubmit
  }

  changeCount = ({target}) => {
    const isProduct = target.closest('.cart-product')
    if(isProduct) {
      const id = getId(target)
      const amount = getAmount(target)
      this.updateProductCount(id, amount)
    }
      
    function getAmount(target){
      let amount = 0
      const isPlus = target.closest('.cart-counter__button_plus')
      const isMinus = target.closest('.cart-counter__button_minus')
      if(isPlus) {amount = 1}
      if(isMinus) {amount = -1}
      return amount
    }

    function getId(target){
      return target.closest('.cart-product').dataset.productId
    }
  }

  onProductUpdate(cartItem) {
    // ...ваш код
    this.cartIcon.update(this);

    if(this.isEmpty()){
      this.modal.close()
      return
    }
    
    const isModalOpen = document.body.classList.contains('is-modal-open')
    let isItem = this.cartItems.includes(cartItem)

    if (isModalOpen) {
      let productId = cartItem.product.id
      let productCount = this.modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`)
      let productPrice = this.modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`)
      let infoPrice = this.modalBody.querySelector(`.cart-buttons__info-price`)
      let product = this.modalBody.querySelector(`[data-product-id="${productId}"]`)
    
      if (isItem) {
        productCount.innerHTML = cartItem.count
        productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`
      }

      if (!isItem){
        product.outerHTML = ''
        productPrice.outerHTML = ''
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`
      }
    }
  }

  onSubmit = (event) => {
    // ...ваш код
    event.preventDefault()
    const button = this.modalBody.querySelector(`button[type = "submit"]`)
    button.classList.add('is-loading')

    let form = this.modalBody.querySelector('.cart-form')
    let formData = new FormData(form)

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    }).then(response => {
      console.log(response.status);
      if (response.status === 200) {
        this.modal.setTitle('Success!')
        this.cartItems.splice(0)
        this.cartIcon.elem.innerHTML = ''
        this.modalBody.outerHTML = `
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>`
      }
    })
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

