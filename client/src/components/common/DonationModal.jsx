import React, { useState } from 'react';
import { Modal, Button, Alert, Container } from 'react-bootstrap';

const DonationModal = ({ show, handleClose }) => {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, channel) => {
    navigator.clipboard.writeText(text);
    setCopied(channel);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Support Our Shelter</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <h5 className="mb-4 text-primary">Donation Channels</h5>

          {copied && (
            <Alert variant="success" className="py-2 small mb-4">
              <strong>{copied}</strong> details copied to clipboard!
            </Alert>
          )}

          {[
            {
              title: 'GCash',
              accounts: [
                { number: '09055238105', name: 'Ednalyn C.' },
                { number: '09166437535', name: 'Samuel C.' }
              ]
            },
            {
              title: 'Landbank',
              accounts: [
                { number: '2786161722', name: 'Ednalyn C.' }
              ]
            },
            {
              title: 'B.P.I.',
              accounts: [
                { number: '0839060335', name: 'Ednalyn C.' }
              ]
            },
            {
              title: 'PayPal',
              accounts: [
                { number: 'ednalyncristo84@gmail.com', name: '' }
              ]
            },
            {
              title: 'Paymaya',
              accounts: [
                { number: '09982025987', name: 'Shaira Abegaile B' }
              ]
            }
          ].map((channel) => (
            <div className="mb-4" key={channel.title}>
              <h6 className="text-muted fw-semibold">{channel.title}</h6>
              {channel.accounts.map((acc, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <span>{acc.number} {acc.name && `(${acc.name})`}</span>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => copyToClipboard(acc.number, channel.title)}
                  >
                    Copy
                  </Button>
                </div>
              ))}
            </div>
          ))}

          <p className="text-muted small mt-4">
            After making your donation, kindly send the receipt to our email or contact us for acknowledgment.
          </p>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DonationModal;
