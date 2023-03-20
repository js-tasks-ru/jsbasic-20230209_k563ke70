export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps
    this.value = value
    this.render()
  }

  render() {
    this.elem = document.createElement('div')
    this.elem.classList.add('slider')
    const sliderThumb = document.createElement('div')
    sliderThumb.classList.add('slider__thumb')
    const sliderValue = document.createElement('span')
    sliderValue.classList.add('slider__value')
    sliderValue.textContent = this.value
    sliderThumb.append(sliderValue)
    const sliderProgress = document.createElement('div')
    sliderProgress.classList.add('slider__progress')
    const sliderSteps = document.createElement('div')
    sliderSteps.classList.add('slider__steps')
    for( let i = 0; i < this.steps; i++) {
      const span = document.createElement('span')
      sliderSteps.append(span)
    }

    this.elem.append(sliderThumb)
    this.elem.append(sliderProgress)
    this.elem.append(sliderSteps)

    const span = this.elem.querySelector('.slider__steps > span')
    span.classList.add('slider__step-active')

    this.elem.addEventListener('click', this.showStep)
  }

  showStep = (event) => {
    const step = this.getStep(event)
    this.value = step
    this.showValueStep(step)
    this.shiftSlider(step)
    this.getCustomEvent()
  }

  getCustomEvent = () => {
    const sliderChange = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    })
    this.elem.dispatchEvent(sliderChange)
  }

  shiftSlider(step) {
    const thumb = this.elem.querySelector('.slider__thumb')
    const progress = this.elem.querySelector('.slider__progress')
    
    const width = this.elem.offsetWidth
    const stepWidth = width / (this.steps - 1)
    const left = (stepWidth * step) / width * 100
    
    thumb.style.left = `${left}%`
    progress.style.width = `${left}%`
  }

  showValueStep(step) {
    const valueStep = this.elem.querySelector('.slider__value')
    valueStep.textContent = step
  }

  getStep = (event) => {
      const data = this.elem.getBoundingClientRect()
      const left = data.left
      const width = data.width
      
      const stepWidth = width / (this.steps - 1)
      const sectionStart = event.clientX - left
      const sectionEnd = width - sectionStart
      const parts = Math.round(sectionEnd / stepWidth)
      const step = (this.steps - 1) - parts
      
      return step
  }
}
