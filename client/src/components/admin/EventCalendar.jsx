import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Container, Card, Badge, Modal, Form, Alert } from 'react-bootstrap';
import { CheckCircle, Clock, PencilSquare, Trash, GeoAlt } from 'react-bootstrap-icons';
import { format, parseISO } from 'date-fns';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../services/eventService';

const EventCalendar = ({ darkMode }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    status: 'pending'
  });

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Show success message for 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      console.log('EventCalendar: Fetching events...');
      const data = await getEvents();
      console.log('EventCalendar: Received data:', data);

      if (Array.isArray(data)) {
        setEvents(data);
        setError(null);
      } else {
        console.error('EventCalendar: Received non-array data:', data);
        setEvents([]);
        setError('Received invalid data format from server. Expected an array of events.');
      }
    } catch (err) {
      console.error('EventCalendar: Error fetching events:', err);
      setError(`Failed to load events: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Open modal for creating a new event
  const handleAddEvent = () => {
    setCurrentEvent(null);
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      status: 'pending'
    });
    setShowModal(true);
  };

  // Open modal for editing an event
  const handleEditEvent = (event) => {
    // Format date for the date input (YYYY-MM-DD)
    const formattedDate = format(new Date(event.date), 'yyyy-MM-dd');

    setCurrentEvent(event);
    setFormData({
      title: event.title,
      date: formattedDate,
      time: event.time,
      location: event.location,
      description: event.description,
      status: event.status
    });
    setShowModal(true);
  };

  // Open delete confirmation modal
  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  // Submit form to create or update an event
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentEvent) {
        // Update existing event
        await updateEvent(currentEvent._id, formData);
        setSuccessMessage('Event updated successfully!');
      } else {
        // Create new event
        await createEvent(formData);
        setSuccessMessage('Event created successfully!');
      }

      // Close modal and refresh events
      setShowModal(false);
      fetchEvents();
    } catch (err) {
      console.error('Error saving event:', err);
      setError('Failed to save event. Please try again.');
    }
  };

  // Delete an event
  const handleDeleteConfirm = async () => {
    try {
      await deleteEvent(eventToDelete._id);
      setSuccessMessage('Event deleted successfully!');
      setShowDeleteModal(false);
      fetchEvents();
    } catch (err) {
      console.error('Error deleting event:', err);
      setError('Failed to delete event. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  // Status badge renderer
  const renderStatusBadge = (status) => {
    switch(status) {
      case 'confirmed':
        return (
          <Badge
            bg={darkMode ? "transparent" : "transparent"}
            className="d-flex align-items-center gap-1 rounded-pill px-2 py-1"
            style={{
              width: 'fit-content',
              border: darkMode ? '1px solid rgba(25, 135, 84, 0.5)' : '1px solid rgba(25, 135, 84, 0.5)',
              color: darkMode ? 'rgba(25, 235, 84, 0.9)' : 'rgba(25, 135, 84, 0.9)'
            }}
          >
            <CheckCircle size={10} /> Confirmed
          </Badge>
        );
      case 'pending':
        return (
          <Badge
            bg={darkMode ? "transparent" : "transparent"}
            className="d-flex align-items-center gap-1 rounded-pill px-2 py-1"
            style={{
              width: 'fit-content',
              border: darkMode ? '1px solid rgba(255, 193, 7, 0.5)' : '1px solid rgba(255, 193, 7, 0.5)',
              color: darkMode ? 'rgba(255, 193, 7, 0.9)' : 'rgba(255, 193, 7, 0.9)'
            }}
          >
            <Clock size={10} /> Pending
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge
            bg={darkMode ? "transparent" : "transparent"}
            className="d-flex align-items-center gap-1 rounded-pill px-2 py-1"
            style={{
              width: 'fit-content',
              border: darkMode ? '1px solid rgba(220, 53, 69, 0.5)' : '1px solid rgba(220, 53, 69, 0.5)',
              color: darkMode ? 'rgba(220, 53, 69, 0.9)' : 'rgba(220, 53, 69, 0.9)'
            }}
          >
            <Clock size={10} /> Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Container fluid className="py-4">
      {/* Success message alert */}
      {successMessage && (
        <Alert
          variant="success"
          className="mb-4 d-flex align-items-center"
          style={{
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          <CheckCircle className="me-2" /> {successMessage}
        </Alert>
      )}

      {/* Error message alert */}
      {error && (
        <Alert
          variant="danger"
          className="mb-4"
          style={{ borderRadius: '8px' }}
          dismissible
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={`fw-bold ${darkMode ? 'text-light' : 'text-deep-raspberry'}`}>Event Calendar</h2>
        <Button
          variant={darkMode ? "info" : "deep-raspberry"}
          size="sm"
          className="px-3"
          style={{ borderRadius: '4px' }}
          onClick={handleAddEvent}
        >
          Add Event
        </Button>
      </div>

      {/* Events count badge */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Badge
          bg={darkMode ? "info" : "deep-raspberry"}
          className="rounded-pill px-3 py-2"
        >
          {events.length} Upcoming Events
        </Badge>
      </div>

      {/* Loading indicator */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading events...</p>
        </div>
      ) : (
        <>
          {/* No events message */}
          {events.length === 0 && (
            <div className="text-center py-5">
              <p>No events found. Click "Add Event" to create your first event.</p>
            </div>
          )}

          {/* Events cards */}
          <Row className="g-4">
            {events.map(event => (
              <Col md={6} lg={3} key={event._id}>
                <Card
                  className={`h-100 border-0 ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
                  style={{
                    borderRadius: '10px',
                    boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between mb-3">
                      <Badge
                        bg={darkMode ? "info" : "deep-raspberry"}
                        className="rounded-pill px-3 py-1"
                      >
                        {formatDate(event.date)}
                      </Badge>
                      {renderStatusBadge(event.status)}
                    </div>
                    <h5 className="fw-bold mb-2">{event.title}</h5>
                    <div className="d-flex align-items-center mb-2">
                      <Clock size={14} className={`me-2 ${darkMode ? 'text-light-emphasis' : 'text-secondary'}`} />
                      <span className={`small ${darkMode ? 'text-light-emphasis' : 'text-secondary'}`}>{event.time}</span>
                    </div>
                    <div className="d-flex align-items-start mb-3">
                      <GeoAlt size={14} className={`me-1 mt-1 ${darkMode ? 'text-light-emphasis' : 'text-secondary'}`} />
                      <span className={`ms-1 small ${darkMode ? 'text-light-emphasis' : 'text-secondary'}`}>{event.location}</span>
                    </div>
                    <p className={`small mb-0 ${darkMode ? 'text-light-emphasis' : 'text-secondary'}`}>
                      {event.description}
                    </p>
                  </Card.Body>
                  <Card.Footer className={`border-0 ${darkMode ? 'bg-dark' : 'bg-white'}`}>
                    <div className="d-flex justify-content-end gap-2">
                      <Button
                        variant="link"
                        className={`p-0 small ${darkMode ? 'text-info' : 'text-deep-raspberry'}`}
                        style={{ textDecoration: 'none' }}
                        onClick={() => handleEditEvent(event)}
                      >
                        <PencilSquare size={14} className="me-1" /> Edit
                      </Button>
                      <Button
                        variant="link"
                        className="p-0 small text-danger"
                        style={{ textDecoration: 'none' }}
                        onClick={() => handleDeleteClick(event)}
                      >
                        <Trash size={14} className="me-1" /> Delete
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* Event Form Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className={darkMode ? 'bg-dark text-light' : ''}>
          <Modal.Title>{currentEvent ? 'Edit Event' : 'Add New Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkMode ? 'bg-dark text-light' : ''}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className={darkMode ? 'bg-dark text-light border-secondary' : ''}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className={darkMode ? 'bg-dark text-light border-secondary' : ''}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                placeholder="e.g. 10:00 AM - 2:00 PM"
                required
                className={darkMode ? 'bg-dark text-light border-secondary' : ''}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className={darkMode ? 'bg-dark text-light border-secondary' : ''}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className={darkMode ? 'bg-dark text-light border-secondary' : ''}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={darkMode ? 'bg-dark text-light border-secondary' : ''}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant={darkMode ? "info" : "deep-raspberry"} type="submit">
                {currentEvent ? 'Update Event' : 'Create Event'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton className={darkMode ? 'bg-dark text-light' : ''}>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkMode ? 'bg-dark text-light' : ''}>
          <p>Are you sure you want to delete the event "{eventToDelete?.title}"?</p>
          <p className="text-danger">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer className={darkMode ? 'bg-dark text-light' : ''}>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete Event
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EventCalendar;
