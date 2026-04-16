import { Container, Typography, Paper, TextField, Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import PublicLayout from "./resort/Layout/PublicLayout";
import { ROUTES, ADMIN_ROUTES } from "./routes/routerDict";
import RegisterPage from "./resort/public/pages/RegisterPage";
import HomePage from "./resort/public/pages/HomePage";
import LoginPage from "./resort/public/pages/LoginPage";
import AdminLayout from "./resort/Layout/AdminLayout";
import AdminRoomsPage from "./resort/admin/pages/AdminRoomsPage";
import RoomsPage from "./resort/public/pages/RoomsPage";
import TreatmentsPage from "./resort/public/pages/TreatmentsPage";
import AdminTreatmentsPage from "./resort/admin/pages/AdminTreatmentsPage";
import AdminWorkshopsPage from "./resort/admin/pages/AdminWorkshopsPage";
import AdminUsersPage from "./resort/admin/pages/AdminUsersPage";
import OrderPage from "./resort/orders/OrderPage";
import { getUser, getToken } from "../services/localStorageService";
import { useEffect } from "react";
import { useUser } from "./resort/providers/UserProvider";
import ThankYouPage from "./resort/public/pages/ThankYouPage";
import AdminOrdersPage from "./resort/admin/pages/AdminOrdersPage";
import WorkshopsPage from "./resort/public/pages/WorkshopsPage";
import AdminSessionsPage from "./resort/admin/pages/AdminSessionsPage";
import AdminRecRulesPage from "./resort/admin/pages/AdminRecRulesPage";

function App() {
  const { setUser } = useUser();
  useEffect(() => {
    const token = getToken();
    const userData = getUser();

    if (token && userData) {
      setUser(userData);
    }
  }, [setUser]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/resort" replace />} />
      <Route path="/resort" element={<PublicLayout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.register} element={<RegisterPage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.rooms} element={<RoomsPage />} />
        <Route path="rooms/:id/order" element={<OrderPage type="room" />} />
        <Route path={ROUTES.treatments} element={<TreatmentsPage />} />
        <Route path={ROUTES.workshops} element={<WorkshopsPage />} />
        <Route
          path="workshops/:id/order"
          element={<OrderPage type="workshop" />}
        />
        <Route path={ROUTES.thankYou} element={<ThankYouPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path={ADMIN_ROUTES.home} element={<HomePage />} />
        <Route path={ADMIN_ROUTES.rooms} element={<AdminRoomsPage />} />

        <Route path={ADMIN_ROUTES.workshops} element={<AdminWorkshopsPage />} />
        <Route path={ADMIN_ROUTES.users} element={<AdminUsersPage />} />
        <Route path={ADMIN_ROUTES.orders} element={<AdminOrdersPage />} />
        <Route path={ADMIN_ROUTES.sessions} element={<AdminSessionsPage />} />
        <Route path={ADMIN_ROUTES.recRules} element={<AdminRecRulesPage />} />
        <Route
          path={ADMIN_ROUTES.treatments}
          element={<AdminTreatmentsPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
