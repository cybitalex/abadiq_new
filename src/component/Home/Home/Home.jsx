import React from "react";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Services from "../Services/Services";
import ScrollToTop from "../../Shared/ScrollToTop/ScrollToTop";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box component="main" sx={{ width: "100%" }}>
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
