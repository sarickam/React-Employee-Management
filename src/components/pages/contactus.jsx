import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../../assets/css/contact.css";
import Header from "../common/header";

const Contact = () => {
  return (
    <>
      <Header />
      <Container className="contact-container mt-5">
        <h2>Contact Us</h2>
        <Form className="contact-form">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} className="text-right">
              Name:
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter your name" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} className="text-right">
              Email:
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Enter your email" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} className="text-right">
              Subject:
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Subject" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} className="text-right">
              Message:
            </Form.Label>
            <Col sm={10}>
              <Form.Control as="textarea" rows={4} placeholder="Your message" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button variant="primary" type="submit">
                Send Message
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default Contact;
