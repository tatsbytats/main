import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Database, Calendar2 } from 'react-bootstrap-icons';
import { getAnimals } from '../../services/animalService';

const DashboardOverview = ({ darkMode }) => {
  const [animalCount, setAnimalCount] = useState(0);

  useEffect(() => {
    const fetchAnimalCount = async () => {
      try {
        const animals = await getAnimals();
        setAnimalCount(animals.length);
      } catch (error) {
        console.error('Error fetching animal count:', error);
      }
    };

    fetchAnimalCount();
  }, []);

  return (
  <Container className="py-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className={`fw-bold ${darkMode ? 'text-light' : 'text-deep-raspberry'}`}>Dashboard</h2>
    </div>

    <Row className="g-4 mb-4">
      <Col md={6}>
        <Card
          className={`h-100 border-0 ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
          style={{
            borderRadius: '10px',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = darkMode ?
              '0 8px 15px rgba(0, 0, 0, 0.5)' :
              '0 8px 20px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = darkMode ?
              '0 4px 6px rgba(0, 0, 0, 0.4)' :
              '0 4px 12px rgba(0, 0, 0, 0.05)';
          }}
        >
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Card.Title className={`${darkMode ? 'text-light-emphasis' : 'text-secondary'} mb-0 fs-6`}>
                Animals Registered
              </Card.Title>
              <div className={`rounded-circle p-2 ${darkMode ? 'bg-info bg-opacity-10' : 'bg-deep-raspberry bg-opacity-10'}`}>
                <Database size={18} className={darkMode ? 'text-info' : 'text-deep-raspberry'} />
              </div>
            </div>
            <div className="mt-2">
              <h3 className="fw-bold mb-0">{animalCount}</h3>
              <p className="text-secondary mb-0 small">
                Total registered animals
              </p>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6}>
        <Card
          className={`h-100 border-0 ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
          style={{
            borderRadius: '10px',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = darkMode ?
              '0 8px 15px rgba(0, 0, 0, 0.5)' :
              '0 8px 20px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = darkMode ?
              '0 4px 6px rgba(0, 0, 0, 0.4)' :
              '0 4px 12px rgba(0, 0, 0, 0.05)';
          }}
        >
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Card.Title className={`${darkMode ? 'text-light-emphasis' : 'text-secondary'} mb-0 fs-6`}>
                Events This Month
              </Card.Title>
              <div className={`rounded-circle p-2 ${darkMode ? 'bg-warning bg-opacity-10' : 'bg-warning bg-opacity-10'}`}>
                <Calendar2 size={18} className={darkMode ? 'text-warning' : 'text-warning'} />
              </div>
            </div>
            <div className="mt-2">
              <h3 className="fw-bold mb-0">12</h3>
              <p className="text-warning mb-0 small">
                <i className="bi bi-dash-short"></i> Same as last month
              </p>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row className="g-4 mt-2">
      <Col>
        <Card
          className={`border-0 ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
          style={{
            borderRadius: '10px',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = darkMode ?
              '0 8px 15px rgba(0, 0, 0, 0.5)' :
              '0 8px 20px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = darkMode ?
              '0 4px 6px rgba(0, 0, 0, 0.4)' :
              '0 4px 12px rgba(0, 0, 0, 0.05)';
          }}
        >
          <Card.Body className="p-4">
            <Card.Title className="mb-3">Upcoming Events</Card.Title>
            <div className="upcoming-events">
              <div className={`p-3 mb-3 rounded ${darkMode ? 'bg-dark' : 'bg-light'}`}
                   style={{ border: darkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)' }}>
                <div className="d-flex justify-content-between">
                  <span className="badge bg-primary">Apr 30</span>
                  <span className="badge bg-success">Confirmed</span>
                </div>
                <h6 className="mt-2 mb-1">Adoption Fair</h6>
                <p className="small text-secondary mb-0">10:00 AM - 4:00 PM</p>
              </div>

              <div className={`p-3 mb-3 rounded ${darkMode ? 'bg-dark' : 'bg-light'}`}
                   style={{ border: darkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)' }}>
                <div className="d-flex justify-content-between">
                  <span className="badge bg-primary">May 05</span>
                  <span className="badge bg-warning">Pending</span>
                </div>
                <h6 className="mt-2 mb-1">Volunteer Orientation</h6>
                <p className="small text-secondary mb-0">2:00 PM - 3:30 PM</p>
              </div>

              <div className={`p-3 rounded ${darkMode ? 'bg-dark' : 'bg-light'}`}
                   style={{ border: darkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)' }}>
                <div className="d-flex justify-content-between">
                  <span className="badge bg-primary">May 15</span>
                  <span className="badge bg-success">Confirmed</span>
                </div>
                <h6 className="mt-2 mb-1">Fundraiser Gala</h6>
                <p className="small text-secondary mb-0">6:00 PM - 10:00 PM</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  );
};

export default DashboardOverview;
