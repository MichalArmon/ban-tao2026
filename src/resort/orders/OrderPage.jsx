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
import dayjs from "dayjs";

import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRoom } from "../providers/RoomProvider";

import { useUser } from "../providers/UserProvider";

import CreateOrder from "../admin/components/orders/CreateOrder";

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

function BookingPage() {
  const { handleGetRoom, room, checkIn, checkOut } = useRoom();
  const { handleGetUser, user } = useUser();
  const { id } = useParams();

  useEffect(() => {
    handleGetRoom(id);
  }, [id]);
  if (!room) {
    return <Box>Loading...</Box>;
  }

  const {
    title = "Luxury Sea View Suite",
    location = "350 m from center",

    rating = 4.5,
    reviewsCount = 102,
    price = 250,
  } = room || {};
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
          <CreateOrder />
        </Box>
      </Grid>
      {/* RIGHT SECTION 👉👉 */}
      <Grid size={{ md: 5, xs: 12 }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column" },
            mb: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100%" },
              height: { xs: 200, sm: 200 },
              objectFit: "cover",
            }}
            image={room.hero.url}
            alt={room.title}
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
              <Typography
                variant="h5"
                component="div"
                textAlign="center"
                sx={{ fontWeight: "bold", mb: 4 }}
              >
                {room.title}
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Box>
                  <Rating
                    value={room.rating}
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
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: "auto", borderTop: "1px solid #eee", pt: 2 }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Your booking details
                </Typography>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mt: 2, mb: 2 }}
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Check-in
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {dayjs(checkIn).format("ddd, MMM D, YYYY")}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      0:00 – 12:00
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Check-out
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {dayjs(checkOut).format("ddd, MMM D, YYYY")}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      12:00 – 0:00
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    1 night, 1 room for 2 adults
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    1 x King Suite with Sea View
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column" },
            mb: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 3,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Your price summary
            </Typography>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {room.price}
                  {room.currency}
                </Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Includes taxes and charges
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  In the property's local currency: € 251
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default BookingPage;
