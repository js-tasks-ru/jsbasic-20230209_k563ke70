import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
    this.setTop()
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  setTop() {
    const dataCart = this.elem.getBoundingClientRect()
    this.top = dataCart.top + window.pageYOffset
  }

  getleftIndent() {
    const container = document.body.querySelector('.container')
    const firstChild = container.firstElementChild
    const dataElem = this.elem.getBoundingClientRect()
    const dataContainer = container.getBoundingClientRect()
    const dataFirstChild = firstChild.getBoundingClientRect()
    const isWidth = document.documentElement.clientWidth > dataContainer.right + dataElem.width + 20
    let leftIndent 
    if (isWidth) {
      leftIndent = dataFirstChild.right  + 20
    } else {
      leftIndent = document.documentElement.clientWidth - dataElem.width - 10
    }

    return leftIndent
  }

  updatePosition() {
    const leftIndent = this.getleftIndent()
    const isMobile = document.documentElement.clientWidth <= 767

    if(this.elem.offsetWidth || window.pageYOffset > this.top && !isMobile){
      Object.assign(this.elem.style, {
        position: 'fixed',
        top: '50px',
        zIndex: 1e3,
        right: '10px',
        left: `${leftIndent}px`
      })
    } else {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        right: '',
        zIndex: ''
      });
    }
  }
}
