import React from 'react';
import { Navbar, Nav, Button, Image } from 'react-bootstrap';
import { List, Heart } from 'react-bootstrap-icons';
import logo from '../../assets/logo.png';
import '../../assets/styles/custom-navbar.css';

const MainNavbar = ({ toggleSidebar, toggleSidebarCollapse, openDonationModal }) => {
    return (
        <Navbar variant="dark" expand="lg" className="py-2 px-3 px-lg-4 navbar-custom sticky-top">
            <div className="d-flex align-items-center w-100">
                {/* Sidebar toggle buttons with improved styling */}
                <div className="d-flex align-items-center">
                    {/* Mobile toggle (hidden on desktop) */}
                    <Button
                        variant="outline-light"
                        onClick={toggleSidebar}
                        className="me-2 d-lg-none nav-icon-btn"
                        aria-label="Toggle navigation"
                    >
                        <List size={18} />
                    </Button>

                    {/* Desktop toggle (hidden on mobile) */}
                    <Button
                        variant="outline-light"
                        onClick={toggleSidebarCollapse}
                        className="d-none d-lg-flex nav-icon-btn"
                        aria-label="Toggle sidebar"
                    >
                        <List size={18} />
                    </Button>
                </div>

                {/* Brand - modern and clean with subtle hover effect */}
                <Navbar.Brand as="div" className="d-flex align-items-center mx-3 brand-container">
                    <div className="logo-wrapper">
                        <Image
                            src={logo}
                            roundedCircle
                            className="brand-logo"
                            width="36"
                            height="36"
                            alt="TAARA Logo"
                        />
                    </div>
                    <span className="fw-bold brand-text">TAARA</span>
                </Navbar.Brand>

                {/* Spacer to push nav items to right */}
                <div className="flex-grow-1"></div>

                {/* Donate button - visible on mobile/tablet */}
                <Button
                    variant="danger"
                    className="donate-btn-mobile d-lg-none"
                    onClick={openDonationModal}
                >
                    <Heart className="me-1" size={14} />
                    Donate
                </Button>

                {/* Navigation items - desktop only */}
                <Nav className="align-items-center gap-3 d-none d-lg-flex">
                    <Button
                        variant="outline-light"
                        className="nav-btn login-btn"
                    >
                        Adopt
                    </Button>
                    <Button
                        variant="danger"
                        className="nav-btn donate-btn"
                        onClick={openDonationModal}
                    >
                        <Heart className="me-2" size={16} />
                        Donate
                    </Button>
                </Nav>
            </div>
        </Navbar>
    );
};

export default MainNavbar;