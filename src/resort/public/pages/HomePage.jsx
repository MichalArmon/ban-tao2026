import { Box } from "@mui/material";

import CreateAvailability from "../../Availability/components/CreateAvailability";
import RoomsAvailabilityList from "../../Availability/components/RoomsAvailabilityList";
import Hero from "../../components/home/Hero";

function HomePage() {
  return (
    <Box margin={10}>
      <Hero />
      <CreateAvailability />
      <RoomsAvailabilityList />
    </Box>
  );
}

export default HomePage;
