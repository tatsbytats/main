// src/pages/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/admin/Header';
import Sidebar from '../../components/admin/Sidebar';
import MainContent from '../../components/admin/MainContent';
import '../../assets/styles/admin/dashboard.css';
import '../../assets/styles/admin/modern-dashboard.css';
import '../../assets/styles/admin/no-hover.css';
import '../../assets/styles/custom-colors.css';
import '../../assets/styles/custom-theme.css';

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div
      className={`admin-dashboard ${darkMode ? 'bg-dark text-light' : 'bg-cream-white'}`}
      style={{minHeight: '100vh', transition: 'background-color 0.3s ease'}}
    >
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Main content with top padding for fixed header */}
      <div style={{ paddingTop: '60px' }}>
        <Container fluid className="px-0">
          <Row className="g-0">
            <Col md={3} lg={2} className="sidebar-container p-0">
              <Sidebar
                setActiveView={setActiveView}
                activeView={activeView}
                darkMode={darkMode}
              />
            </Col>
            <Col md={9} lg={10} className="main-content-container ms-sm-auto px-md-4 py-md-3">
              <MainContent activeView={activeView} darkMode={darkMode} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboard;
