import React, { useState } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { Product } from '../../services/cartServices';

const ProductCart = () => {
  const [products, setProducts] = useState(Product.getAllProducts());

  const handleDeleteProduct = (id) => {
    Product.deleteProduct(id);
    setProducts(products.filter(product => product.id !== id));
  };

  const uniqueProducts = Object.values(products.reduce((acc, cur) => {
    if (!acc[cur.name]) {
      acc[cur.name] = cur;
      acc[cur.name].count = 1;
    } else {
      acc[cur.name].count++;
    }
    return acc;
  }, {}));

  return (
    <Container>
      <h1>All Products</h1>
      <ListGroup>
        {uniqueProducts.map(product => (
          <ListGroup.Item key={product.id}>
            <span className="product-count">{product.count}</span>
            <h5>{product.name}</h5>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <Button variant='primary' onClick={() => handleDeleteProduct(product.id)}>Delete product</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default ProductCart;


