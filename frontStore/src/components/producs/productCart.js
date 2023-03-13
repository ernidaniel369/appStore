import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { Product } from '../../services/cartServices';
import AuthUser from "../AuthUser";


const ProductCart = () => {
  const [products, setProducts] = useState([]);
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState("");


  useEffect(() => {
      fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
      http.post("/me").then((res) => {
          setUserdetail(res.data);
      });
  };

  const userEmail = userdetail.email;

  useEffect(() => {
    setProducts(Product.getAllProducts(userEmail));
  }, [userEmail]);

  const suprProduct = (id) => {
    Product.deleteProduct(id, userEmail);
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
            <Button variant='primary' onClick={() => suprProduct(product.id)}>Delete product</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant='primary' onClick={Product.muestraCookies}>Limpieza de cookies</Button>
    </Container>
  );
}

export default ProductCart;
