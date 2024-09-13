import React from 'react';
import teamPic from '../../../Assets/about.svg';
import Fade from 'react-reveal/Fade';

const About = () => {
    return (
        <section className="about overflow-hidden py-5">
            <div className="row w-100">
                <div className="row col-md-11 mx-auto ">
                    <div className="col-md-6 img">
                        <Fade duration={2000} left>
                            <img src={`${teamPic}`} alt="" className="img-fluid"/>
                        </Fade>
                    </div>
                    <div className="col-md-6 ps-2">
                        <Fade duration={2000} right>
                            <p className="miniTitle">about us</p>
                            <h1 className="headerTitle">HOW WE CAN HELP YOUR <span className="headerHighlight">MEDICAL BUSINESS</span> GROW</h1>
                            <p className="headerContent">
                            Abad IQ is a trailblazing leader in modern medical billing services, dedicated to revolutionizing the financial health of healthcare providers. We bring a synergy of cutting-edge technology, expert professionals, and unmatched commitment to every aspect of the billing journey. Our mission? To optimize revenue cycles seamlessly, ensuring providers focus on patient care while we drive financial success.
                            </p>
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;