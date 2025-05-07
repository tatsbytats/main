import React from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { Facebook, Instagram, Twitter, Heart } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-dark text-white py-5 mt-auto">
    <Container>
      <Row className="g-4">
        <Col lg={4}>
          <h5>Taara</h5>
          <p className="">
            SEC registered, volunteer based,LGU accredited animal welfare group aimed at promoting a society where all animals are protected and treated with love,compassion and respect.
          </p>
          <div className="social-icons">
            <Button
              variant="outline-light"
              size="sm"
              className="me-2"
              onClick={() => window.open("https://www.facebook.com/TAARAfortheLoveofStrays2022", "_blank")}
            >
              <Facebook />
            </Button>
            <Button
              variant="outline-light"
              size="sm"
              className="me-2"
              onClick={() => window.open("https://instagram.com/yourpage", "_blank")}
            >
              <Instagram />
            </Button>
            <Button
              variant="outline-light"
              size="sm"
              className="me-2"
              onClick={() => window.open("https://twitter.com/yourpage", "_blank")}
            >
              <Twitter />
            </Button>
          </div>
        </Col>

        <Col xs={6} md={4} lg={3}>
          <h5>Quick Links</h5>
          <Nav className="flex-column">
            <Nav.Link href="#" className="text-white px-0">Home</Nav.Link>
            <Nav.Link href="#" className="text-white px-0">Donate</Nav.Link>
            <Nav.Link href="#" className="text-white px-0">Volunteer</Nav.Link>
            <Nav.Link href="#" className="text-white px-0">Success Stories</Nav.Link>
            <Nav.Link as={Link} to="/fundraising" className="text-white px-0">
              Fund Raising
            </Nav.Link>
            <Nav.Link as={Link} to="/rescue" className="text-white px-0">
              staff
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/login" className="text-white px-0">
              admin
            </Nav.Link>
          </Nav>
        </Col>

        <Col xs={6} md={4} lg={3}>
          <h5>Resources</h5>
          <Nav className="flex-column">
            <Nav.Link href="#" className="text-white px-0">Pet Care Tips</Nav.Link>
            <Nav.Link href="#" className="text-white px-0">Adoption Process</Nav.Link>
            <Nav.Link href="#" className="text-white px-0">Spay/Neuter Info</Nav.Link>
            <Nav.Link href="#" className="text-white px-0">Emergency Contacts</Nav.Link>
          </Nav>
        </Col>

        <Col xs={6} md={4} lg={2}>
          <h5>Legal</h5>
          <Nav className="flex-column">
            <Nav.Link href="#" className="text-white px-0">Privacy Policy</Nav.Link>
            <Nav.Link href="#" className="text-white px-0">Terms of Use</Nav.Link>
            <Nav.Link href="#" className="text-white px-0">Financial Reports</Nav.Link>
          </Nav>
        </Col>
      </Row>

      <hr className="mt-4 mb-3" />

      <Row>
        <Col md={6} className="mb-3 mb-md-0">
          <p className="mb-0 text-muted">
            &copy; {new Date().getFullYear()} Paws & Hearts. All rights reserved.
          </p>
        </Col>
        <Col md={6} className="text-md-end">
          <p className="mb-0 text-muted">
            Made with <Heart className="text-danger" /> for animals
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
