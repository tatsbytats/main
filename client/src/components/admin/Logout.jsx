import React from 'react';
import { Row, Col, Button, Container, Card } from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';

const Logout = ({ darkMode }) => {
  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col md={6} lg={5} xl={4}>
          <Card
            className={`border-0 text-center ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
            style={{
              borderRadius: '10px',
              boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Card.Body className="p-5">
              <div className={`rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center ${darkMode ? 'bg-danger bg-opacity-10' : 'bg-danger bg-opacity-10'}`}
                style={{ width: '80px', height: '80px' }}>
                <BoxArrowRight size={40} className="text-danger" />
              </div>

              <h3 className="mb-3">You've Been Logged Out</h3>
              <p className={`mb-4 ${darkMode ? 'text-light-emphasis' : 'text-secondary'}`}>
                Thank you for using the TAARA Admin Dashboard. You have been successfully logged out of your account.
              </p>

              <div className="d-grid gap-2">
                <Button variant={darkMode ? "info" : "deep-raspberry"} size="lg">
                  Log In Again
                </Button>
                <Button variant="link" className={darkMode ? 'text-light' : 'text-secondary'}>
                  Return to Homepage
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Logout;
