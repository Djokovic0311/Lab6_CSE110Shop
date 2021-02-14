// product-item.js

class ProductItem extends HTMLElement {
  // TODO
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    let shadow = this.shadowRoot;
    const list = document.createElement('li');
    list.setAttribute('class', 'product');
    const pic = list.appendChild(document.createElement('img'));

    pic.setAttribute('width', 200);

    const title = list.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');

    const price = list.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');


    const button = list.appendChild(document.createElement('button'));
    button.setAttribute('onclick', "alert('Added to Cart!')");
    button.addEventListener('click', event => {
      let element = event.target;
      if (element.textContent === 'Added to Cart') {
        element.textContent = 'Remove from Cart'
        let temp = document.getElementById('cart-count').textContent
        document.getElementById('cart-count').textContent = parseInt(temp) + 1
        element.setAttribute('onclick', "alert('Removed from Cart!')")
        addItem(this);
      } else {
        event.target.textContent = 'Added to Cart'
        let temp = document.getElementById('cart-count').textContent
        if (temp > 1) {
          document.getElementById('cart-count').textContent = temp - 1
        } else {
          document.getElementById('cart-count').textContent = 0
        }
        element.setAttribute('onclick', "alert('Added to Cart!')")
        removeItem(this);
      }
    })
    button.textContent = 'Added to Cart';

    let style = shadow.appendChild (document.createElement('style'));
    style.textContent = 
    `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'button';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    `
    this.shadowRoot.append(style, list);
  }

  connectedCallback() {
    update(this)
  }

}

customElements.define('product-item', ProductItem);