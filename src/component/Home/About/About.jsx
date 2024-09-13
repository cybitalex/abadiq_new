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
                            <p className="headerContent">Adding medicalically convincing content here</p>
                            <button className="branBtn">learn More</button>
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;