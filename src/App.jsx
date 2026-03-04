import { Container, Typography, Paper, TextField, Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import PublicLayout from "./resort/Layout/PublicLayout";
import { ROUTES, ADMIN_ROUTES } from "./routes/routerDict";
import RegisterPage from "./resort/public/pages/RegisterPage";
import HomePage from "./resort/public/pages/HomePage";
import LoginPage from "./resort/public/pages/LoginPage";
import AdminLayout from "./resort/Layout/AdminLayout";
import RoomsPage from "./resort/admin/pages/RoomsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/resort" replace />} />
      <Route path="/resort" element={<PublicLayout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.register} element={<RegisterPage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path={ADMIN_ROUTES.home} element={<HomePage />} />
        <Route path={ADMIN_ROUTES.rooms} element={<RoomsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
