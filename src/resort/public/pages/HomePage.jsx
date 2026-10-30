import { Box } from "@mui/material";

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

      <SimpleParallax image="/landscape2.jpg"></SimpleParallax>

      <ParallaxSection />
      <TwoImageGrid />
      <Pblock
        title="THOUGHTFUL DESIGN INSIDE AND OUT"
        text="SOL LIVING | PHANGAN sets a new standard for design . Every element of your villa has been meticulously crafted to combine beauty with functionality ."
        align="left"
      />
      <TwinImages />
      <ContactSection />

      <CreateAvailability />
      <RoomsAvailabilityList />
    </Box>
  );
}

export default HomePage;
