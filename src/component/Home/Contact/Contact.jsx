import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './Contact.css';
import contactImg from '../../../Assets/contact.svg';
// import swal from 'sweetalert'
import Fade from 'react-reveal/Fade';

const Contact = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData);

        const emailData = {
            to: [{
                email: 'abby@abadiq.com', // Your receiving email
                name: 'Abby Abad',
            }],
            sender: {
                email: formDataObj['email'], // Sender's email from form
                name: formDataObj['name'], // Sender's name from form
            },
            subject: formDataObj['subject'],
            htmlContent: `<p>${formDataObj['message']}</p>`,
        };
        
        try {
            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': process.env.REACT_APP_BREVO_API_KEY,
                },
                body: JSON.stringify(emailData),
            });

            if (response.ok) {
                event.target.reset();
                alert('Message sent successfully!');
            } else {
                alert('Failed to send message.');
            }
        } catch (error) {
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <section id="contact">
            <Col md={11} className="mx-auto">
                <Row>
                    <Col md={6}>
                        <Fade duration={2000} left>
                            <form onSubmit={handleSubmit} className="contactForm">
                                <h4 className="miniTitle">CONTACT US</h4>
                                <h5 className="sectionTitle">GET IN TOUCH</h5>
                                <Row>
                                    <Col md={12} lg={6}>
                                        <input name="name" placeholder="Your Name" type="text" required />
                                    </Col>
                                    <Col md={12} lg={6}>
                                        <input name="email" placeholder="Your Email" type="email" required />
                                    </Col>
                                    <Col md={12}>
                                        <input name="subject" placeholder="Subject" type="text" required />
                                    </Col>
                                    <Col md={12}>
                                        <textarea name="message" placeholder="Your Message..." required></textarea>
                                    </Col>
                                </Row>
                                <button className="branBtn" type="submit">Submit Now</button>
                            </form>
                        </Fade>
                    </Col>
                    <Col md={6}>
                        <Fade duration={2000} right>
                            <img src={contactImg} alt="Contact Us" className="img-fluid" />
                        </Fade>
                    </Col>
                </Row>
            </Col>
        </section>
    );
};

export default Contact;
