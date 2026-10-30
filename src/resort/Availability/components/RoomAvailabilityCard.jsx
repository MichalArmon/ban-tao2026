import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Stack,
  Divider,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import AvailabilityButton from "./buttons/AvaiabiltyButton";

const COLORS = {
  green: "#34483D",
  brown: "#766354",
  brownDark: "#554539",
  sand: "#A28B72",
  muted: "#89857F",
  border: "#EAE5DD",
  cream: "#FAF9F6",
};

function RoomAvailabilityCard({ room }) {
  const navigate = useNavigate();

  if (!room) return null;

  const {
    title = "Luxury Sea View Suite",
    blurb = "",
    price = 250,
    currency = "THB",
    rating = 4.5,
    reviewsCount = 102,
    location = "Koh Phangan, Thailand",
  } = room;

  const image =
    room.hero?.url ||
    "https://images.unsplash.com/photo-1566073771259-6a8506099945";

  return (
    <Card
      component={motion.article}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        boxSizing: "border-box",
        mb: 3,

        bgcolor: "#FFFFFF",
        border: `1px solid ${COLORS.border}`,
        borderRadius: 0,
        boxShadow: "0 12px 38px rgba(59,48,38,0.08)",

        overflow: "hidden",

        transition: "box-shadow 0.35s ease",

        "&:hover": {
          boxShadow: "0 20px 55px rgba(59,48,38,0.14)",
        },

        "&:hover .room-image": {
          transform: "scale(1.045)",
        },
      }}
    >
      {/* IMAGE */}
      <Box
        sx={{
          width: { xs: "100%", md: "38%" },
          minHeight: { xs: 260, md: 330 },
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
          bgcolor: COLORS.cream,
        }}
      >
        <CardMedia
          component="img"
          className="room-image"
          image={image}
          alt={room.hero?.alt || title}
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            objectFit: "cover",
            transition: "transform 0.8s ease",
          }}
        />

        {/* IMAGE LABEL */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: 20,
            px: 2,
            py: 1,
            bgcolor: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography
            sx={{
              fontSize: 10,
              letterSpacing: "0.18em",
              color: COLORS.green,
              fontWeight: 600,
            }}
          >
            BAN TAO COLLECTION
          </Typography>
        </Box>
      </Box>

      {/* CONTENT */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",

          p: { xs: 3, md: 4 },

          "&:last-child": {
            pb: { xs: 3, md: 4 },
          },
        }}
      >
        <Box>
          {/* CATEGORY */}
          <Typography
            sx={{
              fontSize: 10,
              letterSpacing: "0.2em",
              color: COLORS.sand,
              fontWeight: 700,
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            PRIVATE ISLAND ACCOMMODATION
          </Typography>

          {/* TITLE + RATING */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "flex-start" }}
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Typography
              component="h3"
              sx={{
                fontFamily: "Georgia, serif",
                fontWeight: 400,
                fontSize: { xs: 28, md: 34 },
                lineHeight: 1.2,
                color: COLORS.green,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </Typography>

            {typeof rating === "number" && (
              <Box sx={{ flexShrink: 0 }}>
                <Rating
                  value={rating}
                  precision={0.5}
                  readOnly
                  size="small"
                  sx={{
                    color: COLORS.sand,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 11,
                    color: COLORS.muted,
                    textAlign: { xs: "left", sm: "right" },
                    mt: 0.5,
                  }}
                >
                  {reviewsCount} reviews
                </Typography>
              </Box>
            )}
          </Stack>

          {/* LOCATION */}
          <Stack
            direction="row"
            spacing={0.7}
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <LocationOnOutlinedIcon
              sx={{
                fontSize: 17,
                color: COLORS.sand,
              }}
            />
            <Typography
              sx={{
                fontSize: 13,
                color: COLORS.muted,
              }}
            >
              {location}
            </Typography>
          </Stack>

          {/* DESCRIPTION */}
          <Typography
            sx={{
              color: COLORS.muted,
              fontSize: 14,
              lineHeight: 1.9,
              maxWidth: 620,
              mb: 3,
            }}
          >
            {blurb}
          </Typography>

          {/* ROOM DETAILS */}
          <Stack
            direction="row"
            spacing={3}
            flexWrap="wrap"
            useFlexGap
            sx={{
              mb: 3,
            }}
          >
            {room.maxGuests && (
              <Typography
                sx={{
                  fontSize: 12,
                  color: COLORS.green,
                }}
              >
                UP TO {room.maxGuests} GUESTS
              </Typography>
            )}

            {room.sizeM2 && (
              <Typography
                sx={{
                  fontSize: 12,
                  color: COLORS.green,
                }}
              >
                {room.sizeM2} M²
              </Typography>
            )}

            {room.view && room.view !== "None" && (
              <Typography
                sx={{
                  fontSize: 12,
                  color: COLORS.green,
                  textTransform: "uppercase",
                }}
              >
                {room.view} VIEW
              </Typography>
            )}
          </Stack>
        </Box>

        {/* PRICE + BOOKING */}
        <Box>
          <Divider
            sx={{
              borderColor: COLORS.border,
              mb: 2.5,
            }}
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", sm: "center" }}
            spacing={2}
          >
            {/* PRICE */}
            <Box>
              <Typography
                sx={{
                  color: COLORS.muted,
                  fontSize: 11,
                  letterSpacing: "0.07em",
                  mb: 0.5,
                }}
              >
                PRICE PER NIGHT
              </Typography>

              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography
                  sx={{
                    fontFamily: "Georgia, serif",
                    fontSize: 30,
                    color: COLORS.green,
                    lineHeight: 1,
                  }}
                >
                  {Number(price).toLocaleString("en-US")}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 13,
                    color: COLORS.brown,
                    fontWeight: 600,
                  }}
                >
                  {currency}
                </Typography>
              </Stack>
            </Box>

            {/* KEEP EXISTING BOOKING LOGIC */}
            <Box
              sx={{
                "& .MuiButton-root": {
                  borderRadius: "0 !important",
                  minHeight: 48,
                  px: 4,
                  bgcolor: COLORS.brown,
                  color: "#FFFFFF",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  boxShadow: "none",
                  transition: "all 0.3s ease",
                },

                "& .MuiButton-root:hover": {
                  bgcolor: COLORS.brownDark,
                  boxShadow: "0 7px 18px rgba(75,58,43,0.2)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <AvailabilityButton room={room} />
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RoomAvailabilityCard;
