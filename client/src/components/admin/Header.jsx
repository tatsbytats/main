// src/components/Header.jsx
import React from 'react';
import { Navbar, Container, Nav, Button, Dropdown } from 'react-bootstrap';
import {
  Bell,
  Moon,
  Sun,
  QuestionCircle
} from 'react-bootstrap-icons';

const Header = ({ darkMode, toggleTheme }) => {

  // Define theme-based styles
  const headerBg = darkMode
    ? 'rgba(26, 32, 44, 0.95)'
    : 'rgba(255, 255, 255, 0.98)';

  const textColor = darkMode
    ? 'text-white'
    : 'text-dark';

  const accentColor = darkMode
    ? 'text-info'
    : 'text-deep-raspberry';

  const iconBtnClass = `d-flex align-items-center justify-content-center ${darkMode ? 'text-light' : 'text-secondary'}`;

  return (
    <Navbar
      style={{
        backgroundColor: headerBg,
        backdropFilter: 'blur(8px)',
        height: '60px',
        borderBottom: darkMode ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(0,0,0,0.03)'
      }}
      className="py-0"
      expand="lg"
      fixed="top"
    >
      <Container fluid className="px-3 px-lg-4">
        {/* Logo/Brand Section */}
        <div className="d-flex align-items-center">


          <Navbar.Brand className={`fw-bold mb-0 ${accentColor}`} style={{ fontSize: '1.2rem', letterSpacing: '-0.5px' }}>
            TAARA<span className={`ms-1 fw-light ${textColor}`}>Admin</span>
          </Navbar.Brand>
        </div>

        {/* Right Side Icons */}
        <Nav className="ms-auto d-flex align-items-center gap-2">

          {/* Help */}
          <Button
            variant="link"
            className={`p-0 ${iconBtnClass} border-0`}
            style={{ width: '38px', height: '38px' }}
          >
            <QuestionCircle size={18} />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="link"
            className={`p-0 ${iconBtnClass} border-0`}
            style={{ width: '38px', height: '38px' }}
            onClick={toggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          {/* Notification Bell */}
          <div className="position-relative">
            <Button
              variant="link"
              className={`p-0 ${iconBtnClass} border-0`}
              style={{ width: '38px', height: '38px' }}
            >
              <Bell size={18} />
              <span
                className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '0.6rem', padding: '0.25em 0.4em' }}
              >
                3
              </span>
            </Button>
          </div>

          {/* User Profile */}
          <Dropdown>
            <Dropdown.Toggle
              as={Button}
              variant="link"
              id="dropdown-profile"
              className={`p-0 border-0 shadow-none d-flex align-items-center justify-content-center ${darkMode ? 'text-white' : 'text-dark'}`}
              style={{ background: 'transparent' }}
            >
              <div
                className={`d-flex align-items-center justify-content-center rounded-circle ${darkMode ? 'bg-info bg-opacity-10' : 'bg-deep-raspberry bg-opacity-10'}`}
                style={{
                  width: '38px',
                  height: '38px',
                  overflow: 'hidden'
                }}
              >
                <span className={`fw-medium ${darkMode ? 'text-info' : 'text-deep-raspberry'}`}>A</span>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu
              align="end"
              className={`border-0 shadow-sm ${darkMode ? 'dropdown-menu-dark' : ''}`}
              style={{ borderRadius: '8px', marginTop: '8px' }}
            >
              <div className="px-3 py-2">
                <p className="mb-0 fw-medium">Admin User</p>
                <small className={`${darkMode ? 'text-light-emphasis' : 'text-muted'}`}>admin@example.com</small>
              </div>
              <Dropdown.Divider className="my-1" />
              <Dropdown.Item href="#profile" className="d-flex align-items-center py-2">
                Profile
              </Dropdown.Item>
              <Dropdown.Item href="#settings" className="d-flex align-items-center py-2">
                Settings
              </Dropdown.Item>
              <Dropdown.Divider className="my-1" />
              <Dropdown.Item href="#logout" className="d-flex align-items-center py-2 text-danger">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
