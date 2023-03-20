import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
  }

  open() {
    this.modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title">${this.title}</h3>
          </div>
          <div class="modal__body">${this.modalBodyInner}</div>
        </div>
      </div>
    `)

    document.body.append(this.modal)
    document.body.classList.add('is-modal-open')
    
    const close = this.modal.querySelector('.modal__close')
    
    close.addEventListener('click', this.close)
    document.body.addEventListener('keydown', this.keyEscape )

    this.modalTitle = this.modal.querySelector('.modal__title')
    this.modalBody = this.modal.querySelector('.modal__body')
  }

  setTitle(title) {
    this.title = title
    if (this.modalTitle) {
      this.modalTitle.textContent = title
    }
  }

  setBody(node) {
    const div = document.createElement('div')
    div.append(node)
    const stringFromDiv = div.outerHTML
    this.modalBodyInner = stringFromDiv
    if (this.modalBody) {
      this.modalBody.innerHTML = this.modalBodyInner
    }
  }

  close = () => {
    this.modal.remove()
    document.body.classList.remove('is-modal-open')
    document.body.removeEventListener('keydown', this.keyEscape)
  }

  keyEscape = (event) => {
    if (event.code === 'Escape') {
      this.close()
    }
  }
}
