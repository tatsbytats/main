import React, { useState, useEffect, useRef } from 'react';
import {
    Row,
    Col,
    Card,
    Button,
    Form,
    FloatingLabel,
    Accordion,
    Container,
    Modal,
    Alert,
    Spinner
} from 'react-bootstrap';
import { GeoAlt, Camera, Search } from 'react-bootstrap-icons';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

// Set Mapbox token from environment variable
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '';
console.log('Mapbox Token Status:', {
    exists: !!process.env.REACT_APP_MAPBOX_TOKEN,
    startsWithPk: process.env.REACT_APP_MAPBOX_TOKEN?.startsWith('pk.'),
    length: process.env.REACT_APP_MAPBOX_TOKEN?.length
});

// Add WebGL check before mapbox initialization
const isWebGLSupported = () => {
    try {
        const canvas = document.createElement('canvas');
        const hasWebGL = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        console.log('WebGL Support:', hasWebGL);
        return hasWebGL;
    } catch (e) {
        console.error('WebGL Check Error:', e);
        return false;
    }
};

const RescueTab = () => {
    const [rescueFormData, setRescueFormData] = useState({
        petType: '',
        location: '',
        description: '',
        urgency: 'normal',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        images: []
    });
    const [coordinates, setCoordinates] = useState({
        lat: 13.3592, // Default to Tabaco City coordinates
        lng: 123.7333
    });
    const [mapError, setMapError] = useState(null);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);
    const [showTrackingModal, setShowTrackingModal] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('');

    // Form submission states
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [requestId, setRequestId] = useState(null);

    const handleRescueFormChange = (e) => {
        const { name, value } = e.target;
        setRescueFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        // Check file size (10MB limit per file)
        const validFiles = files.filter(file => {
            const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB in bytes
            if (!isValidSize) {
                alert(`File "${file.name}" exceeds 10MB limit and will be skipped`);
            }
            return isValidSize;
        });

        setRescueFormData(prev => ({
            ...prev,
            images: [...prev.images, ...validFiles]
        }));
    };

    const handleRemoveImage = (index) => {
        setRescueFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleClearAllImages = () => {
        setRescueFormData(prev => ({
            ...prev,
            images: []
        }));
    };

    const updateLocationAddress = async (lngLat) => {
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`
            );
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                setRescueFormData(prev => ({
                    ...prev,
                    location: data.features[0].place_name
                }));
            }
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    const handleRescueSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log('Starting form submission...');

            // Validate form data
            if (!rescueFormData.contactName || !rescueFormData.contactPhone || !rescueFormData.contactEmail ||
                !rescueFormData.description || !rescueFormData.location) {
                setError('Please fill in all required fields.');
                setLoading(false);
                return;
            }

            // Create FormData object for file upload
            const submitData = new FormData();

            // Map the rescue form data to match the backend expectations
            submitData.append('fullName', rescueFormData.contactName);
            submitData.append('contactNumber', rescueFormData.contactPhone);
            submitData.append('email', rescueFormData.contactEmail);
            submitData.append('tag', rescueFormData.urgency === 'emergency' ? 'Cruelty' :
                              rescueFormData.urgency === 'urgent' ? 'Accident' : 'Neglect');
            submitData.append('concern', rescueFormData.description);
            submitData.append('locationNote', rescueFormData.location);

            // Append images if any
            if (rescueFormData.images.length > 0) {
                submitData.append('photo', rescueFormData.images[0]); // Backend currently supports one photo
            }

            console.log('Form data prepared:', {
                fullName: rescueFormData.contactName,
                contactNumber: rescueFormData.contactPhone,
                email: rescueFormData.contactEmail,
                tag: rescueFormData.urgency === 'emergency' ? 'Cruelty' :
                     rescueFormData.urgency === 'urgent' ? 'Accident' : 'Neglect',
                concern: rescueFormData.description,
                locationNote: rescueFormData.location,
                hasImage: rescueFormData.images.length > 0
            });

            // Try to check server availability but don't block if it fails
            try {
                const serverAvailable = await testServerConnection();
                if (!serverAvailable) {
                    console.warn('Server test failed, but proceeding with submission anyway...');
                } else {
                    console.log('Server test successful, proceeding with submission...');
                }
            } catch (testError) {
                console.warn('Server test error, but proceeding with submission anyway:', testError);
            }

            // Send data to backend API
            console.log('Sending request to server...');
            const apiUrl = 'http://localhost:5000/api/rescue-requests';
            console.log('API URL:', apiUrl);

            // Try a direct fetch request instead of axios
            console.log('Using fetch API instead of axios...');

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: submitData,
                headers: {
                    // Don't set Content-Type for FormData, browser will set it with boundary
                    'Accept': 'application/json',
                    'Origin': window.location.origin
                },
                mode: 'cors', // Explicitly request CORS mode
                credentials: 'omit' // Don't send cookies for cross-origin requests
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server returned error:', response.status, errorText);
                throw new Error(`Server returned ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('Server response:', data);

            if (data.success) {
                setSubmitted(true);
                setRequestId(data.requestId);
                // Reset form after submission
                setRescueFormData({
                    petType: '',
                    location: '',
                    description: '',
                    urgency: 'normal',
                    contactName: '',
                    contactPhone: '',
                    contactEmail: '',
                    images: []
                });
            } else {
                setError('Failed to submit request. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting rescue request:', error);

            // Handle fetch errors
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                console.error('Network error - server might not be running or CORS might be blocking the request');
                setError('Cannot connect to server. Please check if the server is running.');
            } else if (error.message.includes('Server returned')) {
                // This is our custom error from the fetch request
                setError(error.message);
            } else {
                // Generic error handling
                setError(`Error: ${error.message || 'Unknown error occurred'}`);
            }

            // Log additional debugging information
            console.error('Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
        } finally {
            setLoading(false);
        }
    };

    const handleTrackingSubmit = (e) => {
        e.preventDefault();
        // Here you would implement the actual tracking logic
        // For now, we'll just show a mock status
        alert(`Status for tracking number ${trackingNumber}: In Progress`);
        setTrackingNumber('');
        setShowTrackingModal(false);
    };

    // Test server connection
    const testServerConnection = async () => {
        try {
            // Force using localhost:5000 for testing
            const apiUrl = 'http://localhost:5000/api/test';
            console.log('Testing server connection at:', apiUrl);

            const response = await axios.get(apiUrl, { timeout: 5000 });
            console.log('Server test response:', response.data);

            return true;
        } catch (error) {
            console.error('Server connection test failed:', error);
            if (error.code === 'ECONNABORTED') {
                console.error('Connection timeout - server might be running but responding slowly');
            } else if (error.code === 'ERR_NETWORK') {
                console.error('Network error - server might not be running or CORS might be blocking the request');
            }
            return false;
        }
    };

    // Initialize map when component mounts
    useEffect(() => {
        // Test server connection on component mount
        testServerConnection();

        console.log('Map Initialization Starting...');

        if (!mapboxgl.accessToken) {
            console.error('Mapbox token missing or invalid');
            setMapError('Mapbox token is not configured');
            return;
        }

        if (!isWebGLSupported()) {
            console.error('WebGL not supported');
            setMapError('WebGL is not supported in your browser');
            return;
        }

        if (map.current) {
            console.log('Map already initialized');
            return;
        }

        // Create map instance
        try {
            console.log('Creating map instance...');
            mapboxgl.clearStorage();

            const mapInstance = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [coordinates.lng, coordinates.lat],
                zoom: 13,
                preserveDrawingBuffer: true,
                antialias: true
            });

            console.log('Map instance created successfully');
            map.current = mapInstance;

            // Set up event handlers
            mapInstance.on('load', () => {
                console.log('Map loaded successfully');
                setMapError(null); // Clear any previous errors

                try {
                    // Add navigation controls
                    mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');

                    // Add geocoder control
                    const geocoder = new MapboxGeocoder({
                        accessToken: mapboxgl.accessToken,
                        mapboxgl: mapboxgl,
                        marker: false,
                        placeholder: 'Search for location'
                    });

                    mapInstance.addControl(geocoder);

                    // Add marker only after map is loaded
                    if (!marker.current) {
                        marker.current = new mapboxgl.Marker({
                            draggable: true
                        })
                            .setLngLat([coordinates.lng, coordinates.lat])
                            .addTo(mapInstance);

                        // Handle marker drag
                        marker.current.on('dragend', () => {
                            if (marker.current) {
                                const lngLat = marker.current.getLngLat();
                                setCoordinates({ lat: lngLat.lat, lng: lngLat.lng });
                                updateLocationAddress(lngLat);
                            }
                        });
                    }

                    // Handle map click
                    mapInstance.on('click', (e) => {
                        if (marker.current) {
                            marker.current.setLngLat(e.lngLat);
                            setCoordinates({ lat: e.lngLat.lat, lng: e.lngLat.lng });
                            updateLocationAddress(e.lngLat);
                        }
                    });

                    // Handle geocoder result
                    geocoder.on('result', (e) => {
                        if (marker.current && e.result.center) {
                            const coords = e.result.center;
                            marker.current.setLngLat(coords);
                            setCoordinates({ lat: coords[1], lng: coords[0] });
                            setRescueFormData(prev => ({
                                ...prev,
                                location: e.result.place_name || ''
                            }));
                        }
                    });

                } catch (error) {
                    console.error('Error setting up map controls:', error);
                    setMapError('Error setting up map controls');
                }
            });

            mapInstance.on('error', (e) => {
                console.error('Map error:', e);
                setMapError(`Error loading map: ${e.error?.message || 'Unknown error'}`);
            });

        } catch (error) {
            console.error('Map initialization error:', {
                message: error.message,
                stack: error.stack,
                error
            });
            setMapError(`Error initializing map: ${error.message}`);
        }

        // Cleanup function
        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
            if (marker.current) {
                marker.current = null;
            }
        };
    }, [coordinates.lng, coordinates.lat]);

    return (
        <>
            {/* Action Buttons Container */}
            <Container className="mb-4 mt-5">
                <Row className="justify-content-center gap-3">
                    <Col xs={12} md={4}>
                        <Button
                            variant="danger"
                            className="w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                        >
                            <i className="bi bi-plus-circle"></i>
                            Request Rescue
                        </Button>
                    </Col>
                    <Col xs={12} md={4}>
                        <Button
                            variant="outline-danger"
                            className="w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                            onClick={() => setShowTrackingModal(true)}
                        >
                            <Search />
                            Track Rescue
                        </Button>
                    </Col>
                </Row>
            </Container>

            {/* Tracking Modal */}
            <Modal show={showTrackingModal} onHide={() => setShowTrackingModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Track Rescue Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleTrackingSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter Tracking Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g., TAARA-2024-001"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="d-grid">
                            <Button variant="primary" type="submit">
                                Track Request
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Success Message */}
            {submitted && (
                <Alert variant="success" className="mb-4">
                    <Alert.Heading>Thank you for your submission!</Alert.Heading>
                    <p>
                        Your request has been submitted successfully with reference ID: <strong>{requestId}</strong>.
                        Please keep your lines open as TAARA will try to contact you to confirm your request.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button
                            variant="outline-success"
                            onClick={() => setSubmitted(false)}
                        >
                            Submit another request
                        </Button>
                    </div>
                </Alert>
            )}

            {/* Error Message */}
            {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible className="mb-4">
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            )}

            {/* Rescue Request Form */}
            {!submitted && (
                <Card className="border-0 shadow-sm mb-4">
                    <Card.Body>
                        <Card.Title>Submit a Rescue Request</Card.Title>
                        <Form onSubmit={handleRescueSubmit}>
                        <Row className="g-3">
                            <Col md={6}>
                                <FloatingLabel label="Type of Animal">
                                    <Form.Select
                                        name="petType"
                                        value={rescueFormData.petType}
                                        onChange={handleRescueFormChange}
                                        required
                                    >
                                        <option value="">Select animal type</option>
                                        <option value="dog">Dog</option>
                                        <option value="cat">Cat</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <FloatingLabel label="Urgency Level">
                                    <Form.Select
                                        name="urgency"
                                        value={rescueFormData.urgency}
                                        onChange={handleRescueFormChange}
                                        required
                                    >
                                        <option value="normal">Normal</option>
                                        <option value="urgent">Urgent</option>
                                        <option value="emergency">Emergency</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md={12}>
                                <FloatingLabel label="Description of the Situation">
                                    <Form.Control
                                        as="textarea"
                                        name="description"
                                        value={rescueFormData.description}
                                        onChange={handleRescueFormChange}
                                        style={{ height: '100px' }}
                                        required
                                    />
                                </FloatingLabel>
                            </Col>

                            {/* Location Section */}
                            <Col md={12}>
                                <Card className="border">
                                    <Card.Body>
                                        <Card.Title className="h6">
                                            <GeoAlt className="me-2" />
                                            Location
                                        </Card.Title>
                                        <FloatingLabel label="Address">
                                            <Form.Control
                                                type="text"
                                                name="location"
                                                value={rescueFormData.location}
                                                onChange={handleRescueFormChange}
                                                placeholder="Enter location"
                                                required
                                            />
                                        </FloatingLabel>
                                        <div className="mt-3" style={{ height: '300px', background: '#f8f9fa', position: 'relative' }}>
                                            {mapError ? (
                                                <div className="h-100 d-flex align-items-center justify-content-center">
                                                    <p className="text-danger">{mapError}</p>
                                                </div>
                                            ) : (
                                                <div
                                                    ref={mapContainer}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Contact Information */}
                            <Col md={6}>
                                <FloatingLabel label="Your Name">
                                    <Form.Control
                                        type="text"
                                        name="contactName"
                                        value={rescueFormData.contactName}
                                        onChange={handleRescueFormChange}
                                        required
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <FloatingLabel label="Phone Number">
                                    <Form.Control
                                        type="tel"
                                        name="contactPhone"
                                        value={rescueFormData.contactPhone}
                                        onChange={handleRescueFormChange}
                                        required
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={12}>
                                <FloatingLabel label="Email Address">
                                    <Form.Control
                                        type="email"
                                        name="contactEmail"
                                        value={rescueFormData.contactEmail}
                                        onChange={handleRescueFormChange}
                                        required
                                    />
                                </FloatingLabel>
                            </Col>

                            {/* Image Upload */}
                            <Col md={12}>
                                <Card className="border">
                                    <Card.Body>
                                        <Card.Title className="h6 d-flex justify-content-between align-items-center">
                                            <div>
                                                <Camera className="me-2" />
                                                Upload Images
                                            </div>
                                            {rescueFormData.images.length > 0 && (
                                                <div className="d-flex align-items-center">
                                                    <span className="me-3 text-muted">
                                                        {rescueFormData.images.length} image{rescueFormData.images.length !== 1 ? 's' : ''} selected
                                                    </span>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={handleClearAllImages}
                                                    >
                                                        Clear All
                                                    </Button>
                                                </div>
                                            )}
                                        </Card.Title>
                                        <Form.Control
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="mb-3"
                                        />
                                        <small className="text-muted d-block mb-3">
                                            You can upload unlimited images. Maximum size per image: 10MB
                                        </small>
                                        {rescueFormData.images.length > 0 && (
                                            <div className="d-flex gap-3 flex-wrap">
                                                {rescueFormData.images.map((image, index) => (
                                                    <div
                                                        key={index}
                                                        className="position-relative"
                                                        style={{ width: '120px', height: '120px' }}
                                                    >
                                                        <img
                                                            src={URL.createObjectURL(image)}
                                                            alt={`Preview ${index + 1}`}
                                                            className="w-100 h-100 object-fit-cover rounded"
                                                        />
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            className="position-absolute top-0 end-0 m-1 p-0"
                                                            style={{ width: '20px', height: '20px', borderRadius: '50%' }}
                                                            onClick={() => handleRemoveImage(index)}
                                                        >
                                                            ×
                                                        </Button>
                                                        <small className="position-absolute bottom-0 start-0 m-1 text-white bg-dark bg-opacity-75 px-1 rounded">
                                                            {formatFileSize(image.size)}
                                                        </small>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={12}>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    className="w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                className="me-2"
                                            />
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit Rescue Request'
                                    )}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            )}

            {/* Information Accordion */}
            <Accordion defaultActiveKey="0" className="mb-4">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>How Rescue Process Works</Accordion.Header>
                    <Accordion.Body>
                        <ol className="mb-0">
                            <li>Submit the rescue request form with all required information</li>
                            <li>Our team will review your request and assess the urgency</li>
                            <li>A rescue coordinator will contact you for additional details if needed</li>
                            <li>We will dispatch a rescue team to the location</li>
                            <li>The animal will be brought to our shelter for immediate care</li>
                        </ol>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>What to Do While Waiting</Accordion.Header>
                    <Accordion.Body>
                        <div className="mb-3 fw-bold text-danger">
                            PLEASE KEEP YOUR LINES OPEN AS TAARA WILL TRY TO CONTACT YOU SHORTLY TO CONFIRM YOUR REQUEST
                        </div>
                        <ul className="mb-0 ps-3">
                            <li>Take photos and videos if possible</li>
                            <li>Provide water if you safely can do so</li>
                            <li>Ensure the animal is in a safe location if possible</li>
                            <li>Keep a safe distance if the animal appears aggressive</li>
                            <li>If possible, stay in the area to help guide the rescue team</li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default RescueTab;