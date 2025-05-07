import React, { useState, useEffect } from 'react';
import { Table, Container, Spinner, Alert, Card, Image, Button, Modal, Badge } from 'react-bootstrap';
import { format } from 'date-fns';
import { getAnimals } from '../services/animalService'; 


const AnimalsTable = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        console.log('Fetching animals from API...');
        const data = await getAnimals();
        console.log('Animals data received:', data);
        setAnimals(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching animal data:', err);
        console.error('Error details:', err.response ? err.response.data : 'No response data');
        console.error('Status code:', err.response ? err.response.status : 'No status code');
        setError(`Failed to load animal data. ${err.message || 'Please try again later.'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const handleViewDetails = (animal) => {
    setSelectedAnimal(animal);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      console.error('Date formatting error:', e);
      return 'Invalid date';
    }
  };

  // Handle image errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/placeholder-image.png'; // Replace with your placeholder image path
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Data</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="outline-danger" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Animal Registry</h2>
            <Badge bg="info" pill>
              {animals.length} Records
            </Badge>
          </div>
        </Card.Body>
      </Card>
      
      {animals.length === 0 ? (
        <Alert variant="info">No animals found in the registry.</Alert>
      ) : (
        <Card className="shadow-sm">
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Breed</th>
                  <th>Reporter</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {animals.map((animal) => (
                  <tr key={animal._id}>
                    <td>
                      {animal.imageUrl ? (
                        <Image 
                          src={animal.imageUrl} 
                          width={50} 
                          height={50} 
                          roundedCircle 
                          style={{ objectFit: 'cover' }}
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="bg-secondary rounded-circle d-flex justify-content-center align-items-center" style={{ width: 50, height: 50 }}>
                          <span className="text-white">N/A</span>
                        </div>
                      )}
                    </td>
                    <td>{animal.name}</td>
                    <td>{animal.breed}</td>
                    <td>{animal.reporter}</td>
                    <td>{formatDate(animal.date)}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleViewDetails(animal)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {/* Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        {selectedAnimal && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedAnimal.name} Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-column flex-md-row">
                <div className="mb-3 mb-md-0 me-md-4" style={{ minWidth: '200px' }}>
                  {selectedAnimal.imageUrl ? (
                    <Image 
                      src={selectedAnimal.imageUrl} 
                      className="w-100"
                      style={{ maxHeight: '200px', objectFit: 'cover' }}
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="bg-secondary w-100 d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                      <span className="text-white">No Image Available</span>
                    </div>
                  )}
                </div>
                <div className="flex-grow-1">
                  <Table borderless>
                    <tbody>
                      <tr>
                        <th style={{ width: '120px' }}>Name:</th>
                        <td>{selectedAnimal.name}</td>
                      </tr>
                      <tr>
                        <th>Breed:</th>
                        <td>{selectedAnimal.breed}</td>
                      </tr>
                      <tr>
                        <th>Reporter:</th>
                        <td>{selectedAnimal.reporter}</td>
                      </tr>
                      <tr>
                        <th>Date:</th>
                        <td>{formatDate(selectedAnimal.date)}</td>
                      </tr>
                      <tr>
                        <th>Address:</th>
                        <td>{selectedAnimal.address || 'N/A'}</td>
                      </tr>
                      <tr>
                        <th>Remarks:</th>
                        <td>{selectedAnimal.remarks || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default AnimalsTable;