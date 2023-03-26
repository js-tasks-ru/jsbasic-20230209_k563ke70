import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render()
  }

  render() {
    this.elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner"></div>
    </div>
    `)
    this.renderContent(this.products)
  }

  renderContent(products) {
    const inner = this.elem.querySelector('.products-grid__inner')
    inner.innerHTML = '';
    for (const product of products) {
      if (this.filters.noNuts && product.nuts) {continue}
      if (this.filters.vegeterianOnly && !product.vegeterian) {continue}
      if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) {continue}
      if (this.filters.category && product.category !== this.filters.category) {continue}

      const card = new ProductCard(product).elem
      inner.append(card)
    }
  }

  updateFilter(filters) {
    this.filters = Object.assign(this.filters, filters)
    this.renderContent(this.products)
  }




















  // updateFilter = (filters) => {
    
  //   this.filters  = Object.assign(this.filters, filters)
    
  //   let result = [...this.products]

  //   if (this.filters['noNuts']){
  //     result = result.filter(item => !item['nuts'])
  //   }

  //   if (this.filters['vegeterianOnly']){
  //     result = result.filter(item => item['name'].includes('veg') || item['vegeterian'])
  //   }

  //   if (this.filters['maxSpiciness'] >= 0) {
  //     result = result.filter(item => item['spiciness'] <= this.filters['maxSpiciness'])
  //   }

  //   if (this.filters['category']) {
  //     result = result.filter(item => item['category'] === this.filters['category'])
  //   }

  //   const container = document.querySelector('#container')
    
  //   if (container) {
  //     this.elem.remove()
  //     this.render(result)
  //     container.append(this.elem)
  //   }
  // }
}
