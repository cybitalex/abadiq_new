import React from "react";
import teamPic from "../../../Assets/about.svg";
import Fade from "react-reveal/Fade";
import SEO from "../../Shared/SEO/SEO";

const About = () => {
  return (
    <section id="about" className="about overflow-hidden py-5">
      <SEO
        title="About ABADIQ Medical Billing | Our Healthcare Billing Expertise"
        description="ABADIQ is a leading medical billing company dedicated to optimizing revenue cycles for healthcare providers through cutting-edge technology and expert services."
        keywords="about ABADIQ, medical billing experts, healthcare revenue management, medical billing company profile, revenue cycle experts"
        canonicalUrl="/about"
      />
      <div className="row w-100">
        <div className="row col-md-11 mx-auto ">
          <div className="col-md-6 img">
            <Fade duration={2000} left>
              <img
                src={`${teamPic}`}
                alt="ABADIQ medical billing team illustration"
                className="img-fluid"
              />
            </Fade>
          </div>
          <div className="col-md-6 ps-2">
            <Fade duration={2000} right>
              <h2 className="miniTitle">about us</h2>
              <h1 className="headerTitle">
                HOW WE CAN HELP YOUR{" "}
                <span className="headerHighlight">MEDICAL BUSINESS</span> GROW
              </h1>
              <p className="headerContent">
                ABADIQ is a trailblazing leader in modern medical billing
                services, dedicated to revolutionizing the financial health of
                healthcare providers. We bring a synergy of cutting-edge
                technology, expert professionals, and unmatched commitment to
                every aspect of the billing journey. Our mission? To optimize
                revenue cycles seamlessly, ensuring providers focus on patient
                care while we drive financial success.
              </p>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
