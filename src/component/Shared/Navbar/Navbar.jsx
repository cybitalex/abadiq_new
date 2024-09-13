import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import PopOver from '../PopOver/PopOver';
import logo from './abadiqlogo.png';
import { useAppContext } from '../../../context';

const NavBar = () => {
    const { state: { user } } = useAppContext();
    const [isSticky, setSticky] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        });
    }, []);

    const scrollTop = () => window['scrollTo']({ top: 0, behavior: 'smooth' });
    
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        if (section) {
            const sectionTop = section.offsetTop - navbarHeight;
            window.scrollTo({ top: sectionTop, behavior: 'smooth' });
        }
        setExpanded(false); // Close the menu after clicking
    };

    return (
        <Navbar 
            expanded={expanded}
            onToggle={(expanded) => setExpanded(expanded)}
            className={`navbar navbar-expand-lg navbar-light ${isSticky ? "navStyle" : "navDefault"}`} 
            expand="lg"
        >
            <Container>
                <Navbar.Brand as={Link} to="/" onClick={() => { scrollTop(); setExpanded(false); }} className="navBrn">
                    <img src={logo} alt="ABADIQ Logo" className="logo" /> ABADIQ <span className="navHighlight">Medical Billing</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto mainNav" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" className="nav-link" onClick={() => { scrollTop(); setExpanded(false); }}>Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => scrollToSection('services')} className="nav-link">Services</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => scrollToSection('contact')} className="nav-link">Contact</Nav.Link>
                        </Nav.Item>
                        {/* <Nav.Item>
                            <Nav.Link as={Link} to="/dashboard/profile" className="nav-link" onClick={() => setExpanded(false)}>Dashboard</Nav.Link>
                        </Nav.Item> */}
                        <Nav.Item>
                            {
                                    <div>
                                        <PopOver />
                                    </div>
                            }
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
