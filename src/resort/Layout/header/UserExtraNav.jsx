import {
  AccountCircle,
  LoginRounded,
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
} from "@mui/material";
import { useUser } from "../../providers/UserProvider";
import { useState } from "react";

const toggleMenu = () => {};
function UserExtraNav() {
  const [OpenLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const { user } = useUser();
  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          width: "100%",
          height: 34,

          bgcolor: "background.default",
          borderBottom: "1px solid #ddd",
          px: 2,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10000000,
        }}
      >
        <Tabs
          value={0}
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
            label="Login"
            sx={{
              // דורס את הגובה המינימלי של הטאב עצמו
              minHeight: 20,
              // מקטין את גודל הפונט
              fontSize: "0.75rem",
              // מבטל את האותיות הגדולות האוטומטיות למראה טבעי ונקי יותר
              textTransform: "none",
              // מקטין את הריווח הפנימי כדי שהם לא יתפסו הרבה מקום
              padding: "0 12px",
            }}
          />
          <Tab
            label="Register"
            sx={{
              minHeight: 30,
              fontSize: "0.75rem",
              textTransform: "none",
              padding: "0 12px",
            }}
          />
        </Tabs>
      </AppBar>
    </>
  );
}

export default UserExtraNav;
