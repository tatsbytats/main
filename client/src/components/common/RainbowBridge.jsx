import React from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import '../../assets/styles/custom-text-colors.css';
import '../../assets/styles/custom-buttons.css';
import '../../assets/styles/default.css';

const RainbowBridge = () => {
  const petMemorials = [
    {
      id: 1,
      name: 'Max',
      type: 'Dog',
      breed: 'Golden Retriever',
      years: '2008 - 2020',
      image: '/cat1.jpeg',
      quote: 'The most loyal companion one could ask for.',
      story: 'Max was more than a pet — he was family. Rain or shine, he was always there to bring comfort and joy to our home.'
    },
    {
      id: 2,
      name: 'Whiskers',
      type: 'Cat',
      breed: 'Siamese',
      years: '2012 - 2022',
      image: '/pexels-photo-326012.jpeg',
      quote: 'Always curious, forever in our hearts.',
      story: 'Whiskers had a gentle soul and loved sleeping in sunny windows. She would greet every visitor and curl up with us every night.'
    },
    {
      id: 3,
      name: 'Bella',
      type: 'Dog',
      breed: 'Labrador',
      years: '2015 - 2023',
      image: '/hedgehog-animal-baby-cute-50577.jpeg',
      quote: 'Brought joy to every moment.',
      story: 'Bella loved swimming and long walks in the park. She comforted us during hard times and always had a wagging tail to share.'
    }
  ];

  return (
    <div className="bg-light py-5">
      <Container className="text-center">
        <h2 className="mb-3 text-deep-raspberry fw-bold">Rainbow Bridge</h2>

        <p className="lead text-muted mb-3">
          In loving memory of the animals we've loved and lost.
        </p>

        <blockquote className="blockquote text-secondary">
          <p className="mb-0 fst-italic">
            "Until one has loved an animal, a part of one's soul remains unawakened."
          </p>
          <footer className="blockquote-footer mt-2 small">Anatole France</footer>
        </blockquote>

        <div className="mt-5">
          <h4 className="mb-4 text-deep-raspberry">Our Beloved Companions</h4>
          <Row xs={1} md={2} lg={3} className="g-4">
            {petMemorials.map((pet) => (
              <Col key={pet.id}>
                <PetCard pet={pet} />
              </Col>
            ))}
          </Row>
        </div>

        <Button variant="sunrise-coral" className="mt-5">
          Share Your Memorial
        </Button>
      </Container>
    </div>
  );
};

const PetCard = ({ pet }) => {
  const [candleCount, setCandleCount] = React.useState(() => {
    const saved = localStorage.getItem(`candleCount_${pet.id}`);
    return saved ? parseInt(saved) : 0;
  });

  const handleLightCandle = () => {
    const updated = candleCount + 1;
    setCandleCount(updated);
    localStorage.setItem(`candleCount_${pet.id}`, updated.toString());
  };

  return (
    <Card className="h-100 shadow-sm border-0 rounded-4">
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <Card.Img
          variant="top"
          src={pet.image}
          alt={pet.name}
          className="w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-deep-raspberry">{pet.name}</Card.Title>
        <Card.Subtitle className="mb-1 text-muted small">
          {pet.type} • {pet.breed}
        </Card.Subtitle>
        <Card.Text className="text-muted small">{pet.years}</Card.Text>

        <Card.Text className="fst-italic text-secondary small">
          "{pet.quote}"
        </Card.Text>

        {pet.story && (
          <Card.Text className="mt-2 small text-dark">
            {pet.story}
          </Card.Text>
        )}
      </Card.Body>
      <Card.Footer className="bg-transparent border-0 pt-0">
        <Button
          variant="outline-secondary"
          size="sm"
          className="w-100"
          onClick={handleLightCandle}
        >
          🕯 Light a Candle ({candleCount})
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default RainbowBridge;
