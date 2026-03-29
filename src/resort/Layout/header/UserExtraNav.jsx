import {
  AccountCircle,
  LoginRounded,
  Person,
  PersonAddAlt1Rounded,
  Search,
} from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import { useUser } from "../../providers/UserProvider";
import { useState } from "react";

import CreateRegister from "../../users/components/register/CreateRegister";
import getZodiacSign from "../../utils/zodiacSigns/getZodiacSign";
import CreateLogin from "../../users/components/login/CreateLogin";
import UserMenu from "../../users/components/UserMenu";

function UserExtraNav() {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { user, openSignup, setOpenSignup, OpenLogin, setOpenLogin } =
    useUser();
  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          width: "100%",
          height: 40,

          bgcolor: "background.default",
          borderBottom: "1px solid #ddd",

          zIndex: 10000000,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", // דוחף את האלמנטים לקצוות
            alignItems: "center",
            px: 2,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={(event, newValue) => setTabValue(newValue)}
            textColor="primary"
            sx={{
              // מכווץ את הגובה הכללי של אזור הטאבים
              minHeight: 20,
            }}
            TabIndicatorProps={{
              style: {
                display: "none", // This hides the indicator
              },
            }}
          >
            <Tab
              disableRipple
              label="fav"
              sx={{
                // דורס את הגובה המינימלי של הטאב עצמו
                minHeight: 20,
                minWidth: 0,

                // מבטל את האותיות הגדולות האוטומטיות למראה טבעי ונקי יותר
                textTransform: "none",
                // מקטין את הריווח הפנימי כדי שהם לא יתפסו הרבה מקום
                padding: "0 12px",
              }}
            />
            <Tab
              disableRipple
              label="old bookings"
              sx={{
                // דורס את הגובה המינימלי של הטאב עצמו
                minHeight: 20,

                // מקטין את גודל הפונט

                // מבטל את האותיות הגדולות האוטומטיות למראה טבעי ונקי יותר
                textTransform: "none",
                // מקטין את הריווח הפנימי כדי שהם לא יתפסו הרבה מקום
                padding: 0,
              }}
            />
          </Tabs>

          {user ? (
            <IconButton
              onClick={handleClick}
              sx={{
                textTransform: "none",

                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#b3355937",
                  width: 26,
                  height: 26,
                }}
              >
                <img
                  src={`/zodiac_signs/${getZodiacSign(user.birthDate)}.svg`}
                  alt="Custom Avatar"
                  style={{ width: "26px", height: "26px" }}
                />
              </Avatar>
            </IconButton>
          ) : (
            <Tooltip title="REGISTER" arrow placement="top">
              <IconButton
                onClick={() => setOpenSignup(true)}
                aria-label="Register"
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <AccountCircle sx={{ fontSize: "1.4rem" }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </AppBar>
      <Dialog
        open={openSignup}
        onClose={() => {
          setOpenSignup(false);
        }}
        fullWidth
        maxWidth="xs"
      >
        <DialogContent dividers sx={{ backgroundColor: "background.default" }}>
          <Typography
            color="primary.main"
            variant="h4"
            textAlign="center"
            margin={2}
            sx={{ fontWeight: 800 }}
          >
            Register here
          </Typography>
          <CreateRegister />
        </DialogContent>
      </Dialog>

      {/* LOGIN DIALOG */}
      <Dialog
        open={OpenLogin}
        onClose={() => {
          setOpenLogin(false);
        }}
        fullWidth
        maxWidth="xs"
      >
        <DialogContent dividers sx={{ backgroundColor: "background.default" }}>
          <Typography
            color="primary.main"
            variant="h4"
            textAlign="center"
            margin={2}
            sx={{ fontWeight: 800 }}
          >
            Login
          </Typography>
          <CreateLogin />
        </DialogContent>
      </Dialog>

      <UserMenu anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
}

export default UserExtraNav;
