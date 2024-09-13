import React from 'react';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Services from '../Services/Services';

const Home = () => {
    return (
        <main>
            <Header/>
            <About/>
            <Services/>
            <Contact/>
            <Footer/>
            {/* <ScrollTop/>   */}
        </main>
    );
};

export default Home;