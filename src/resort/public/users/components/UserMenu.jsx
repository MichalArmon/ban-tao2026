import {
  Box,
  Avatar,
  Popover,
  Typography,
  Button,
  Divider,
  Stack,
} from "@mui/material";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

import { motion } from "motion/react";

import { useUser } from "../../../providers/UserProvider";
import getZodiacSign from "../../../utils/zodiacSigns/getZodiacSign";

const COLORS = {
  cream: "#F7F5EF",
  green: "#34483D",
  brown: "#766354",
  brownDark: "#554539",
  sand: "#A28B72",
  muted: "#89857F",
  border: "#EAE5DD",
};

function UserMenu({ anchorEl, handleClose }) {
  const { user, handleLogOutUser } = useUser();

  const open = Boolean(anchorEl);

  if (!user) return null;

  const handleSignOut = () => {
    handleLogOutUser();
    handleClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          sx: {
            width: { xs: 280, sm: 310 },
            maxWidth: "calc(100vw - 32px)",
            bgcolor: COLORS.cream,
            backgroundImage: "none",
            borderRadius: 0,
            border: `1px solid ${COLORS.border}`,
            mt: 1.5,
            boxShadow: "0 18px 50px rgba(35,40,32,0.13)",
            overflow: "hidden",
          },
        },
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
      >
        {/* UPPER ACCENT */}
        <Box
          sx={{
            height: 3,
            bgcolor: COLORS.sand,
          }}
        />

        {/* USER DETAILS */}
        <Stack
          alignItems="center"
          spacing={1.5}
          sx={{
            px: 3,
            pt: 4,
            pb: 3,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: COLORS.sand,
            }}
          >
            YOUR BAN TAO ACCOUNT
          </Typography>

          {/* ZODIAC AVATAR */}
          <Box
            sx={{
              position: "relative",
              mt: 1,
              mb: 0.5,
            }}
          >
            <Avatar
              src={
                user.birthDate
                  ? `/zodiac_signs/${getZodiacSign(user.birthDate)}.svg`
                  : undefined
              }
              alt="Your zodiac sign"
              sx={{
                width: 74,
                height: 74,
                bgcolor: "#E9E4DA",
                border: `1px solid ${COLORS.border}`,
                p: 1.5,
                "& .MuiAvatar-img": {
                  objectFit: "contain",
                },
              }}
            >
              {user.name?.charAt(0)?.toUpperCase() || "G"}
            </Avatar>

            {/* ACTIVE STATUS */}
            <Box
              sx={{
                position: "absolute",
                bottom: 3,
                right: 0,
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#78A58B",
                border: `3px solid ${COLORS.cream}`,
              }}
            />
          </Box>

          <Typography
            sx={{
              fontFamily: "Georgia, serif",
              fontSize: 26,
              fontWeight: 400,
              color: COLORS.green,
              lineHeight: 1.3,
            }}
          >
            Hello, {user.name || "Guest"}
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              lineHeight: 1.7,
              color: COLORS.muted,
            }}
          >
            Welcome to your island sanctuary.
          </Typography>
        </Stack>

        {/* ACCOUNT FOOTER */}
        <Divider
          sx={{
            mx: 3,
            borderColor: COLORS.border,
          }}
        />

        <Box
          sx={{
            px: 3,
            pt: 2,
            pb: 2.5,
          }}
        >
          <Button
            fullWidth
            onClick={handleSignOut}
            endIcon={<LogoutRoundedIcon sx={{ fontSize: 17 }} />}
            sx={{
              justifyContent: "space-between",
              px: 1.5,
              py: 1.3,
              borderRadius: 0,
              color: COLORS.brown,
              textTransform: "none",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              transition: "all 0.25s ease",

              "&:hover": {
                bgcolor: "rgba(118,99,84,0.06)",
                color: COLORS.brownDark,
              },

              "& .MuiButton-endIcon": {
                ml: "auto",
              },
            }}
          >
            Sign out
          </Button>
        </Box>
      </Box>
    </Popover>
  );
}

export default UserMenu;
