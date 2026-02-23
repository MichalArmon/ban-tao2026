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
    label: "Home",
    path: ADMIN_ROUTES.home,
    icon: <Home />,
  },
  {
    label: "rooms",
    path: ADMIN_ROUTES.rooms,
    icon: <Person />,
  },
  {
    label: "create room",
    path: ADMIN_ROUTES.createRoom,
    icon: <CardGiftcard />,
  },
  {
    label: "update room",
    path: ADMIN_ROUTES.updateRoom,
    icon: <Style />,
  },
  {
    label: "retreats",
    path: ADMIN_ROUTES.retreats,
    icon: <Favorite />,
  },
  {
    label: "create retreat",
    path: ADMIN_ROUTES.createRetreats,
    icon: <School />,
  },
  {
    label: "update retreat",
    path: ADMIN_ROUTES.updateRetreat,
    icon: <AppRegistration />,
  },
];

function AdminLayout() {
  return (
    <>
      <Header Pages={Pages} />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default AdminLayout;
