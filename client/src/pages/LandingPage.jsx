import React, { useState, useEffect } from 'react';
import {
    Nav,
    Tab,
    Row,
    Col,
    Container,
    Offcanvas,
    Button,
    Card
} from 'react-bootstrap';
import {
    Heart,
    House,
    InfoCircle,
    Calendar,
    Shield,
    Images,
    X
} from 'react-bootstrap-icons';
import '../assets/styles/custom-buttons.css';
import '../assets/styles/custom-navbar.css';
import '../assets/styles/custom-text-colors.css';
import '../assets/styles/custom-theme.css'
import '../assets/styles/default.css';

import Footer from '../components/common/Footer';
import RainbowBridge from '../components/common/RainbowBridge';
import Events from '../components/common/Events';
import PetsForAdoption from '../components/common/PetsForAdoption';
import DonationModal from '../components/common/DonationModal';
import AnimalWelfareLaw from '../components/common/AnimalWelfareLaw';
import GalleryTab from '../components/common/Gallery';
import AboutUsTab from '../components/common/AboutUsTab';

import RescueTab from '../components/user/RescueTab';
import MainNavbar from '../components/common/MainNavbar';

const LandingPage = () => {
    const [showDonationModal, setShowDonationModal] = useState(false);

    const [activeTab, setActiveTab] = useState('Gallery');
    const [showSidebar, setShowSidebar] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const closeSidebar = () => setShowSidebar(false);
    const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

    // Track window resize for responsive adjustments
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // Close sidebar automatically when resizing to larger screens
        if (windowWidth >= 992 && showSidebar) {
            setShowSidebar(false);
        }

        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth, showSidebar]);

    // Sample data
    const galleryImages = [
        { id: 1, src: 'https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Linny' },
        { id: 2, src: 'https://images.pexels.com/photos/3387169/pexels-photo-3387169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Tuck' },
        { id: 3, src: 'https://images.pexels.com/photos/162140/duckling-birds-yellow-fluffy-162140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Ming-ming' },
        { id: 4, src: 'https://images.pexels.com/photos/50577/hedgehog-animal-baby-cute-50577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Hedgie' },
        { id: 5, src: 'https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Linny' },
        { id: 6, src: 'https://images.pexels.com/photos/3387169/pexels-photo-3387169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Tuck' },
        { id: 7, src: 'https://images.pexels.com/photos/162140/duckling-birds-yellow-fluffy-162140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Ming-ming' },
        { id: 8, src: 'https://images.pexels.com/photos/50577/hedgehog-animal-baby-cute-50577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Hedgie' },
    ];





    // Navigation items data
    const navItems = [
        { key: 'Gallery', icon: <Images />, label: 'Gallery' },
        { key: 'ForAdoption', icon: <House />, label: 'For Adoption' },
        { key: 'ForRescue', icon: <Heart />, label: 'For Rescue' },
        { key: 'RainbowBridge', icon: <Heart />, label: 'Rainbow Bridge' },
        { key: 'Events', icon: <Calendar />, label: 'Events' },
        { key: 'WelfareLaw', icon: <Shield />, label: 'Animal Welfare Law' },
        { key: 'AboutUs', icon: <InfoCircle />, label: 'About Us' },
    ];

    // Handle tab change and close sidebar on mobile
    const handleTabSelect = (tab) => {
        setActiveTab(tab);
        if (windowWidth < 992) {
            closeSidebar();
        }
    };



    // Filter pets based on type and color selections

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Donation Modal */}
            <DonationModal
                show={showDonationModal}
                handleClose={() => setShowDonationModal(false)}
            />
            <MainNavbar toggleSidebar={toggleSidebar} toggleSidebarCollapse={toggleSidebarCollapse} />

            {/* Mobile Sidebar */}
            <Offcanvas
                show={showSidebar}
                onHide={closeSidebar}
                placement="start"
                className="sidebar-mobile w-75"
                backdrop={true}
            >
                <Offcanvas.Header className="text-white" style={{ backgroundColor: '#F4AAB9' }}>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                    <Button variant="link" className="text-white p-0" onClick={closeSidebar}>
                        <X size={24} />
                    </Button>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0 d-flex flex-column" style={{ backgroundColor: '#F4AAB9' }}>
                    <Nav variant="pills" className="flex-column flex-grow-1">
                        {navItems.map((item) => (
                            <Nav.Item key={item.key}>
                                <Nav.Link
                                    active={activeTab === item.key}
                                    onClick={() => handleTabSelect(item.key)}
                                    className="rounded-0 border-bottom py-3 px-4 text-white"
                                    style={{
                                        backgroundColor: activeTab === item.key ? '#D16D89' : 'transparent'
                                    }}
                                >
                                    <span className="me-2">
                                        {React.cloneElement(item.icon, {
                                            size: 16,
                                            color: 'white' // explicitly set icon color
                                        })}
                                    </span>
                                    {item.label}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>

                    {/* Login button in mobile sidebar */}
                    <div className="p-3 mt-auto">
                        <Button variant="outline-light" className="w-100">
                            Adopt
                        </Button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Main Content */}
            <Container fluid className="flex-grow-1 py-0 px-0">
                <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                    <Row className="g-0">
                        <Col
                            lg={sidebarCollapsed ? 1 : 3}
                            className="d-none d-lg-block sidebar-desktop text-white"
                            style={{
                                position: 'sticky',
                                top: '50px', /* Match the new navbar height */
                                height: 'auto',
                                overflowY: 'auto',
                                transition: 'width 0.3s ease-in-out',
                                zIndex: 1000,
                                backgroundColor: '#F4AAB9' /* Match navbar color */
                            }}
                        >
                            <Card className="border-0 shadow-sm h-100 bg-transparent text-white" style={{ borderRadius: '0' }}>
                                <Card.Body className="p-0 d-flex flex-column">
                                    <Nav variant="pills" className="flex-column flex-grow-1">
                                        {navItems.map((item) => (
                                            <Nav.Item key={item.key}>
                                                <Nav.Link
                                                    active={activeTab === item.key}
                                                    onClick={() => setActiveTab(item.key)}
                                                    className="rounded-0 border-bottom py-3 text-white"
                                                    style={{

                                                        backgroundColor: activeTab === item.key ? '#D16D89' : 'transparent',
                                                        paddingLeft: sidebarCollapsed ? '0' : '1.5rem',
                                                        paddingRight: sidebarCollapsed ? '0' : '1.5rem',
                                                        textAlign: sidebarCollapsed ? 'center' : 'left'
                                                    }}
                                                >
                                                    <span className={sidebarCollapsed ? '' : 'me-2'}>
                                                        {React.cloneElement(item.icon, {
                                                            size: sidebarCollapsed ? 20 : 16,
                                                            color: 'white' // explicitly set icon color
                                                        })}
                                                    </span>
                                                    {!sidebarCollapsed && item.label}
                                                </Nav.Link>
                                            </Nav.Item>
                                        ))}
                                    </Nav>
                                </Card.Body>
                            </Card>
                        </Col>


                        {/* Content Area */}
                        <Col
                            xs={12}
                            lg={sidebarCollapsed ? 11 : 9}
                            className="content-area px-3 px-lg-4 pb-4 c-background-cream"
                            style={{ transition: 'margin-left 0.3s ease-in-out' }}
                        >
                            {/* Mobile Tab Header removed to keep only h2 headers */}

                            <Tab.Content>
                                <GalleryTab images={galleryImages} />

                                {/* For Adoption Tab */}
                                <Tab.Pane eventKey="ForAdoption" className='scrollable-tab-pane'>

                                    {/* Pets For Adoption Component */}
                                    <PetsForAdoption pets={[1, 2]} />
                            </Tab.Pane>

                                {/* For Rescue Tab */}
                                <Tab.Pane eventKey="ForRescue" className='scrollable-tab-pane'>
                                    <RescueTab />
                                </Tab.Pane>

                                {/* Rainbow Bridge Tab */}
                                <Tab.Pane eventKey="RainbowBridge">
                                    <RainbowBridge />
                                </Tab.Pane>

                                {/* Events Tab */}
                                <Tab.Pane eventKey="Events">
                                    <Events />
                                </Tab.Pane>

                                {/* Animal Welfare Law Tab */}
                                <AnimalWelfareLaw />

                                {/* About Us Tab */}
                                <AboutUsTab />
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>

            <Footer />
        </div>
    );
};

export default LandingPage;