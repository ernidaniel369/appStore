import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { Product } from '../../services/cartServices';
import AuthUser from "../AuthUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


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

  const handleQuantityChange = (id, event) => {
    const quantity = event.target.value;
    setProducts(products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          quantity: quantity
        };
      } else {
        return product;
      }
    }));
  };

  const handleBuyClick = () => {
    const productsToBuy = products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity || 1,
      email: userEmail
    }));
    Product.descuento(productsToBuy);
  }



  return (
    <Container>
      <h1>All Products</h1>
      <ListGroup>
        {products.map(product => (
          <ListGroup.Item key={product.id}>
            <h5>{product.name}</h5>
            <p>{product.description}</p>
            <p>Stock actual: {product.stock}</p>
            <div>
              <label>
                Quantity:
                <input
                  type="number"
                  value={product.quantity || 1}
                  onChange={(event) => handleQuantityChange(product.id, event)}
                  min="1"
                  max={product.stock}
                />
              </label>
            </div>
            <p>Price: ${product.price * (product.quantity || 1)}</p>
            <Button variant='danger' onClick={() => suprProduct(product.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant='primary' onClick={handleBuyClick}>Comprar</Button>
      <h2>Limpiza de carro y cookies</h2>
      <Button variant='primary' onClick={Product.muestraCookies}>Limpieza de cookies</Button>
    </Container>
  );
}

export default ProductCart;
