import React from 'react';
import { Row, Col, Button, Container, Card, Form, Badge } from 'react-bootstrap';
import { FileEarmarkText, Bell, Trash } from 'react-bootstrap-icons';

const Settings = ({ darkMode }) => {
  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={`fw-bold ${darkMode ? 'text-light' : 'text-deep-raspberry'}`}>Settings</h2>
        <Button
          variant={darkMode ? "info" : "deep-raspberry"}
          size="sm"
          className="px-3"
          style={{ borderRadius: '4px' }}
        >
          Save Changes
        </Button>
      </div>

      <Row className="g-4">
        <Col lg={8}>
          <Card
            className={`border-0 ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
            style={{
              borderRadius: '10px',
              boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Card.Body className="p-4">
              <h5 className="mb-4">System Settings</h5>

              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} md={6} className="mb-3">
                    <Form.Label className={darkMode ? 'text-light' : ''}>Site Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="TAARA Animal Rescue"
                      className={darkMode ? 'bg-dark text-light border-secondary' : ''}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={6} className="mb-3">
                    <Form.Label className={darkMode ? 'text-light' : ''}>Admin Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="admin@example.com"
                      className={darkMode ? 'bg-dark text-light border-secondary' : ''}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md={6} className="mb-3">
                    <Form.Label className={darkMode ? 'text-light' : ''}>Default Language</Form.Label>
                    <Form.Select
                      className={darkMode ? 'bg-dark text-light border-secondary' : ''}
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} md={6} className="mb-3">
                    <Form.Label className={darkMode ? 'text-light' : ''}>Timezone</Form.Label>
                    <Form.Select
                      className={darkMode ? 'bg-dark text-light border-secondary' : ''}
                    >
                      <option>UTC-08:00 Pacific Time</option>
                      <option>UTC-05:00 Eastern Time</option>
                      <option>UTC+00:00 Greenwich Mean Time</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className={darkMode ? 'text-light' : ''}>Database Backup Frequency</Form.Label>
                  <Form.Select
                    className={darkMode ? 'bg-dark text-light border-secondary' : ''}
                  >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="enable-notifications"
                    label="Enable Email Notifications"
                    className={darkMode ? 'text-light' : ''}
                    defaultChecked
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="enable-audit-log"
                    label="Enable Audit Logging"
                    className={darkMode ? 'text-light' : ''}
                    defaultChecked
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card
            className={`border-0 mb-4 ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
            style={{
              borderRadius: '10px',
              boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Card.Body className="p-4">
              <h5 className="mb-3">System Information</h5>

              <div className="mb-3">
                <div className={`small ${darkMode ? 'text-light-emphasis' : 'text-secondary'}`}>Version</div>
                <div>2.5.1</div>
              </div>

              <div className="mb-3">
                <div className={`small ${darkMode ? 'text-light-emphasis' : 'text-secondary'}`}>Last Backup</div>
                <div>August 20, 2023 - 03:45 AM</div>
              </div>

              <div className="mb-3">
                <div className={`small ${darkMode ? 'text-light-emphasis' : 'text-secondary'}`}>Database Size</div>
                <div>245 MB</div>
              </div>

              <div>
                <div className={`small ${darkMode ? 'text-light-emphasis' : 'text-secondary'}`}>Server Status</div>
                <div className="d-flex align-items-center">
                  <span className="me-2">Online</span>
                  <Badge bg="success" className="rounded-circle p-1"></Badge>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card
            className={`border-0 ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
            style={{
              borderRadius: '10px',
              boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Card.Body className="p-4">
              <h5 className="mb-3">Quick Actions</h5>

              <div className="d-grid gap-2">
                <Button variant={darkMode ? "outline-info" : "outline-deep-raspberry"} className="d-flex align-items-center justify-content-center gap-2">
                  <FileEarmarkText size={16} /> Export Data
                </Button>

                <Button variant={darkMode ? "outline-info" : "outline-deep-raspberry"} className="d-flex align-items-center justify-content-center gap-2">
                  <Bell size={16} /> Test Notifications
                </Button>

                <Button variant="outline-danger" className="d-flex align-items-center justify-content-center gap-2">
                  <Trash size={16} /> Clear Cache
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
