import React, { useState } from 'react';
import { Tab, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../../assets/styles/default.css';

const galleryStyles = `
/* Modern gallery with focus on images */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 200px;
  grid-auto-flow: dense;
  gap: 15px;
  padding: 10px;
}

/* Create varied image sizes for visual interest */
.gallery-item:nth-child(4n+1) {
  grid-row: span 2;
}

.gallery-item:nth-child(5n+3) {
  grid-column: span 2;
}

.gallery-item:nth-child(8n+5) {
  grid-column: span 2;
  grid-row: span 2;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
  }
}

@media (max-width: 576px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-auto-rows: 150px;
    gap: 8px;
  }

  /* Simplify layout on mobile */
  .gallery-item:nth-child(n) {
    grid-column: span 1;
    grid-row: span 1;
  }

  .gallery-item:nth-child(3n+1) {
    grid-row: span 2;
  }
}

/* Modern card styling */
.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1),
              box-shadow 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  background: #fff;
  will-change: transform, box-shadow;
}

.gallery-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

/* Image styling */
.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1),
              filter 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  will-change: transform, filter;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.12) rotate(1deg);
  filter: brightness(1.05) contrast(1.05);
}

/* Overlay styling */
.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%);
  color: #fff;
  padding: 25px 15px 12px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1),
              transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  text-align: center;
  font-weight: 500;
  font-size: 1.05rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.4);
  will-change: opacity, transform;
  letter-spacing: 0.3px;
}

.gallery-item:hover .image-overlay {
  opacity: 1;
  transform: translateY(0);
}

/* Touch device specific styles */
@media (hover: none) {
  .image-overlay {
    opacity: 1;
    transform: translateY(0);
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%);
    padding: 20px 15px 10px;
  }

  .gallery-item:active {
    transform: scale(0.97);
    transition: transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .gallery-image {
    transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .gallery-item:active .gallery-image {
    transform: scale(1.05);
  }
}
`;

const staticImages = [
  {
    id: 'art1',
    src: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    alt: 'Rescue dog portrait',
    caption: 'Hope Returns',
    description: 'A portrait showing a rescued dog with soulful eyes, representing the journey from neglect to finding a loving home.',
    artist: 'Kai Velasco',
    tags: ['Portrait', 'Dog', 'Adoption'],
  },
  {
    id: 'art2',
    src: 'https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'The Watchful Cat',
    description: 'An illustration of a rescued cat watching over its new family with attentive eyes.',
    artist: 'Mia Tan',
    tags: ['Illustration', 'Cat', 'Rescue'],
  },
  {
    id: 'art3',
    src: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Bark & Bond',
    description: 'A playful sketch of two rescue dogs forming a deep bond through shared experiences.',
    artist: 'Leo Arcilla',
    tags: ['Sketch', 'Bond', 'Dogs'],
  },
  {
    id: 'art4',
    src: 'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Whiskers in the Window',
    description: 'A dreamy watercolor of a cat longing to be adopted, gazing out of a shelter window.',
    artist: 'Sam del Rosario',
    tags: ['Watercolor', 'Cat'],
  },
  {
    id: 'art5',
    src: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Happy Tails',
    description: 'A comic strip showing a shy dog gaining confidence over time with proper care and love.',
    artist: 'Aira Gomez',
    tags: ['Comic', 'Confidence'],
  },
  {
    id: 'art6',
    src: 'https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Feline Grace',
    description: 'A beautiful photograph capturing the elegant movement of a rescued cat in its new home.',
    artist: 'Nina Santos',
    tags: ['Photography', 'Cat', 'Movement'],
  },
  {
    id: 'art7',
    src: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Loyal Companion',
    description: 'A digital painting showcasing the unwavering loyalty of a rescue dog to its new owner.',
    artist: 'Marco Reyes',
    tags: ['Digital', 'Dog', 'Loyalty'],
  },
  {
    id: 'art8',
    src: 'https://images.pexels.com/photos/1440387/pexels-photo-1440387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'New Beginnings',
    description: 'A mixed media piece representing the fresh start that rescued animals experience.',
    artist: 'Sophia Cruz',
    tags: ['Mixed Media', 'Hope'],
  },
  {
    id: 'art9',
    src: 'https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Shelter Stories',
    description: 'A series of sketches depicting the daily lives of animals in shelters waiting for adoption.',
    artist: 'Diego Mendoza',
    tags: ['Sketch', 'Shelter', 'Series'],
  },
  {
    id: 'art10',
    src: 'https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Forever Home',
    description: 'A heartwarming illustration of the moment when a pet realizes they have found their forever home.',
    artist: 'Liza Aquino',
    tags: ['Illustration', 'Adoption', 'Emotional'],
  }
];

const GalleryTab = ({ images = staticImages }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  return (
    <Tab.Pane eventKey="Gallery" className="gallery-tab py-4 px-3 scrollable-tab-pane">
      {/* Inject scoped styles */}
      <style>{galleryStyles}</style>

      <h2 className="mb-3 text-deep-raspberry fw-bold">Gallery</h2>
      <p className="mb-4 text-muted">
        A collection of artwork, comics, and illustrations created exclusively for TAARA by local artists to promote adoption and animal welfare.
      </p>

      <div className="gallery-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => handleImageClick(image)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleImageClick(image)}
          >
            <div className="image-wrapper">
              <img
                src={image.src}
                alt={image.alt || `Gallery image ${image.id}`}
                className="gallery-image"
                loading="lazy"
              />
              {image.caption && (
                <div className="image-overlay">
                  {image.caption}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Image Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName="fullscreen-image-modal"
        contentClassName="fullscreen-image-content"
        aria-labelledby="fullscreen-image-modal"
        animation={true}
      >
        {selectedImage && (
          <div className="fullscreen-image-container">
            {/* Close button */}
            <button
              className="fullscreen-close-btn"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>

            {/* Main image */}
            <img
              src={selectedImage.src}
              alt={selectedImage.alt || 'Enlarged view'}
              className="fullscreen-image"
            />

            {/* Image info overlay */}
            <div className="fullscreen-image-info">
              <h3 className="image-title">{selectedImage.caption}</h3>

              {selectedImage?.artist && (
                <p className="image-artist">Artwork by: {selectedImage.artist}</p>
              )}

              {selectedImage?.tags && (
                <div className="image-tags">
                  {selectedImage.tags.map((tag, index) => (
                    <span key={index} className="image-tag">{tag}</span>
                  ))}
                </div>
              )}

              {selectedImage?.description && (
                <p className="image-description">{selectedImage.description}</p>
              )}
            </div>
          </div>
        )}
      </Modal>

      <style>{`
        /* Fullscreen Modal Styles */
        .fullscreen-image-modal {
          max-width: 100% !important;
          margin: 0;
          padding: 0;
        }

        .fullscreen-image-content {
          background-color: transparent;
          border: none;
          border-radius: 0;
        }

        .modal-open .modal {
          background-color: rgba(0, 0, 0, 0.9);
          padding: 0 !important;
        }

        .fullscreen-image-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .fullscreen-image {
          max-width: 90vw;
          max-height: 85vh;
          object-fit: contain;
          box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
          animation: zoomIn 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .fullscreen-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background-color: rgba(0, 0, 0, 0.4);
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 1050;
          transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        .fullscreen-close-btn:hover {
          background-color: rgba(0, 0, 0, 0.6);
          transform: scale(1.1);
        }

        .fullscreen-image-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 80%, transparent 100%);
          color: white;
          padding: 30px 20px 20px;
          text-align: center;
          transform: translateY(100%);
          transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
          opacity: 0.9;
        }

        .fullscreen-image-container:hover .fullscreen-image-info {
          transform: translateY(0);
        }

        .image-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 8px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .image-artist {
          font-size: 1rem;
          margin-bottom: 10px;
          opacity: 0.9;
        }

        .image-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          margin-bottom: 12px;
        }

        .image-tag {
          background-color: rgba(255,255,255,0.2);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .image-description {
          font-size: 0.9rem;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.5;
          opacity: 0.8;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .fullscreen-image-info {
            padding: 20px 15px 15px;
            transform: translateY(0);
          }

          .image-title {
            font-size: 1.2rem;
          }

          .image-artist {
            font-size: 0.9rem;
          }

          .image-description {
            font-size: 0.8rem;
          }

          .fullscreen-close-btn {
            top: 10px;
            right: 10px;
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </Tab.Pane>
  );
};

GalleryTab.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      caption: PropTypes.string,
      description: PropTypes.string,
      artist: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};

export default GalleryTab;
