import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../assets/css/about.css";
import Header from "../common/header";

const AboutUsPage = () => {
  return (
    <>
      <Header />
      <Container className="about-us">
        <Row>
          <Col md={12} className="text-center mb-4">
            <h1>About Us</h1>
            <p>Learn more about our mission, vision, and team.</p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card className="about-card">
              <Card.Body>
                <Card.Title>Our Mission</Card.Title>
                <Card.Text>
                  Our mission is to provide exceptional employee management
                  solutions that enhance productivity and foster growth.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="about-card">
              <Card.Body>
                <Card.Title>Our Vision</Card.Title>
                <Card.Text>
                  We envision a future where businesses and employees thrive
                  together through innovative management solutions and
                  supportive environments.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="about-card">
              <Card.Body>
                <Card.Title>Our Team</Card.Title>
                <Card.Text>
                  Our team is composed of experienced professionals dedicated to
                  creating top-notch employee management solutions and
                  delivering outstanding service.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AboutUsPage;
