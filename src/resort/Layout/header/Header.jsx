import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  Stack,
  Typography,
  Dialog,
  DialogContent,
} from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

import { useUser } from "../../providers/UserProvider";
import CreateLogin from "../../public/users/components/CreateLogin";
import CreateRegister from "../../public/users/components/CreateRegister";
import UserMenu from "../../public/users/components/UserMenu";

const ROOT = "/resort";

const COLORS = {
  cream: "#F7F5EF",
  green: "#34483D",
  brown: "#766354",
  brownDark: "#554539",
  sand: "#A28B72",
  border: "#EAE5DD",
};

export default function Header({ Pages, top = 0, ...props }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { user, OpenLogin, setOpenLogin, openSignup, setOpenSignup } =
    useUser();

  const handleLogoClick = (event) => {
    event.preventDefault();
    setMenuOpen(false);

    if (pathname !== ROOT && pathname !== `${ROOT}/`) {
      navigate(ROOT);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  const isActivePage = (path) => {
    if (path === ROOT || path === `${ROOT}/`) {
      return pathname === ROOT || pathname === `${ROOT}/`;
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const openLoginDialog = () => {
    setMenuOpen(false);
    setOpenLogin(true);
  };

  const handleUserClick = (event) => {
    if (user) {
      setAnchorEl(event.currentTarget);
    } else {
      openLoginDialog();
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* MAIN HEADER */}
      <AppBar
        {...props}
        position="fixed"
        elevation={0}
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: COLORS.cream,
          color: COLORS.green,
          height: "var(--nav-h, 80px)",
          top,
          justifyContent: "center",
          borderBottom: `1px solid ${COLORS.border}`,
          boxShadow: "0 4px 20px rgba(40,36,30,0.035)",
        })}
      >
        <Toolbar
          sx={{
            minHeight: "80px !important",
            width: "100%",
            boxSizing: "border-box",
            px: { xs: 2.5, sm: 4, md: 6 },
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
          }}
        >
          {/* DESKTOP NAVIGATION */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ md: 2, lg: 3 }}
            sx={{
              display: { xs: "none", md: "flex" },
              gridColumn: 1,
            }}
          >
            {Pages.map((page) => {
              const active = isActivePage(page.path);

              return (
                <Box key={page.path}>
                  <Button
                    component={Link}
                    to={page.path}
                    sx={{
                      px: 0.5,
                      py: 1.5,
                      minWidth: "auto",
                      color: active ? COLORS.green : COLORS.brown,
                      fontSize: 12,
                      fontWeight: active ? 600 : 400,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      transition: "color 0.3s ease",

                      "&:hover": {
                        bgcolor: "transparent",
                        color: COLORS.green,
                      },
                    }}
                  >
                    {page.label}
                  </Button>
                </Box>
              );
            })}
          </Stack>

          {/* MOBILE MENU BUTTON */}
          <IconButton
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            sx={{
              display: { xs: "flex", md: "none" },
              gridColumn: 1,
              justifySelf: "start",
              color: COLORS.green,
              bgcolor: "transparent",

              "&:hover": {
                bgcolor: "rgba(118,99,84,0.07)",
              },
            }}
          >
            <MenuRoundedIcon />
          </IconButton>

          {/* CENTER LOGO */}
          <Box
            component={Link}
            to={ROOT}
            onClick={handleLogoClick}
            aria-label="Ban Tao Village - Back to home"
            sx={{
              gridColumn: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              justifySelf: "center",
            }}
          >
            <Box
              component={motion.img}
              src="/logo_B.svg"
              alt="Ban Tao Village"
              whileHover={{ scale: 1.045 }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              sx={{
                width: { xs: 105, md: 120 },
                height: 78,
                objectFit: "contain",
              }}
            />
          </Box>

          {/* LOGIN / CONNECTED USER */}
          <Button
            onClick={handleUserClick}
            title={user ? "Open account menu" : "Sign in"}
            aria-label={user ? "Open account menu" : "Sign in"}
            aria-haspopup={user ? "menu" : undefined}
            aria-expanded={user ? Boolean(anchorEl) : undefined}
            startIcon={
              user ? (
                <Box
                  sx={{
                    position: "relative",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    bgcolor: COLORS.green,
                    color: COLORS.cream,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PersonRoundedIcon sx={{ fontSize: 18 }} />

                  {/* CONNECTED STATUS */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: -2,
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      bgcolor: "#78A58B",
                      border: `2px solid ${COLORS.cream}`,
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    color: COLORS.brown,
                  }}
                >
                  <LoginRoundedIcon sx={{ fontSize: 20 }} />
                  <Box component="span" style={{ fontSize: 14 }}>
                    {" "}
                    LOGIN
                  </Box>
                </Box>
              )
            }
            sx={{
              gridColumn: 3,
              justifySelf: "end",
              minWidth: "auto",
              px: { xs: 1, sm: 2 },
              py: 1,
              color: COLORS.brown,
              borderRadius: 0,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "none",
              whiteSpace: "nowrap",

              "&:hover": {
                bgcolor: "rgba(118,99,84,0.07)",
                color: COLORS.brownDark,
              },

              "& .MuiButton-startIcon": {
                mr: { xs: 0, sm: 1 },
                ml: 0,
              },
            }}
          >
            {/* <Box
              component="span"
              sx={{
                display: { xs: "none", sm: "inline" },
              }}
            >
              {user ? `Hello, ${user.name || "Guest"}` : "LOGIN"}
            </Box> */}
          </Button>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "85vw", sm: 360 },
            maxWidth: 380,
            bgcolor: COLORS.cream,
            borderRadius: 0,
            p: 3,
            boxSizing: "border-box",
          },
        }}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
      >
        <Stack spacing={4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              sx={{
                fontSize: 11,
                letterSpacing: "0.2em",
                color: COLORS.sand,
              }}
            >
              EXPLORE BAN TAO
            </Typography>

            <IconButton
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              sx={{
                color: COLORS.green,
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Stack>

          {/* MOBILE LINKS */}
          <Stack spacing={0}>
            {Pages.map((page, index) => (
              <Box
                key={page.path}
                component={motion.div}
                initial={{
                  opacity: 0,
                  x: -12,
                }}
                animate={{
                  opacity: menuOpen ? 1 : 0,
                  x: menuOpen ? 0 : -12,
                }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.35,
                }}
              >
                <Button
                  component={Link}
                  to={page.path}
                  onClick={() => setMenuOpen(false)}
                  fullWidth
                  endIcon={<ArrowOutwardRoundedIcon />}
                  sx={{
                    justifyContent: "space-between",
                    py: 2.2,
                    px: 0,
                    borderBottom: `1px solid ${COLORS.border}`,
                    borderRadius: 0,
                    textTransform: "none",
                    fontFamily: "Georgia, serif",
                    fontSize: 24,
                    fontWeight: 400,
                    color: isActivePage(page.path)
                      ? COLORS.green
                      : COLORS.brown,

                    "&:hover": {
                      bgcolor: "transparent",
                      color: COLORS.green,
                    },

                    "& .MuiButton-endIcon": {
                      ml: "auto",
                    },
                  }}
                >
                  {page.label}
                </Button>
              </Box>
            ))}
          </Stack>

          <Typography
            sx={{
              pt: 4,
              fontSize: 11,
              letterSpacing: "0.18em",
              color: COLORS.sand,
            }}
          >
            YOUR ISLAND ESCAPE AWAITS
          </Typography>
        </Stack>
      </Drawer>

      {/* USER MENU */}
      {user && (
        <UserMenu anchorEl={anchorEl} handleClose={handleCloseUserMenu} />
      )}

      {/* LOGIN DIALOG */}
      <Dialog
        open={OpenLogin}
        onClose={() => setOpenLogin(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 0,
            bgcolor: COLORS.cream,
            backgroundImage: "none",
            boxShadow: "0 30px 90px rgba(25,35,29,0.22)",
            maxWidth: 500,
            m: { xs: 2, sm: 3 },
          },
        }}
      >
        <DialogContent
          sx={{
            px: { xs: 3, sm: 6 },
            pt: { xs: 5, sm: 6 },
            pb: { xs: 4, sm: 5 },
          }}
        >
          <CreateLogin />
        </DialogContent>
      </Dialog>

      {/* REGISTER DIALOG */}
      <Dialog
        open={openSignup}
        onClose={() => setOpenSignup(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 0,
            bgcolor: COLORS.cream,
            backgroundImage: "none",
            boxShadow: "0 30px 90px rgba(25,35,29,0.22)",
            maxWidth: 570,
            maxHeight: "90vh",
            m: { xs: 2, sm: 3 },
          },
        }}
      >
        <DialogContent
          sx={{
            px: { xs: 3, sm: 6 },
            pt: { xs: 5, sm: 6 },
            pb: { xs: 4, sm: 5 },
          }}
        >
          <CreateRegister />
        </DialogContent>
      </Dialog>
    </>
  );
}
