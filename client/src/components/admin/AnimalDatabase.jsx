import React, { useState } from 'react';
import { Table, Row, Col, Button, Modal, Container, Badge, Image } from 'react-bootstrap';
import { CheckCircle, XCircle, PencilSquare, Trash, Eye } from 'react-bootstrap-icons';
import { format } from 'date-fns';
import AnimalReportForm from './AnimalReportForm';

const AnimalDatabase = ({ darkMode }) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  // Mock data
  const mockAnimals = [
    {
      _id: '1',
      name: 'Max',
      breed: 'Golden Retriever',
      reporter: 'John Doe',
      date: '2023-05-15',
      status: 'active',
      address: '123 Main St, Anytown',
      remarks: 'Friendly dog found near the park',
      imageUrl: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=200'
    },
    {
      _id: '2',
      name: 'Whiskers',
      breed: 'Siamese',
      reporter: 'Jane Smith',
      date: '2023-06-20',
      status: 'pending',
      address: '456 Oak Ave, Somewhere',
      remarks: 'Cat found in backyard',
      imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200'
    },
    {
      _id: '3',
      name: 'Buddy',
      breed: 'Labrador',
      reporter: 'Mike Johnson',
      date: '2023-07-10',
      status: 'active',
      address: '789 Pine Rd, Nowhere',
      remarks: 'Dog found with collar but no tags',
      imageUrl: null
    }
  ];

  const handleViewDetails = (animal) => {
    setSelectedAnimal(animal);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handleEdit = (id) => {
    console.log(`Edit animal with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete animal with ID: ${id}`);
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/100?text=No+Image';
  };

  // Status badge renderer
  const renderStatusBadge = (status) => {
    switch(status) {
      case 'active':
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
            <CheckCircle size={10} /> Active
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
            <XCircle size={10} /> Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={`fw-bold ${darkMode ? 'text-light' : 'text-deep-raspberry'}`}>Animals</h2>
        <Button
          variant={darkMode ? "info" : "deep-raspberry"}
          onClick={() => setShowFormModal(true)}
          size="sm"
          className="px-3"
          style={{ borderRadius: '4px' }}
        >
          Add Animal
        </Button>
      </div>

      {/* Animals count badge */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Badge
          bg={darkMode ? "info" : "deep-raspberry"}
          className="rounded-pill px-3 py-2"
        >
          {mockAnimals.length} Animals
        </Badge>
      </div>

      {/* Clean table */}
      <div className="table-responsive">
        <Table
          hover
          className={`align-middle ${darkMode ? 'text-light table-dark' : 'table-striped'}`}
          style={{
            borderCollapse: 'collapse'
          }}
        >
          <thead>
            <tr className={darkMode ? 'text-light-emphasis border-bottom border-secondary' : 'text-secondary border-bottom'}>
              <th className="fw-medium fs-6 ps-3">Pet</th>
              <th className="fw-medium fs-6">Breed</th>
              <th className="fw-medium fs-6">Reporter</th>
              <th className="fw-medium fs-6">Date</th>
              <th className="fw-medium fs-6">Status</th>
              <th className="fw-medium fs-6 text-end pe-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockAnimals.map((animal, index) => (
              <tr
                key={animal._id}
                className={darkMode ? 'border-bottom border-secondary' : index % 2 === 0 ? 'bg-white' : 'bg-light'}
              >
                <td className="ps-3 py-2">
                  <div className="d-flex align-items-center">
                    {animal.imageUrl ? (
                      <Image
                        src={animal.imageUrl}
                        width={40}
                        height={40}
                        roundedCircle
                        className="me-3 border"
                        style={{ objectFit: 'cover' }}
                        onError={handleImageError}
                      />
                    ) : (
                      <div
                        className={`rounded-circle d-flex justify-content-center align-items-center me-3 ${darkMode ? 'bg-secondary' : 'bg-light'}`}
                        style={{ width: 40, height: 40 }}
                      >
                        <span className={darkMode ? 'text-white' : 'text-secondary'}>N/A</span>
                      </div>
                    )}
                    <div>
                      <p className="mb-0 fw-medium">{animal.name}</p>
                      <p className={`mb-0 small ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}>ID: {animal._id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-2">{animal.breed}</td>
                <td className="py-2">{animal.reporter}</td>
                <td className="py-2">{formatDate(animal.date)}</td>
                <td className="py-2">
                  {renderStatusBadge(animal.status)}
                </td>
                <td className="text-end pe-3 py-2">
                  <div className="d-flex gap-2 justify-content-end">
                    <Button
                      variant="link"
                      onClick={() => handleViewDetails(animal)}
                      className="d-flex align-items-center justify-content-center p-0"
                      style={{
                        width: '28px',
                        height: '28px'
                      }}
                    >
                      <Eye size={15} className={darkMode ? "text-info" : "text-deep-raspberry"} />
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleEdit(animal._id)}
                      className="d-flex align-items-center justify-content-center p-0"
                      style={{
                        width: '28px',
                        height: '28px'
                      }}
                    >
                      <PencilSquare size={15} className={darkMode ? "text-warning" : "text-warning"} />
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleDelete(animal._id)}
                      className="d-flex align-items-center justify-content-center p-0"
                      style={{
                        width: '28px',
                        height: '28px'
                      }}
                    >
                      <Trash size={15} className="text-danger" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Animal Report Form Modal */}
      <Modal
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        size="lg"
        centered
        contentClassName={darkMode ? 'text-light' : ''}
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className={darkMode ? 'text-light' : 'text-deep-raspberry'}>New Animal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AnimalReportForm
            onSuccess={() => setShowFormModal(false)}
            darkMode={darkMode}
          />
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            variant="link"
            onClick={() => setShowFormModal(false)}
            className="text-secondary"
          >
            Cancel
          </Button>
          <Button
            variant={darkMode ? "info" : "deep-raspberry"}
            style={{ borderRadius: '4px' }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Details Modal */}
      <Modal
        show={showDetailsModal}
        onHide={handleCloseDetailsModal}
        size="lg"
        centered
        contentClassName={darkMode ? 'text-light' : ''}
        backdropClassName={darkMode ? 'bg-dark bg-opacity-75' : ''}
      >
        {selectedAnimal && (
          <>
            <Modal.Header closeButton className="border-0">
              <Modal.Title className={darkMode ? 'text-light' : 'text-deep-raspberry'}>
                {selectedAnimal.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-0">
              <Row>
                <Col md={4} className="mb-3 mb-md-0">
                  {selectedAnimal.imageUrl ? (
                    <Image
                      src={selectedAnimal.imageUrl}
                      className="w-100 rounded"
                      style={{
                        height: '220px',
                        objectFit: 'cover'
                      }}
                      onError={handleImageError}
                    />
                  ) : (
                    <div
                      className="w-100 rounded d-flex justify-content-center align-items-center"
                      style={{
                        height: '220px',
                        backgroundColor: darkMode ? 'rgba(30, 42, 56, 0.4)' : 'rgba(0, 0, 0, 0.03)'
                      }}
                    >
                      <span className={darkMode ? 'text-light-emphasis' : 'text-muted'}>No Image</span>
                    </div>
                  )}
                  <div className="mt-3">
                    {renderStatusBadge(selectedAnimal.status)}
                  </div>
                </Col>
                <Col md={8}>
                  <Row className="mb-3">
                    <Col xs={4} className={darkMode ? 'text-light-emphasis' : 'text-muted'}>ID:</Col>
                    <Col xs={8}>{selectedAnimal._id}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={4} className={darkMode ? 'text-light-emphasis' : 'text-muted'}>Breed:</Col>
                    <Col xs={8}>{selectedAnimal.breed}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={4} className={darkMode ? 'text-light-emphasis' : 'text-muted'}>Reporter:</Col>
                    <Col xs={8}>{selectedAnimal.reporter}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={4} className={darkMode ? 'text-light-emphasis' : 'text-muted'}>Date:</Col>
                    <Col xs={8}>{formatDate(selectedAnimal.date)}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={4} className={darkMode ? 'text-light-emphasis' : 'text-muted'}>Address:</Col>
                    <Col xs={8}>{selectedAnimal.address}</Col>
                  </Row>
                  <Row>
                    <Col xs={4} className={darkMode ? 'text-light-emphasis' : 'text-muted'}>Remarks:</Col>
                    <Col xs={8}>{selectedAnimal.remarks}</Col>
                  </Row>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Button
                variant="link"
                onClick={handleCloseDetailsModal}
                className="text-secondary"
              >
                Close
              </Button>
              <Button
                variant={darkMode ? "info" : "deep-raspberry"}
                onClick={() => handleEdit(selectedAnimal._id)}
                style={{ borderRadius: '4px' }}
              >
                Edit
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default AnimalDatabase;
