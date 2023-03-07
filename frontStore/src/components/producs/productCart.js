import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { Product } from '../../services/cartServices';

const ProductCart = () => {
  const products = Product.getAllProducts();

  return (
    <Container>
      <h1>All Products</h1>
      <ListGroup>
        {products.map(product => (
          <ListGroup.Item key={product.id}>
            <h5>{product.name}</h5>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default ProductCart;
