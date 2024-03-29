import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
    
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
    this.top = dataCart.top + document.documentElement.pageYOffset
  }

  getleftIndent() {
    const firstChild = document.body.querySelector('.container:first-child')
    const container = document.body.querySelector('.container')
    const dataElem = this.elem.getBoundingClientRect()
    let leftIndent 
    let isWidth
    if (container) {
      const dataContainer = container.getBoundingClientRect()
      isWidth = document.documentElement.clientWidth > dataContainer.right + dataElem.width + 20
    }
    if (isWidth && firstChild) {
      const dataFirstChild = firstChild.getBoundingClientRect()
      leftIndent = dataFirstChild.right  + 20
    } else {
      leftIndent = document.documentElement.clientWidth - dataElem.width - 10
    }

    return leftIndent
  }

  updatePosition() {
    this.setTop()
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
