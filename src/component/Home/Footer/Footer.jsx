import React from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterInfo from "./FooterInfo";
import "./Footer.css";
import { footerInfo } from "../../FooterData";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="row footer"
      itemScope
      itemType="http://schema.org/WPFooter"
    >
      <Row className="col-md-11 mx-auto">
        <Row className="align-items-center footerInfo">
          {footerInfo.map((data) => (
            <FooterInfo data={data} key={data.id} />
          ))}
        </Row>
        <Col md={6} lg={3} className="fAboutUs">
          <h2 className="h5">ABOUT US</h2>
          <span className="animate-border"></span>
          <p className="aboutUsDes">
            ABADIQ stands as a beacon of excellence in medical billing,
            passionately committed to elevating the financial health of
            healthcare providers. With every claim meticulously coded, every
            denial strategically managed, and every invoice transparently
            communicated, we redefine medical billing as an art of precision and
            a science of success.
          </p>
        </Col>
      </Row>
      <p className="copyRight">
        Copyright &copy; {currentYear}{" "}
        <span className="fHighlight" itemProp="copyrightHolder">
          ABADIQ Medical Billing
        </span>
        . All rights reserved.{" "}
        <span className="d-none" itemProp="keywords">
          medical billing services, healthcare revenue cycle management, medical
          coding
        </span>
      </p>
    </footer>
  );
};

export default Footer;
