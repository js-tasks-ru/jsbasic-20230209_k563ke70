import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render(this.products)
  }

  render(products) {
    this.elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner"></div>
    </div>
    `)
    const productGrid = this.elem.querySelector('.products-grid__inner')
    products.forEach(card => {
      const productCard = new ProductCard(card).elem
      productGrid.append(productCard)
    })
    this.elem.append(productGrid)
  }

  updateFilter = (filters) => {
    this.filters = Object.assign(this.filters, filters)
    
    let result = Array.from(this.products)
    
    for (let [key, value]  of Object.entries(this.filters)) {
      
      if (key === 'noNuts' && value) {
        result = result.filter(item => !item['nuts'])
      }

      if ( key === 'vegeterianOnly' && value) {
        result = result.filter(item => item['name'].includes('veg') || item['vegeterian'])
      }

      if (key === 'maxSpiciness' && value < 3) {
          result = result.filter(item => item['spiciness'] < 3)
      }

      if (key === 'category' && value) {
        result = result.filter(item => item['category'] === 'soups')
      }
    }
    console.log(result);
    const container = document.querySelector('#container')
    
    if (container) {
      this.elem.remove()
      this.render(result)
      container.append(this.elem)
    }
  }
}
