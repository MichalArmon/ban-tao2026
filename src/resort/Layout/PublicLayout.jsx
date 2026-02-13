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
    icon: <Home />,
  },
  {
    label: "About",
    path: ROUTES.about,
    icon: <Person />,
  },
  {
    label: "Cards",
    path: ROUTES.home,
    icon: <CardGiftcard />,
  },
  {
    label: "My Cards",
    path: ROUTES.MyCards,
    icon: <Style />,
  },
  {
    label: "Favorites",
    path: ROUTES.favorite,
    icon: <Favorite />,
  },
  {
    label: "Sand Box",
    path: ROUTES.sandBox,
    icon: <School />,
  },
  {
    label: "Register",
    path: ROUTES.register,
    icon: <AppRegistration />,
  },

  {
    label: "Login",
    path: ROUTES.login,
    icon: <Login />,
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
