import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render()
  }

  render() {
    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
      </div>
    `)
    const inner = document.createElement('DIV')
    inner.classList.add('carousel__inner')
    
    this.slides.forEach(item => {
      const slide = createElement(`
        <div class="carousel__slide" data-id="${item.id}">
          <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${item.price}</span>
            <div class="carousel__title">${item.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `)
      inner.append(slide)
    })
    this.elem.append(inner)
    
    this.elem.addEventListener('click', event =>  {
      this.switchSlides(event)
      this.createCustomEvent(event)
    })

    this.getElements()
    this.update()
  }

  getElements() {
    this.arrowLeft = this.elem.querySelector('.carousel__arrow_left')
    this.arrowRight = this.elem.querySelector('.carousel__arrow_right')
    this.visibleSlide = this.elem.querySelector('.carousel__inner')
    this.allSlides = this.elem.querySelectorAll('.carousel__slide')
    this.current = 0
    this.offSet = 0
  }

  update() {
    this.offSet = this.visibleSlide.offsetWidth * this.current;
    this.visibleSlide.style.transform = `translateX(-${this.offSet}px)`
    this.checkArrow()
  }

  checkArrow() {
    switch (this.current) {
      case 0: 
        this.arrowLeft.style.display = 'none';
        break
      case (this.allSlides.length - 1):
        this.arrowRight.style.display = 'none';
        break
      default:
        this.arrowLeft.style.display = '';
        this.arrowRight.style.display = '';
        break;
    }
  }

  switchSlides(event) {
    const arrowLeft = event.target.closest('.carousel__arrow_left')
    const arrowRight = event.target.closest('.carousel__arrow_right')

    if (arrowRight) {
      this.next()
      this.update();
    }
    if (arrowLeft) {
      this.previous()
      this.update();
    }
  }

  next() {
    this.current++;
  }

  previous() {
    this.current--;
  }

  createCustomEvent(event) {
    const button = event.target.closest('.carousel__button')
    
    if (button){
      const slide = event.target.closest('.carousel__slide')

      const productAdd = new CustomEvent ('product-add', {
        detail: slide.dataset.id,
        bubbles: true
      })
      this.elem.dispatchEvent(productAdd)
    }
  }
}
