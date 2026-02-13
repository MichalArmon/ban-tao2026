import { Container, Typography, Paper, TextField, Button } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import PublicLayout from "./resort/Layout/PublicLayout";
import { ROUTES } from "./routes/routerDict";
import RegisterPage from "./resort/public/pages/RegisterPage";
import HomePage from "./resort/public/pages/HomePage";
import LoginPage from "./resort/public/pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.register} element={<RegisterPage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
