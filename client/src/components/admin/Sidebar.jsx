import React, { useState, useEffect, useRef } from 'react';
import {
  Offcanvas,
  Nav,
  Button,
  Badge
} from 'react-bootstrap';
import {
  House,
  Database,
  Person,
  Calculator,
  Calendar2,
  Gear,
  BoxArrowRight,
  List,
  ChevronRight
} from 'react-bootstrap-icons';

const Sidebar = ({ setActiveView, activeView, darkMode }) => {
  const [show, setShow] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside (for mobile/tablet)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (show && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // Check if the click is not on the toggle button
        const toggleButton = document.querySelector('.sidebar-toggle-button');
        if (!toggleButton?.contains(event.target)) {
          setShow(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelect = (view) => {
    setActiveView(view);
    // Close sidebar automatically on mobile after selection
    if (window.innerWidth < 768) {
      handleClose();
    }
  };

  // Group navbar items for better organization
  const navItems = [
    {
      section: "Main",
      items: [
        { id: 'dashboard', icon: <House size={18} />, label: 'Dashboard' }
      ]
    },
    {
      section: "Databases",
      items: [
        { id: 'animal', icon: <Database size={18} />, label: 'Animals', badge: { text: 'New', variant: 'success' } },
        { id: 'account', icon: <Person size={18} />, label: 'Accounts' },
        { id: 'accounting', icon: <Calculator size={18} />, label: 'Accounting' },
        { id: 'calendar', icon: <Calendar2 size={18} />, label: 'Calendar' }
      ]
    },

  ];

  // Determine sidebar theme classes based on dark mode
  const sidebarThemeClass = darkMode
    ? 'bg-dark text-light'
    : 'bg-white text-dark';

  const activeItemClass = darkMode
    ? 'bg-info bg-opacity-10 text-info fw-medium'
    : 'bg-deep-raspberry bg-opacity-10 text-deep-raspberry fw-medium';

  const inactiveItemClass = darkMode
    ? 'text-light-emphasis hover-bg-dark'
    : 'text-secondary hover-bg-light';

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="link"
        className="sidebar-toggle-button d-md-none p-2 border-0 rounded-circle position-fixed top-0 start-0 mt-2 ms-2 z-3"
        onClick={handleShow}
        aria-label="Toggle sidebar"
        style={{
          zIndex: 1030,
          backgroundColor: darkMode ? 'rgba(33, 37, 41, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <List size={20} />
      </Button>

      <Offcanvas
        ref={sidebarRef}
        show={show}
        onHide={handleClose}
        backdrop={true}
        scroll={true}
        className={`${sidebarThemeClass} shadow-sm`}
        responsive="md"
        style={{ maxWidth: '280px' }}
      >
        <Offcanvas.Header className={`border-bottom py-3 ${darkMode ? 'border-secondary' : ''}`}>
          <div className="d-flex align-items-center">
            <div className={`d-flex align-items-center justify-content-center rounded-circle me-2 ${darkMode ? 'bg-info bg-opacity-10' : 'bg-deep-raspberry bg-opacity-10'}`}
                 style={{ width: '32px', height: '32px' }}>
              <span className={`fw-bold ${darkMode ? 'text-info' : 'text-deep-raspberry'}`}>T</span>
            </div>
            <h5 className={`mb-0 fw-semibold ${darkMode ? 'text-white' : 'text-deep-raspberry'}`}>
              TAARA Admin
            </h5>
          </div>
          <Button
            variant="link"
            className={`ms-auto p-0 ${darkMode ? 'text-white' : 'text-secondary'} d-md-none border-0 shadow-none`}
            onClick={handleClose}
            aria-label="Close sidebar"
          >
            &times;
          </Button>
        </Offcanvas.Header>

        <Offcanvas.Body className="p-0 d-flex flex-column" style={{ overflowY: 'auto' }}>
          <div className="flex-grow-1" style={{ overflowY: 'auto' }}>
            {/* Navigation Items */}
            {navItems.map((section, index) => (
              <div key={index} className="mb-3">
                <div className={`${darkMode ? 'text-light-emphasis' : 'text-secondary'} text-uppercase px-4 py-2 small fw-semibold`}>
                  {section.section}
                </div>
                <Nav className="flex-column">
                  {section.items.map(item => (
                    <Nav.Item key={item.id}>
                      <Nav.Link
                        onClick={() => handleSelect(item.id)}
                        active={activeView === item.id}
                        className={`d-flex align-items-center px-4 py-2 rounded-0 ${
                          activeView === item.id
                            ? activeItemClass
                            : inactiveItemClass
                        }`}
                      >
                        <span className="me-3">{item.icon}</span>
                        <span className="small">{item.label}</span>
                        {item.badge && (
                          <Badge bg={item.badge.variant} className="ms-auto rounded-pill">
                            {item.badge.text}
                          </Badge>
                        )}
                        {activeView === item.id && (
                          <ChevronRight size={14} className="ms-auto" />
                        )}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </div>
            ))}
          </div>

          {/* Settings & Logout - fixed at the bottom */}
          <div className={`border-top ${darkMode ? 'border-secondary' : ''} mt-auto`}>
            <Nav className="flex-column">
              <Nav.Item>
                <Nav.Link
                  onClick={() => handleSelect('settings')}
                  active={activeView === 'settings'}
                  className={`d-flex align-items-center px-4 py-2 ${
                    activeView === 'settings'
                      ? activeItemClass
                      : inactiveItemClass
                  }`}
                >
                  <span className="me-3"><Gear size={18} /></span>
                  <span className="small">Settings</span>
                  {activeView === 'settings' && (
                    <ChevronRight size={14} className="ms-auto" />
                  )}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => handleSelect('logout')}
                  className={`d-flex align-items-center px-4 py-2 ${inactiveItemClass}`}
                >
                  <span className="me-3"><BoxArrowRight size={18} /></span>
                  <span className="small">Logout</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;