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
    
    return (
        <Navbar className={`navbar navbar-expand-lg navbar-light ${isSticky ? "navStyle" : "navDefault"}`} expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" onClick={scrollTop} className="navBrn">
                    <img src={logo} alt="ABADIQ Logo" className="logo" /> ABADIQ <span className="navHighlight">Medical Billing</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto mainNav" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" className="nav-link" onClick={() => window['scrollTo']({ top: 0, behavior: 'smooth' })}>Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#services" className="nav-link">Services</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#contact" className="nav-link">Contact</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/dashboard/profile" className="nav-link">Dashboard</Nav.Link>
                        </Nav.Item>
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
