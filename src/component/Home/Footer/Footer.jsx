import React from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterInfo from "./FooterInfo";
import "./Footer.css";
import { footerInfo } from "../../FooterData";

const Footer = () => {
  return (
    <section className="row footer">
      <Row className="col-md-11 mx-auto">
        <Row className="align-items-center footerInfo">
          {footerInfo.map((data) => (
            <FooterInfo data={data} key={data.id} />
          ))}
        </Row>
        <Col md={6} lg={3} className="fAboutUs">
          <h5>ABOUT US</h5>
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
        Copyright &copy; 2025 <span className="fHighlight">CyBit Devs</span>.
        All rights reserved.
      </p>
    </section>
  );
};

export default Footer;
