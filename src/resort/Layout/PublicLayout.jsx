import { ROUTES } from "../../routes/routerDict";
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
    path: ROUTES.home,
    icon: null,
  },
  {
    label: "About",
    path: ROUTES.about,
    icon: null,
  },
  {
    label: "Rooms",
    path: ROUTES.rooms,
    icon: null,
  },
  {
    label: "Treatments",
    path: ROUTES.treatments,
    icon: null,
  },
  {
    label: "Favorites",
    path: ROUTES.favorite,
    icon: null,
  },
  {
    label: "Sand Box",
    path: ROUTES.sandBox,
    icon: null,
  },
  {
    label: "Register",
    path: ROUTES.register,
    icon: null,
  },

  {
    label: "Login",
    path: ROUTES.login,
    icon: null,
  },
];

function PublicLayout() {
  return (
    <>
      <Header Pages={Pages} />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default PublicLayout;
