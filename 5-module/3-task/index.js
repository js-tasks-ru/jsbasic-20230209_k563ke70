function initCarousel() {
  // ваш код...
  const carousel = document.querySelector('.carousel');
  const visibleSlide = document.querySelector('.carousel__inner');
  const slides = document.querySelectorAll('.carousel__slide');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const arrowRight = document.querySelector('.carousel__arrow_right');

  arrowLeft.style.display = 'none';

  let offSet = 0;

  carousel.addEventListener('click', event => {
    if (event.target.closest('.carousel__arrow_right')) {
      arrowLeft.style.display = '';
      offSet += Number(`${visibleSlide.offsetWidth}`);
      if (offSet === visibleSlide.offsetWidth * (slides.length - 1)) {
        arrowRight.style.display = 'none';
      }
      visibleSlide.style.transform = `translateX(-${offSet}px)`;
    }
    
    if (event.target.closest('.carousel__arrow_left')) {
      arrowRight.style.display = '';
      offSet -= Number(`${visibleSlide.offsetWidth}`);
      if (offSet === 0) {
        arrowLeft.style.display = 'none';
      }
      visibleSlide.style.transform = `translateX(-${offSet}px)`;
    }
  })
}