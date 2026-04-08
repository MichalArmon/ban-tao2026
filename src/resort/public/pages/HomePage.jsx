import { Box } from "@mui/material";

import CreateAvailability from "../../Availability/components/CreateAvailability";
import RoomsAvailabilityList from "../../Availability/components/RoomsAvailabilityList";

function HomePage() {
  return (
    <Box margin={10}>
      <CreateAvailability />
      <RoomsAvailabilityList />
    </Box>
  );
}

export default HomePage;
