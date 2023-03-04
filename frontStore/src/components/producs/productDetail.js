import AuthUser from '../AuthUser';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import axios from 'axios';

const endpoint = 'http://localhost:8000/api';

const ProductDetail = () => {

    const [ product, setProduct ] = useState( null )
    const { id } = useParams();
    const {token} = AuthUser();

    

    useEffect ( ()=> {
        getProductDetails(id)
    }, [id])

    const getProductDetails = async (id) => {
        const response = await axios.get(`${endpoint}/product/${id}`)
        setProduct(response.data)
    }

    const addCart = () =>{
        if (token) {
            window.location.href = `http://localhost:3000/cart`;
        } else { 
            alert('Es necesario estar logueado para ir de compras');

            window.location.href = `http://localhost:3000/login`;
        }
    }


    if (!product) {
        console.log(product);
        return <div>Loading...</div>
    }
    

    return (
        <Container style={{maxWidth: '800px'}} className="align-items-center">
            <Row>
                <Col>
                <Card className='my-3 p-3 rounded'>
                    <Card.Body>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                    <Carousel prevIcon={<span className="carousel-control-prev-icon" />} nextIcon={<span className="carousel-control-next-icon" />}>
                        {product.images.map((img, index) => (
                            <Carousel.Item key={index}>
                                <img
                                src={img.url}
                                alt={`${product.name}-img-${index}`}
                                className="d-block mx-auto img-fluid"
                                style={{maxHeight: "500px", maxWidth: "100%"}}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    </Card.Body>
                </Card>
                </Col>
                    <Col>
                <Card className='my-3 p-3 rounded'>
                    <Card.Body>
                    <Card.Text as='div'>Description: {product.description}</Card.Text>
                    <Card.Text as='div'>Stock: {product.stock}</Card.Text>
                    <Card.Text as='h3'>Price: ${product.price}</Card.Text>
                    <Button variant='primary' onClick={addCart} >Add Card</Button>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
