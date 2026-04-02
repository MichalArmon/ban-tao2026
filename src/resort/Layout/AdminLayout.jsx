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
