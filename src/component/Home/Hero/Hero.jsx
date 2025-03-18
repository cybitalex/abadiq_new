import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { alpha, useTheme } from "@mui/material/styles";
import newImage from "../../../Assets/medical_billing.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Typed from "react-typed";

const Hero = () => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });
  return (
    <Grid container spacing={4} component="main" role="main">
      <Grid item container xs={12} md={6} alignItems={"center"}>
        <Box
          data-aos={isMd ? "fade-right" : "fade-up"}
          paddingLeft={isMd && 2}
          p={1}
          component="header"
        >
          <Box marginBottom={2}>
            <Typography
              variant="h1"
              color="text.primary"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2.2rem", md: "2.8rem" },
              }}
            >
              Medical Billing <br />
              The Best{" "}
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "130px",
                  height: "1.2em",
                }}
              >
                <Typography
                  color={"primary"}
                  component={"span"}
                  variant={"inherit"}
                  sx={{
                    background: `linear-gradient(180deg, transparent 82%, ${alpha(
                      theme.palette.secondary.main,
                      0.3
                    )} 0%)`,
                    display: "inline-block",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typed
                    strings={["Billing", "Coding", "RCM"]}
                    typeSpeed={100}
                    loop={true}
                  />
                </Typography>
              </Box>
              Services
            </Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography
              variant="h2"
              component="p"
              color="text.secondary"
              sx={{
                fontSize: { xs: "1.2rem", md: "1.35rem" },
                maxWidth: "600px",
                lineHeight: 1.6,
              }}
            >
              Transform your healthcare practice with our comprehensive medical
              billing solutions. Expert service, maximum reimbursement, minimal
              stress.
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        container
        alignItems={"center"}
        justifyContent={"center"}
        xs={12}
        md={6}
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <Box
          component={LazyLoadImage}
          height={1}
          width={1}
          src={newImage}
          alt="ABADIQ Medical Billing Services - Professional Healthcare Billing Solutions"
          effect="blur"
          loading="lazy"
          boxShadow={3}
          borderRadius={2}
          maxWidth={700}
          sx={{
            filter: theme.palette.mode === "dark" ? "brightness(0.7)" : "none",
            transform: "scale(1.1)",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Hero;
