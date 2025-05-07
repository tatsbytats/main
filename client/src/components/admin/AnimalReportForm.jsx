import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Button, Form, Row, Col, Container, Alert, Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CheckCircleFill } from 'react-bootstrap-icons';
import { createAnimal } from '../../services/animalService';

const AnimalReportForm = ({ darkMode, onSuccess }) => {
  // Form state
  const [formData, setFormData] = useState({
    date: new Date(),
    name: '',
    breed: '',
    address: '',
    reporter: '',
    remarks: '',
    image: null
  });

  // Validation errors
  const [errors, setErrors] = useState({
    name: false,
    breed: false,
    address: false,
    reporter: false
  });

  // Submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Predefined list of breeds
  const breedOptions = [
    'Labrador Retriever',
    'German Shepherd',
    'Golden Retriever',
    'Bulldog',
    'Beagle',
    'Poodle',
    'Rottweiler',
    'Yorkshire Terrier',
    'Boxer',
    'Dachshund',
    'Other'
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false
      }));
    }
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  // Handle date change
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      breed: formData.breed === '',
      address: formData.address.trim() === '',
      reporter: formData.reporter.trim() === ''
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false); // Reset success state

    try {
      // Format the date as string for your model
      const formattedDate = format(formData.date, 'yyyy-MM-dd');

      const formPayload = new FormData();
      formPayload.append('date', formattedDate);
      formPayload.append('name', formData.name);
      formPayload.append('breed', formData.breed);
      formPayload.append('address', formData.address);
      formPayload.append('reporter', formData.reporter);
      formPayload.append('remarks', formData.remarks);
      if (formData.image) {
        formPayload.append('image', formData.image);
      }

      // Use the service function instead of direct axios call
      await createAnimal(formPayload);

      // Scroll to top to show the success alert
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Reset form
      setFormData({
        date: new Date(),
        name: '',
        breed: '',
        address: '',
        reporter: '',
        remarks: '',
        image: null
      });

      // Show success message
      setSubmitSuccess(true);

      // Call the onSuccess callback if provided
      if (typeof onSuccess === 'function') {
        onSuccess();
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error.response?.data?.message || 'Failed to submit form. Please try again.');
      // Scroll to top to show the error alert
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add useEffect to handle the success alert timeout
  useEffect(() => {
    let alertTimeout;
    if (submitSuccess) {
      alertTimeout = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000); // Auto-dismiss after 5 seconds
    }
    return () => clearTimeout(alertTimeout);
  }, [submitSuccess]);

  return (
    <Container style={{ maxWidth: '900px', marginTop: '30px' }}>
      <h2 className={`text-center mb-4 ${darkMode ? 'text-light' : 'text-deep-raspberry'}`}>Pet Report Form</h2>

      {submitSuccess && (
        <Alert
          variant="success"
          onClose={() => setSubmitSuccess(false)}
          dismissible
          className="d-flex align-items-center shadow-sm"
          style={{
            borderLeft: '4px solid #198754',
            backgroundColor: darkMode ? 'rgba(25, 135, 84, 0.15)' : 'rgba(25, 135, 84, 0.1)'
          }}
        >
          <CheckCircleFill className="me-2" size={18} />
          <div className="fw-semibold">Success! Animal report has been submitted successfully.</div>
        </Alert>
      )}

      {submitError && (
        <Alert
          variant="danger"
          onClose={() => setSubmitError('')}
          dismissible
          className="shadow-sm"
          style={{ borderLeft: '4px solid #dc3545' }}
        >
          {submitError}
        </Alert>
      )}

      <Card
        className={`shadow-sm ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
        style={{ borderRadius: '12px' }}
      >
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-4">
              {/* Date Field */}
              <Col xs={12} md={6}>
                <Form.Group controlId="date">
                  <Form.Label className={`${darkMode ? 'text-light' : ''} fw-medium`}>Report Date</Form.Label>
                  <DatePicker
                    selected={formData.date}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                    required
                  />
                </Form.Group>
              </Col>

              {/* Name Field */}
              <Col xs={12} md={6}>
                <Form.Group controlId="name">
                  <Form.Label className={`${darkMode ? 'text-light' : ''} fw-medium`}>Animal Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    isInvalid={errors.name}
                    placeholder="Enter animal name"
                    className={darkMode ? 'bg-dark text-light border-secondary' : ''}
                  />
                  {errors.name && (
                    <Form.Control.Feedback type="invalid">Animal name is required</Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              {/* Breed Field */}
              <Col xs={12} md={6}>
                <Form.Group controlId="breed">
                  <Form.Label className={`${darkMode ? 'text-light' : ''} fw-medium`}>Breed</Form.Label>
                  <Form.Control
                    as="select"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    required
                    isInvalid={errors.breed}
                    className={darkMode ? 'bg-dark text-light border-secondary' : ''}
                  >
                    <option value="">Select a breed</option>
                    {breedOptions.map((breed) => (
                      <option key={breed} value={breed}>
                        {breed}
                      </option>
                    ))}
                  </Form.Control>
                  {errors.breed && (
                    <Form.Control.Feedback type="invalid">Breed selection is required</Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>

              {/* Reporter Field */}
              <Col xs={12} md={6}>
                <Form.Group controlId="reporter">
                  <Form.Label className={`${darkMode ? 'text-light' : ''} fw-medium`}>Reporter Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="reporter"
                    value={formData.reporter}
                    onChange={handleChange}
                    required
                    isInvalid={errors.reporter}
                    placeholder="Enter reporter's name"
                    className={darkMode ? 'bg-dark text-light border-secondary' : ''}
                  />
                  {errors.reporter && (
                    <Form.Control.Feedback type="invalid">Reporter name is required</Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              {/* Address Field */}
              <Col xs={12}>
                <Form.Group controlId="address">
                  <Form.Label className={`${darkMode ? 'text-light' : ''} fw-medium`}>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    required
                    isInvalid={errors.address}
                    placeholder="Enter address details"
                    className={darkMode ? 'bg-dark text-light border-secondary' : ''}
                  />
                  {errors.address && (
                    <Form.Control.Feedback type="invalid">Address is required</Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              {/* Remarks Field */}
              <Col xs={12}>
                <Form.Group controlId="remarks">
                  <Form.Label className={`${darkMode ? 'text-light' : ''} fw-medium`}>Remarks</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Add any remarks or details"
                    className={darkMode ? 'bg-dark text-light border-secondary' : ''}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              {/* Image Upload */}
              <Col xs={12}>
                <Form.Group controlId="image">
                  <Form.Label className={`${darkMode ? 'text-light' : ''} fw-medium`}>Animal Image (Optional)</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className={darkMode ? 'bg-dark text-light border-secondary' : ''}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Submit Button */}
            <Row>
              <Col xs={12}>
                <Button
                  type="submit"
                  variant={darkMode ? "info" : "deep-raspberry"}
                  disabled={isSubmitting}
                  className="mt-3 w-100 py-2"
                  style={{
                    borderRadius: '6px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AnimalReportForm;
