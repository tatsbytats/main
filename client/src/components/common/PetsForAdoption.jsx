import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Card, 
  Col, 
  Row, 
  Container,
  Spinner,
  Alert,
  Badge
} from 'react-bootstrap';
import '../../assets/styles/PetsForAdoption.css';
import '../../assets/styles/custom-buttons.css';

const PetsForAdoption = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPets = async () => {
      try {
        const apiUrl = process.env.NODE_ENV === 'development' 
          ? 'http://localhost:5000/api/adopt' 
          : '/api/adopt';
        
        console.log('Fetching from:', apiUrl);
        const response = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPets(data);
        setError(null);
        
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Fetch error:', err);
          setError({
            message: 'Failed to load pets. Please try again.',
            details: err.message
          });
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPets();

    return () => {
      abortController.abort();
    };
  }, [retryCount]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading pets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Pets</Alert.Heading>
          <p>{error.message}</p>
          {error.details && (
            <details>
              <summary>Details</summary>
              <pre className="text-start">{error.details}</pre>
            </details>
          )}
          <Button 
            variant="primary"
            className="mt-3"
            onClick={() => {
              setRetryCount(prev => prev + 1);
              setLoading(true);
              setError(null);
            }}
          >
            Retry
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <Container className="py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h2 className="mb-3 text-deep-raspberry fw-bold">Pets Available for Adoption</h2>
        <p className="lead text-muted">Find your perfect companion</p>
      </div>

      {/* Pet Cards Grid */}
      {pets.length > 0 ? (
        <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
          {pets.map(pet => (
            <Col key={pet._id}>
              <Card className="h-100 shadow border-0 overflow-hidden hover-scale">
                <div className="pet-image-container">
                  <Card.Img
                    variant="top"
                    src={pet.imageUrl || '/default-pet-image.jpg'}
                    alt={pet.name}
                    className="pet-image"
                    onError={(e) => {
                      e.target.src = '/default-pet-image.jpg';
                    }}
                  />
                  <Badge bg="success" className="position-absolute top-0 end-0 m-2">
                    Available
                  </Badge>
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <div className="mb-3">
                    <Card.Title className="fw-bold">{pet.name || 'Unnamed Pet'}</Card.Title>
                    <Card.Text className="text-muted">
                      <div><strong>Breed:</strong> {pet.breed || 'Unknown breed'}</div>
                    </Card.Text>
                  </div>
                  
                  <Button 
                    variant="sunrise-coral" 
                    className="mt-auto align-self-stretch rounded-pill"
                  >
                    Adopt {pet.name || 'this pet'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5 my-5">
          <div className="display-4 mb-3">🐾</div>
          <h4 className="fw-bold">No pets available for adoption</h4>
          <p className="text-muted">Check back later for new arrivals</p>
          <Button
            variant="outline-primary"
            className="mt-3 btn-crimson-plum"
            onClick={() => {
              setRetryCount(prev => prev + 1);
              setLoading(true);
            }}
          >
            Refresh List
          </Button>
        </div>
      )}
    </Container>
  );
};

export default PetsForAdoption;