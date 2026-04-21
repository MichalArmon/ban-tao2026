import { ADMIN_ROUTES } from "../../routes/routerDict";
import Header from "./header/Header";

import {
  CardGiftcard,
  AppRegistration,
  Favorite,
  Home,
  Person,
  School,
  Style,
  Login,
} from "@mui/icons-material";
import Main from "./main/Main";
import { Outlet } from "react-router-dom";

const Pages = [
  {
    label: "rooms",
    path: ADMIN_ROUTES.rooms,
  },
  {
    label: "treatments",
    path: ADMIN_ROUTES.treatments,
  },
  {
    label: "workshops",
    path: ADMIN_ROUTES.workshops,
  },
  {
    label: "users",
    path: ADMIN_ROUTES.users,
  },

  {
    label: "retreats",
    path: ADMIN_ROUTES.retreats,
  },
  {
    label: "orders",
    path: ADMIN_ROUTES.orders,
  },
  {
    label: "sessions",
    path: ADMIN_ROUTES.sessions,
  },
  {
    label: "rec rules",
    path: ADMIN_ROUTES.recRules,
  },
  {
    label: "room reservations",
    path: ADMIN_ROUTES.roomReservation,
  },
  {
    label: "workshop reservations",
    path: ADMIN_ROUTES.workshopReservation,
  },
];

function AdminLayout() {
  return (
    <>
      <Header Pages={Pages} />
      <Main paddingTop={10}>
        <Outlet />
      </Main>
    </>
  );
}

export default AdminLayout;
