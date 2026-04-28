import { Typography, Grid, Box } from "@mui/material";

import { useEffect } from "react";

import { useRoom } from "../providers/RoomProvider";

import { useUser } from "../providers/UserProvider";

import OrderCardWorkshop from "./components/cards/OrderCardWorkshop";
import { useSession } from "../providers/SessionProvider";
import { useParams } from "react-router-dom";
import { useWorkshop } from "../providers/WorkshopProvider";
import OrderCardRoom from "./components/cards/OrderCardRoom";
import ParticipantDetailsForm from "../public/components/sessions/ParticipantDetailsForm";
import { useSessionReservation } from "../providers/SessionReservationProvider";

import { useSnackBar } from "../providers/SnackBarProvider";
import CreateExtraPreferences from "../admin/components/extraPreferences/CreateExtraPreferences";
import { useTreatmentReservation } from "../providers/TreatmentReservationProvider";
import { useTreatment } from "../providers/TreatmentProvider";
import OrderCardTreatment from "./components/cards/OrderCardTreatmen";
import CreateTreatmentParticipantDetails from "../admin/components/treatmentReservations/treatmentParticipantDetails/CreateTreatmentParticipantDetails";
import { useLoading } from "../providers/LoadingProvider";

function OrderPage({ type }) {
  const { handleGetRoom, room, checkIn, checkOut } = useRoom();
  const { treatment, handleGetTreatment, setTreatment } = useTreatment();
  const { handleGetUser, user } = useUser();
  const { handleGetSession, setSession, session } = useSession();
  const { id } = useParams();
  const { handleGetSessionReservation } = useSessionReservation();
  const { handleGetTreatmentReservation } = useTreatmentReservation();
  const { handleGetWorkshop, workshop } = useWorkshop();
  const { isLoading, setIsLoading } = useLoading();
  const getWorkShop = async () => {
    const reservation = await handleGetSessionReservation(id);
    if (!reservation?.sessionId) return;

    const currentSession = await handleGetSession(reservation.sessionId);
    if (!currentSession?.workshopId) return;
    setSession(currentSession);
    await handleGetWorkshop(currentSession.workshopId);
  };
  const getTreatment = async () => {
    const reservation = await handleGetTreatmentReservation(id);
    const currentTreatment = await handleGetTreatment(reservation.treatmentId);
    setTreatment(currentTreatment);
    if (!reservation?.treatmentId) return;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // 🔥 לפני הכל

      if (type === "room") {
        await handleGetRoom(id);
      }
      if (type === "workshop") {
        await getWorkShop();
      }
      if (type === "treatment") {
        await getTreatment();
      }

      setIsLoading(false); // 🔥 אחרי הכל
    };

    fetchData();
  }, [id, type]);

  // ✨ תיקון 2: עצירת הרינדור (מונע את השגיאה "Cannot read properties of null") ✨
  // ברגע שהספינר הגלובלי דולק מה-useEffect, פה פשוט נחזיר כלום
  // כדי לא לנסות לרנדר את הכרטיסיות עם נתונים ריקים
  if (type === "room" && !room) return null;
  if (type === "workshop" && (!session || !workshop)) return null;
  if (type === "treatment" && !treatment) return null;

  console.log("session:", session);
  console.log("workshop:", workshop);
  console.log("treatment", treatment);

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
            {type === "room" && "Complete booking details"}
            {type === "workshop" && "Complete participant Details"}
            {type === "treatment" && "Complete other Details"}
            {/* האופציה השלישית */}
          </Typography>
          {type === "room" && <CreateExtraPreferences />}
          {type === "workshop" && <ParticipantDetailsForm reservationId={id} />}
          {type === "treatment" && <CreateTreatmentParticipantDetails />}
        </Box>
      </Grid>
      {/* RIGHT SECTION 👉👉 */}
      <Grid size={{ md: 5, xs: 12 }}>
        {type === "workshop" && (
          <OrderCardWorkshop service={workshop} date={session.startTime} />
        )}
        {type === "room" && (
          <OrderCardRoom service={room} checkIn={checkIn} checkOut={checkOut} />
        )}
        {type === "treatment" && <OrderCardTreatment service={treatment} />}
      </Grid>
    </Grid>
  );
}

export default OrderPage;
