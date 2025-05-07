import React from 'react';
import {
  Tab,
  Card,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import '../../assets/styles/custom-welfare.css'; // You can keep or clean this as needed

const AnimalWelfareLaw = () => {
  return (
    <Tab.Pane eventKey="WelfareLaw" className="welfare-law-tab px-3 px-lg-4 py-4">
      {/* Section Header */}
      <div className="text-center mb-5">
        <h2 className="mb-3 text-deep-raspberry fw-bold">The Animal Welfare Law</h2>
        <p className="lead text-muted">
          Legal protections ensuring humane treatment of all animals.
        </p>
      </div>

      {/* Legal Acts Section */}
      <Card className="shadow-sm border-0 mb-5">
        
        <Card.Body className="p-4">
          <Row>
            <Col md={6}>
              <h5>Republic Act 8485 - Animal Welfare Act of 1998</h5>
              <p className="text-muted">
                This law mandates the humane treatment of animals, prohibits animal cruelty, and ensures that animals are provided with proper care, shelter, and medical treatment.
              </p>
            </Col>
            <Col md={6}>
              <h5>Presidential Decree No. 1602 - The Anti-Cruelty Law</h5>
              <p className="text-muted">
                This decree imposes penalties for acts of cruelty toward animals, including mutilation, torture, and neglect.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h5>Republic Act 10631 - Philippine Animal Welfare Act of 2013</h5>
              <p className="text-muted">
                This updated version of the Animal Welfare Act further strengthens protections for animals, providing more detailed regulations and enforcing stricter penalties for violations.
              </p>
            </Col>
            <Col md={6}>
              <h5>Republic Act 9482</h5>
              <p className="text-muted">
                This act promotes the protection of animals against cruelty, establishes humane animal shelters, and calls for regular monitoring and the implementation of animal welfare policies.
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Legal Support Section
      <div className="bg-light rounded-4 p-4 p-md-5 text-center shadow-sm">
        <h5 className="fw-semibold mb-3">Need Help Understanding the Law?</h5>
        <p className="text-muted mb-4">
          Our legal team can guide you through animal welfare regulations and help you understand your rights and responsibilities.
        </p>
        <Button variant="info" className="rounded-pill px-4 py-2">
          Contact Legal Support <i className="bi bi-arrow-right ms-2"></i>
        </Button>
      </div> */}
    </Tab.Pane>
  );
};

export default AnimalWelfareLaw;
