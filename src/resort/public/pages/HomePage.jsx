import { Box, Container } from "@mui/material";

import CreateAvailability from "../../Availability/components/CreateAvailability";
import RoomsAvailabilityList from "../../Availability/components/RoomsAvailabilityList";

import Hero from "../../components/home/Hero";
import ParallaxSection from "../components/showcase/ParallaxSection";
import IntroBlock from "../components/showcase/IntroBlock";
import SimpleParallax from "../components/showcase/SimpleParallax";
import TwoImageGrid from "../components/showcase/TwoImageGrid";
import Pblock from "../components/showcase/Pblock";
import TwinImages from "../components/showcase/TwinImages";
import ContactSection from "../components/showcase/ContactSection";

function HomePage() {
  return (
    <Box sx={{ width: "100%" }}>
      <Hero />

      <IntroBlock />

      <SimpleParallax image="/landscape2.jpg" />

      <ParallaxSection />

      <TwoImageGrid />

      <Pblock
        title="THOUGHTFUL DESIGN INSIDE AND OUT"
        text="SOL LIVING | PHANGAN sets a new standard for design. Every element of your villa has been meticulously crafted to combine beauty with functionality."
        align="left"
      />

      <TwinImages />

      <SimpleParallax image="/landscape4.jpg" />

      {/* CONTACT SECTION */}
      {/* <ContactSection /> */}

      {/* AVAILABILITY SECTION */}
      <Container
        id="availability"
        maxWidth="lg"
        sx={{
          py: { xs: 4, md: 6 },
          scrollMarginTop: "120px",
        }}
      >
        <CreateAvailability />
        <RoomsAvailabilityList />
      </Container>
    </Box>
  );
}

export default HomePage;
