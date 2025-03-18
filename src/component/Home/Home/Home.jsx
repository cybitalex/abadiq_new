import React from "react";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Services from "../Services/Services";
import { Box, Container } from "@mui/material";

const Home = () => {
  return (
    <Box component="main">
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          overflow: "hidden",
        }}
      >
        <Header />
        <About />
        <Services />
        <Contact />
      </Container>
      <Footer />
      {/* <ScrollTop/>   */}
    </Box>
  );
};

export default Home;
