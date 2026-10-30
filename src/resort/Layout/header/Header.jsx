import { AppBar, Toolbar, Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ROOT = "/resort";

export default function Header({ Pages, top = 0, ...props }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selected, setSelected] = useState("Home");

  const handleLogoClick = (event) => {
    event.preventDefault();

    if (pathname !== ROOT && pathname !== `${ROOT}/`) {
      navigate(ROOT);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

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
        {/* NAVIGATION */}
        <Tabs
          onChange={(_e, newValue) => setSelected(newValue)}
          value={selected}
          sx={{
            justifyContent: "space-around",
            width: "100%",
          }}
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
        >
          {Pages.map((page) => (
            <Tab
              key={page.label}
              icon={page.icon}
              component={Link}
              to={page.path}
              value={page.label}
              label={page.label}
              sx={{
                textTransform: "none",
                color: "primary.main",
                fontSize: 16,

                "&.Mui-selected": {
                  fontWeight: 600,
                  color: "primary.main",
                },

                "&:hover": {
                  color: "primary.main",
                  opacity: 1,
                  fontWeight: 600,
                  fontSize: 16.5,
                },
              }}
            />
          ))}
        </Tabs>

        {/* CENTER LOGO */}
        <Box
          component={Link}
          to={ROOT}
          onClick={handleLogoClick}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          <Box
            component="img"
            src="/logo_B.svg"
            alt="Ban Tao Resort - Back to Home"
            sx={{
              width: 120,
              height: 120,
              objectFit: "contain",
              transition: "transform 0.3s ease",

              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
