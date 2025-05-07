import '../../assets/styles/custom-buttons.css';

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container, Spinner, Alert } from 'react-bootstrap';
import { format } from 'date-fns';
import { getEvents } from '../../services/eventService';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        console.log('Public Events: Fetching events...');
        const data = await getEvents();
        console.log('Public Events: Received data:', data);

        if (Array.isArray(data)) {
          // Filter only confirmed events and sort by date
          const confirmedEvents = data
            .filter(event => event.status === 'confirmed')
            .sort((a, b) => new Date(a.date) - new Date(b.date));

          console.log('Public Events: Filtered confirmed events:', confirmedEvents);
          setEvents(confirmedEvents);
          setError(null);
        } else {
          console.error('Public Events: Received non-array data:', data);
          setEvents([]);
          setError('Received invalid data format from server. Expected an array of events.');
        }
      } catch (err) {
        console.error('Public Events: Error fetching events:', err);
        setError(`Failed to load events: ${err.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-3 text-deep-raspberry fw-bold">Upcoming Events</h2>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading events...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : events.length === 0 ? (
        <Alert variant="info">No upcoming events at this time. Please check back later!</Alert>
      ) : (
        <Row xs={1} sm={2} lg={3} className="g-4">
          {events.map((event) => (
            <Col key={event._id}>
              <Card className="h-100 shadow-sm border-0 rounded-3">
                <Card.Body>
                  <Card.Title className="mb-2">{event.title}</Card.Title>
                  <Card.Text className="text-muted small mb-2">
                    <i className="bi bi-calendar-event me-1"></i>
                    {formatDate(event.date)} &nbsp; • &nbsp; {event.time}
                  </Card.Text>
                  <Card.Text className="mb-2">
                    <strong>Location:</strong> {event.location}
                  </Card.Text>
                  <Card.Text className="text-muted mt-3 small">
                    <strong>Description:</strong> {event.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Events;
