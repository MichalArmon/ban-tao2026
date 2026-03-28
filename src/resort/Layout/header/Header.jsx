import { AppBar, Toolbar, Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ Pages, top = 0, ...props }) {
  const [selected, setSelected] = useState("Home");

  return (
    <AppBar
      {...props}
      position="fixed"
      sx={(theme) => ({
        zIndex: theme.zIndex.drawer + 1,
        bgcolor: "background.default",
        color: "text.primary",
        justifyContent: "center",
        height: "var(--nav-h)",
        top: top,
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
                color: "primary.main",
                fontSize: 16,
                "&.Mui-selected": { fontWeight: 600, color: "primary.main" },
                "&:hover": {
                  color: "primary.main", // Color on hover
                  opacity: 1,
                  fontWeight: 600,
                  fontSize: 16.5,
                },
              }}
            />
          ))}
        </Tabs>
        <Box>Logo</Box>
      </Toolbar>
    </AppBar>
  );
}
