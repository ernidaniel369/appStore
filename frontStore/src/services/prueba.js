////cookies con email

import Cookies from 'js-cookie';

export class Product {
  static productsArray = [];

  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  static addNewProduct(id, name, price, email) {
    const newProduct = new Product(id, name, price);
    this.addProduct(newProduct, email);
    console.log('item agregado');
    console.log(email);
  }

  static addProduct(product, email) {
    const products = JSON.parse(Cookies.get(`products-${email}`) || '[]');
    products.push(product);
    Cookies.set(`products-${email}`, JSON.stringify(products, (key, value) => {
      if (key === 'productsArray' && Array.isArray(value)) {
        return value.map(product => ({ id: product.id, name: product.name, price: product.price }));
      }
      return value;
    }), { expires: 1 });
  }

  static getAllProducts(email) {
    const products = Cookies.get(`products-${email}`);
    if (products) {
      try {
        return JSON.parse(products);
      } catch (error) {
        console.error('Error al parsear el JSON de productos:', error);
      }
    }
    return [];
  }

static deleteProduct(id, email) {
    const products = JSON.parse(Cookies.get(`products-${email}`));
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex > -1) {
      products.splice(productIndex, 1);
      Cookies.set(`products-${email}`, JSON.stringify(products));
      console.log(`El producto ${id} ha sido eliminado.`);
    } else {
      console.log(`No se encontró ningún producto con el id ${id}.`);
    }
}
  //muestra y elimina todas las cookies 
  static muestraCookies() {
    console.log(Cookies.get());
    Object.keys(Cookies.get()).forEach(function (products) {
      Cookies.remove(products);
    });
    console.log('cookies eliminadas');
  }

}

//////////cookies sin email
import Cookies from 'js-cookie';

export class Product {
  static productsArray = [];

  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  static addNewProduct(id, name, price, email) {
    
    const newProduct = new Product(id, name, price);
    this.addProduct(newProduct);
    console.log('item agregado')
    console.log(email);
  }

  static addProduct(product) {
    const products = JSON.parse(Cookies.get('products') || '[]');
    products.push(product);
    Cookies.set('products', JSON.stringify(products, (key, value) => {
      if (key === 'productsArray' && Array.isArray(value)) {
        // Filtrar el array de productos para evitar estructuras circulares
        return value.map(product => ({ id: product.id, name: product.name, price: product.price }));
      }
      return value;
    }), {expires: 1});
  }

  static getAllProducts() {
    const products = Cookies.get('products');
    if (products) {
      try {
        this.productsArray = JSON.parse(products);
      } catch (error) {
        console.error('Error al parsear el JSON de productos:', error);
      }
    }
    return this.productsArray;
  }

  static deleteProduct(id){
    const cookies = Cookies.get();
    const products = JSON.parse(cookies.products);

    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex > -1) {
      products.splice(productIndex, 1);
      Cookies.set('products', JSON.stringify(products));
      console.log(`El producto ${id} ha sido eliminado.`);
      
    } else {
      console.log(`No se encontró ningún producto con el id ${id}.`);
    }

  }
  //muestra y elimina todas las cookies
  static muestraCookies (){
    console.log(Cookies.get());
    Object.keys(Cookies.get()).forEach(function(products) {
      Cookies.remove(products);
    });
    console.log('cookies eliminadas');
  }
}

