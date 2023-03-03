import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const ProducList = () => {
    const products = [
        {
            id: 1,
            name: "ejemplo",
            description: "probando objeto",
            price: 1500
        },
        {
            id: 2,
            name: "Producto 1",
            description: "Este es el primer producto de la lista",
            price: 2000
        },
        {
            id: 3,
            name: "Producto 2",
            description: "Este es el segundo producto de la lista",
            price: 3000
        }

    ];

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
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                        <Card className='my-3 p-3 rounded'>
                            <Card.Body>
                                <Card.Title as='div'>
                                    <strong>{product.name}</strong>
                                </Card.Title>
                                <Card.Text as='div'>{product.description}</Card.Text>
                                <Card.Text as='h3'>${product.price}</Card.Text>
                                <Button variant='primary'>Agregar al carrito</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProducList;