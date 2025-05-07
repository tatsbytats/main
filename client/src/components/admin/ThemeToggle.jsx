// src/admin/components/ThemeToggle.jsx
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import {
    SunFill,
    MoonStarsFill
} from 'react-bootstrap-icons';

const ThemeToggle = ({ darkMode, toggleTheme }) => {
    // Get the current theme icon
    const currentThemeIcon = darkMode ?
        <MoonStarsFill size={18} /> :
        <SunFill size={18} />;

    return (
        <div className="position-fixed bottom-0 end-0 mb-4 me-4 bd-mode-toggle">
            <Dropdown>
                <Dropdown.Toggle
                    variant={darkMode ? "light" : "dark"}
                    className="rounded-circle p-2 d-flex align-items-center justify-content-center shadow"
                    id="theme-toggle-dropdown"
                    style={{ width: '42px', height: '42px' }}
                >
                    {currentThemeIcon}
                    <span className="visually-hidden">Toggle theme</span>
                </Dropdown.Toggle>

                <Dropdown.Menu
                    className={`dropdown-menu-end shadow ${darkMode ? 'dropdown-menu-dark' : ''}`}
                    aria-labelledby="theme-toggle-dropdown"
                >
                    <Dropdown.Item
                        as="button"
                        type="button"
                        className="d-flex align-items-center"
                        onClick={() => darkMode && toggleTheme()}
                        active={!darkMode}
                    >
                        <SunFill className="me-2" /> Light
                    </Dropdown.Item>
                    <Dropdown.Item
                        as="button"
                        type="button"
                        className="d-flex align-items-center"
                        onClick={() => !darkMode && toggleTheme()}
                        active={darkMode}
                    >
                        <MoonStarsFill className="me-2" /> Dark
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default ThemeToggle;