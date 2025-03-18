import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./Contact.css";
import contactImg from "../../../Assets/contact.svg";
// import swal from 'sweetalert'
import Fade from "react-reveal/Fade";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData);

    try {
      console.log("Sending email via API...");

      // Use the server-side endpoint instead of calling Brevo directly
      const response = await fetch("/api/brevo-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formDataObj.name,
          email: formDataObj.email,
          subject: formDataObj.subject,
          message: formDataObj.message,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Email sent successfully:", responseData);
        event.target.reset();
        setSuccessMessage(
          "Message sent successfully! We will get back to you soon."
        );
      } else {
        console.error("Failed to send email:", responseData);
        setErrorMessage(
          `Failed to send message: ${responseData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <h1 className="text-center section-title">
        <span className="primary-color">Contact</span> US
      </h1>
      <div className="container">
        <Fade bottom duration={2000} distance="40px">
          <div className="row contactContainer">
            <div className="col-md-6 p-5">
              <img src={contactImg} className="img-fluid" alt="Contact Us" />
            </div>
            <div className="col-md-6 p-5">
              <form onSubmit={handleSubmit}>
                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    className="form-control"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Contact;
