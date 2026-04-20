import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Rating,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRoom } from "../../providers/RoomProvider";
import { getUser } from "../../../../services/localStorageService";
import { useUser } from "../../providers/UserProvider";
import { useRoomReservation } from "../../providers/RoomReservationProvider";
import AvailabilityAdminButton from "./buttons/AvailabilityAdminButton";
import AvailabilityButton from "./buttons/AvaiabiltyButton";

const ScoreBadge = ({ score, text }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Box
      sx={{
        backgroundColor: "#003580", // כחול "בוקינג"
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontWeight: "bold",
        fontSize: "1.1rem",
      }}
    >
      {score}
    </Box>
    <Typography
      variant="subtitle2"
      sx={{ color: "#003580", fontWeight: "bold" }}
    >
      {text}
    </Typography>
  </Box>
);

function RoomAvailabilityCard({ room }) {
  const { user } = useUser();
  const { checkIn, checkOut, guestsCount } = useRoom();
  const { handleCreateRoomReservation } = useRoomReservation();

  if (!room) return null;
  const reservation = {
    userId: user?._id,
    roomId: room._id,
    checkIn: checkIn,
    checkOut: checkOut,
    guestsCount: guestsCount,
  };

  const navigate = useNavigate();
  const handleBooking = async () => {
    await handleCreateRoomReservation(reservation);
    console.log("reservation:", reservation);
    navigate(`/resort/rooms/${room._id}/order`);
  };

  const {
    image = "https://images.unsplash.com/photo-1566073771259-6a8506099945", // תמונת ברירת מחדל
    title = "Luxury Sea View Suite",
    location = "350 m from center",

    rating = 4.5,
    reviewsCount = 102,
    price = 250,
  } = room || {};

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        mb: 2,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* 1. Image Section (Left) */}
      <CardMedia
        component="img"
        sx={{
          width: { xs: "100%", sm: 280 },
          height: { xs: 200, sm: 300 },
          objectFit: "cover",
        }}
        image={room.hero.url}
        alt={title}
      />

      {/* 2. Content Section (Right) */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 3,
        }}
      >
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Box>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                {title}
              </Typography>
              <Rating
                value={rating}
                precision={0.5}
                readOnly
                size="small"
                sx={{ mb: 1 }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "text.secondary",
                  gap: 0.5,
                  mb: 2,
                }}
              >
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">{location}</Typography>
              </Box>
            </Box>

            {/* Score and Reviews */}
            <Box sx={{ textAlign: "right" }}>
              <ScoreBadge score={rating.toFixed(1)} text="Excellent" />
              <Typography variant="caption" color="text.secondary">
                {reviewsCount} reviews
              </Typography>
            </Box>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, mb: 3 }}
          >
            {room.blurb}
          </Typography>
        </Box>

        {/* 3. Action Section (Bottom Right) */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: "auto", borderTop: "1px solid #eee", pt: 2 }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              Price per night
            </Typography>
            <Typography
              variant="h5"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              {` ${room.currency}  
              ${room.price}`}
            </Typography>
          </Box>
          {user.role === "admin" ? (
            <AvailabilityAdminButton />
          ) : (
            <AvailabilityButton room={room} />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default RoomAvailabilityCard;
