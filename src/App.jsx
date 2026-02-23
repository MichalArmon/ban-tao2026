import { Container, Typography, Paper, TextField, Button } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import PublicLayout from "./resort/Layout/PublicLayout";
import { ROUTES, ADMIN_ROUTES } from "./routes/routerDict";
import RegisterPage from "./resort/public/pages/RegisterPage";
import HomePage from "./resort/public/pages/HomePage";
import LoginPage from "./resort/public/pages/LoginPage";
import AdminLayout from "./resort/Layout/AdminLayout";
import CreateRoomPage from "./resort/admin/pages/CreateRoomPage";

function App() {
  return (
    <Routes>
      <Route path="/resort" element={<PublicLayout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.register} element={<RegisterPage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path={ADMIN_ROUTES.home} element={<HomePage />} />
        <Route path={ADMIN_ROUTES.rooms} element={<CreateRoomPage />} />
        <Route path={ADMIN_ROUTES.createRoom} element={<CreateRoomPage />} />
      </Route>
    </Routes>
  );
}

export default App;
