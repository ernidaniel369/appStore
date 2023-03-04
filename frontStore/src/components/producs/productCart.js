import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';

const products = [
  { id: 1, name: 'Product 1', description: 'Description of product 1', price: 10.99 },
  { id: 2, name: 'Product 2', description: 'Description of product 2', price: 20.99 },
  { id: 3, name: 'Product 3', description: 'Description of product 3', price: 30.99 },
];

const ProductCart = () => {
  return (
    <Container>
      <h1>Shopping Cart</h1>
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
