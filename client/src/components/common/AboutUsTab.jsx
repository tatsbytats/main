import React from 'react';
import { Tab, Card, Row, Col } from 'react-bootstrap';

const AboutUsTab = () => {
  return (
    <Tab.Pane eventKey="AboutUs" className="about-us-tab px-3 py-4">
      {/* Intro Section */}
      <div className="text-center mb-5">
        <h2 className="mb-3 text-deep-raspberry fw-bold">About Our Organization</h2>
        <p className="lead text-muted">Compassionate care for animals since 2010</p>
      </div>

      {/* Mission and History */}
      <Row className="mb-5 g-4">
        <Col md={6}>
          <Card className="h-100 border-0 shadow-sm hover-card">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-circle bg-primary text-white me-3">
                  <i className="bi bi-bullseye fs-4"></i>
                </div>
                <h4 className="mb-0">Our Mission</h4>
              </div>
              <p className="text-muted mb-0">
                To improve animal welfare through awareness, food, shelter, and fostering compassion. 
                We create a safe and supportive environment for animals, ensuring the care and respect they deserve.
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 border-0 shadow-sm hover-card">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-circle bg-success text-white me-3">
                  <i className="bi bi-clock-history fs-4"></i>
                </div>
                <h4 className="mb-0">Our History</h4>
              </div>
              <p className="text-muted mb-0">
                Founded in 2010, we’ve helped over 5,000 animals find loving homes and provided 
                medical care to thousands more. Our team of dedicated professionals and volunteers 
                works tirelessly to make a difference.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Contact Info */}
      <Card className="border-gradient mb-5 shadow-sm">
        <Card.Header className="bg-gradient text-black py-3">
          <h5 className="mb-0">
            <i className="bi bi-envelope me-2"></i>
            Contact Information
          </h5>
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="g-4">
            <Col md={6}>
              <div>
                <h6 className="fw-bold mb-3">
                  <i className="bi bi-geo-alt-fill text-primary me-2"></i> Our Location
                </h6>
                <address className="text-muted mb-0">
                  <strong>TAARA for the Love of Strays</strong><br />
                  P-3 Burac St., San Lorenzo<br />
                  Tabaco, Philippines<br />
                  <i className="bi bi-telephone-fill text-primary me-2"></i>
                  (+63) 905 523 8105
                </address>
              </div>
            </Col>

            <Col md={6}>
              <div>
                <h6 className="fw-bold mb-3">
                  <i className="bi bi-info-circle-fill text-primary me-2"></i> Additional Details
                </h6>
                <p className="text-muted mb-2">
                  <i className="bi bi-envelope-fill text-primary me-2"></i>
                  <strong>Email:</strong> tabacoanimalrescueadoption2022@gmail.com
                </p>
                <p className="text-muted mb-2">
                  <i className="bi bi-clock-fill text-primary me-2"></i>
                  <strong>Hours:</strong> Mon–Fri, 9am–5pm
                </p>
                <p className="text-muted mb-0">
                  <i className="bi bi-calendar-event-fill text-primary me-2"></i>
                  <strong>Emergency:</strong> Available 24/7
                </p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Call to Action */}
      <Card className="border-0 bg-light">
        <Card.Body className="text-center py-4">
          <h5 className="mb-3">Want to get involved?</h5>
          <p className="text-muted mb-4">
            Join our growing community of volunteers or make a donation to help us continue our mission.
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <button className="btn btn-primary rounded-pill px-4">
              Volunteer <i className="bi bi-arrow-right ms-2"></i>
            </button>
            <button className="btn btn-outline-primary rounded-pill px-4">
              Donate Now
            </button>
          </div>
        </Card.Body>
      </Card>
    </Tab.Pane>
  );
};

export default AboutUsTab;
