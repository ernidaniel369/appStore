import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';


const endpoint = 'http://localhost:8000/api';


const ProducList = () => {

    const [ products, setProducts ] = useState( [] )

    useEffect ( ()=> {
        getAllProducts()
    }, [])

    const getAllProducts = async () => {
        const response = await axios.get(`${endpoint}/products`)
        setProducts(response.data)
    }


    
        


    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Buscar Productos</Form.Label>
                    <Form.Control type="text" placeholder="Buscar..." value={searchTerm} onChange={handleSearch} />
                </Form.Group>
            </Form>
            <Row>
                {filteredProducts.map((product) => (
                    <Col key={product.id}>
                        <Card className='my-3 p-3 rounded'>
                            <Card.Body>
                                <Card.Title as='div'>
                                    <strong>{product.name}</strong>
                                </Card.Title>
                                <img src={product.img} alt={product.name} className="img-thumbnail" style={{maxHeight: "200px", maxWidth: "250px"}} />
                                <Card.Text as='div'>{product.stock}</Card.Text>
                                <Card.Text as='h3'>${product.price}</Card.Text>
                                <Button variant='primary' onClick={() => { window.location.href = `http://localhost:3000/product/${product.id}` }}>Product Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProducList;