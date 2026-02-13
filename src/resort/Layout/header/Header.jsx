import { AppBar, Toolbar, Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../../routes/routerDict";

export default function Header({ Pages }) {
  const [selected, setSelected] = useState("Home");

  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Tabs
          onChange={(_e, newValue) => setSelected(newValue)}
          value={selected}
          display="flex"
          sx={{
            justifyContent: "space-around",
            width: "70%",
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
                color: "secondary.light",
                fontSize: 16,
                "&.Mui-selected": { fontWeight: 600, color: "secondary.light" },
              }}
            />
          ))}
        </Tabs>
        <Box>Logo</Box>
      </Toolbar>
    </AppBar>
  );
}
