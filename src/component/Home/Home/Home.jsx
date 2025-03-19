import React from "react";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Services from "../Services/Services";
import ScrollToTop from "../../Shared/ScrollToTop/ScrollToTop";
import SEO from "../../Shared/SEO/SEO";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box component="main" sx={{ width: "100%" }}>
      <SEO
        title="ABADIQ Medical Billing | Leading Healthcare Revenue Cycle Management"
        description="ABADIQ delivers comprehensive medical billing services to optimize revenue for healthcare providers. Expert in billing, coding, and revenue cycle management."
        keywords="medical billing services, healthcare RCM, medical coding, revenue cycle management, ABADIQ, healthcare financial solutions, medical billing experts"
        canonicalUrl="/"
      />
      <Header />
      <About />
      <Services />
      <Contact />
      <Footer />
      <ScrollToTop />
    </Box>
  );
};

export default Home;
