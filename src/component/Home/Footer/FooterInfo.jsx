import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";

const FooterInfo = ({ data: { icon, info1, info2, id, link, linkTitle } }) => {
  return (
    <Col md={4} className="text-center mb-3">
      <div
        className={`d-flex fContactInfo fContactInfo${id} align-items-center justify-content-center`}
      >
        <FontAwesomeIcon icon={icon} className="fContactIcon" />
        <div>
          {link ? (
            <a href={link} className="contact-link" title={linkTitle}>
              <p className={`brnName${id}`}>{info1}</p>
            </a>
          ) : (
            <p className={`brnName${id}`}>{info1}</p>
          )}
          {info2 && <p>{info2}</p>}
        </div>
      </div>
    </Col>
  );
};

export default FooterInfo;
