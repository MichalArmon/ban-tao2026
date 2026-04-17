import {
  Typography,
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Stack,
  Button,
  Divider,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useEffect } from "react";

import { useRoom } from "../providers/RoomProvider";

import { useUser } from "../providers/UserProvider";

import CreateOrder from "../admin/components/orders/CreateOrder";

import OrderCardWorkshop from "./components/cards/OrderCardWorkshop";
import { useSession } from "../providers/SessionProvider";
import { useParams } from "react-router-dom";
import { useWorkshop } from "../providers/WorkshopProvider";
import OrderCardRoom from "./components/cards/OrderCardRoom";
import ParticipantDetailsForm from "../public/components/sessions/ParticipantDetailsForm";

function OrderPage({ type }) {
  const { handleGetRoom, room, checkIn, checkOut } = useRoom();
  const { handleGetUser, user } = useUser();
  const {
    handleGetSession,
    setSession,
    session,
    handleEditSessionReservation,
  } = useSession();
  const { id } = useParams();
  const { handleGetWorkshop, workshop } = useWorkshop();
  const getWorkShop = async () => {
    const currentSession = await handleGetSession(id);
    if (!currentSession?.workshopId) return;
    setSession(currentSession);
    await handleGetWorkshop(currentSession.workshopId);
  };

  useEffect(() => {
    if (type === "room") {
      handleGetRoom(id);
    }
    if (type === "workshop") {
      getWorkShop();
    }
  }, [id, type]);
  if (type === "workshop" && (!session || !workshop)) {
    return <Box>Loading...</Box>;
  }

  if (type === "room" && !room) {
    return <Box>Loading...</Box>;
  }

  console.log("session:", session);
  console.log("workshop:", workshop);

  return (
    <Grid
      sx={{ display: "flex", flexDirection: "row" }}
      container
      maxWidth="xl"
      marginTop={12}
      spacing={6}
    >
      {/* LEFT SECTION 👈👈 */}

      <Grid size={{ md: 7, xs: 12 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginRight: 6,
          }}
        >
          <Typography sx={{ mb: 2, pl: 2 }} variant="h5">
            Complete booking details
          </Typography>
          {type == "room" ? (
            <CreateOrder />
          ) : (
            <ParticipantDetailsForm onSubmit={handleEditSessionReservation} />
          )}
        </Box>
      </Grid>
      {/* RIGHT SECTION 👉👉 */}
      <Grid size={{ md: 5, xs: 12 }}>
        {type === "workshop" ? (
          <OrderCardWorkshop service={workshop} />
        ) : (
          <OrderCardRoom service={room} checkIn={checkIn} checkOut={checkOut} />
        )}
      </Grid>
    </Grid>
  );
}

export default OrderPage;
