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
        maxWidth="lg"
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
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
