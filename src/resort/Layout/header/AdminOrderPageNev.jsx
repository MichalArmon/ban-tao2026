import { AppBar, Toolbar, Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ADMIN_ROUTES } from "../../../routes/routerDict";

const Pages = [
  {
    label: "Room reservations",
    path: ADMIN_ROUTES.roomReservation,
  },
  {
    label: "Workshop reservations",
    path: ADMIN_ROUTES.workshopReservation,
  },
  {
    label: "Treatment reservations",
    path: ADMIN_ROUTES.treatmentReservation,
  },
];

export default function AdminOrderPageNev({ ...props }) {
  const [selected, setSelected] = useState("Home");

  return (
    <AppBar
      {...props}
      position="fixed"
      sx={(theme) => ({
        zIndex: theme.zIndex.drawer + 1,
        bgcolor: "main",
        color: "text.primary",
        justifyContent: "center",
        height: 40,
        top: 64,
      })}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: 80,
          display: { xs: "flex" },
          gridTemplateColumns: { md: "1fr auto 1fr" },
          alignItems: "center",
          gap: { md: 2 },
        }}
      >
        <Tabs
          onChange={(_e, newValue) => setSelected(newValue)}
          value={selected}
          display="flex"
          sx={{
            justifyContent: "space-around",
            width: "100%",
          }}
          TabIndicatorProps={{
            style: {
              display: "none", // This hides the indicator
            },
          }}
        >
          {Pages.map((page) => (
            <Tab
              icon={page.icon}
              component={Link}
              to={page.path}
              value={page.label}
              key={page.label}
              label={page.label}
              sx={{
                textTransform: "none",
                color: "background.default",
                fontSize: 16,
                "&.Mui-selected": {
                  fontWeight: 600,
                  color: "background.default",
                },
                "&:hover": {
                  color: "background.default", // Color on hover
                  opacity: 1,
                  fontWeight: 600,
                  fontSize: 16.5,
                },
              }}
            />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}
