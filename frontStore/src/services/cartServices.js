import Cookies from 'js-cookie';

export class Product {
  static productsArray = [];

  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  static addNewProduct(id, name, price) {
    
    const newProduct = new Product(id, name, price);
    this.addProduct(newProduct);
    console.log('item agregado')
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
    console.log('funcion para eliminar prudcto numero: '+ id);
    const products = Object.values(Cookies.get('products')); // convierte el objeto en un arreglo de valores
    const product = products.find(product => product.id === id); // utiliza find() en el arreglo de productos
    
    if (product) {
      console.log(product);
    } else {
      console.log(`No se encontró ningún producto con el id ${id}`);
    }
  }
}

