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

    const thumb = this.elem.querySelector('.slider__thumb')
    thumb.ondragstart = () => false
    
    thumb.addEventListener('pointerdown', this.pointerdown)
  }

  pointermove = (event) => {
    const isRange = this.getRange(event)
    if (isRange) {
      const step = this.getStep(event)
      this.value = step
      this.showValueStep(step)
      this.showActiveStep()
      this.showShift(event)
    } else {
      return
    }
  }

  getRange(event) {
    const data = this.elem.getBoundingClientRect()
    const left = data.left
    const right = data.right 
    const isRange = event.clientX >= left && event.clientX <= right
    return isRange
  }

  showShift(event) {
    const thumb = this.elem.querySelector('.slider__thumb')
    const progress = this.elem.querySelector('.slider__progress')

    const data = this.elem.getBoundingClientRect()
    const offSet = (event.clientX - data.left) / data.width * 100
    
    thumb.style.left = `${offSet}%`
    progress.style.width = `${offSet}%`
  }

  showActiveStep = () => {
    const steps = this.elem.querySelectorAll('.slider__steps > span')
    steps.forEach(item => {
      item.classList.remove('slider__step-active')
    })
    for( let i = 0; i <= this.value; i++) {
      steps[i].classList.add('slider__step-active')
    }
  }

  pointerdown = (event) => {
    event.preventDefault()
    this.elem.classList.add('slider_dragging')
    window.addEventListener('pointerup', this.pointerup)
    window.addEventListener('pointermove', this.pointermove)
  }

  pointerup = (event) => {
    this.elem.classList.remove('slider_dragging')
    window.removeEventListener('pointermove', this.pointermove)
    window.removeEventListener('pointerup', this.pointerup)
    this.showStep(event)
  }

  showStep = (event) => {
    const step = this.getStep(event)
    this.value = step
    this.showValueStep(step)
    this.shiftSlider(step)
    this.showActiveStep(step)
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
      
      let step
      
      if (event.clientX < data.left) {
        step = 0
        return step
      }
      if (event.clientX > data.right) {
        step = this.steps - 1
        return step
      }
      
      const stepWidth = width / (this.steps - 1)
      const sectionStart = event.clientX - left
      const sectionEnd = width - sectionStart
      const parts = Math.round(sectionEnd / stepWidth)
      step = (this.steps - 1) - parts

      this.value = event.clientX < data.left ? 0 : this.steps - 1
      
      return step
  }
}
