import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render()
  }

  render() {
    this.elem = createElement(`
      <div class="ribbon"></div>
    `)
    const arrowLeft =  createElement(`
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `)
    const arrowRight = createElement(`
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `)
    const nav = createElement(`
      <nav class="ribbon__inner"></nav>
    `)
    this.categories.forEach(item => {
      const link = createElement(`
        <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
      `)
      nav.append(link)
    })
    this.elem.append(arrowLeft)
    this.elem.append(nav)
    this.elem.append(arrowRight)

    this.getElement()
    this.elem.addEventListener('click', this.showScroll)
    this.elem.addEventListener('click', this.showActiveItem)
    this.ribbonInner.addEventListener('scroll', this.checkScroll)
  }

  getElement() {
    this.ribbonInner = this.elem.querySelector('.ribbon__inner')
    this.arrowLeft = this.elem.querySelector('.ribbon__arrow_left')
    this.arrowRight = this.elem.querySelector('.ribbon__arrow_right')
  }

  checkScroll = () => {
    const scrollLeft = this.ribbonInner.scrollLeft;
    const scrollRight = this.getScrollRight()

    this.checkArrow(this.arrowLeft, scrollLeft)
    this.checkArrow(this.arrowRight, scrollRight)
  }

  checkArrow = (arrow, scroll) => {
    if (scroll < 1) {
        arrow.classList.remove('ribbon__arrow_visible')
      } else {
        arrow.classList.add('ribbon__arrow_visible')
      }
  }

  getScrollRight() {
    const scrollWidth = this.ribbonInner.scrollWidth;
    const scrollLeft = this.ribbonInner.scrollLeft;
    const clientWidth = this.ribbonInner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;
    return scrollRight
  }

   showScroll = (event) => {
    const isArrowRight = !!event.target.closest('.ribbon__arrow_right')
    const isArrowLeft = !!event.target.closest('.ribbon__arrow_left')
    if (isArrowRight) {
      this.next()
    }
    if (isArrowLeft) {
      this.previous()
    }
  }

  next() {
    this.ribbonInner.scrollBy(350, 0)
  }

  previous() {
    this.ribbonInner.scrollBy(-350, 0)
  }

  showActiveItem = (event) => {
    const isItemMenu = !!event.target.closest('.ribbon__item')
    if(isItemMenu) {
      event.preventDefault()
      this.removeClassActive()
      event.target.classList.add('ribbon__item_active')
      this.setCustomEvent(event)
    }
  }

  removeClassActive() {
    const allItems = this.elem.querySelectorAll('.ribbon__item')
    allItems.forEach(item => {
      item.classList.remove('ribbon__item_active')
    })
  }

  setCustomEvent = (event) => {
    const ribbonSelect = new CustomEvent ('ribbon-select', {
      detail: event.target.dataset.id,
      bubbles: true
    })
    this.elem.dispatchEvent(ribbonSelect)
  }
}
